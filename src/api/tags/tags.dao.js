import { instances } from 'hapi-sequelizejs';
import PostsDAO from '../posts/posts.dao';

const Tag = instances.getModel('Tag');

class TagsDao {

    findAll(idPost) {
        return Tag.findAll({where: {postId: idPost}});
    }

    findById(idPost, idTag) {
        return Tag.findOne({where: {postId: idPost, id: idTag}});
    }

    async create(idPost, tag) {
        const post = await PostsDAO.findById(idPost);
        
        if (! post) {
            return null;
        }

        const tagNew = await Tag.create(tag);
        await tagNew.setPost(post);

        return tagNew;
    }

    async update(idPost, idTag, tag) {
        const post = await PostsDAO.findById(idPost);
        
        if (! post) {
            return null;
        }       

        await Tag.update(tag, { where: {postId: idPost, id: idTag}});
        let tagUpdate = await Tag.findByPk(idTag);
        
        if (! tagUpdate) {
            return null;
        }

        await tagUpdate.setPost(post);

        return tagUpdate;
    }

    async delete(idPost, idTag) {
        return await Tag.destroy({ where: {postId: idPost, id: idTag}});
    }

}

export default new TagsDao();
