import Taro, { Component, Config } from "@tarojs/taro";
import { View, Text, Input, Image, CoverView } from "@tarojs/components";
import OrderCard from '@src/pages/components/order-card'
import NoData from "@src/pages/components/no-data";
import "./index.styl";
import { userToken } from "@src/consts/localStorage-variables";
import {minePath} from '@src/consts/paths.ts'
import Modal from '@src/pages/components/modal'
import {
  getOrders,
  deleteOrder,
  submitOrder
} from '@src/api/order';
const phoneNumber = '13476828808'

interface State {
  showBtn: boolean;
  listData: any;
  modaleVisible: boolean
  temImgPath: string
  form: {
    name: string
    before_img: string
    status: number
  }
}

let page = 1,
  limit = 10,
  scrollIndex = 0,
  scrollTimer: any,
  $toast: any = (title,icon='success') => Taro.showToast({ title,icon })
export default class Index extends Component<any, State> {
  constructor() {
    super();
    this.state = {
      showBtn: true,
      modaleVisible: false,
      temImgPath: '',
      form: {
        name: '',
        before_img: '',
        status: 0,
      },
      listData: [

      ],

    };
  }

  componentWillUnmount() {
    scrollTimer = null
    $toast = null
  }
  componentWillMount() {
    this.getData(1)
  }

  config: Config = {
    navigationBarTitleText: "首页",
    enablePullDownRefresh: true,
    
  };

  async getData(p = 1) {
    let { data: { data } } = await getOrders(p, limit)

    let { listData } = this.state
    if (data) {
      if (p == 1) listData = data
      else listData.push(data)
      this.setState({ listData })
    } else {
      this.setState({ listData: [] })
    }
  }
  onPullDownRefresh() {
    page = 1
    this.getData(page)
  }
  authLogin() {
    if(Taro.getStorageSync(userToken)){
      this.setState({ modaleVisible:true  })
      return
    }
    Taro.showModal({
      title: '您还未登录，是否去登录？', success: ({ confirm }) => {
        confirm && Taro.switchTab({url:minePath})
      },
      confirmText:'去登录'
    })
    return

  }
  onPageScroll({ scrollTop }) {
    if (scrollTimer) clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      if (scrollIndex - scrollTop > 0 || scrollTop == 0) {
        this.setState({ showBtn: true })
      } else {
        this.setState({ showBtn: false })
      }
      scrollIndex = scrollTop
    }, 100);

  }

  async chooseImg() {
    const { tempFilePaths: [temImgPath = ''] } = await Taro.chooseImage({ count: 1 })
    this.setState({ temImgPath })
  }
  async submitForm() {
    const { form, temImgPath } = this.state
    if(!form.name || !temImgPath){
    $toast('订单名和图不能为空','none' )
    return
    }

    Taro.showLoading({ title: '文件上传中' })
    const { data } = await submitOrder(temImgPath, form)
    Taro.hideLoading()

    let parseData = JSON.parse(data)
    if (parseData.code === 10000) {
      $toast('上传成功')
      this.setState({ modaleVisible: false })
      this.onPullDownRefresh()
      return
    }
    $toast(parseData.message,'none' )
  }
 
  onOperate(id: number, type: string) {
    switch (type) {
      case 'reminder': this.onOrderReminder(id)
        break
      case 'cancel': this.onOrderCancel(id)
        break
      default: break
    }
  }
  onOrderReminder(id: number) {

    $toast('催单成功')
  }
  onOrderCancel(id: number) {
    Taro.showModal({
      title: '取消订单', success: async ({ confirm }) => {
        confirm && (
                    await deleteOrder(id),
                    $toast('删除成功'),
                     this.getData(1)
                   )
      },
    })
  }
  render() {
    const { listData, showBtn, form, temImgPath, modaleVisible } = this.state

    return (
      <View className="padding1rem">
        {
          listData.map(el => <OrderCard item={el} operator={this.onOperate.bind(this)} />)
        }

        {!listData.length && <NoData tip='暂时没有您的订单' />}

        {showBtn && <View className='btn-con'>
          <View className='iconfont tran-scale float-btn icondkw_tianxie' onClick={this.authLogin.bind(this)} />
          <View className='iconfont tran-scale float-btn iconphone' onClick={() => Taro.makePhoneCall({ phoneNumber })} />
        </View>}

        <Modal title='创建订单' width='80vw' onConfirm={this.submitForm.bind(this)} height='50vh' visible={modaleVisible} onCancel={() => this.setState({ modaleVisible: false })}>
          <View className='padding1rem'>
            <View className='flex-row paddingtb1rem justify-start'>
              <Text className='label'>订单名：</Text>
              <Input
                value={form.name}
                placeholder='输入机型和问题，限10字'
                placeholderClass='placeholder'
                className='form-input bottom-line'
                onInput={({ detail: { value } }) => form.name = value} />
            </View>
            <View className='flex-row paddingtb1rem justify-start'>
              <Text className='label'>外观图：</Text>
              {temImgPath ? <Image src={temImgPath} className='image relative'>
                <CoverView className='iconfont iconguanbi close-btn absolute' onClick={() => this.setState({ temImgPath: '' })}></CoverView>
              </Image> :
                <Text className='add-img' onClick={this.chooseImg}>+</Text>
              }
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
