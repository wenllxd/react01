// 用户登录状态等 rxreducer快捷键
const initialState = {
    isLogin: false
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case "login":
            return { isLogin: true };
        case "logout":
            return { isLogin: false };
        default:
            return state;
    }
};

// 导出一个异步登录方法，return一个函数
// for redux-thunk的写法
// export function login() {
//     return dispatch => {
//         setTimeout(() => {
//             dispatch({ type: "login" });
//         }, 1000);
//     };
// }
