import Taro, { Component, Config } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { AtButton, AtForm, AtInput, AtMessage } from "taro-ui";
import { loginOwner, loginDriver } from "@src/consts/localStorage-variables";
import { registrationPath, indexPath } from "@src/consts/paths";
import { login } from "@src/api/logins";
import "./index.styl";
import ImageTop from "@src/assets/images/login-bg.png";
import { gLoginType, setGlobalData } from "@src/utils/global-data";

interface State {
  loginName: string;
  loginPassword: string;
  unionId: string;
}

export default class Index extends Component<any, State> {
  constructor() {
    super();
    this.state = {
      loginName: "",
      loginPassword: "",
      unionId: Taro.getStorageSync(loginOwner).sessionId
    };
  }

  config: Config = {
    navigationBarTitleText: "登录"
  };

  componentWillMount() {
    let acceptValue = this.$router.params;
    //console.log(this.$router.params) // 输出 { id: 2, type: 'test' }
    this.setState({
      loginName: acceptValue.account,
      loginPassword: acceptValue.password
    });
  }

  handleNameChange(value) {
    this.setState({
      loginName: value
    });
    return value;
  }

  handlePwdChange(value) {
    this.setState({
      loginPassword: value
    });
    return value;
  }

  async submitLogin() {
    const {
      data: { code, data, message }
    } = await login({ ...this.state });
    if (data && code === "0") {
      Taro.removeStorageSync(loginDriver);
      Taro.setStorageSync(loginOwner, data);
      setGlobalData(gLoginType, "owner");
      Taro.switchTab({ url: indexPath });
    } else {
      Taro.atMessage({
        message: message,
        type: "error"
      });
    }
  }

  render() {
    return (
      <View>
        <Image src={ImageTop} className="login-top" />
        <AtMessage />
        <View className="bottom">
          <AtForm>
            <AtInput
              name="username"
              title="账号"
              type="text"
              placeholder="请输入（必填）"
              value={this.state.loginName}
              onChange={this.handleNameChange.bind(this)}
            />
            <AtInput
              name="password"
              title="密码"
              type="password"
              placeholder="请输入（必填）"
              value={this.state.loginPassword}
              onChange={this.handlePwdChange.bind(this)}
            />
          </AtForm>
          <AtButton
            formType="submit"
            className="margintb20"
            onClick={this.submitLogin.bind(this)}
            type="primary"
            circle
          >
            提交
          </AtButton>
          <View>
            <Text
              className="primary-color right"
              onClick={() => Taro.navigateTo({ url: registrationPath })}
            >
              注册>
            </Text>
          </View>
          <View className="customer">
            <Text className="at-icon at-icon-iphone"></Text>
            <Text className="customer-text">联系客服</Text>
          </View>
        </View>
      </View>
    );
  }
}
