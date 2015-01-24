
# json.js
# processes html forum posts into a json structure:

var d = +new Date()
function now(){ return (+new Date()) - d + 'ms' }
function log(s){ console.log(now(), s) }
function trim(s){ return s.replace(/^\s+/,"").replace(/\s+$/,"") }

var $ = require('jquery')
var fs = require('fs')

var list = []
var fn = 'data/posts.html'
var preamble = '<div class="post_block'

log("loading")
var html = fs.readFileSync(fn).toString()
log(html.length + " bytes")

log("splitting")
var posts = html.split(preamble);
log(posts.length + " posts")

log("parsing")
posts.forEach(parse)

fs.writeFileSync("data/posts.json", JSON.stringify(list))

function parse(s,i) {
  if (!s.length) return;
  if (!(i % 25)) log(i)

  var rec = preamble+s.replace(/\s+/g,' ')
             .replace('onload="lzld(this)" onerror="lzld(this)"' )

  var post = $(rec)

  var body = post.find(".entry-content")

  var data = {}

  list.push(data);

  data.id = post.find("a[rel=bookmark]").data("entry-pid")
  data.author = trim( post.find(".author").text() )
  data.avatar = post.find(".ipsUserPhoto").attr("src")
  data.date = post.find(".published").attr("title")
  data.body = body.html()
  data.parents = []
  data.messages = []

  body.children(".ipsBlockquote").each(function(){
    var dat = $(this).data()
    var msg = {}
    msg.author = data.author
    msg.id = data.cid
    msg.time = data.time
    data.parents.push(msg)
  })

  body.children("p").not(".citation").each(function(){
    var html = $(this).html()
    data.messages.push(html)
  })
}

