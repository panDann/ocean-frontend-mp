import Taro, { Component, Config } from "@tarojs/taro";
import { View,OpenData } from "@tarojs/components";
import MButton from '@src/pages/components/btn'

import "./index.styl";


interface State {
  current1: number;
  listData: [{ id: string }];
  origin: string;
  destination: string;
  searchOrigin: string;
  searchDestination: string;
}

export default class Index extends Component<any, State> {
  constructor() {
    super();
    this.state = {
      current1: 0,
      listData: [{ id: "" }],
      origin: "",
      destination: "",
      searchOrigin: "",
      searchDestination: ""
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
    const tabList = [
      { title: "航运拼箱" },
      { title: "航运整箱" },
      { title: "拖车" }
    ];

    return (
      <View className="">
        <View className='userinfo-con flex-row justify-center'>
          <View className='header'>
          <OpenData  type='userAvatarUrl' />

          </View>
          <OpenData className='nickname' type='userNickName' />
        </View>
        <View className='fixed width100 bottom2rem'>
          <MButton>登录</MButton>
        </View>
      </View>
    );
  }
}
