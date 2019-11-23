import { CREATED, NO_CONTENT } from 'http-status';
import TagsDao from  './tags.dao';

class TagsController {

    async list(req, h) {
        let { idPost } = req.params;
        return TagsDao.findAll(idPost);
    }

    async findById(req, h) {
        const { idPost, idTag } = req.params;

        return TagsDao.findById(idPost, idTag);
    }

    async create(req, h) {
        const { idPost } = req.params;
        const { payload } = req;

        return TagsDao.create(idPost, payload);
    }

    async update(req, h) {
        const { params: { idPost, idTag }, payload } = req;
        return TagsDao.update(idPost, idTag, payload);
    }

    async delete(req, h) {
        const { idPost, idTag } = req.params;
        await TagsDao.delete(idPost, idTag);

        return h.response().code(NO_CONTENT);
    }

}

export default new TagsController();