import React, { Component } from "react";
import { Icon } from "antd";
// 自定义一个仿antd的表单组件,对高阶组件的实战

//创建一个高阶组件
const FormCreate = Comp => {
    return class extends Component {
        constructor(props) {
            super(props);
            this.options = {}; // 保存字段选项设置
            this.state = {}; //  各字段值
        }
        // 处理表单项输入事件
        handleChange = e => {
            const { name, value } = e.target;
            this.setState(
                {
                    [name]: value //计算属性，要加中括号
                },
                () => {
                    // 数值变化后再校验
                    this.validateField(name);
                }
            );
        };

        // 判断是否获得焦点
        handleFocus = e => {
            const field = e.target.name;
            // 设置是否获得焦点的状态
            this.setState({
                [field + "Focus"]: true
            });
        };

        // 判断组件是否被用户点过
        // this.state[field + "Focus"]初始值可能是undefined，加两个感叹号转换成布尔值
        isFieldTouched = field => !!this.state[field + "Focus"];

        // 获得指定字段的错误信息
        getFieldError = field => this.state[field + "Message"];

        // 表单项校验,单个字段的校验
        validateField = field => {
            const rules = this.options[field].rules;
            // 只要任何一项失败，校验就失败,返回值为true则失败
            const ret = rules.some(rule => {
                if (rule.required) {
                    //仅验证必填项
                    if (!this.state[field]) {
                        // 校验失败
                        this.setState({
                            [field + "Message"]: rule.message
                        });
                        return true; // 若有校验失败，返回true
                    }
                }
            });
            //console.log(ret);
            if (!ret) {
                this.setState({
                    // 没失败，校验成功
                    [field + "Message"]: ""
                });
            }
            //控制返回false，有值返回true
            return !ret;
        };

        // 所有表单项的校验
        validateForm = cb => {
            const rets = Object.keys(this.options).map(field =>
                this.validateField(field)
            );
            // 如果校验结果数组中全部为true，则校验成功
            const ret = rets.every(v => v === true);

            cb(ret);
        };

        getFieldDec = (field, option, Comp) => {
            this.options[field] = option;
            return (
                <div>
                    {React.cloneElement(Comp, {
                        name: field, // 控件name
                        value: this.state[field] || "", // 控件值
                        onChange: this.handleChange, // change事件处理
                        onFocus: this.handleFocus // 判断控件是否获得焦点
                    })}
                    {/* {this.state[field + "Message"] && (
                        <p style={{ color: "red" }}>
                            {this.state[field + "Message"]}
                        </p>
                    )} */}
                </div>
            );
        };

        render() {
            return (
                <Comp
                    {...this.props}
                    value={this.state}
                    getFieldDec={this.getFieldDec}
                    validateForm={this.validateForm}
                    isFieldTouched={this.isFieldTouched}
                    getFieldError={this.getFieldError}
                />
            );
        }
    };
};

// 表单项控件，包括校验，显示错误信息
class FormItem extends Component {
    render() {
        return (
            <div className="formItem">
                {this.props.children}
                {this.props.validateStatus === "error" && (
                    <p style={{ color: "red" }}>{this.props.help}</p>
                )}
            </div>
        );
    }
}

// 输入框控件
class InputItem extends Component {
    render() {
        return (
            <div>
                {/* 前缀图标 */}
                {this.props.prefix}
                <input {...this.props} />
            </div>
        );
    }
}

@FormCreate
class FormSample extends Component {
    onSubmit = () => {
        const { validateForm, value } = this.props;
        //console.log(value, validateForm);
        validateForm(isValid => {
            if (isValid) {
                alert("检验成功，提交登录");
            } else {
                alert("校验失败");
            }
        });
    };
    render() {
        const { getFieldDec, isFieldTouched, getFieldError } = this.props;
        const userNameError = isFieldTouched("uname") && getFieldError("uname");
        const passwordError = isFieldTouched("pwd") && getFieldError("pwd");
        return (
            <div>
                {/* 传递的参数：当前字段、配置的选项、要包装的组件 */}
                <FormItem
                    validateStatus={userNameError ? "error" : ""}
                    help={userNameError || ""}
                >
                    {getFieldDec(
                        "uname",
                        {
                            rules: [{ required: true, message: "请填写用户名" }]
                        },
                        <InputItem type="text" prefix={<Icon type="user" />} />
                    )}
                </FormItem>
                <FormItem
                    validateStatus={passwordError ? "error" : ""}
                    help={passwordError || ""}
                >
                    {getFieldDec(
                        "pwd",
                        {
                            rules: [{ required: true, message: "请填写密码" }]
                        },
                        <InputItem
                            type="password"
                            prefix={<Icon type="lock" />}
                        />
                    )}
                </FormItem>

                <button onClick={this.onSubmit}>登录</button>
            </div>
        );
    }
}
export default FormSample;
