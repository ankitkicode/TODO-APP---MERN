const mongoose= require('mongoose');

const connection = async (uri) => {
    try {
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log('Database connected');
    } catch (error) {
      console.error('Database connection error', error);
      process.exit(1);
    }
  };

module.exports = connection;