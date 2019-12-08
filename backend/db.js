var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/react_svelte', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log('we are connected to db!', db.name)
});

