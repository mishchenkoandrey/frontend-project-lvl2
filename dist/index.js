"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _formatter = _interopRequireDefault(require("./formatters/formatter.js"));

var _formatterPlain = _interopRequireDefault(require("./formatters/formatterPlain.js"));

var _formatterJSON = _interopRequireDefault(require("./formatters/formatterJSON.js"));

var _astBuilder = _interopRequireDefault(require("./ast-builder.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const genDiff = (pathToFile1, pathToFile2, format) => {
  switch (format) {
    case 'plain':
      return (0, _formatterPlain.default)((0, _astBuilder.default)(pathToFile1, pathToFile2));

    case 'json':
      return (0, _formatterJSON.default)((0, _astBuilder.default)(pathToFile1, pathToFile2));

    default:
      return (0, _formatter.default)((0, _astBuilder.default)(pathToFile1, pathToFile2));
  }
};

module.exports = genDiff;
var _default = genDiff;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJnZW5EaWZmIiwicGF0aFRvRmlsZTEiLCJwYXRoVG9GaWxlMiIsImZvcm1hdCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFFQTs7QUFFQTs7QUFFQTs7OztBQUVBLE1BQU1BLE9BQU8sR0FBRyxDQUFDQyxXQUFELEVBQWNDLFdBQWQsRUFBMkJDLE1BQTNCLEtBQXNDO0FBQ3BELFVBQVFBLE1BQVI7QUFDRSxTQUFLLE9BQUw7QUFDRSxhQUFPLDZCQUFlLHlCQUFPRixXQUFQLEVBQW9CQyxXQUFwQixDQUFmLENBQVA7O0FBQ0YsU0FBSyxNQUFMO0FBQ0UsYUFBTyw0QkFBYyx5QkFBT0QsV0FBUCxFQUFvQkMsV0FBcEIsQ0FBZCxDQUFQOztBQUNGO0FBQ0UsYUFBTyx3QkFBVSx5QkFBT0QsV0FBUCxFQUFvQkMsV0FBcEIsQ0FBVixDQUFQO0FBTko7QUFRRCxDQVREOztBQVdBRSxNQUFNLENBQUNDLE9BQVAsR0FBaUJMLE9BQWpCO2VBRWVBLE8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZm9ybWF0dGVyIGZyb20gJy4vZm9ybWF0dGVycy9mb3JtYXR0ZXIuanMnO1xuXG5pbXBvcnQgZm9ybWF0dGVyUGxhaW4gZnJvbSAnLi9mb3JtYXR0ZXJzL2Zvcm1hdHRlclBsYWluLmpzJztcblxuaW1wb3J0IGZvcm1hdHRlckpTT04gZnJvbSAnLi9mb3JtYXR0ZXJzL2Zvcm1hdHRlckpTT04uanMnO1xuXG5pbXBvcnQgZ2VuQVNUIGZyb20gJy4vYXN0LWJ1aWxkZXIuanMnO1xuXG5jb25zdCBnZW5EaWZmID0gKHBhdGhUb0ZpbGUxLCBwYXRoVG9GaWxlMiwgZm9ybWF0KSA9PiB7XG4gIHN3aXRjaCAoZm9ybWF0KSB7XG4gICAgY2FzZSAncGxhaW4nOlxuICAgICAgcmV0dXJuIGZvcm1hdHRlclBsYWluKGdlbkFTVChwYXRoVG9GaWxlMSwgcGF0aFRvRmlsZTIpKTtcbiAgICBjYXNlICdqc29uJzpcbiAgICAgIHJldHVybiBmb3JtYXR0ZXJKU09OKGdlbkFTVChwYXRoVG9GaWxlMSwgcGF0aFRvRmlsZTIpKTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGZvcm1hdHRlcihnZW5BU1QocGF0aFRvRmlsZTEsIHBhdGhUb0ZpbGUyKSk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZ2VuRGlmZjtcblxuZXhwb3J0IGRlZmF1bHQgZ2VuRGlmZjtcbiJdfQ==