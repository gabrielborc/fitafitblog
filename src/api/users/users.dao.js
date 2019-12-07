import { instances } from 'hapi-sequelizejs';
import Boom from '@hapi/boom';

class UsersDao {
    constructor() {
        this.model = instances.getModel('User');
    }

    findAll() {
        return this.model.findAll({attributes: ['id', 'email']});
    }

    async findById(id) {
        const user = await this.model.findByPk(id);

        if (!user) {
            throw Boom.notFound();
        }

        return user;
    }

    async create(data) {
        return this.model.create(data);
    }
}

export default new UsersDao();