import React, { Component } from "react";
import { BrowserRouter, Link, Route, Switch, Redirect } from "react-router-dom";
import store from "../store";
import { connect, Provider } from "react-redux";
import { login } from "../store/user.redux";

function App(props) {
    return (
        <div>
            {/* 导航链接 */}
            <ul>
                <li>
                    <Link to="/">home</Link>
                </li>
                <li>
                    <Link to="/about">about</Link>
                </li>
                <li>
                    <Link to="/foo">foo</Link>
                </li>
            </ul>
            {/* 路由配置: Switch只匹配一个 */}
            <Switch>
                <Route exact path="/" component={Home} />
                {/* <Route path="/about" component={About} /> */}
                <PrivateRoute path="/about" component={About} />
                <Route path="/detail/:course" component={Detail} />
                <Route path="/login" component={Login} />
                <Route component={NoMatch} />
            </Switch>
        </div>
    );
}

function Home({ location }) {
    console.log("接收参数：", location.state);
    return (
        <div>
            <ul>
                <li>
                    <Link to="/detail/web">web</Link>
                </li>
                <li>
                    <Link to="/detail/python">python</Link>
                </li>
                <li>
                    <Link to="/detail/java">java</Link>
                </li>
            </ul>
        </div>
    );
}

// props的参数 ：match-location-history
function Detail({ match, location, history }) {
    // match - 参数获取等路由信息
    // location - url定位，hash是“#”后面的内容，查询参在location的search中
    // history - 导航
    console.log("match:", match, "location:", location, "history:", history);
    return (
        <div>
            {/* 获取参数 */}
            {match.params.course}
            {/* 命令式导航：后退，返回上一页 */}
            <button onClick={() => history.goBack()}>后退</button>
            {/* 跳转到指定页面,可以传字符串或者对象 */}
            <button onClick={() => history.push("/")}>跳转页面</button>
            <button
                onClick={() =>
                    history.push({ pathname: "/", state: { foo: "bar" } })
                }
            >
                带参数的跳转
            </button>
        </div>
    );
}
// 路由嵌套
function About() {
    return (
        <div>
            <h2>用户中心</h2>
            <div>
                <Link to="/about/me">个人信息</Link>
                <Link to="/about/order">订单</Link>
            </div>
            <Switch>
                <Route path="/about/me" component={() => <div>我的信息</div>} />
                <Route
                    path="/about/order"
                    component={() => <div>订单信息</div>}
                />
                {/* 重定向，没匹配到就重定向 */}
                <Redirect to="/about/me" />
            </Switch>
        </div>
    );
}

// 404页面
function NoMatch(props) {
    return <div>404页面</div>;
}

// 路由守卫：定义可以验证的高阶组件
//映射状态
@connect(state => ({ isLogin: state.user.isLogin }))
class PrivateRoute extends Component {
    //console.log(Component);
    // render和component选项是二选一，render是可以根据条件来渲染的一个函数，根据条件决定最终渲染的结果
    // state - 把当前页面地址作为回调地址传过去
    render() {
        console.log("provide-isLogin:", this.props);
        const { isLogin, component: Component, ...rest } = this.props;
        return (
            <Route
                {...rest}
                render={props =>
                    this.props.isLogin ? (
                        <Component {...props} />
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: props.location.pathname }
                            }}
                        />
                    )
                }
            />
        );
    }
}

// 接口
const auth = {
    isLogin: false,
    login(cb) {
        this.isLogin = true;
        setTimeout(cb, 300);
    }
};

// 登录组件
@connect(
    state => ({ isLogin: state.user.isLogin }),
    { login }
)
class Login extends Component {
    render() {
        // 回调地址
        console.log("login-from", this.props.location.state.from);
        const from = this.props.location.state.from || "/";
        if (this.props.isLogin) {
            return <Redirect to={from} />;
        }
        return (
            <div>
                <p>请先登录</p>
                <button onClick={this.props.login}>登录</button>
            </div>
        );
    }
}

export default class RouteSample extends Component {
    render() {
        return (
            <BrowserRouter>
                <Provider store={store}>
                    <App />
                </Provider>
            </BrowserRouter>
        );
    }
}
