import UsersDao from './users.dao';
import { getToken, authenticate } from '../utils/auth';


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
        const user = await authenticate(payload);
        const token = getToken({ id: user.id, email: user.email });

        return { user, token };
    }
}

export default new UsersController();