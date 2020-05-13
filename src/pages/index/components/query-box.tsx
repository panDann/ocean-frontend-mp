import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image, ScrollView } from "@tarojs/components";
import { AtButton, AtInput } from "taro-ui";
import ImageUrl from "@src/assets/images/boat.png";
import TrailerPng from '@src/assets/index/search-trailer.png'

import Card from "@src/pages/components/search-card/card";
import NoData from "@src/pages/index/views/no-data/index";
import {
  firstQueryListCache,
  originCache,
  destinationCache
} from "@src/consts/localStorage-variables";
import "./index.styl";
import {
  ownerTrailerAddressSelectPath,
  firstAddressSelectPath
} from "@src/consts/paths";

interface State {
  firstQueryList: string[];
  list: string[];
}

interface Prop {
  searchType: string;
  listData: [{ id: string }];
  tabsKey: number;
  handleQuery1: Function;
  //searchOrigin: string;
  //searchDestination: string;
}

export default class Index extends Component<Prop, State> {
  constructor(prop) {
    super(prop);
    this.state = {
      firstQueryList: Taro.getStorageSync(firstQueryListCache) || [],
      list: []
    };
  }

  static options = {
    addGlobalClass: true
  };

  async onSubmit() {
    const origin = Taro.getStorageSync(originCache)
      ? Taro.getStorageSync(originCache)
      : "";
    const destination = Taro.getStorageSync(destinationCache)
      ? Taro.getStorageSync(destinationCache)
      : "";
    this.props.handleQuery1(origin, destination);
    if (origin && destination) {
      this.setSearchHistory();
    }
  }

  setSearchHistory() {
    const origin = Taro.getStorageSync(originCache)
      ? Taro.getStorageSync(originCache)
      : "";
    const destination = Taro.getStorageSync(destinationCache)
      ? Taro.getStorageSync(destinationCache)
      : "";
    const { firstQueryList } = this.state,
      item = origin + `——` + destination;
    if (firstQueryList.length == 3) firstQueryList.pop();
    if (!firstQueryList.includes(item)) firstQueryList.unshift(item);
    else return;
    Taro.setStorageSync(firstQueryListCache, firstQueryList);
    this.setState({ firstQueryList });
  }

  paddingInput(item: string) {
    let [origin = "", destination = ""] = item.split("——");
    this.setState<any>({ origin, destination });
  }

  clearHistory() {
    const firstQueryList = [];
    Taro.setStorageSync(firstQueryListCache, "");
    this.setState({ firstQueryList });
  }

  showOriginSelect(tabsKey) {
    if (tabsKey == 2) {
      Taro.navigateTo({
        url: ownerTrailerAddressSelectPath + "?isOrigin=1&tabskey=" + tabsKey
      });
    } else {
      Taro.navigateTo({
        url: firstAddressSelectPath + "?isOrigin=1&tabskey=" + tabsKey
      });
    }
  }

  showDestinationSelect(tabsKey) {
    Taro.navigateTo({
      url: firstAddressSelectPath + "?isOrigin=0&tabskey=" + tabsKey
    });
  }

  render() {
    const Threshold = 1,
      { firstQueryList } = this.state,
      { listData, tabsKey,searchType } = this.props;
    return (
      <View style={{ padding: ".5rem 1rem" }}>
        <View className="flex-row justify-between">
          <AtInput
            name="departure"
            type="text"
            placeholder="起运地"
            value={
              Taro.getStorageSync(originCache)
                ? Taro.getStorageSync(originCache)
                : ""
            }
            onChange={(value: any) => {
              return value;
            }}
            onFocus={this.showOriginSelect.bind(this, tabsKey)}
          />
          <Image src={searchType=='ocean'? ImageUrl:TrailerPng} className="box-img" />
          <AtInput
            name="destination"
            type="text"
            placeholder="目的地"
            value={
              Taro.getStorageSync(destinationCache)
                ? Taro.getStorageSync(destinationCache)
                : ""
            }
            onChange={(destination: any) => {
              return destination;
            }}
            onFocus={this.showDestinationSelect.bind(this, tabsKey)}
          />
        </View>
        <View className="margin30">
          <AtButton
            formType="submit"
            type="primary"
            circle
            onClick={this.onSubmit.bind(this)}
          >
            提交
          </AtButton>
        </View>
        <View className="flex-row justify-between margin30">
          {firstQueryList.map(el => (
            <Text
              key={el}
              className="gray"
              onClick={() => this.paddingInput(el)}
            >
              {el}
            </Text>
          ))}
          <Text className="gray" onClick={this.clearHistory}>
            清空历史
          </Text>
        </View>
        {listData && listData.length > 0 ? (
          <ScrollView
            scrollY
            // style={{height:'50px'}}
            scrollWithAnimation
            scrollTop={0}
            lowerThreshold={Threshold}
          >
            {listData.map(el => (
              <Card charge={el} tabsKey={tabsKey} orderType={searchType} key={el.id} />
            ))}
          </ScrollView>
        ) : (
          <NoData tabsKey={tabsKey} />
        )}
      </View>
    );
  }
}
