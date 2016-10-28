/*eslint-disable no-console, no-var */
var CODE_DIR = '/code';
process.chdir(CODE_DIR);

// Redirect `console.log` so that we are the only ones
// writing to STDOUT
var stdout = console.log;
console.log = console.error;

var stylelint = require('stylelint');
var fs = require('fs');
var path = require('path');
var glob = require('glob');

var STYLELINT_CONFIG_FILE = path.join(CODE_DIR, '.stylelintrc');
var options = { extensions: ['.scss', '.sss', '.less'] };
var analysisFiles;
var debug = false;

function buildIssueJson(message, path) {
  var checkName = message.rule;
  var line = message.line || 1;
  var column = message.column || 1;

  var issue = {
    type: 'issue',
    categories: ['Style'],
    check_name: checkName,
    description: message.text,
    location: {
      path: path.replace('/code/', ''),
      positions: {
        begin: {
          line: line,
          column: column
        },
        end: {
          line: line,
          column: column
        }
      }
    }
  };

  return JSON.stringify(issue);
}

function isFileWithMatchingExtension(file, extensions) {
  var stats = fs.lstatSync(file);
  var extension = '.' + file.split('.').pop();
  return (
    stats.isFile() && !stats.isSymbolicLink()
    && extensions.indexOf(extension) >= 0
  );
}

function prunePathsWithinSymlinks(paths) {
  // Extracts symlinked paths and filters them out, including any child paths
  var symlinks = paths.filter(function(path) {
    return fs.lstatSync(path).isSymbolicLink();
  });

  return paths.filter(function(path) {
    var withinSymlink = false;
    symlinks.forEach(function(symlink) {
      if (path.indexOf(symlink) === 0) {
        withinSymlink = true;
      }
    });
    return !withinSymlink;
  });
}

function inclusionBasedFileListBuilder(includePaths) {
  // Uses glob to expand the files and directories in includePaths, filtering
  // down to match the list of desired extensions.
  return function(extensions) {
    var analysisFiles = [];

    includePaths.forEach(function(fileOrDirectory) {
      if ((/\/$/).test(fileOrDirectory)) {
        // if it ends in a slash, expand and push
        var filesInThisDirectory = glob.sync(
          fileOrDirectory + '/**/**'
        );
        prunePathsWithinSymlinks(filesInThisDirectory).forEach(function(file) {
          if (isFileWithMatchingExtension(file, extensions)) {
            analysisFiles.push(file);
          }
        });
      }
      else {
        if (isFileWithMatchingExtension(fileOrDirectory, extensions)) {
          analysisFiles.push(fileOrDirectory);
        }
      }
    });

    return analysisFiles;
  };
}

function engineConfig() {
  var buildFileList;

  if (fs.existsSync('/config.json')) {
    var engineConfig = JSON.parse(fs.readFileSync('/config.json'));

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

    var userConfig = engineConfig.config || {};

    if (userConfig.config) {
      options.configFile = CODE_DIR + '/' + userConfig.config;
    }

    if (userConfig.debug) {
      debug = true;
    }

    if (debug) {
      process.stderr.write('engineConfig', engineConfig);
    }
  }
}

function analyzeFiles() {
  stylelint.lint({
    configFile: options.configFile,
    files: analysisFiles
  })
    .then(function(data) {
      if (data.errored) {
        data.results.forEach(function(d) {
          if (d.errored) {
            d.warnings.forEach(function(w) {
              var issueJson = buildIssueJson(w, d.source);
              process.stdout.write(issueJson + "\u0000\n");
            });
          }
        });
      }
    })
    .catch(function(err) {
      // do things with err e.g.
      console.error(err.stack);
    });

  if (debug) {
    process.stderr.write('Analyzing: ' + analysisFiles + '\n');
  }
}

engineConfig();

if (fs.existsSync(STYLELINT_CONFIG_FILE)) {
  analyzeFiles();
}
else {
  console.error('No rules are configured. Make sure you have added a config file with rules enabled.');
  console.error('See our documentation at https://docs.codeclimate.com/docs/stylelint for more information.');
  process.exit(1);
}
