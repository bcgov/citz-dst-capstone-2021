const express = require('express');
const path = require('path');

const app = express();
const buildPath = path.join(__dirname, './build');
app.use(express.static(buildPath));
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, './build/index.html'), function (err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

const port = process.env.PORT || 3000;
app.listen(port, e => {
  if (e) {
    console.error(e);
  } else {
    console.log(`Listening on ${port}`);
  }
});
