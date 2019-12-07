import { CREATED, NO_CONTENT } from 'http-status';
import PostsDAO from './posts.dao';

class PostsController {

    async list(req, h) {
        return PostsDAO.findAll();
    }

    async findById(req, h) {
        const { id } = req.params;        
        return PostsDAO.findById(id);
    }

    async create(req, h) {
        let { payload } = req;
        const post = await PostsDAO.create(payload);

        return h.response(post).code(CREATED);
    }

    async update(req, h) {
        const { params: { id }, payload } = req;
        const post = await PostsDAO.update(id, payload);
       
        return h.response(post);
    }

    async delete(req, h) {
        const { id } = req.params;
        await PostsDAO.delete(id);
        
        return h.response().code(NO_CONTENT);
    }

}

export default new PostsController();