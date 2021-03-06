import Taro, { Component, Config } from "@tarojs/taro";
import "./app.styl";
import "@src/styles/app.scss";
import "@src/assets/iconfont/iconfont.css";

import { View } from "@tarojs/components";
import* as Paths from "@src/consts/paths";


// import Paths from '@src/consts/paths'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }
class App extends Component {
  // componentDidMount () {}

  componentDidShow() {
    this.redirct(Paths.indexPath);
    // this.init()
  }

  redirct(url) {
    Taro.navigateTo({
      url
    });
  }

  // componentDidCatchError () {}
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    // pages: [
    //   ...Object.values(Paths)
    pages: [
      "pages/index/index", 
      "pages/mine/index", 
      "pages/location/index",
    ],
    window: {
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#14d1b5",
      navigationBarTitleText: "海洋",
      navigationBarTextStyle: "white"
    },

    tabBar: {
      color: "#979797",
      // custom: true,
      selectedColor: "#14d1b5", //颜色
      list: [
        {
          pagePath: "pages/index/index",
          text: "订单",
          iconPath: "assets/tab-icon/order.png",
          selectedIconPath: "assets/tab-icon/order_selected.png"
        },
        {
          pagePath: "pages/location/index",
          text: "实体店",
          iconPath: "assets/tab-icon/location.png",
          selectedIconPath: "assets/tab-icon/location_selected.png"
        },
        {
          pagePath: "pages/mine/index",
          text: "我的",
          iconPath: "assets/tab-icon/mine.png",
          selectedIconPath: "assets/tab-icon/mine_selected.png"
        },
      ]
    },
    permission: {
      "scope.userLocation": {
        desc: "你的位置信息将用于小程序位置接口的效果展示" // 高速公路行驶持续后台定位
      }
    }
  };

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return <View />;
  }
}

Taro.render(<App />, document.getElementById("app"));
