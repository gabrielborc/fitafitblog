import TagsController from './tags.controller';

export default [
    {
        method: 'GET',
        path: '/posts/{idPost}/tags',
        handler: TagsController.list
    },
    {
        method: 'GET',
        path: '/posts/{idPost}/tags/{idTag}',
        handler: TagsController.findById
    },
    {
        method: 'POST',
        path: '/posts/{idPost}/tags',
        handler: TagsController.create
    },
    {
        method: 'PUT',
        path: '/posts/{idPost}/tags/{idTag}',
        handler: TagsController.update
    },
    {
        method: 'DELETE',
        path: '/posts/{idPost}/tags/{idTag}',
        handler: TagsController.delete
    },
]