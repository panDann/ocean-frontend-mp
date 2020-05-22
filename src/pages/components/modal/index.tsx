import Taro from "@tarojs/taro";
import { View, Text } from "@tarojs/components";

import "./index.styl";
interface Prop {
  title?: string
  width?: string
  height?: string
  onCancel: Function
  onConfirm: Function
  
  visible: boolean
}
interface State {
  show: boolean
}
export default class Modal extends Taro.Component<Prop, State>{

  constructor() {
    super()
    // this.state = {
    //   show:true
    // }
  }
  static options = {
    addGlobalClass: true
  }

  // static externalClasses  = ['iconwushuju', 'bottom-line','fixed-mask','iconguanbi','absolute-center']
  // componentWillUpdate(){
  //   const {show} = this.state
  //   // this.setState({show:true})
  // }
  stopBubble(e) {
    e.stopPropagation() // 阻止事件冒泡
  }
  render() {
    const { title = '标题', width = '', height = '',onConfirm, children, visible, onCancel } = this.props

    return (visible) && (
      <View className='fixed-mask' onClick={this.stopBubble} onTouchMove={this.stopBubble}>
        <View className='modal-container absolute-center tran-scale' style={width && { width, height }}>
          <View className='modal-title label bottom-line '>{title}</View>
          {children}
          <Text className='iconfont modal-close iconguanbi' onClick={onCancel.bind(this)} />
          <View className='modal-bottom absolute active width100' onClick={onConfirm.bind(this)}>确定</View>
        </View>
      </View>
    )
  }
}
