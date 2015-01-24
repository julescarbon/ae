
# fetch.js URL
# downloads all the pages from a single watmm post

var $ = require('jquery')
var fs = require('fs')

var start = process.argv.length ? process.argv[0] : 'http://forum.watmm.com/topic/81109-aaa-ask-autechre-anything-sean-and-rob-on-watmm/'

function fetch(url, page){
  if (! url) return console.log('done!');
  page = page || 1;
  console.log('fetching ' + page + " " + url);
  $.get(url, {}, function(html){
    write(page, html);
    fetch($(html).find('link[rel=next]').attr('href'), page+1);
  })
}
function write(page, data) {
  console.log(data.length);
  fs.writeFile("data/html/ae" + page + ".html", data)
}
fetch(start);

