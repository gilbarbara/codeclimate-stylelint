# Code Climate Stylelint Engine

[![Code Climate](https://codeclimate.com/github/gilbarbara/codeclimate-stylelint/badges/gpa.svg)](https://codeclimate.com/github/gilbarbara/codeclimate-stylelint)

`codeclimate-stylelint` is a Code Climate engine that wraps [stylelint](https://github.com/stylelint/stylelint). You can run it on your command line using the Code Climate CLI, or on our hosted analysis platform.

Stylelint is a tool to help you enforce consistent conventions and avoid errors in your stylesheets.  It can be configured using a [configuration file](http://stylelint.io/user-guide/configuration/).


### Installation

1. If you haven't already, [install the Code Climate CLI](https://github.com/codeclimate/codeclimate).
2. Run `codeclimate engines:enable stylelint`. This command both installs the engine and enables it in your `.codeclimate.yml` file.
3. Add a stylelint [config](https://github.com/stylelint/stylelint/blob/master/docs/user-guide/configuration.md#loading-the-configuration-object) file.
3. You're ready to analyze! Browse into your project's folder and run `codeclimate analyze`.

### Configuration Options

- `ignore_warnings`: true|false (default false) - skip warnings with styletint `quiet` flag
- `config`: Specify a relative path for the configuration file. (ex: config/.stylelintrc)

### Plugins/Config

The engine has support for [stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard/) and [stylelint-scss](https://github.com/kristerkari/stylelint-scss).  
If you need something else, please open an issue.

### Need help?

For help with stylelint, [check out their documentation](http://stylelint.io/).