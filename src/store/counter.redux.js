// reducer:具体状态修改的具体执行者
// 加减reducer,只需要返回最新的值，不需要做修改的操作;state初始值为0

export default (state = 0, action) => {
    switch (action.type) {
        case "add":
            return state + 1;
        case "minus":
            return state - 1;
        default:
            return state;
    }
};

// 动作
function add() {
    return { type: "add" };
}

function minus() {
    return { type: "minus" };
}

function asyncAdd() {
    return (dispatch, getState) => {
        console.log(getState()); // 可以访问当前状态值
        setTimeout(() => {
            dispatch({ type: "add" });
        }, 1000);
    };
}

function asyncMinus() {
    return dispatch => {
        setTimeout(() => {
            dispatch({ type: "minus" });
        }, 1000);
    };
}
//具名导出
export { add, minus, asyncAdd, asyncMinus };
