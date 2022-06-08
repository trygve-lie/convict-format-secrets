import tap from 'tap';
import convict from 'convict';
import validator from '../src/main.js';

convict.addFormat(validator);

tap.test('Value is not a String value', (t) => {
    const config = convict({
        token: {
            format: 'secret-string',
            default: 2,
            sensitive: true,
        }
    });

    t.throws(() => {
        config.validate({allowed: 'strict'});    
    }, /Value must be a string/, 'Should throw');

    t.end();
});