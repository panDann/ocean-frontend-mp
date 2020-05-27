import Taro, { Component, Config } from "@tarojs/taro";
import { View, OpenData, Text, Button } from "@tarojs/components";
import { login, logout } from '@src/api/logins'
import { userToken, userRole } from "@src/consts/localStorage-variables";

import "./index.styl";


interface State {
  current1: number;
  listData: [{ id: string }];
  hasLogined: boolean
  isShowLogout: boolean
}

const list = [
  {
    icon: 'iconlishi warning-color',
    label: '历史订单',

  },
  {
    icon: 'iconicon2 light-blue',
    label: '我的收获地址',

  },
]
export default class Index extends Component<any, State> {
  constructor() {
    super();
    this.state = {
      current1: 0,
      listData: [{ id: "" }],
      hasLogined: !!Taro.getStorageSync(userToken),
      isShowLogout: false
    };
  }

  config: Config = {
    navigationBarTitleText: "个人中心"
  };

  async handleLogin({ detail: { rawData, signature, encryptedData, iv, } }) {
    
    Taro.showLoading({title:'获取用户信息'})
    const { code } = await Taro.login()
    if (code) {
      const { data: { data: { token, role } } } = await login({ code, rawData, signature, encryptedData, iv, loadingContent: '登录中' })
      if (token) {
        Taro.setStorageSync(userToken, token)
        Taro.setStorageSync(userRole, role)
        this.setState({ hasLogined: true })
      }
      return
    }

    Taro.hideLoading()
    Taro.showToast({ title: '鉴权失败' })
    return
  }
  async logout() {
    // Taro.setStorageSync(userToken, '')
    // Taro.setStorageSync(userRole, '')
    // this.setState({ hasLogined: false })
    let res = await logout({})
    if (res) {
      Taro.setStorageSync(userToken, '')
      Taro.setStorageSync(userRole, '')
      this.setState({ hasLogined: false })
    }
  }

  render() {
    const { hasLogined, isShowLogout } = this.state
    return (
      <View className="">
        <View className='userinfo-con flex-row justify-center'>
          <OpenData className='header tran-scale' type='userAvatarUrl' />
          <OpenData className='nickname' type='userNickName' />
        </View>
        {
          hasLogined && list.map(el => <View className='mine-item bottom-line flex-row align-center active tran-scale justify-between'>
            <View>
              <Text className={'iconfont icon ' + el.icon} />
              <Text className='mine-item-label'>{el.label}</Text>
            </View>
            <Text className='iconfont icon iconarrow-right' />
          </View>)
        }
        <View className='fixed width100 bottom2rem'>
          {/* { hasLogined && <Button onClick={this.logout} className={['warning-btn  btn ',!isShowLogout&&'fold-btn'].join(' ')}>  */}
          {hasLogined? <Button onClick={this.logout} className='warning-btn  btn '>退出</Button>
            :<Button openType='getUserInfo' onGetUserInfo={this.handleLogin} className='primary-btn btn active'>登录</Button>}
        </View>
      </View>
    );
  }
}
