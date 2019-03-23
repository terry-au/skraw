import { applyMiddleware, createStore } from "redux";

import { createLogger } from "redux-logger";
import rootReducer from "./reducers";

/* Initialize logger */
const loggerMiddleware = createLogger();

const initialState = {
    settings: {
        darkTheme: true,
    },
};

function createStoreWithMiddleware() {
    const fun = applyMiddleware(loggerMiddleware)(createStore);
    return fun(rootReducer, initialState);
}

export default createStoreWithMiddleware;
