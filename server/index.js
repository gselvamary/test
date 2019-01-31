const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const path = require('path');

const passport = require("passport");

const app = express();

const users = require('./routes/user/info');
const depts = require('./routes/dept/info');
const questions = require('./routes/coordinator/question/info');
const admin = require('./routes/admin/info')


// DB Config
const db = require("./config/keys").mongoURI;
// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

//Routes
app.use('/users', users);
app.use('/depts', depts);
app.use('/coordinator', questions);


app.use('/admin', admin);

//Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));