import Request from "@src/utils/request";
import { serverHost } from "@config/server";
import { userToken } from "@src/consts/localStorage-variables";

import Taro from "@tarojs/taro";

export interface ILogin {
    token: string
    username: string
    role: string
}


let base = '/ocean-mp/user/order'
export const getOrders = (page=1,limit=10) => {
    return Request({
        url: base + `?page=${page}&limit=${limit}`,
        // data: param,
        method:"GET"
    });
};

export const submitOrder = (filePath, formData) => {
    
    return Taro.uploadFile({
        url: serverHost + base , //仅为示例，非真实的接口地址
        filePath,
        name: 'file',
        formData,
        header:{
            "Content-Type":'application/x-www-form-urlencoded',
            token:Taro.getStorageSync(userToken)||''
          },
        fail(err){
            Taro.hideLoading()
            Taro.showToast({title:'服务器连接出错',icon:'none'})
        }
        // success (res){
        //   const data = res.data
        //   //do something
        // }
    })
};
export const deleteOrder = (id) => {
    return Request({
        url: base+`?id=${id}`,
        // data: {id},
        method:"DELETE"
    });
};


// export const ownerRegister = param => {
//   return Request<any>({
//     url: "/system/userLoginRest/registerOfConsignor",
//     data: param,
//   });
// };

