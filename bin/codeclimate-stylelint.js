#!/usr/bin/env node

/* eslint-disable no-console */
const stylelint = require('stylelint');
const fs = require('fs');
const glob = require('glob');
const { cosmiconfigSync } = require('cosmiconfig');
const CONFIG_PATH = "/config.json"
const CODE_PATH = "/code"


const rules = JSON.parse(fs.readFileSync(`${__dirname}/../config/contents/rules.json`, 'utf-8'));
const options = { extensions: ['.css', '.scss', '.sass', '.less', '.sss', '.html', '.vue', '.js', '.jsx', '.ts', '.tsx'] };

let engineConfig;
let analysisFiles;

function runTiming(name) {
  const start = new Date();

  return () => {
    const duration = (new Date() - start) / 1000;
    console.error(`•• Timing: .${name}: ${duration}s`);
  };
}

function buildIssueJson(message, filepath) {
  const checkName = message.rule;
  const line = message.line || 1;
  const column = message.column || 1;
  const currentDir = process.cwd();

  const issue = {
    type: 'issue',
    categories: ['Style'],
    check_name: checkName,
    description: message.text,
    remediation_points: 50000,
    location: {
      path: filepath.replace(`${currentDir}/`, ''),
      positions: {
        begin: {
          line,
          column
        },
        end: {
          line,
          column
        }
      }
    }
  };

  if (rules[message.rule]) {
    issue.content = {
      body: rules[message.rule]
    };
  }

  return JSON.stringify(issue);
}

function isFileWithMatchingExtension(file, extensions) {
  const stats = fs.lstatSync(file);
  const extension = `.${file.split('.').pop()}`;
  return stats.isFile() && !stats.isSymbolicLink() && extensions.indexOf(extension) >= 0;
}

function prunePathsWithinSymlinks(paths) {
  // Extracts symlinked paths and filters them out, including any child paths
  const symlinks = paths.filter(p => fs.lstatSync(p).isSymbolicLink());

  return paths.filter(p => {
    let withinSymlink = false;
    symlinks.forEach(symlink => {
      if (p.indexOf(symlink) === 0) {
        withinSymlink = true;
      }
    });
    return !withinSymlink;
  });
}

function inclusionBasedFileListBuilder(includePaths) {
  // Uses glob to expand the files and directories in includePaths, filtering
  // down to match the list of desired extensions.
  return extensions => {
    const filesAnalyzed = [];

    includePaths.forEach(fileOrDirectory => {
      if (/\/$/.test(fileOrDirectory)) {
        // if it ends in a slash, expand and push
        const filesInThisDirectory = glob.sync(`${fileOrDirectory}/**/**`);
        prunePathsWithinSymlinks(filesInThisDirectory).forEach(file => {
          if (isFileWithMatchingExtension(file, extensions)) {
            filesAnalyzed.push(file);
          }
        });
      } else if (isFileWithMatchingExtension(fileOrDirectory, extensions)) {
        filesAnalyzed.push(fileOrDirectory);
      }
    });

    return filesAnalyzed;
  };
}

function obtainStylelintConfig() {
  const explorerSync = cosmiconfigSync('stylelint');
  let result;

  if (options.configFile) {
    result = explorerSync.load(`${process.cwd()}/${options.configFile}`);
  } else {
    result = explorerSync.search(process.cwd());
  }

  return result.config;
}

function setAbsolutePathOnIgnoreFiles(stylelintConfig) {
  if (!options.configOverrides) options.configOverrides = {};

  if (stylelintConfig.ignoreFiles) {
    options.configOverrides['ignoreFiles'] = stylelintConfig.ignoreFiles.map((file) =>  `${CODE_PATH}/${file}`);
  }
}

function configEngine() {
  const engineTiming = runTiming('engineConfig');
  const stylelintConfig = obtainStylelintConfig();
  let buildFileList;

  if (stylelintConfig) {
    setAbsolutePathOnIgnoreFiles(stylelintConfig);
  }

  if (fs.existsSync(CONFIG_PATH)) {
    engineConfig = JSON.parse(fs.readFileSync(CONFIG_PATH));

    if (engineConfig.include_paths) {
      buildFileList = inclusionBasedFileListBuilder(engineConfig.include_paths);
    } else {
      buildFileList = inclusionBasedFileListBuilder(['./']);
    }

    analysisFiles = buildFileList(options.extensions);

    if (!analysisFiles.length) {
      console.error(`No files to lint with the extensions: "${options.extensions.join('", "')}".`);
      console.error(
        'See our documentation at https://docs.codeclimate.com/docs/stylelint for more information.'
      );
      process.exit(0);
    }

    const userConfig = engineConfig.config || {};

    if (userConfig.ignore_warnings) {
      options.configOverrides['quiet'] = true;
    }

    if (userConfig.config) {
      options.configFile = userConfig.config;
    }

    engineTiming();
  } else {
    buildFileList = inclusionBasedFileListBuilder(['./']);
    analysisFiles = buildFileList(options.extensions);
  }
}

function analyzeFiles() {
  const lintTiming = runTiming('lint');

  stylelint
    .lint({
      configBasedir: CODE_PATH,
      configFile: options.configFile,
      configOverrides: options.configOverrides,
      files: analysisFiles
    })
    .then(data => {
      lintTiming();

      const analyzeTiming = runTiming('analyze');

      if (data.errored) {
        data.results.forEach(d => {
          if (d.errored) {
            d.warnings.forEach(w => {
              const issueJson = buildIssueJson(w, d.source);
              process.stdout.write(`${issueJson}\u0000`);
            });
          }
        });
      }

      analyzeTiming();
    })
    .catch(error => {
      if (error.message.includes('No configuration provided')) {
        console.error(
          'Error: No configuration provided. Make sure you have added a config file with rules enabled.'
        );
        console.error(
          'See our documentation at https://docs.codeclimate.com/docs/stylelint for more information.'
        );
      } else {
        console.error(`Error: ${error.message}`);
        console.error(
          'See our documentation at https://docs.codeclimate.com/docs/stylelint for more information.'
        );

        process.exit(1);
      }
    });
}

configEngine();
analyzeFiles();
