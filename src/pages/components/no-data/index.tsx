import Taro from "@tarojs/taro";
import { View,Image  } from "@tarojs/components";
import NoDataPath from '@src/assets/images/no-data.png'
import "./index.styl";
export default function Index({tip='暂无数据'}) {
  // const externalClasses = ['iconwushuju']
  return (
    <View className='container'>
        <Image className='img' src={NoDataPath} />
        {/* <View className='iconfont img iconwushuju' /> */}
        <View className='tip'>{tip}</View>
    </View>
  )
}
