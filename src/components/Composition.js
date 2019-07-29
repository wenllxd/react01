import React, { Component } from "react";
//import { Radio } from "antd";
// 组件复合

function Dialog(props) {
    // props.children：在Dialog里面嵌的内容将用这种方式复合进来
    return (
        <div style={{ border: "3px solid red", height: "100px" }}>
            {props.children}
        </div>
    );
}

//扩展函数
function WelcomeDialog() {
    return (
        <Dialog>
            <h1>Hello</h1>
            <p>欢迎使用</p>
        </Dialog>
    );
}

//扩展children
//定义一个api对象，里面有一个getUser的接口，模拟接口的假数据
const api = {
    getUser: () => ({ name: "lxd", age: 20 })
};
function Fetcher(props) {
    let user = api[props.name]();
    return props.children(user);
}

//操作children
function FilterP(props) {
    return (
        <div>
            {React.Children.map(props.children, child => {
                console.log(child); // child是虚拟DOM
                if (child.type != "p") {
                    return;
                }
                return child;
            })}
        </div>
    );
}

//修改children？
function RadioGroup(props) {
    return (
        <div>
            {React.Children.map(props.children, child => {
                return React.cloneElement(child, { name: props.name });
            })}
        </div>
    );
}

function Radio({ children, ...rest }) {
    //把props结构赋值
    return (
        <label>
            <input type="radio" {...rest} />
            {children}
        </label>
    );
}

export default class Composition extends Component {
    render() {
        return (
            <div>
                <WelcomeDialog />
                {/* children内容可以是任意表达式 */}
                <Fetcher name="getUser">
                    {({ name, age }) => (
                        <p>
                            {name}-{age}
                        </p>
                    )}
                </Fetcher>
                {/* 操作children */}
                <FilterP>
                    <h3>react</h3>
                    <p>react很好</p>
                    <h3>vue</h3>
                    <p>vue也很好</p>
                </FilterP>
                {/* 编辑children */}
                <RadioGroup name="mvvm" defaultValue={2}>
                    <Radio value={1}>vue</Radio>
                    <Radio value={2}>react</Radio>
                    <Radio value={3}>angular</Radio>
                </RadioGroup>
            </div>
        );
    }
}
