const express = require('express');

const app = express();
app.use(express.static('./build'));

const port = process.env.PORT || 3000;
app.listen(port, e => {
  if (e) {
    console.error(e);
  } else {
    console.log(`Listening on ${port}`);
  }
});