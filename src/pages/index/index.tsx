import Taro, { Component, Config } from "@tarojs/taro";
import { View, Text, Input, Image, Button, CoverView } from "@tarojs/components";
import OrderCard from '@src/pages/components/order-card'
import NoData from "@src/pages/components/no-data";
import "./index.styl";
import NoDataPath from '@src/assets/images/no-data.png'
import Modal from '@src/pages/components/modal'
import {
  getOrders,
  submitOrder
} from '@src/api/order';
const phoneNumber = '13476828808'

interface State {
  current1: number;
  listData: any;
  modaleVisible: boolean
  temImgPath: string
  form: {
    name: string
    before_img: string
    status: number
  }
  origin: string;
  destination: string;
  searchOrigin: string;
  searchDestination: string;
}

let page = 1,
  limit = 10
export default class Index extends Component<any, State> {
  constructor() {
    super();
    this.state = {
      current1: 0,
      modaleVisible: false,
      temImgPath: '',
      form: {
        name: '',
        before_img: '',
        status: 0,
      },
      listData: [
        // {
        //   name: 'test',
        //   status: 0,
        //   img: NoDataPath,
        //   price: 12,
        //   time: '2019-09-03 19:00',
        // }
      ],
      origin: "",
      destination: "",
      searchOrigin: "",
      searchDestination: ""
    };
  }

  componentDidMount() {
  }
  componentWillMount() {
    this.getData(true)
  }

  config: Config = {
    navigationBarTitleText: "首页",
    enablePullDownRefresh: true
  };

  handleClick(current1) {

  }
  async getData(isFresh = false) {
    let { data: { data } } = await getOrders(page, limit)
   
    let { listData } = this.state
    if (data) {
      if (isFresh) listData = data
      else listData.push(data)
      this.setState({ listData })
    }
  }
  onPullDownRefresh() {
    page = 1
    this.getData(true)
  }
  hiddenModal() {

    this.setState({ modaleVisible: false })
  }
  onFormName({ detail: { value } }) {
    const { form } = this.state
    form.name = value

  }
  async chooseImg() {
    const { tempFilePaths: [temImgPath = ''] } = await Taro.chooseImage({ count: 1 })
    this.setState({ temImgPath })

    // if(temImgPath) {
    // }
  }
  async submitForm() {
    const { form, temImgPath } = this.state
    Taro.showLoading({ title: '文件上传中' })
    const { data } = await submitOrder(temImgPath, form)
    Taro.hideLoading()

    let parseData = JSON.parse(data)
    if (parseData.code === 10000) {
      Taro.showToast({ title: '上传成功' })
      return
    }
    Taro.showToast({ title: parseData.message, icon: 'none' })

  }
  render() {
    const { listData, form, temImgPath, modaleVisible } = this.state

    return (
      <View className="padding1rem">
        {
          listData.map(el => <OrderCard item={el} operator={this.handleClick} />)
        }

        {!listData.length && <NoData tip='暂时没有您的订单' />}

        <View className='btn-con'>
          <View className='iconfont tran-scale float-btn icondkw_tianxie' onClick={() => this.setState({ modaleVisible: !modaleVisible })} />
          <View className='iconfont tran-scale float-btn iconphone' onClick={() => Taro.makePhoneCall({ phoneNumber })} />
        </View>

        <Modal title='创建订单' width='80vw' onConfirm={this.submitForm.bind(this)} height='50vh' visible={modaleVisible} onCancel={this.hiddenModal.bind(this)}>
          <View className='padding1rem'>
            <View className='flex-row paddingtb1rem justify-start'>
              <Text className='label'>订单名：</Text>
              <Input
                value={form.name}
                placeholder='输入机型和问题，限10字'
                placeholderClass='placeholder'
                className='form-input bottom-line'
                onInput={this.onFormName} />
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
          {/* <Button className='primary-btn btn absolute mini-btn'>提交</Button> */}
        </Modal>
      </View>
    );
  }
}
