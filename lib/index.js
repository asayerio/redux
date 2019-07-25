import { event } from '@asayerio/js';
import { diff } from 'deep-diff';

function createMiddleware(opts = {}) {
  const options = Object.assign(
    {
      actionFilter: () => true,
      actionTransformer: action => action,
      stateTransformer: state => state,
    },
    opts,
  );

  let state;
  return ({ getState }) => next => action => {
    if (options.actionFilter(action)) {
      return next(action);
    }
    const data = {
      action: options.actionTransformer(action),
      start_time: performance.now(),
    };
    const result = next(action);
    data.end_time = performance.now();
    const newState = options.stateTransformer(getState());
    if (state === undefined) {
      data.state = newState;
    } else {
      data.diff = diff(state, newState);
    }
    state = newState;
    event('__asayer_redux', data);
    return result;
  };
}

export default createMiddleware;
