import React, { Component } from "react";

// 组件通信--上下文组件context--用高阶组件来简化
// 1.创建上下文
const Context = React.createContext();

const store = {
    name: "lxd",
    sayHi() {
        console.log("Hello" + this.name);
    }
};
// 把Context.Provider这层封装拿出来
const withProvider = Comp => props => (
    <Context.Provider value={store}>
        <Comp {...props} />
    </Context.Provider>
);
const withComsumer = Comp => props => (
    <Context.Consumer>
        {/* 必须内嵌一个函数 */}
        {value => <Comp {...props} value={value} />}
    </Context.Consumer>
);
// 扩展Inner组件,使用数据
@withComsumer
class Inner extends Component {
    render() {
        return <div>{this.props.value.name}</div>;
    }
}
//扩展ContextSample组件，对它进行传值，注入数据
@withProvider
class ContextSample extends Component {
    render() {
        return (
            <div>
                <Inner />
            </div>
        );
    }
}
export default ContextSample;
