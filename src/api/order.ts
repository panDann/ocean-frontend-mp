import Request from "@src/utils/request";
import { serverHost } from "@config/server";
import { userToken } from "@src/consts/localStorage-variables";

import Taro from "@tarojs/taro";

export interface ILogin {
    token: string
    username: string
    role: string
}


let base = '/ocean-mp/user-order'
export const getOrders = param => {
    return Request<ILogin>({
        url: base + "/query",
        data: param,
    });
};

export const submitOrder = (filePath, formData) => {
    return Taro.uploadFile({
        url: serverHost + base + '/submit', //仅为示例，非真实的接口地址
        filePath,
        name: 'file',
        formData,
        header:{
            "Content-Type":'application/x-www-form-urlencoded',
            token:Taro.getStorageSync(userToken)||''
          },
        // success (res){
        //   const data = res.data
        //   //do something
        // }
    })
};


// export const ownerRegister = param => {
//   return Request<any>({
//     url: "/system/userLoginRest/registerOfConsignor",
//     data: param,
//   });
// };

