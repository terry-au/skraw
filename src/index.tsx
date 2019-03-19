import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { setSnippets } from "./actions";
import App from "./App";
import { patchMonaco } from "./auxiliary/skrawLanguageTokenExtension";
import createStoreWithMiddleware from "./configureStore";
import DummyData from "./DummyData";
import "./index.scss";
import * as serviceWorker from "./serviceWorker";
import MonacoThemes from "./utils/MonacoThemes";

const store = createStoreWithMiddleware();

patchMonaco();
MonacoThemes.registerThemes();

/* Mock store data. */
{
    const tempSnippets = [];
    for (let index = 0; index < 20; index++) {
        const rnd = Math.floor(Math.random() * 2);
        const ob = rnd === 0 ? DummyData.js() : DummyData.cpp();
        tempSnippets.push(ob);
    }
    store.dispatch(setSnippets(tempSnippets));
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
