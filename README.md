# Code Climate Stylelint Engine

[![Code Climate](https://codeclimate.com/github/gilbarbara/codeclimate-stylelint/badges/gpa.svg)](https://codeclimate.com/github/gilbarbara/codeclimate-stylelint)

`codeclimate-stylelint` is a [Code Climate](http://codeclimate.com/) engine that wraps [stylelint](https://github.com/stylelint/stylelint). You can run it on your command line using the Code Climate CLI, or on the hosted analysis platform.

Stylelint is a tool to help you enforce consistent conventions and avoid errors in your stylesheets.  It can be configured using a [configuration file](http://stylelint.io/user-guide/configuration/).

### Development

If you want to test the code for this engine locally, you'll need to install [docker](https://www.docker.com/).  

Build the docker image with docker `docker build -t codeclimate/codeclimate-stylelint .` (You must be inside the project directory to do this)

To run the tests, cd into `tests/` and run `sh setup.sh` 

### Installation

1. If you haven't already, [install the Code Climate CLI](https://github.com/codeclimate/codeclimate).
2. Run `codeclimate engines:enable stylelint`. This command both installs the engine and enables it in your `.codeclimate.yml` file.
3. Add a stylelint [config](https://github.com/stylelint/stylelint/blob/master/docs/user-guide/configuration.md#loading-the-configuration-object) file.
3. You're ready to analyze! Browse into your project's folder and run `codeclimate analyze`.

### Configuration Options

- `ignore_warnings`: true|false (default false) - skip warnings with styletint `quiet` flag
- `config`: Specify a relative path for the configuration file. (ex: config/.stylelintrc)

### Config
- [stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard/): The standard shareable config for stylelint
- [stylelint-config-wordpress](https://github.com/ntwb/stylelint-config-wordpress/): WordPress CSS Coding Standards shareable config for stylelint

### Plugins

This engine has support for the [recommended](https://github.com/stylelint/stylelint/blob/master/docs/user-guide/plugins.md) plugins:

- [stylelint-order](https://github.com/hudochenkov/stylelint-order): Order related linting rules.
- [stylelint-scss](https://github.com/kristerkari/stylelint-scss): SCSS specific linting rules.
- [stylelint-declaration-strict-value](https://github.com/AndyOGo/stylelint-declaration-strict-value): A stylelint plugin that enforces variables, functions or custom CSS keywords for property's values.
- [stylelint-declaration-use-variable](https://github.com/sh-waqar/stylelint-declaration-use-variable): Specify properties for which a SCSS variable must be used.
- [stylelint-selector-bem-pattern](https://github.com/davidtheclark/stylelint-selector-bem-pattern): Specify a BEM pattern for selectors.
- [stylelint-rscss](https://github.com/rstacruz/stylelint-rscss): Validate RSCSS conventions.
- [stylelint-selector-no-utility](https://github.com/primer/stylelint-selector-no-utility): A collection of SCSS specific linting rules for stylelint.
- [stylelint-csstree-validator](https://github.com/csstree/stylelint-validator): Validate CSS values to match W3C specs and browsers extensions.
- [stylelint-config-property-sort-order-smacss](https://github.com/cahamilton/stylelint-config-property-sort-order-smacss)Stylelint config for Property Sort Ordering based on the SMACSS methodology

If you need something else, please open an issue.

### Need help?

For help with stylelint, [check out their documentation](http://stylelint.io/).
