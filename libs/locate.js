module.exports = function(file, handle, regex) {
  var search, matches;
  search = regex || new RegExp('(?:[\'\"](' + handle + '\/{2}[^\'\"]+))','g');
  matches = file.contents.toString().match(search);
  return matches || [];
};
