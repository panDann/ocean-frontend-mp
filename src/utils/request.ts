import Taro from "@tarojs/taro";
import { serverHost } from "@config/server";
import { userToken } from "@src/consts/localStorage-variables";
import { resCodes } from "@src/consts/constants";
import { minePath } from "@src/consts/paths";

interface CommonRes<T extends any> {
  message: string;
  data: T;
  code: number;
  extStr?: null;
  systemDate?: string;
  totalCount?: number;
}

  
  const $toast =(title='')=> Taro.showToast({title,icon:'none'})

// 拦截器 可以进行权限校验 错误码校验
const interceptor = function(chain) {


  const requestParams = chain.requestParams;
  const { url,loadingContent=''} = requestParams;

  Taro.showLoading({title:loadingContent||'加载中'})
  requestParams.url = serverHost + url; //拼接host

  return chain.proceed(requestParams).then((res) => {
    let {data:{code,message}} = res

    Taro.hideLoading()
    switch (code) {
      case resCodes.success: 
          return res

      case resCodes.loginOverdue: 
          Taro.setStorageSync(userToken,'')
           $toast(message)
          Taro.switchTab({url:minePath})

      default:$toast(message)
    }
    
    // Taro.hideLoading()
    return false;
  })
 
};

Taro.addInterceptor(interceptor);

function reuqest<T>(param: any)  {
  console.log('token',Taro.getStorageSync(userToken));
  
  return Taro.request<CommonRes<T>>({
    method: "POST", //默认请求方式
    header:{
      "Content-Type":'application/x-www-form-urlencoded',
      token:Taro.getStorageSync(userToken)||''
    },
    fail,
    ...param
  })
}

function fail(){
  Taro.hideLoading()      
  $toast('连结服务器出错')
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
