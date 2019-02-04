import {
  createStore,
  applyMiddleware,
} from 'redux';

import { createLogger } from 'redux-logger';
import skraw from './reducers/skraw';
// import { skraw } from './reducers/skraw';

const loggerMiddleware = createLogger(); // initialize logger

function createStoreWithMiddleware() {
  const fun = applyMiddleware(loggerMiddleware)(createStore);
  return fun(skraw, {});
}

createStoreWithMiddleware();

// const reducer = combineReducers({
//   skraw
// });

// const store = createStoreWithMiddleware(skraw, {});

// const configureStore = (initialState: any) => {
//   const unsubscribe = store.subscribe(() => console.log(store.getState()))
  
//   unsubscribe();
// }

export default createStoreWithMiddleware;

// store.dispatch(selectSnippet('Learn about actions'))
