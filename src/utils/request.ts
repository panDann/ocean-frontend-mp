import Taro from "@tarojs/taro";
import { serverHost } from "@config/server";
// import { roleSelectPath } from "@src/consts/paths";

interface CommonRes<T extends any> {
  message: string;
  data: T;
  code: string;
  extStr?: null;
  systemDate?: string;
  totalCount?: number;
}

// 拦截器 可以进行权限校验 错误码校验
const interceptor = function(chain) {
  const requestParams = chain.requestParams;
  const { url } = requestParams;

  requestParams.url = serverHost + url; //拼接host

  return chain.proceed(requestParams).then(res => {
    // if (
    //   res.data &&
    //   res.data.message &&
    //   res.data.message.indexOf("当前用户") != -1
    // ) {
    //   Taro.atMessage({
    //     message: res.data.message,
    //     type: "error"
    //   });
    //   Taro.clearStorageSync();
    //   // Taro.navigateTo({ url: roleSelectPath });
    // }
    return res;
  });
};

Taro.addInterceptor(interceptor);

function reuqest<T>(param: any) {
  return Taro.request<CommonRes<T>>({
    method: "POST", //默认请求方式
    header:{
      "Content-Type":'application/x-www-form-urlencoded'
    },
    ...param
  });
}

export default reuqest;
/**
 *
 * @paramurl	{
 * url   string		是	开发者服务器接口地址
complete	(res: CallbackResult) => void		否	接口调用结束的回调函数（调用成功、失败都会执行）
data	U		否	请求的参数
dataType	"json" or "其他"		否	返回的数据格式
fail	(res: CallbackResult) => void		否	接口调用失败的回调函数
header	Record<string, any>		否	设置请求的 header，header 中不能设置 Referer。

content-type 默认为 application/json
method	"OPTIONS" or "GET" or "HEAD" or "POST" or "PUT" or "DELETE" or "TRACE" or "CONNECT"		否	HTTP 请求方法
responseType	"text" or "arraybuffer"		否	响应的数据类型
success	(result: SuccessCallbackResult<any>) => void		否	接口调用成功的回调函数}
*/
