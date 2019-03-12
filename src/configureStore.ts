import { applyMiddleware, createStore } from "redux";

import { createLogger } from "redux-logger";
import rootReducer from "./reducers";

/* Initialize logger */
const loggerMiddleware = createLogger();

function createStoreWithMiddleware() {
    const fun = applyMiddleware(loggerMiddleware)(createStore);
    return fun(rootReducer, {});
}

export default createStoreWithMiddleware;
