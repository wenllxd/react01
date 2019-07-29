import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger"; //注意：先注册的中间件先执行
import thunk from "redux-thunk";

// reducer:具体状态修改的具体执行者
// 加减reducer,只需要返回最新的值，不需要做修改的操作;state初始值为0
const counterReducer = (state = 0, action) => {
    switch (action.type) {
        case "add":
            return state + 1;
        case "minus":
            return state - 1;
        default:
            return state;
    }
};
// 创建一个store并导出
export default createStore(counterReducer, applyMiddleware(logger, thunk));
