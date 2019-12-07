import { CREATED, NO_CONTENT } from 'http-status';
import UsersDao from './users.dao';

class UsersController {
    async list(req, h) {
        return UsersDao.findAll();
    }

    async findById(req, h) {
        const { id } = req.params;
        return UsersDao.findById(id);
    }

    async create(req, h) {
        const { payload } = req;

        return UsersDao.create(payload);
    }

    async login(request, h) {
        const { payload } = request;
        return await UsersDao.authenticate(payload);
    }
}

export default new UsersController();