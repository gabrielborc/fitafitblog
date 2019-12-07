import { instances } from 'hapi-sequelizejs';
import Boom from '@hapi/boom';
import Bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken'

class UsersDao {
    constructor() {
        this.model = instances.getModel('User');
    }

    findAll(id) {
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

    async authenticate({ email, password }) {
        const user = await this.model.findOne({ where: { email } });
        const isAuthenticated = await Bcrypt.compare(password, user.password);

        if (!isAuthenticated) {
            throw Boom.notFound();
        }

        const token = JWT.sign({
            id: user.id,
            email
        }, 'stubJWT', {expiresIn: '24h'});

        return { user, token };
    } 

}

export default new UsersDao();