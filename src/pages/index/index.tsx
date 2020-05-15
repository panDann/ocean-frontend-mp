import Taro, { Component, Config } from "@tarojs/taro";
import { AtTabs, AtTabsPane, AtMessage } from "taro-ui";
import { View } from "@tarojs/components";
import NoData from "@src/pages/components/no-data";
// import PageConfig from '@config/page.json'
import "./index.styl";

const phoneNumber = '13476828808'

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
    navigationBarTitleText: "首页",
  };

  handleClick(current1) {
 
  }

  render() {
    return (
      <View className="">
        <NoData tip='暂时没有您的订单' />
        <View className='btn-con'>
         <View className='iconfont float-btn icondkw_tianxie' />
          <View className='iconfont float-btn iconchat01' onClick={()=>Taro.makePhoneCall({phoneNumber})} />
        </View>
      </View>
    );
  }
}
