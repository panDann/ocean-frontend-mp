import Request from "@src/utils/request";

export interface ILogin {
  token:string
  username:string
  role:string
}


let base = '/ocean-mp/user'
export const login = param => {
  return Request<ILogin>({
    url: base+"/login",
    data: param,
  });
};

export const logout = (param) => {
  return Request({
    url: base+"/logout",
    data: param,
  });
};


export const ownerRegister = param => {
  return Request<any>({
    url: "/system/userLoginRest/registerOfConsignor",
    data: param,
  });
};

