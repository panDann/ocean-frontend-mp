import Request from "@src/utils/request";
import Taro from "@tarojs/taro";
import { loginOwner } from "@src/consts/localStorage-variables";

export const login = param => {
  return Request<any>({
    url: "/wx/consignor/login/user/name",
    data: param,
    method: "POST"
  });
};

export const ownerRegister = param => {
  return Request<any>({
    url: "/system/userLoginRest/registerOfConsignor",
    data: param,
    method: "POST"
  });
};

/**
 * 货主修改密码
 * @param {*} param
 */
export async function updateOwnerPwd(param) {
  return Request<any>({
    url: "/esr/user/password/update",
    data: param,
    method: "PUT",
    header: {
      "Content-Type": "application/json",
      "x-session-id": Taro.getStorageSync(loginOwner).sessionId
    }
  });
}
