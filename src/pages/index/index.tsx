import Taro, { Component, Config } from "@tarojs/taro";
import { AtTabs, AtTabsPane, AtMessage } from "taro-ui";
import QueryBox from "./components/query-box";
import "./index.styl";
import {
  queryLclChargeIndex,
  queryFclChargeIndex,
  queryTrailerChargeIndex
} from "@src/api/indexQuery";
import { ownerTabBarIds } from "@src/custom-tab-bar/const";
import {
  originCache,
  destinationCache
} from "@src/consts/localStorage-variables";

import { View } from "@tarojs/components";

interface State {
  current1: number;
  listData: [{ id: string }];
  origin: string;
  destination: string;
  searchOrigin: string;
  searchDestination: string;
}

export default class Index extends Component<any, State> {
  constructor() {
    super();
    this.state = {
      current1: 0,
      listData: [{ id: "" }],
      origin: "",
      destination: "",
      searchOrigin: "",
      searchDestination: ""
    };
  }

  handleQuery(origin, destination) {
    this.setState(
      {
        origin,
        destination
      },
      () => {
        this.queryList();
      }
    );
  }

  async queryList() {
    if (this.state.current1 == 0) {
      const {
        data: { code, data, message }
      } = await queryLclChargeIndex({ ...this.state });
      if (data && code === "0") {
        //console.log(data)
        this.setState({ listData: data.records });
      } else {
        Taro.atMessage({
          message: message,
          type: "error"
        });
      }
    } else if (this.state.current1 == 1) {
      const {
        data: { code, data, message }
      } = await queryFclChargeIndex({ ...this.state });
      if (data && code === "0") {
        this.setState({ listData: data.records });
      } else {
        Taro.atMessage({
          message: message,
          type: "error"
        });
      }
    } else if (this.state.current1 == 2) {
      const {
        data: { code, data, message }
      } = await queryTrailerChargeIndex({ ...this.state });
      if (data && code === "0") {
        this.setState({ listData: data.records });
      } else {
        Taro.atMessage({
          message: message,
          type: "error"
        });
      }
    }
  }

  componentDidMount() {
    this.queryList();
  }

  componentWillMount() {
    let acceptValue = this.$router.params;
    if (acceptValue && acceptValue.tabskey) {
      this.setState({
        current1: acceptValue.tabskey ? parseInt(acceptValue.tabskey) : 0
      });
    }
    if (acceptValue && acceptValue.origin) {
      this.setState({
        searchOrigin: acceptValue.origin
      });
    }
    if (acceptValue && acceptValue.destination) {
      this.setState({
        searchDestination: acceptValue.destination
      });
    }
    const scope = this.$scope;
    if (scope.getTabBar) {
      scope.getTabBar().$component.setState({
        // 如果不想用全局变量这里直接写index即可
        updateCurrent: ownerTabBarIds.firstPage
      });
    }
  }

  config: Config = {
    navigationBarTitleText: "首页"
  };

  handleClick(current1) {
    Taro.removeStorageSync(originCache);
    Taro.removeStorageSync(destinationCache);
    this.setState(
      {
        current1,
        origin: "",
        destination: "",
        searchOrigin: "",
        searchDestination: ""
      },
      () => {
        this.queryList();
      }
    );
  }

  render() {
    const tabList = [
      { title: "航运拼箱" },
      { title: "航运整箱" },
      { title: "拖车" }
    ];

    return (
      <View className="tab_bar__bottom">
        <AtMessage />
        <AtTabs
          current={this.state.current1}
          tabList={tabList}
          onClick={this.handleClick.bind(this)}
        >
          <AtTabsPane current={this.state.current1} index={0}>
            <QueryBox
              searchType="ocean"
              listData={this.state.listData}
              tabsKey={this.state.current1}
              handleQuery1={this.handleQuery.bind(this)}
              //searchOrigin={this.state.searchOrigin}
              //searchDestination={this.state.searchDestination}
            />
          </AtTabsPane>
          <AtTabsPane current={this.state.current1} index={1}>
            <QueryBox
              searchType="ocean"
              listData={this.state.listData}
              tabsKey={this.state.current1}
              handleQuery1={this.handleQuery.bind(this)}
              //searchOrigin={this.state.searchOrigin}
              //searchDestination={this.state.searchDestination}
            />
          </AtTabsPane>
          <AtTabsPane current={this.state.current1} index={2}>
            <QueryBox
              searchType="trailer"
              listData={this.state.listData}
              tabsKey={this.state.current1}
              handleQuery1={this.handleQuery.bind(this)}
              //searchOrigin={this.state.searchOrigin}
              //searchDestination={this.state.searchDestination}
            />
          </AtTabsPane>
        </AtTabs>
      </View>
    );
  }
}
