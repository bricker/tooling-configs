#!/usr/bin/env node

import { promises as fs, constants as fsConstants } from 'node:fs';
import process from 'node:process';
import path from 'node:path';

const HELP_TEXT = `
Copy basic config templates with references to vendored tooling configs.
If '--link' is passed, a symlink directly to the configuration will be created. With this method no customization is possible.
Fails if a config with the same name exists in the current directory.

Usage: npx install-config [options] [ava|eslint|swiftformat|swiftlint]

Options:
  --force       : Override existing files.
  --link        : Create symlinks to the configuration files instead of using the bootstrap files.
                  By default, the bootstrap files are used. For SwiftFormat, '--no-link' causes the full configuration to be copied.
  --help        : This text.
`;

async function link(tool, source, dest, { root, force }) {
  const sourcePath = path.join(root, source);

  if (force) {
    await fs.symlink(sourcePath, `${dest}.tmp`);
    await fs.rename(`${dest}.tmp`, dest);
  } else {
    try {
      await fs.symlink(sourcePath, dest);
    } catch (e) {
      console.error(`Error linking ${dest} to ${sourcePath}. Pass the --force flag to overwrite an existing file.`);
      throw e;
    }
  }
  console.info(`Linked ${dest} to vendored ${tool} config.`);
}

async function copy(tool, source, dest, { root, force }) {
  const sourcePath = path.join(root, source);
  const flags = force ? undefined : fsConstants.COPYFILE_EXCL;
  try {
    await fs.copyFile(sourcePath, dest, flags);
  } catch (e) {
    console.error(`Error copying ${sourcePath} to ${dest}. Pass the --force flag to overwrite an existing file.`);
    throw e;
  }

  console.info(`Installed ${tool} config at ${dest}.`);
}

async function main(args = []) {
  if (args.length === 0 || args.some((a) => ['-h', '--help'].includes(a))) {
    console.info(HELP_TEXT);
    return;
  }

  const tool = args.pop();
  let root;
  let operation = copy;
  let force = false;

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    switch (arg) {
      case '--force':
        force = true;
        break;
      case '--link':
        operation = link;
        break;
      case '--root':
        // This option is for development of this package and not documented.
        i += 1;
        root = args[i];
        break;
      default:
        throw new Error(`Unexpected argument '${arg}'`);
    }
  }

  root = root || path.join('node_modules', '@bricker', 'tooling-configs');
  const options = { root, force };

  switch (tool) {
    case 'ava':
      await operation(tool, 'bootstrap/ava.config.js', 'ava.config.js', options);
      break;
    case 'eslint':
      await operation(tool, 'bootstrap/eslintrc.cjs', '.eslintrc.cjs', options);
      break;
    case 'swiftlint':
      await operation(tool, 'bootstrap/swiftlint.yml', '.swiftlint.yml', options);
      break;
    case 'swiftformat':
      await operation(tool, 'configs/swiftformat', '.swiftformat', options);
      break;
    default:
      console.error(`Unsupported tool '${tool}'.`);
      console.error("See 'npx install-config --help' for a list of supported tools.");
      throw new Error(`Unsupported tool ${tool}`);
  }
}

const [,, ...args] = process.argv;
main(args);
