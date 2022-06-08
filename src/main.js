import path from 'node:path';
import fs from 'node:fs';

const validator = {
    name: 'secret-string',
    validate: (value) => {
        if (typeof value !== 'string') {
            throw new Error('Value must be a string');
        }

        if (value.startsWith('./') || value.startsWith('../')) {
            throw new Error(`Value looks like a relative path. Paths must be absolute`);
        }
    },
    coerce: (value) => {
        if (path.isAbsolute(value)) {
            try {
                const file = fs.readFileSync(value);
                return file.toString();
            } catch (error) {
                throw new Error(`Config could not load secret from path: ${value}`);
            }
        }
        return value;
    }
};

export default validator;