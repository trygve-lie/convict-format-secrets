import tap from 'tap';
import convict from 'convict';
import validator from '../src/main.js';

convict.addFormat(validator);

tap.test('Value is a ../ relative path', (t) => {
    const config = convict({
        token: {
            format: 'secret-string',
            default: '../fixture/secret.txt',
            sensitive: true,
        }
    });

    t.throws(() => {
        config.validate({allowed: 'strict'});    
    }, /Value looks like a relative path. Paths must be absolute/, 'Should throw');

    t.end();
});