/* eslint-disable no-console */
const CODE_DIR = '/code';
process.chdir(CODE_DIR);

// Redirect `console.log` so that we are the only ones
// writing to STDOUT
const stdout = console.log;
console.log = console.error;

const stylelint = require('stylelint');
const fs = require('fs');
const path = require('path');
const glob = require('glob');

const options = { extensions: ['.scss', '.sss', '.less'] };
let engineConfig;
let analysisFiles;
let debug = false;

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

  const issue = {
    type: 'issue',
    categories: ['Style'],
    check_name: checkName,
    description: message.text,
    location: {
      path: filepath.replace('/code/', ''),
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

  return JSON.stringify(issue);
}

function isFileWithMatchingExtension(file, extensions) {
  const stats = fs.lstatSync(file);
  const extension = `.${file.split('.').pop()}`;
  return (
    stats.isFile() && !stats.isSymbolicLink()
    && extensions.indexOf(extension) >= 0
  );
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
      if ((/\/$/).test(fileOrDirectory)) {
        // if it ends in a slash, expand and push
        const filesInThisDirectory = glob.sync(
          `${fileOrDirectory}/**/**`
        );
        prunePathsWithinSymlinks(filesInThisDirectory).forEach(file => {
          if (isFileWithMatchingExtension(file, extensions)) {
            filesAnalyzed.push(file);
          }
        });
      }
      else if (isFileWithMatchingExtension(fileOrDirectory, extensions)) {
        filesAnalyzed.push(fileOrDirectory);
      }
    });

    return filesAnalyzed;
  };
}

function configEngine() {
  const engineTiming = runTiming('engineConfig');
  let buildFileList;

  if (fs.existsSync('/config.json')) {
    engineConfig = JSON.parse(fs.readFileSync('/config.json'));

    if (engineConfig.include_paths) {
      buildFileList = inclusionBasedFileListBuilder(
        engineConfig.include_paths
      );
    }
    else {
      // No explicit includes, let's try with everything
      buildFileList = inclusionBasedFileListBuilder(['./']);
    }

    analysisFiles = buildFileList(options.extensions);

    const userConfig = engineConfig.config || {};

    if (userConfig.config) {
      options.configFile = `${CODE_DIR}/${userConfig.config}`;
    }

    if (userConfig.debug) {
      debug = true;
    }

    engineTiming();
  }
}

function analyzeFiles() {
  const lintTiming = runTiming('lint');

  stylelint.lint({
    configFile: options.configFile,
    files: analysisFiles,
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
    .catch(() => {
      console.error('Error: No configuration provided. Make sure you have added a config file with rules enabled.');
      console.error('See our documentation at https://docs.codeclimate.com/docs/stylelint for more information.');
      process.exit(1);
    });
}

configEngine();
analyzeFiles();
