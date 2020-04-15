#!/usr/bin/env node
"use strict";

var _commander = require("commander");

var _index = _interopRequireDefault(require("../index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander.program.command('gendiff <firstConfig> <secondConfig>').version('0.0.1').description('Compares two configuration files and shows a difference.').option('-f, --format [type]', 'output format').action((firstConfig, secondConfig) => {
  console.log((0, _index.default)(firstConfig, secondConfig));
}).parse(process.argv);
/* program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .parse(process.argv);

if (!program.args.length) program.help(); */
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9iaW4vZ2VuZGlmZi5qcyJdLCJuYW1lcyI6WyJwcm9ncmFtIiwiY29tbWFuZCIsInZlcnNpb24iLCJkZXNjcmlwdGlvbiIsIm9wdGlvbiIsImFjdGlvbiIsImZpcnN0Q29uZmlnIiwic2Vjb25kQ29uZmlnIiwiY29uc29sZSIsImxvZyIsInBhcnNlIiwicHJvY2VzcyIsImFyZ3YiXSwibWFwcGluZ3MiOiJBQUFBOzs7QUFFQTs7QUFFQTs7OztBQUVBQSxtQkFDR0MsT0FESCxDQUNXLHNDQURYLEVBRUdDLE9BRkgsQ0FFVyxPQUZYLEVBR0dDLFdBSEgsQ0FHZSwwREFIZixFQUlHQyxNQUpILENBSVUscUJBSlYsRUFJaUMsZUFKakMsRUFLR0MsTUFMSCxDQUtVLENBQUNDLFdBQUQsRUFBY0MsWUFBZCxLQUErQjtBQUNyQ0MsRUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksb0JBQVFILFdBQVIsRUFBcUJDLFlBQXJCLENBQVo7QUFDRCxDQVBILEVBUUdHLEtBUkgsQ0FRU0MsT0FBTyxDQUFDQyxJQVJqQjtBQVVBIiwic291cmNlc0NvbnRlbnQiOlsiIyEvdXNyL2Jpbi9lbnYgbm9kZVxuXG5pbXBvcnQgeyBwcm9ncmFtIH0gZnJvbSAnY29tbWFuZGVyJztcblxuaW1wb3J0IGdlbkRpZmYgZnJvbSAnLi4vaW5kZXguanMnO1xuXG5wcm9ncmFtXG4gIC5jb21tYW5kKCdnZW5kaWZmIDxmaXJzdENvbmZpZz4gPHNlY29uZENvbmZpZz4nKVxuICAudmVyc2lvbignMC4wLjEnKVxuICAuZGVzY3JpcHRpb24oJ0NvbXBhcmVzIHR3byBjb25maWd1cmF0aW9uIGZpbGVzIGFuZCBzaG93cyBhIGRpZmZlcmVuY2UuJylcbiAgLm9wdGlvbignLWYsIC0tZm9ybWF0IFt0eXBlXScsICdvdXRwdXQgZm9ybWF0JylcbiAgLmFjdGlvbigoZmlyc3RDb25maWcsIHNlY29uZENvbmZpZykgPT4ge1xuICAgIGNvbnNvbGUubG9nKGdlbkRpZmYoZmlyc3RDb25maWcsIHNlY29uZENvbmZpZykpO1xuICB9KVxuICAucGFyc2UocHJvY2Vzcy5hcmd2KTtcblxuLyogcHJvZ3JhbVxuICAudmVyc2lvbignMC4wLjEnKVxuICAuZGVzY3JpcHRpb24oJ0NvbXBhcmVzIHR3byBjb25maWd1cmF0aW9uIGZpbGVzIGFuZCBzaG93cyBhIGRpZmZlcmVuY2UuJylcbiAgLm9wdGlvbignLWYsIC0tZm9ybWF0IFt0eXBlXScsICdvdXRwdXQgZm9ybWF0JylcbiAgLnBhcnNlKHByb2Nlc3MuYXJndik7XG5cbmlmICghcHJvZ3JhbS5hcmdzLmxlbmd0aCkgcHJvZ3JhbS5oZWxwKCk7ICovXG4iXX0=