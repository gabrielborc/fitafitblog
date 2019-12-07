import { instances } from 'hapi-sequelizejs';
import Boom from '@hapi/boom';
import Bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken'
import { getObjectOr404 } from '../utils/database.utils';
import Env from '../../config/environoment.config';

export function getToken({id, email}, options = {}) {
    return JWT.sign({id, email}, Env.JWT_SECRET, {expiresIn: Env.JWT_EXPIRES, ...options});
}

export async function authenticate ({ email, password }) {
    const model = await instances.getModel('User');
    const user = await getObjectOr404(model, { where: { email } });
    const isAuthenticated = await Bcrypt.compare(password, user.password);
    
    if (!isAuthenticated) {
        throw Boom.notFound();
    }

    return user;
}
