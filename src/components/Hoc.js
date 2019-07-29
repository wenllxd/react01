import React, { Component } from "react";
// 高阶组件基础写法
// 展示组件(被包装组件)
function ShowName(props) {
    return (
        <div>
            {props.name}-{props.desc}
        </div>
    );
}
// 高阶组件(实际是个函数,给一个组件，返回一个新的组件)
const WithName = Comp => {
    //1.有生命周期的写法
    //可以重写组件生命周期
    class NewComponent extends Component {
        componentDidMount() {
            console.log("do something");
        }
        render() {
            return <Comp {...this.props} title="111" name="React" />;
        }
    }

    return NewComponent;

    //2.没有生命周期的写法
    //这里return的是一个组件，是一个函数；...props保证以前的属性不丢失
    //return props => <Comp {...props} title="111" name="React" />;
};

const WithLog = Comp => {
    console.log(Comp.name + "渲染了");
    return props => <Comp {...props} />;
};

//export default WithName(ShowName);  //调用一个
//链式调用
export default WithLog(WithName(ShowName));
