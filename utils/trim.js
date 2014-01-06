module.exports = function(input_str, unit) {
  return parseInt(input_str.split(unit)[0], 10);
};