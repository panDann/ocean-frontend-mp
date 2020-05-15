import Taro, { Component, Config } from "@tarojs/taro";
import { View, Map, CoverView } from "@tarojs/components";
import PageConfig from '@config/page.json'

import "./index.styl";


interface State {
  markers: any
  id: string
  // MapContext: any
  longitude: 114.32229
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
        longitude: 114.32229,
        latitude: 30.509498
      }],
      longitude: 114.32229,
      latitude: 30.509498
    };
  }




  componentDidMount() {
  }



  config: Config = {
    navigationBarTitleText: "个人中心"
  };

  async goToDestinatio() {
    const {latitude,
      longitude, } = this.state
    // const MapContext = Taro.createMapContext(id, this)
    // const res = await Taro.getLocation({})
    // console.log(locationRes);
    Taro.openLocation({//​使用微信内置地图查看位置。
      latitude,
      longitude,
      name: "南湖海洋通讯",
      address:'南湖海洋通讯'
    })
    //  MapContext.moveToLocation({
    //   latitude,longitude
    //  })
  }
  render() {

    const { markers, id } = this.state
    return (

      <Map markers={markers} id={id} longitude={114.32229} latitude={30.509498} className='location-map'>
        <CoverView className='location-tip-btn' onClick={this.goToDestinatio}>
          去这里
        </CoverView>
      </Map>
    );
  }
}
