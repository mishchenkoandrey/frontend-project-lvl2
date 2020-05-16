import { program } from 'commander';

import { version, description } from '../package.json';

import genDiff from './index.js';

program
  .version(version)
  .description(description)
  .option('-f, --format [type]', 'output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    console.log(genDiff(firstConfig, secondConfig, program.format));
  });

export default () => program.parse(process.argv);
