import Taro from "@tarojs/taro";
import { View  } from "@tarojs/components";
import "./index.styl";

export default function Index({children='按钮',type='primary', circle=false,onClick=()=>{},id=''}) {
  // const externalClasses = ['iconwushuju']
  return (
    <View className={['btn ', type+'-btn',circle&&'circle-btn'].join(' ')} id={id} onClick={onClick} >
        {children}
    </View>
  )
}
