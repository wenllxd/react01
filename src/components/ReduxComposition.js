import React, { Component } from "react";

//import store from "../store";
import { connect } from "react-redux"; //react-redux的高阶组件

//创建一个被绑定的action创建函数，来自动dispatch;这两个函数：把想要的数据映射到当前的组件属性中来
//接收state，返回一个属性num

const mapStateToProps = state => ({ num: state });

//接收dispatch，返回具体执行函数
const mapDispatchToProps = dispatch => ({
    add: () => dispatch({ type: "add" }),
    minus: () => dispatch({ type: "minus" })
});

//等同于   以下是简便写法
@connect(
    state => ({ num: state }), //状态映射
    {
        add: () => ({ type: "add" }),
        minus: () => ({ type: "minus" }), // action返回的是对象
        asyncAdd: () => dispatch => {
            // action返回的是函数，则当做异步操作处理
            // 模拟一个异步操作
            setTimeout(() => {
                dispatch({ type: "add" });
            }, 1000);
        },
        asyncMinus: () => dispatch => {
            setTimeout(() => {
                dispatch({ type: "minus" });
            }, 1000);
        }
    }
)

// 先定义好的action方法
// @connect(
//     mapStateToProps,
//     mapDispatchToProps,
// )
class ReduxTest extends Component {
    render() {
        return (
            <div>
                <p>{this.props.num}</p>
                <div>
                    <button onClick={() => this.props.minus()}>-</button>
                    <button onClick={() => this.props.add()}>+</button>
                    {/*
                    <button
                        onClick={() =>
                            store.dispatch(dispatch => {
                                setTimeout(() => {
                                    dispatch({ type: "add" });
                                }, 1000);
                            })
                        }
                    >
                        asyncAdd
                    </button> 
                    */}
                    <button onClick={() => this.props.asyncAdd()}>
                        asyncAdd
                    </button>
                    <button onClick={() => this.props.asyncMinus()}>
                        asyncMinus
                    </button>
                </div>
            </div>
        );
    }
}
export default ReduxTest;
