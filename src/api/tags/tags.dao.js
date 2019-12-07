import { instances } from 'hapi-sequelizejs';
import PostsDAO from '../posts/posts.dao';
import Boom from '@hapi/boom';

class TagsDao {
    constructor() {
        this.model = instances.getModel('Tag');
    }

    findAll(idPost) {
        return this.model.findAll({where: {postId: idPost}});
    }

    async findById(idPost, idTag) {
        const tag = await this.model.findOne({where: {postId: idPost, id: idTag}});
        
        if (!tag) {
            throw Boom.notFound();
        }

        return tag;
    }

    async create(idPost, tag) {
        const post = await PostsDAO.findById(idPost);
        const tagNew = await this.model.create(tag);

        await tagNew.setPost(post);

        return tagNew;
    }

    async update(idPost, idTag, data) {
        const post = await PostsDAO.findById(idPost);
        const tag = await this.findById(idPost, idTag);

        await tag.update(data);
        await tag.setPost(post);

        return tag;
    }

    async delete(idPost, idTag) {
        const tag = await this.findById(idPost, idTag);
        return tag.destroy();
    }
}

export default new TagsDao();
