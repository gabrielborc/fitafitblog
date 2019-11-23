import { instances } from 'hapi-sequelizejs';

const Post = instances.getModel('Post');

class PostsDao {
    
    findAll() {
        return Post.findAll(); 
    }

    findById(id) {
        return Post.findByPk(id);
    }

    create(post) {
        return Post.create(post);
    }

    async update(id, post) {
        await Post.update(post, { where: { id }});
        return Post.findByPk(id);
    }

    delete(id) {
        return Post.destroy({ where: { id }});
    }

}

export default new PostsDao();