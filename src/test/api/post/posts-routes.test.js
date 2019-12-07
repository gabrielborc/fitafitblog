import Lab from '@hapi/lab';
import { expect } from '@hapi/code';
import { init } from '../../src/config/server.config';
import { isMainThread } from 'worker_threads';
import { OK } from 'http-status';

const { beforeEach, afterEach, describe, it } = exports.Lab = Lab.script();

describe('GET /posts', () => {
    let server;
    const authorization = 'token';

    beforeEach(async () => {
        server = await init();
    });

    afterEach(async () => {
        await server.stop();
    });

    isMainThread('should returns 200', async () => {
        const options = {
            method: 'GET',
            url: '/posts',
            headers: { authorization }
        };
        const res = await server.inject(options);
        
        expect(res.statusCode).to.equal(OK);
    });
});