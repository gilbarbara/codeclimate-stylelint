# Code Climate Stylelint Engine

[![Maintainability](https://api.codeclimate.com/v1/badges/ada032d755e8ee1de505/maintainability)](https://codeclimate.com/github/gilbarbara/codeclimate-stylelint/maintainability)

A [Code Climate](http://codeclimate.com/) engine that wraps [stylelint](https://github.com/stylelint/stylelint).  
You can run it on your local environment using the Code Climate CLI, or on the hosted analysis platform.

Stylelint is a tool to help you enforce consistent conventions and avoid errors in your stylesheets.  
It can be configured using a [configuration file](http://stylelint.io/user-guide/configuration/).

### Installation

1. If you haven't already, [install the Code Climate CLI](https://github.com/codeclimate/codeclimate).
2. Run `codeclimate engines:install stylelint`. This command both installs the engine and enables it in your `.codeclimate.yml` file.
3. Add a stylelint [config](https://github.com/stylelint/stylelint/blob/master/docs/user-guide/configuration.md#loading-the-configuration-object) file.
3. You're ready to analyze! Browse into your project's folder and run `codeclimate analyze`.

### Configuration Options

- `ignore_warnings`: true|false (default false) - skip warnings with styletint `quiet` flag
- `config`: Specify a relative path for the configuration file. (ex: config/.stylelintrc)

### Configs

- [stylelint-config-concentric-order](https://github.com/chaucerbao/stylelint-config-concentric-order): Validates the order of CSS properties according to [Concentric CSS](http://rhodesmill.org/brandon/2011/concentric-css/).
- [stylelint-config-css-modules](https://github.com/pascalduez/stylelint-config-css-modules): CSS modules shareable config
- [stylelint-config-prettier](https://github.com/prettier/stylelint-config-prettier): Turns off all rules that are unnecessary or might conflict with prettier
- [stylelint-config-recommended](https://github.com/stylelint/stylelint-config-recommended): The recommended shareable config
- [stylelint-config-recommended-scss](https://github.com/kristerkari/stylelint-config-recommended-scss): The recommended shareable SCSS config
- [stylelint-config-sass-guidelines](https://github.com/bjankord/stylelint-config-sass-guidelines): A stylelint config based on https://sass-guidelin.es/
- [stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard/): The standard shareable config
- [stylelint-config-styled-components](https://github.com/styled-components/stylelint-config-styled-components): The shareable stylelint config for stylelint-processor-styled-components
- [stylelint-config-sugarss-recommended](https://github.com/kkoudev/stylelint-config-sugarss-recommended): The recommended shareable config of SugarSS for stylelint.
- [stylelint-config-suitcss](https://github.com/suitcss/stylelint-config-suitcss): SUIT CSS config
- [@wordpress/stylelint-config](https://github.com/WordPress/gutenberg/blob/trunk/packages/stylelint-config/README.md): WordPress CSS Coding Standards shareable config (current, supports CSS and SCSS)
- [stylelint-config-wordpress](https://github.com/ntwb/stylelint-config-wordpress/): WordPress CSS Coding Standards shareable config (deprecated)
- [stylelint-rscss](https://github.com/rstacruz/stylelint-rscss): Validate RSCSS conventions

### Processors

This engine has support for the [recommended](https://github.com/stylelint/stylelint/blob/master/docs/user-guide/processors.md) processors:

- [stylelint-processor-arbitrary-tags](https://github.com/mapbox/stylelint-processor-arbitrary-tags): A stylelint processor that allows you to lint CSS within arbitrary tags
- [stylelint-processor-html](https://github.com/ccbikai/stylelint-processor-html): Lint within HTML `<style>` tags. ***DEPRECATED

### Plugins

This engine has support for the [recommended](https://github.com/stylelint/stylelint/blob/master/docs/user-guide/plugins.md) plugins:

- [stylelint-8-point-grid](https://github.com/dcrtantuco/stylelint-8-point-grid): Validate CSS with 8-point grid guideline
- [stylelint-a11y](https://github.com/YozhikM/stylelint-a11y): Enforce a11y rules
- [stylelint-at-rule-no-children](https://github.com/adityavm/stylelint-at-rule-no-children): Disallow block declarations inside at rules
- [stylelint-color-format](https://github.com/filipekiss/stylelint-color-format): Convert HEX colors to either RGB or HSL
- [stylelint-csstree-validator](https://github.com/csstree/stylelint-validator): Validate CSS values to match W3C specs and browsers extensions
- [stylelint-declaration-block-no-ignored-properties](https://github.com/kristerkari/stylelint-declaration-block-no-ignored-properties): Disallow property values that are ignored due to another property value in the same rule
- [stylelint-declaration-strict-value](https://github.com/AndyOGo/stylelint-declaration-strict-value): Enforces variables, functions or custom CSS keywords for property's values
- [stylelint-declaration-use-variable](https://github.com/sh-waqar/stylelint-declaration-use-variable): Check the use of scss, less or custom css variable on declaration
- [stylelint-high-performance-animation](https://github.com/kristerkari/stylelint-high-performance-animation): Prevent the use of low performance animation and transition properties
- [stylelint-media-use-custom-media](https://github.com/csstools/stylelint-media-use-custom-media): Enforce usage of custom media queries in CSS
- [stylelint-no-indistinguishable-colors](https://github.com/ierhyna/stylelint-no-indistinguishable-colors): Disallows colors that are suspiciously close to being identical, using [css-colorguard](https://github.com/SlexAxton/css-colorguard)
- [stylelint-no-unsupported-browser-features](https://github.com/ismay/stylelint-no-unsupported-browser-features): Disallow features that are unsupported by the browsers that you are targeting
- [stylelint-order](https://github.com/hudochenkov/stylelint-order): Order related linting rules
- [stylelint-prettier](https://github.com/prettier/stylelint-prettier): Runs Prettier as a Stylelint rule
- [stylelint-scss](https://github.com/kristerkari/stylelint-scss): SCSS specific linting rules
- [stylelint-selector-bem-pattern](https://github.com/davidtheclark/stylelint-selector-bem-pattern): Specify a BEM pattern for selectors
- [stylelint-selector-tag-no-without-class](https://github.com/Moxio/stylelint-selector-tag-no-without-class): Disallow certain tags without a class qualifier in selectors
- [stylelint-use-logical](https://github.com/csstools/stylelint-use-logical): Enforce usage of logical properties and values in CSS
- [stylelint-use-nesting](https://github.com/csstools/stylelint-use-nesting): Enforce nesting when it is possible in CSS
- [stylelint-value-no-unknown-custom-properties](https://github.com/csstools/stylelint-value-no-unknown-custom-properties): Disallow usage of unknown custom properties
- [stylelint-z-index-value-constraint](https://github.com/kristerkari/stylelint-z-index-value-constraint): Set minimum and maximum constraint value for z-index.

If you need something else, please open an issue.

## Development

To run the code locally, you'll need to install codeclimate's [CLI](https://github.com/codeclimate/codeclimate) and [docker](https://www.docker.com/).  
Navigate to the package directory in your terminal and run:

```bash
npm run build
npm test
```

### Adding packages

Install the desired packages as dependencies and test it.

#### To add tests for a plugin
If it is a plugin, add it to the `.stylelint` config in the `test/stylelint-plugins` directory and make sure it trigger some issues. Update the `snapshot` file with the new issue count. 

#### To add tests for a config or processor
- Add a new directory inside the `tests` directory with the name of the package.
- Add sample code to the new folder which you know will trigger an error, along with a snapshot file containing the number of issues that the sample code should trigger, a codeclimate.yml file, and .stylelintrc configuration that uses the new config or processor.
- Run `npm run build` to rebuild the docker image. This allows Codeclimate to run with your new package.
- Run `npm test`, and ensure all tests pass successfully, including your new test.

Before commiting your changes run the tests!

Something else, please open an issue.

## Need help?

For help with stylelint, [check out their documentation](http://stylelint.io/).
