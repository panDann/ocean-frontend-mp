import Taro, { Component, Config } from "@tarojs/taro";
import { View,OpenData,Text, Button } from "@tarojs/components";
import MButton from '@src/pages/components/btn'
import {login} from '@src/api/logins'

import "./index.styl";


interface State {
  current1: number;
  listData: [{ id: string }];

}

const list = [
  {
    icon:'iconlishi warning-color',
    label:'历史订单',

  },
  {
    icon:'iconicon2 light-blue',
    label:'我的收获地址',
    
  },
  // {
  //   icon:'',
  //   label:'',
    
  // }

]
export default class Index extends Component<any, State> {
  constructor() {
    super();
    this.state = {
      current1: 0,
      listData: [{ id: "" }],
      isAuthUserInfo:false,
    };
  }


 

  componentDidMount() {
  }

  async componentWillMount() {
    const {authSetting} = await Taro.getSetting()
    if(!authSetting['scope.userInfo']){
    }
  }

  config: Config = {
    navigationBarTitleText: "个人中心"
  };

  async handleLogin({detail:{rawData, signature, encryptedData, iv,}}) {

    const {code} = await Taro.login()
    if(code) {
     const res  = await login({code,rawData, signature, encryptedData, iv,})
     return
    }

    Taro.showToast({title:'鉴权失败'})
    return 
  }

  render() {

    return (
      <View className="">
        <View className='userinfo-con flex-row justify-center'>
          <OpenData className='header tran-scale'  type='userAvatarUrl' />
          <OpenData className='nickname' type='userNickName' />
        </View>
        {
          list.map(el =><View className='mine-item bottom-line flex-row align-center active justify-between'>
          <View>
           <Text className={'iconfont icon '+el.icon}/>
           <Text className='mine-item-label'>{el.label}</Text>
          </View>
          <Text className='iconfont icon iconarrow-right'/>
        </View> )
        }
        <View className='fixed width100 bottom2rem'>
            <Button openType='getUserInfo' onGetUserInfo={this.handleLogin}  className='primary-btn btn active'>登录</Button>
        </View>
      </View>
    );
  }
}
