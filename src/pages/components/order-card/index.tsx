import Taro from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import MButton from '@src/pages/components/btn'
import { ITouchEvent } from "@tarojs/components/types/common";
import "./index.styl";

export default function Index({ item: {
    name = '',
    status = '',
    img = '',
    price = 0,
    time = '', },
    operator
}) {

    return (
        <View className='card' onClick={onProxy}>
            <View className='flex-row justify-between bottom-line'>
                <Text className='order-name'>{name}</Text>
                {status ? <Text className='order-status order-status-success'>维修完成</Text> : <Text className='order-status order-status-repairing'>正在维修</Text>}
            </View>
            <View className='flex-row padding1rem bottom-line justify-between'>
                <Image className='order-img' src={img} id={'clientImg' + img} />
                <Text className='order-price'><Text className='order-unit'>￥</Text>{price}</Text>
            </View>
            <View className='flex-row bottom justify-between'>
                <Text className='order-time'>{time}</Text>
                {!status && <MButton type='flat' onClick={operator}>催单</MButton>}
            </View>
        </View>
    )
}
function onProxy({ target: { id } }: ITouchEvent) {

    if (id.includes('Img')) {
        const [invalid, current] = id.split('Img')
        Taro.previewImage({ current, urls: [current] })
    }
    return

}