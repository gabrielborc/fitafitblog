import { instances } from 'hapi-sequelizejs';
import Boom from '@hapi/boom';

class PostsDao {
    constructor() {
        this.model = instances.getModel('Post');
    }
    
    findAll() {
        return this.model.findAll(); 
    }

    async findById(id) {
        const params = {
            include: [
                'tags'
            ]
        };

        let post = await this.model.findByPk(id, params);

        if (!post) {
            throw Boom.notFound();
        }

        return post;
    }

    create(post) {
        return this.model.create(post);
    }

    async update(id, data) {
        const post = await this.findById(id);
        return post.update(data);
    }

    async delete(id) {
        const post = await this.findById(id);
        return  post.destroy();
    }
}

export default new PostsDao();