import { event } from '@asayerio/js';
import { diff } from 'deep-diff';

function createMiddleware(opts = {}) {
  const options = Object.assign(
    {
      stateTransformer: state => state,
      actionTransformer: action => action,
    },
    opts,
  );

  let init = true;
  return ({ getState }) => next => action => {
    const data = {
      action: options.actionTransformer(action),
      start_time: performance.now(),
    };
    const state = options.stateTransformer(getState());
    if (init) {
      event('__asayer_redux', { state });
      init = false;
    }
    const result = next(action);
    data.end_time = performance.now();
    data.diff = diff(state, options.stateTransformer(getState()));
    event('__asayer_redux', data);
    return result;
  };
}

export default createMiddleware;
