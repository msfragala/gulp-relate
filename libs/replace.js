var Path = require('path');

module.exports = function(file, matches, handle, pathling) {

  var search = new RegExp(handle + '\\/{2}([^\'\"]+)','g');
  var destiny = Path.resolve(pathling);
  var contents = file.contents.toString();
  var asset, relative;

  matches.forEach(function(match) {
    asset = Path.parse(Path.join(destiny, search.exec(match)[1]));
    relative = Path.relative(file.dirname, destiny);
    relative = Path.join(relative, asset.base);
    contents = contents.replace(match, '\"' + relative + '\"');
    search.lastIndex = 0;
  });

  file.contents = Buffer(contents);

};
