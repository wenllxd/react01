import React, { Component } from "react";
import { connect } from "react-redux"; //react-redux的高阶组件
import { add, minus, asyncAdd, asyncMinus } from "../store/counter.redux";
// 重构，拆分、合并多个reducer

// 以下是简便写法
@connect(
    state => ({ num: state.counter }), //状态映射,拆分之后访问state要加命名空间，key
    {
        add,
        minus,
        asyncAdd,
        asyncMinus
    }
)
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
