import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.scss";
import createStoreWithMiddleware from "./redux/configureStore";
import { selectSnippet } from "./redux/reducers/skraw";
import * as serviceWorker from "./serviceWorker";

const store = createStoreWithMiddleware();
store.dispatch(selectSnippet("Learn about actions"));

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
