import { createStore, applyMiddleware, combineReducers } from "redux";
import logger from "redux-logger"; //注意：先注册的中间件先执行
import thunk from "redux-thunk";

//拆分reducer
import counter from "./counter.redux"; //们匿名导出

// 创建一个store并导出
export default createStore(
    // 用于reducer模块化，传入一个对象，访问state状态的时候要加上key--state.counter
    combineReducers({ counter }),
    applyMiddleware(logger, thunk)
);
