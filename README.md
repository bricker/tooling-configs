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

### Bootstrap

If you don't yet have the tooling configs setup, or you want to start from scratch, you can install the bootstrap configuration files provided by this package.
The bootstrap configuration files only contain a reference to the respective full configuration file in this package. They are copied into the current directory with the appropriate name. From there, you can modify them however you wish, while still receiving updates of the vendored configuration when this package is updated.

To install a bootstrap configuration file:

```bash
# Bootstrap the eslint configuration
npx install-config eslint

# show help text
npx install-config --help
```

### Manual

The bootstrap configurations are intended to be installed onto a clean slate. If you have an existing configuration, or don't want to use the bootstrap configs for any reason, you can reference the configuration files using the tool's configuration syntax. For an example of how to do this for any of the supported tools, look at the files under the `bootstrap` directory in this package, or at the tool's documentation.

The default location of the vendored config files from the directory containing your package.json is:

```sh
./node_modules/@bricker/tooling-configs/configs/
```

The config files are not necessarily named with the tool's recommended file name. For example, the config file for `eslint` is called `eslintrc.cjs`, without a leading period.

### SwiftFormat

The SwiftFormat configuration format does not support references to other configuration files. There are a few approaches to use the shared SwiftFormat configuration. The best approach depends on your needs.

#### Symlink

Symlink your project's SwiftFormat configuration to the vendored configuration file using the following command:

```sh
npx install-config --link swiftformat
```

With this method:

1. Manual changes made to the configuration are not persisted.
2. Automatic updates to this configuration are enabled.

This solution is best if you don't expect to need custom SwiftFormat configuration for your project.

#### Copy

If you want to make and persist manual changes to the SwiftFormat configuration, you can copy the contents of the vendored configuration file into your project. This is the default behavior when installing the SwiftFormat config.

```sh
npx install-config swiftformat
```

With this method:

1. Manual changes made to the configuration are persisted.
2. Automatic updates to this configuration are disabled.

This solution is best if you expect to need custom SwiftFormat configuration for your project.
