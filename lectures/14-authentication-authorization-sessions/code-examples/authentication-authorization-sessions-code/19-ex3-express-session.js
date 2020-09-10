const express = require('express')
const session = require('express-session')
const app = express()

// Use the session middleware
app.use(session({ secret: 'some secret here', cookie:{maxAge: 7000}}))
 
app.get('/', function(req, res, next) {
  if (req.session.views) {
    req.session.views++
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>views: ' + req.session.views + '</p>')
    res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
    res.end()
  } else {
    req.session.views = 1
    res.end('welcome to the session demo. hit refresh!')
  }
})

app.listen(3000);
console.log("Server listening on port 3000.");