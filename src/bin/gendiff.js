#!/usr/bin/env node

import { program } from 'commander';

import genDiff from '../index.js';

program
  .command('gendiff <firstConfig> <secondConfig>')
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .action((firstConfig, secondConfig) => {
    console.log(genDiff(firstConfig, secondConfig));
  })
  .parse(process.argv);
