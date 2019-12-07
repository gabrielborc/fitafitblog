import Hapi from '@hapi/hapi';
import Database from './Database';
import HapiAuthJWT from 'hapi-auth-jwt2';

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
        await this._strategy();
    }

    async _plugins () {
        await this._server.register([
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
            },
            HapiAuthJWT
        ]);
    }

    async _strategy() {
        await this._server.auth.strategy('jwt', 'jwt', {
            key: 'stubJWT',
            validate: async (decoded, request, h) => {
                return { isValid: true }
            }
        });        

        await this._server.auth.default('jwt');
    }

}

export default new Server();