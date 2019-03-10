import { applyMiddleware, createStore } from "redux";

import { createLogger } from "redux-logger";
import skraw from "./reducers/skraw";

/* Initialize logger */
const loggerMiddleware = createLogger();

function createStoreWithMiddleware() {
    const fun = applyMiddleware(loggerMiddleware)(createStore);
    return fun(skraw, {});
}

createStoreWithMiddleware();

export default createStoreWithMiddleware;
