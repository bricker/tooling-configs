#!/usr/bin/env node

import { promises as fs } from 'node:fs';
import process from 'node:process';
import path from 'node:path';

const HELP_TEXT = `
Create symbolic links to vendored tooling configs
Usage: npx link-config [options] [ava|eslint|swiftformat|swiftlint]

Options:
  --copy  : Copy the config file(s) instead of creating a symbolic link.
  --help  : This text.
`;

const CONFIG_ROOT = path.resolve('node_modules', '@bricker', 'tooling-configs', 'configs');

async function link(target, dest) {
  const absPath = path.join(CONFIG_ROOT, target);
  await fs.symlink(absPath, dest);
  console.info(`Linked ${absPath} to ${dest}`);
}

async function main(tool) {
  switch (tool) {
    case '--help':
    case '-h':
    case undefined:
      console.info(HELP_TEXT);
      break;
    case 'ava':
      await link('ava.config.js', '.ava.config.js');
      break;
    case 'eslint':
      await link('eslintrc.cjs', '.eslintrc.cjs');
      break;
    case 'swiftlint':
      await link('swiftlint.yml', '.swiftlint.yml');
      break;
    case 'swiftformat':
      await link('swiftformat.cfg', '.swiftformat');
      break;
    default:
      console.error(`ERROR: Unsupported configuration ${tool}`);
  }
}

const [,, tool] = process.argv;
main(tool);
