const {
    NODE_ENV = 'development',
    DB_NAME,
    DB_USER,
    DB_PASS,
    DB_HOST,
    JWT_SECRET,
    JWT_EXPIRES,
    PORT = 3000
} = process.env;

export default {
    ENV: NODE_ENV,
    DB_NAME,
    DB_USER,
    DB_PASS,
    DB_HOST, 
    JWT_SECRET,
    JWT_EXPIRES,
    PORT
}
