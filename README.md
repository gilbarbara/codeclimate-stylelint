# Code Climate Stylelint Engine

[![Maintainability](https://api.codeclimate.com/v1/badges/ada032d755e8ee1de505/maintainability)](https://codeclimate.com/github/gilbarbara/codeclimate-stylelint/maintainability)

A [Code Climate](http://codeclimate.com/) engine that wraps [stylelint](https://github.com/stylelint/stylelint).  
You can run it on your local environment using the Code Climate CLI, or on the hosted analysis platform.

Stylelint is a tool to help you enforce consistent conventions and avoid errors in your stylesheets.  
It can be configured using a [configuration file](http://stylelint.io/user-guide/configuration/).

### Installation

1. If you haven't already, [install the Code Climate CLI](https://github.com/codeclimate/codeclimate).
2. Run `codeclimate engines:enable stylelint`. This command both installs the engine and enables it in your `.codeclimate.yml` file.
3. Add a stylelint [config](https://github.com/stylelint/stylelint/blob/master/docs/user-guide/configuration.md#loading-the-configuration-object) file.
3. You're ready to analyze! Browse into your project's folder and run `codeclimate analyze`.

### Configuration Options

- `ignore_warnings`: true|false (default false) - skip warnings with styletint `quiet` flag
- `config`: Specify a relative path for the configuration file. (ex: config/.stylelintrc)

### Configs

- [stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard/): The standard shareable config
- [stylelint-config-sass-guidelines](https://github.com/bjankord/stylelint-config-sass-guidelines): A stylelint config based on https://sass-guidelin.es/
- [stylelint-config-suitcss](https://github.com/suitcss/stylelint-config-suitcss): SUIT CSS config
- [stylelint-config-css-modules](https://github.com/pascalduez/stylelint-config-css-modules): CSS modules shareable config
- [stylelint-config-wordpress](https://github.com/ntwb/stylelint-config-wordpress/): WordPress CSS Coding Standards shareable config
- [stylelint-rscss](https://github.com/rstacruz/stylelint-rscss): Validate RSCSS conventions.
- [stylelint-config-recommended](https://github.com/stylelint/stylelint-config-recommended): The recommended shareable config
- [stylelint-config-styled-components](https://github.com/styled-components/stylelint-config-styled-components): The shareable stylelint config for stylelint-processor-styled-components

### Plugins

This engine has support for the [recommended](https://github.com/stylelint/stylelint/blob/master/docs/user-guide/plugins.md) plugins:

- [stylelint-order](https://github.com/hudochenkov/stylelint-order): Order related linting rules.
- [stylelint-scss](https://github.com/kristerkari/stylelint-scss): SCSS specific linting rules.
- [stylelint-declaration-strict-value](https://github.com/AndyOGo/stylelint-declaration-strict-value): Enforces variables, functions or custom CSS keywords for property's values.
- [stylelint-declaration-use-variable](https://github.com/sh-waqar/stylelint-declaration-use-variable): Specify properties for which a SCSS variable must be used.
- [stylelint-selector-bem-pattern](https://github.com/davidtheclark/stylelint-selector-bem-pattern): Specify a BEM pattern for selectors.
- [stylelint-csstree-validator](https://github.com/csstree/stylelint-validator): Validate CSS values to match W3C specs and browsers extensions.

If you need something else, please open an issue.

### Processors

This engine has support for some of the [recommended](https://github.com/stylelint/stylelint/blob/master/docs/user-guide/processors.md) processors:

- [stylelint-processor-html](https://github.com/ccbikai/stylelint-processor-html): Lint within HTML `<style>` tags. ***DEPRECATED***
- [stylelint-processor-arbitrary-tags](https://github.com/mapbox/stylelint-processor-arbitrary-tags): A stylelint processor that allows you to lint CSS within arbitrary tags
- [stylelint-processor-styled-components](https://github.com/styled-components/stylelint-processor-styled-components): Lint styles written for styled components

## Development

If you want to run the code locally, you'll need to install [docker](https://www.docker.com/) and build the image.  
Navigate to the project in your terminal and run:

```bash
docker build -t codeclimate/codeclimate-stylelint .
```

### Tests

run `npm test` or `./run-tests.sh` after building the image.

If you need something else, please open an issue.

## Need help?

For help with stylelint, [check out their documentation](http://stylelint.io/).
