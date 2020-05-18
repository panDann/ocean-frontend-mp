import Taro, { Component, Config } from "@tarojs/taro";
import { View,Text } from "@tarojs/components";
import OrderCard from '@src/pages/components/order-card'
import NoData from "@src/pages/components/no-data";
import "./index.styl";
import NoDataPath from '@src/assets/images/no-data.png'

const phoneNumber = '13476828808'

interface State {
  current1: number;
  listData: any[];
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
      listData: [
        {
          name: 'test',
          status: 0,
          img: NoDataPath,
          price: 12,
          time: '2019-09-03 19:00',}
      ],
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
    const {listData} = this.state
    return (
      <View className="padding1rem">
        {
              listData.map(el => <OrderCard item={el} operator={this.handleClick} />)
        }
        {!listData.length&&<NoData tip='暂时没有您的订单' />}
        <View className='btn-con'>
         <View className='iconfont tran-scale float-btn icondkw_tianxie' />
          <View className='iconfont tran-scale float-btn iconphone' onClick={()=>Taro.makePhoneCall({phoneNumber})} />
        </View>
      </View>
    );
  }
}
