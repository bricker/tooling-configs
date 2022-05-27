# tooling-configs

My preferred configurations for various development tools.

## Installation

The configurations can be included in your project as an NPM package:

```json
  "devDependencies": {
    "@bricker/tooling-configs": "github:bricker/tooling-configs"
  }
```

## Usage

### Symbolic Link

The easiest way to use a provided configuration is to create a symbolic link to the configuration files in this package. An NPM script is provided to do this for you:

```bash
# link to eslint configuration
npx link-config eslint

# show help text
npx link-config
```

This operation creates an appropriately-named link to the config file inside of the package. For example:

```
$ npx link-config eslint
$ ls .eslintrc.js
.eslintrc.js -> node_modules/@bricker/tooling-configs/configs/eslintrc.js
```

### Configuration refinement

Most tools allow you to "extend" another configuration file. You can use this pattern to refine the configurations provided by this package. You can even use this pattern if you don't need any refinements as a more declarative approach to including the configurating in your project.

eslint example:

```js
// .eslintrc.js
module.exports = {
  extends: [
    'node_modules/@bricker/tooling-configs/configs/eslintrc.js',
  ],
  rules: [
    'no-console': 1,
  ],
};
```

This approach may not work with all tools, and the syntax is different for each tool.
