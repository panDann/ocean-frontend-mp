import Request from "@src/utils/request";
import Taro from "@tarojs/taro";
import { loginOwner } from "@src/consts/localStorage-variables";

let base = '/ocean-mp/user'
export const login = param => {
  return Request<any>({
    url: base+"/login",
    data: param,
  });
};

export const ownerRegister = param => {
  return Request<any>({
    url: "/system/userLoginRest/registerOfConsignor",
    data: param,
  });
};

