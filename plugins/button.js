var postcss = require('postcss');

module.exports = postcss.plugin('wind_btn', function (opts = {}) {
  return function (css, result) {
    css.append({ selector: '.button' });
    css.nodes[css.nodes.length - 1].append({ prop: 'color', value: 'black' })
    console.log(css);
  }
});