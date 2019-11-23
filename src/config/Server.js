import Hapi from '@hapi/hapi';
import Database from './Database';

class Server {
    constructor() {
        this._server = Hapi.server({
            port: 3000,
            host: 'localhost'
        });
    }

    async start () {
        await this._server.start();
        await this._plugins();
    }

    async _plugins () {
        this._server.register([
            {
                plugin: require('hapi-sequelizejs'),
                options: [
                    {
                        name: process.env.DB_NAME,
                        models: [
                            './src/api/**/**.models.js',
                        ],
                        sequelize: await Database.getConn(),
                        sync: true
                    }
                ]
            },
            {
                plugin: require('hapi-router'),
                options: {
                    routes:  'src/api/**/**.routes.js'
                }
            }
        ]);
    }

}

export default new Server();