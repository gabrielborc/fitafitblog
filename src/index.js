require('dotenv').config();

require = require('esm')(module);
const Server = require('./config/server.config').default;
Server.start();