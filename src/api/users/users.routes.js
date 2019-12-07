import UsersController from './users.controllers';
import * as Schemas from './users.schemas';

export default [
    {
        method: 'GET',
        path: '/users',
        handler: UsersController.list
    },
    {
        method: 'GET',
        path: '/users/{id}',
        handler: UsersController.findById
    },
    {
        method: 'POST',
        path: '/users',
        handler: UsersController.create,
        config: {
            validate: Schemas.create
        }
    },
    {
        method: 'POST',
        path: '/users/login',
        handler: UsersController.login,
        config: {
            auth: false,
            validate: Schemas.create
        }
    }
];