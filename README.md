# Smarter Logger Node.JS library

[![Version](https://img.shields.io/npm/v/smarter-logger.svg)](https://www.npmjs.org/package/smarter-logger)
[![Downloads](https://img.shields.io/npm/dm/smarter-logger.svg)](https://www.npmjs.com/package/smarter-logger)

The Smarter Logger library provides way to run logger in smart way in your application to avoid extra load on server because of logging and finishesh logging task one by one. This add a chance of calling cloud logging when server is free from user's load.

## Documentation

## Requirements

Node 8, 10 or higher.

## Installation

Install the package with:

```sh
npm install smarter-logger --save
# or
yarn add smarter-logger
```

## Usage

<!-- prettier-ignore -->
```js
const SmarterLogger = require('smarter-logger');

const yourLoggerMethod = (...args) => {
    return new Promise((resolve, reject) => {
        console.log('My logging', ...args);
        resolve();
    });
};

const logger = SmarterLogger(yourAsyncLoggerMethod, {
    concurrency: 2, // 2 log execution at a time (default = 1)
    retryCount: 1, // 1 times it will retry (default = 0)
});

// in your application, where you want to log
logger.log(arg1, arg2);
```

Or using ES modules and `async`/`await`:

```js
import SmarterLogger from 'smater-logger';

const yourAsyncLoggerMethod = async (...args) => {
    console.log('My logging', ...args);
};

const logger = SmarterLogger(yourAsyncLoggerMethod, {
    concurrency: 2, // 2 log execution at a time (default = 1)
    retryCount: 1, // 1 times it will retry (default = 0)
});

// in your application, where you want to log
logger.log(arg1, arg2);
```

### Usage with TypeScript

Import SmarterLogger as a default import (not `* as SmarterLogger`, unlike the DefinitelyTyped version)
and call it as `SmarterLogger()` with the logger method and options.

```ts
import SmarterLogger from 'smater-logger';

const yourAsyncLoggerMethod = async (...args) => {
    console.log('My logging', ...args);
};

const logger = SmarterLogger(yourAsyncLoggerMethod, {
    concurrency: 2, // 2 log execution at a time (default = 1)
    retryCount: 1, // 1 times it will retry (default = 0)
});

// in your application, where you want to log
logger.log(arg1, arg2);
```

## Development

Run all tests:

```bash
$ yarn install
$ yarn test
```

Run prettier:

Add an [editor integration](https://prettier.io/docs/en/editors.html) or:

```bash
$ yarn lint
```
