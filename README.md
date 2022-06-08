# convict-format-secrets

[Convict](https://github.com/mozilla/node-convict/tree/master/packages/convict) format for loading secrets as a string value from the config or as a value from a file on an absolute path.

## Installation

```bash
$ npm install convict-format-secrets
```

## Example

```js
import convict from 'convict';
import secrets from 'convict-format-secrets';

// Add format to convict
convict.addFormat(secrets);

// Define a config schema with the custom format
const config = convict({
    token: {
        format: 'secret-string',
        default: '/var/run/secrets/docker/db_auth_token',
        sensitive: true,
    }
});

// Validate the schema
config.validate({allowed: 'strict'});

// Use the token
const db = new DB({
    token: config.get('token'),
});
```

## Description

Multiple systems for storing secrets and providing ex containers with secrets in a production environment do so by mounting the secret as a file on the file system inside the container. Applications then using these secrets will then have to read these secrets from the mounted file. 

This [Convict](https://github.com/mozilla/node-convict/tree/master/packages/convict) format extend Convict to be able to have one config property which can either hold a secret as a string value or read a secret from a file on the file system. This eases handling application secrets through configuration where the configuration can hold the secret as a string value in local development but refere to a file containing the secret in production.

If we create a config schema using as follow:

```js
convict.addFormat(secrets);

const config = convict({
    token: {
        format: 'secret-string',
        default: 'UNSET',
        sensitive: true,
    }
});
```

In our config for local development we can then set a plain string value for our local database as follow:

```json
{
    "token": "p9err8ucrpmjfmqc4umpoj"
}
```

In our config for producton we can then set an absolute path to where our secrets are mounted on disk as follow:

```json
{
    "token": "/var/run/secrets/docker/db_auth_token"
}
```

In our application we can then safelly do as follow without thinking about if we are in local development or production:

```js
const db = new DB({
    token: config.get('token'),
});
```

In local development `config.get('token')` will return the string value set in the configuration for local development while in production `config.get('token')` will return the content of the file refered to in the production config.

### File path requirement

When providing a path to a secret, the path must be absolute. Relative paths is not supported and all values starting with `./` or `../` will throw.

## License

The MIT License (MIT)

Copyright (c) 2022 - Trygve Lie - post@trygve-lie.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
