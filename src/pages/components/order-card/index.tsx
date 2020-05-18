import Taro from "@tarojs/taro";
import { View,Text,Image  } from "@tarojs/components";
import "./index.styl";
import MButton from '@src/pages/components/btn'

export default function Index({item:{
    name='',
    status='',
    img='',
    price=0,
    time='',},
    operator
}) {
  
  return (
    <View className='card' >
        <View className='flex-row justify-between bottom-line'>
            <Text className='order-name'>{name}</Text>
            {status? <Text className='order-status order-status-success'>维修完成</Text>:<Text className='order-status order-status-repairing'>正在维修</Text>}
        </View>
        <View className='flex-row padding1rem bottom-line justify-between'>
            <Image className='order-img' src={img} />
            <Text className='order-price'><Text className='order-unit'>￥</Text>{price}</Text>
        </View>
        <View className='flex-row bottom justify-between'>
            <Text className='order-time'>{time}</Text>
           {!status && <MButton  type='flat' onClick={operator}>催单</MButton>}
        </View>
    </View>
  )
}
