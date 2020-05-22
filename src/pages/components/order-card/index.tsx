import Taro from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import MButton from '@src/pages/components/btn'
import { ITouchEvent } from "@tarojs/components/types/common";
import "./index.styl";

const statusMap = new Map([
    ['waiting', { color: 'order-status-waiting', label: '待接单' }],
    ['repairing', { color: 'order-status-repairing', label: '正在维修' }],
    ['finished', { color: 'order-status-success', label: '维修完成' }],]
)


export default function Index({ item: {
    name = '',
    status = '',
    beforeImg = '',
    price = 0,
    createTime = '', },
    operator
}) {

    const statusTip = statusMap.get(status)
    console.log(beforeImg);
    
    return (
        <View className='card' onClick={onProxy}>
            <View className='flex-row justify-between bottom-line'>
                <Text className='order-name'>{name}</Text>
                <Text className={`order-status ${statusTip.color}`}>{statusTip.label}</Text>
            </View>
            <View className='flex-row padding1rem bottom-line justify-between'>
                <Image className='order-img' src={'data:image/png;base64,'+ beforeImg} id={'clientImg' + beforeImg} />
                <Text className='order-price'><Text className='order-unit'>￥</Text>{price}</Text>
            </View>
            <View className='flex-row bottom justify-between'>
                <Text className='order-time'>{createTime}</Text>
                {status !='finished' && <MButton type='flat' onClick={operator}>催单</MButton>}
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