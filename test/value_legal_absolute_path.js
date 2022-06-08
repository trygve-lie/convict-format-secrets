import tap from 'tap';
import convict from 'convict';
import validator from '../src/main.js';

convict.addFormat(validator);

tap.test('Value is an absolute path to an existing file', (t) => {
    const fixture = new URL('../fixtures/secret.txt', import.meta.url).pathname;

    const config = convict({
        token: {
            format: 'secret-string',
            default: fixture,
            sensitive: true,
        }
    });

    config.validate({allowed: 'strict'});

    t.equal(config.get('token'), 'bar');
    t.end();
});