const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  // Create Dog schema
  const dogSchema = new mongoose.Schema({
    name: String,
  });

  // Add speak method to Dog schema
  dogSchema.methods.speak = function () {
    const greeting = this.name
      ? `Woof, call me ${this.name}`
      : `I have no name my brother`;
    console.log(greeting);
  };

  // Compile Dog schema with mongoose.model()
  const Dog = mongoose.model('Dog', dogSchema);

  // Create new dog, Rex
  const rex = new Dog({ name: 'Rex' });
  console.log(rex.name);
  rex.speak();

  // Create new dog, Bon Woofi
  const bonWoofi = new Dog({ name: 'Bon Woofi' });
  console.log(bonWoofi.name);
  bonWoofi.speak();

  // console.log('Connection successful');
});
