import PostsController from './posts.controller';
import * as Schemas from './posts.schemas';

export default [
    {
        method: 'GET',
        path: '/posts',
        handler: PostsController.list
    },
    {
        method: 'GET',
        path: '/posts/{id}',
        handler: PostsController.findById,
        config: {
            validate: {
                params: Schemas.detail
            }
        }
    },
    {
        method: 'POST',
        path: '/posts',
        handler: PostsController.create,
        config: {
            validate: {
                payload: Schemas.payload
            }
        }
    },
    {
        method: 'PUT',
        path: '/posts/{id}',
        handler: PostsController.update,
        config: {
            validate: {
                params: Schemas.detail,
                payload: Schemas.payload
            }
        }
    },
    {
        method: 'DELETE',
        path: '/posts/{id}',
        handler: PostsController.delete,
        config: {
            validate: {
                params: Schemas.detail
            }
        }
    }
];