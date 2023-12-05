// const dotenv = require('dotenv');
// const bunyan = require('bunyan');
// const cloudinary = require('cloudinary');

// dotenv.config({});

// class Config {
//   constructor() {
//     this.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017/chattyapp-backend';
//     this.JWT_TOKEN = process.env.JWT_TOKEN || '1234';
//     this.NODE_ENV = process.env.NODE_ENV || '';
//     this.SECRET_KEY_ONE = process.env.SECRET_KEY_ONE || '';
//     this.SECRET_KEY_TWO = process.env.SECRET_KEY_TWO || '';
//     this.CLIENT_URL = process.env.CLIENT_URL || '';
//     this.REDIS_HOST = process.env.REDIS_HOST || '';
//     this.CLOUD_NAME = process.env.CLOUD_NAME || '';
//     this.CLOUD_API_KEY = process.env.CLOUD_API_KEY || '';
//     this.CLOUD_API_SECRET = process.env.CLOUD_API_SECRET || '';
//     this.SENDER_EMAIL = process.env.SENDER_EMAIL || '';
//     this.SENDER_EMAIL_PASSWORD = process.env.SENDER_EMAIL_PASSWORD || '';
//     this.SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || '';
//     this.SENDGRID_SENDER = process.env.SENDGRID_SENDER || '';
//     this.EC2_URL = process.env.EC2_URL || '';
//     this.PORT = process.env.PORT || '';
//   }

//   createLogger(name) {
//     return bunyan.createLogger({ name, level: 'debug' });
//   }

//   validateConfig() {
//     for (const [key, value] of Object.entries(this)) {
//       if (value === undefined) {
//         throw new Error(`Configuration ${key} is undefined.`);
//       }
//     }
//   }

//   cloudinaryConfig() {
//     cloudinary.v2.config({
//       cloud_name: 'dzqpacupf',
//       api_key: '372698151483913',
//       api_secret: 'jOQuZp4KIMI_4PhXlG5Z-QNSqVE',
//       secure: true
//     });
//   }
// }

// const config = new Config();

// module.exports = { config };
