import tap from 'tap';
import convict from 'convict';
import validator from '../src/main.js';

convict.addFormat(validator);

tap.test('Value is a String value', (t) => {
    const config = convict({
        token: {
            format: 'secret-string',
            default: 'foo',
            sensitive: true,
        }
    });

    config.validate({allowed: 'strict'});

    t.equal(config.get('token'), 'foo');
    t.end();
});