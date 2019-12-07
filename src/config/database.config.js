import { Sequelize } from 'sequelize';
import Env from './environoment.config';

class Database  {
    constructor() {
        this._sequelize = null;
        this._dbName = Env.DB_NAME;
        this._dbUser = Env.DB_USER;
        this._dbPass = Env.DB_PASS;
        this._dbHost = Env.DB_HOST;
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


