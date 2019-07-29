import React, { Component } from "react";

// 组件通信--上下文组件context基础使用
// 1.创建上下文
const Context = React.createContext();

const store = {
    name: "lxd",
    sayHi() {
        console.log("Hello" + this.name);
    }
};

export default class ContextSample extends Component {
    render() {
        return (
            <Context.Provider value={store}>
                <div>
                    {/* 获取数据 */}
                    <Context.Consumer>
                        {/* 必须内嵌一个函数 */}
                        {value => (
                            <div onClick={() => value.sayHi()}>
                                {value.name}
                            </div>
                        )}
                    </Context.Consumer>
                </div>
            </Context.Provider>
        );
    }
}
