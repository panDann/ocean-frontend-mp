import Taro, { Component, Config } from "@tarojs/taro";
import { Map, View } from "@tarojs/components";
// import { MButton } from "@src/pages/components/index";
import PageConfig from '@config/page.json'
import MButton from '@src/pages/components/btn'

import "./index.styl";


interface State {
  markers: any
  id: string
  // MapContext: any
  // longitude: 114.32229
  // latitude: 30.509498
}

const oceanCoordinates = {
  longitude: 114.32229,
  latitude: 30.509498
}
export default class Index extends Component<any, State> {
  constructor() {
    super();
    this.state = {
      id: 'map',
      markers: [{
        callout: {
          content: '海洋通信',
          color: PageConfig.primaryColor,
          fontSize: 14,
          anchorY: -40,
          borderRadius: 4,
          padding: 10,
          textAlign: 'center'
        },
        ...oceanCoordinates
      }],

    };
  }




  componentDidMount() {
  }



  config: Config = {
    navigationBarTitleText: "个人中心"
  };

  async goToDestinatio() {
    const { latitude,
      longitude, } = oceanCoordinates
    // const MapContext = Taro.createMapContext(id, this)
    // const res = await Taro.getLocation({})
    // console.log(locationRes);
    Taro.openLocation({//​使用微信内置地图查看位置。
      latitude,
      longitude,
      name: "南湖海洋通讯",
      address: '南湖海洋通讯'
    })
    //  MapContext.moveToLocation({
    //   latitude,longitude
    //  })
  }
  render() {

    const { markers, id, } = this.state
    const { latitude,
      longitude, } = oceanCoordinates
    return (

      <Map markers={markers} id={id} latitude={latitude} longitude={longitude} className='location-map'>
        <View className='location-tip-btn' onClick={this.goToDestinatio}>
          <MButton type='flat' circle>去这里</MButton>
        </View>
      </Map>
    );
  }
}
