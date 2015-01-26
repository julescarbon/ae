#!env node

# posts.js
# iterates over all of the pages we've scraped and filters the posts into a single file

var $ = require('jquery')
var fs = require('fs')
var dir = 'data/html/'
var d = +new Date()
var files = fs.readdirSync(dir);
var set = $('<div>')

files.map(function(fn){
  var ii = fn.match(/\d+/)
  return [ii ? parseInt(ii[0]) : NaN, fn];
}).sort(function(a,b){
  return a[0]-b[0]
}).filter(function(z){
  return !isNaN(z[0])
}).map(function(z){
  return z[1]
}).forEach(function(fn, i){
  var html = fs.readFileSync(dir + fn).toString()
  var posts = $(html).find(".post_block")
  log(set.children().length)
  set.append(posts);
})

function now(){ return (+new Date()) - d + 'ms' }
function log(s){ console.log(now(), s) }


fs.writeFileSync("data/posts.html", set.html())

