import Taro, { Component, Config } from "@tarojs/taro";
import { View,OpenData,Text } from "@tarojs/components";
import MButton from '@src/pages/components/btn'

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
   
    };
  }


 

  componentDidMount() {
  }

 

  config: Config = {
    navigationBarTitleText: "个人中心"
  };

  handleClick(current1) {
 
  }

  render() {

    return (
      <View className="">
        <View className='userinfo-con flex-row justify-center'>
          <View className='header tran-scale'>
          <OpenData  type='userAvatarUrl' />
          </View>
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
          <MButton>登录</MButton>
        </View>
      </View>
    );
  }
}
