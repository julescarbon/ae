
var fs = require("fs")
var posts = require("./data/posts.json")

var counts = {};
var ae = posts.filter(function(p){ return p.author.indexOf("Ae") != -1 })   // filter by username

// counts number of posts by user
ae.reduce(function(pv,cv){ counts[cv.author]=(counts[cv.author]?counts[cv.author]+1:1) })

console.log(counts)

/*
var template = "<tr><th valign='top'>{author}</th><td>{body}</td></tr>"
var rows = []
ae.forEach(function(n){
  rows.push( template.replace("{author}",n.author).replace("{body}",n.body) )
})

fs.writeFileSync("data/ae.html", "<meta charset="UTF-8"><link rel=stylesheet href=ae.css><table>" + rows.join("") + "</table>")

*/
