import Hapi from '@hapi/hapi';
import Database from './database.config';
import HapiAuthJWT from 'hapi-auth-jwt2';
import Env from './environoment.config';

class Server {
    constructor() {
        this._server = Hapi.server({
            port: Env.PORT,
            host: 'localhost'
        });
    }

    async start () {
        await this._server.start();
        await this._plugins();
        await this._strategy();
        console.log('Server runnig on 3000');

        process.on('unhandledRejection', (err) => {
            console.log(err);
            process.exit(1);
        });
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
            key: Env.JWT_SECRET,
            validate: async (decoded, request, h) => {
                return { isValid: true, credentials: decoded }
            }
        });        

        await this._server.auth.default('jwt');
    }

}

export default new Server();