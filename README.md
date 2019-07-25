# Asayer Redux
A Redux middleware for Asayer.
This middleware allowed you to see your application state during session replay.

## Installation
```bash
npm i @asayerio/redux --save
```

## Usage
Initialize the `@asayerio/js` package and then put the middleware into your Redux chain

```js
import { applyMiddleware, createStore } from 'redux';
import createMiddleware from '@asayerio/redux';

const store = createStore(
  reducer,
  applyMiddleware(createMiddleware()),
);
```

You can customize the middleware behaviour with options to sanitize your data.

```js
createMiddleware({
  actionFilter: action => action.type !== 'DRAW', // only actions which pass this test will be recorded
  actionTransformer: action => action.type === 'LOGIN' ? { type: 'LOGIN' } : action,
  stateTransformer: state => {
    const { jwt, ..._state } = state;
    return _state;
  },
})
```
