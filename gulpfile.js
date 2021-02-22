const { series, dest } = require("gulp");
const fs = require('fs');
const del = require('del');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const wind_btn = require('./plugins/button');

const SRC_PATH = './src';
const DEST_PATH = './dest';

function clean(cb) {
  if (fs.existsSync(DEST_PATH)) {
    del.sync([DEST_PATH]);
  }
  cb();
}

function create(cb) {
  if (!fs.existsSync(DEST_PATH)) {
    fs.mkdirSync(DEST_PATH);
  }
  cb();
}

function copy(cb) {
  var files = fs.readdirSync(SRC_PATH);
  files.forEach(file => {
    if (file.indexOf('css') !== -1) {
      var cssData = fs.readFileSync(SRC_PATH + '/' + file);
      postcss([autoprefixer, wind_btn]).process(cssData, { from: SRC_PATH + '/' + file, to: DEST_PATH + '/' + 'wind-ui.css' }).then(result => {
        fs.appendFile('dest/wind-ui.css', result.css + '\n\n', () => true);
        if (result.map) {
          fs.writeFile('dest/app.css.map', result.map.toString(), () => true)
        }
      });
    }
  });
  cb();
}

exports.default = series(clean, create, copy);