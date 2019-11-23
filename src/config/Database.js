import { Sequelize } from 'sequelize';
import {} from 'dotenv/config';

class Database  {
    constructor() {
        this._sequelize = null;
        this._dbName = process.env.DB_NAME;
        this._dbUser = process.env.DB_USER;
        this._dbPass = process.env.DB_PASS;
        this._dbHost = process.env.DB_HOST;
    }

    async _conn() {
        this._sequelize = new Sequelize(this._dbName, this._dbUser, this._dbPass, {
            dialect: 'mysql'
        });
        
        return this._sequelize;
    }

    async getConn() {
        return await this._conn();
    } 
}

export default new Database();


