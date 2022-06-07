import tap from 'tap';
import convict from 'convict';
import validator from '../src/main.js';

convict.addFormat(validator);

tap.test('Non string value', (t) => {
    const fixture = new URL('../fixtures/no_such_file.txt', import.meta.url).pathname;

    t.throws(() => {
        const config = convict({
            token: {
                format: 'secret-string',
                default: fixture,
                sensitive: true,
            }
        });
    
        config.validate({allowed: 'strict'});
    }, /Config could not load secret from path/, 'Should throw');

    t.end();
});