import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
//import FormSample from "./components/FormSample";
//import App from "./App";
//import Hoc2 from "./components/Hoc2";
//import ContextSample from "./components/ContextSample2";
//import Composition from "./components/Composition";

import store from "./store";
import ReduxTest from "./components/ReduxTest";
import { Provider } from "react-redux";

function render() {
    ReactDOM.render(
        <Provider store={store}>
            <ReduxTest />
        </Provider>,
        document.getElementById("root")
    );
}
render(); // 初始化渲染一次
// store提供一个订阅API,当状态发生变化就执行渲染函数，重新渲染
//store.subscribe(render);

//ReactDOM.render(<Composition />, document.getElementById("root"));
