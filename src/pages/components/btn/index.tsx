import Taro from "@tarojs/taro";
import { View  } from "@tarojs/components";
import "./index.styl";
export default function Index({children='按钮',type='primary'}) {
  // const externalClasses = ['iconwushuju']
  return (
    <View className='btn primary-btn' >
        <View className='btn-text'>{children}</View>
    </View>
  )
}
