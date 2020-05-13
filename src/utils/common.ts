import { serverHost } from "@config/server";
import Request from "@src/utils/request";

// 手机号码验证
export const phonePattern = /^((13[0-9])|(14[5|7|9])|(15([0-3]|[5-9]))|16[6]|(17[0,1,3,5-8])|(18[0-9])|(19[8|9]))\d{8}$/;

// 密码校验，长度8-16
export const passwordPattern = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,16}$/;

export const fileUpload = `${serverHost}/uploadFile`; //上传文件

//删除文件
export const fileDelete = param => {
  return Request<any>({
    url: "/deleteFile?url=" + param.url,
    data: null,
    method: "get"
  });
};

/**
 * 在某段时间内获取周几的具体时间
 * @param startDate 开始时间（时间戳）
 * @param endDate 结束时间（时间戳）
 * @param weeks  周几
 */
export function transWeek(startDate, endDate, weeks) {
  var list = new Array();
  startDate = new Date(startDate);
  for (var i = 0; startDate.getTime() <= endDate; i++) {
    if (startDate.getDay() == 0 && weeks.includes("7")) {
      list.push(formatDate(new Date(startDate)));
    } else if (weeks.includes(startDate.getDay() + "")) {
      list.push(formatDate(new Date(startDate)));
    }
    startDate.setDate(startDate.getDate() + 1); //设置天数 -1 天
  }
  return list;
}

/**
 * 格式化时间：yyyy-MM-dd
 */
export function formatDate(date: Date) {
  var seperator1 = "-";
  var year = date.getFullYear();
  var month: any = date.getMonth() + 1;
  var day: any = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (day >= 0 && day <= 9) {
    day = "0" + day;
  }
  var currentdate = year + seperator1 + month + seperator1 + day;
  return currentdate;
}

/**
 * 计算箱型运费/总运费
 * @param [] charge
 * @param string type 20GP/40GP/40HQ
 * @param boolean isSum true:总运费/false:各箱型运费
 */
export function getCost(charge, type, isSum) {
  let cost = 0;
  if (!isSum) {
    if (Array.isArray(charge) && charge.length > 0) {
      charge.map(item => {
        if (type == item.boxType && item.num) {
          cost += item.amount * item.num;
        } else if (type == item.boxType) {
          cost += item.amount;
        }
      });
    }
    return cost;
  } else {
    if (Array.isArray(charge) && charge.length > 0) {
      for (let i = 0; i < charge.length; i++) {
        cost += charge[i].amount * charge[i].num;
      }
    }
    return cost;
  }
}

/**
 * 计算附加费用总金额
 * @param [] extraCharge
 */
export function getExtraCost(extraCharge) {
  let cost = 0;
  if (Array.isArray(extraCharge) && extraCharge.length > 0) {
    for (let i = 0; i < extraCharge.length; i++) {
      cost += extraCharge[i].amount;
    }
  }
  return cost;
}

/**
 * 计算增值费
 * @param [] otherCharge
 * @param string type 1:报关费/2：货物保险费/3：货款保险费/4：熏蒸费/5：上门提货费
 * @param boolean isSum true:总费用/false:各项增值费
 */
export function getOtherCost(otherCharge, type, isSum) {
  let cost = 0;
  if (!isSum) {
    if (Array.isArray(otherCharge) && otherCharge.length > 0) {
      otherCharge.map(item => {
        if (type === item.costType) {
          cost += item.amount;
        }
      });
    }
    return cost;
  } else {
    if (Array.isArray(otherCharge) && otherCharge.length > 0) {
      otherCharge.map(item => {
        cost += item.amount;
      });
    }
    return cost;
  }
}

/**
 * 计算航运拼箱海运费
 * @param {*} oceanFreight 拼箱海运费单价
 * @param {*} minRt  拼箱设置最小rt
 * @param {*} cargoWeight 货物重量
 * @param {*} cargoSize 货物体积
 * @returns 海运费
 */
export function getLclOceanFreight(
  oceanFreight,
  minRt,
  cargoWeight,
  cargoSize
) {
  let cost = 0;
  let price = 0;
  let rate = 0;
  let min = minRt ? 0 : minRt;
  if (oceanFreight) {
    let split = oceanFreight.split("/");
    if (split.length === 2) {
      price = split[0];
      rate = split[1];
    }
  }
  let a: any = ((cargoWeight ? cargoWeight : 0) / rate).toFixed(2);
  let cbm = cargoSize ? cargoSize : 0;
  if (parseFloat(a) >= parseFloat(cbm) && parseFloat(a) >= parseFloat(min)) {
    // 1.A>=CBM && A>min, A*计费吨单价
    cost = a * price;
  } else if (
    parseFloat(a) >= parseFloat(cbm) &&
    parseFloat(a) <= parseFloat(min)
  ) {
    // 2.A>=CBM && A<=min, min*计费吨单价
    cost = min * price;
  } else if (
    parseFloat(a) <= parseFloat(cbm) &&
    parseFloat(cbm) >= parseFloat(min)
  ) {
    // 3.A<=CBM && CBM>=min, CBM*计费吨单价
    cost = cbm * price;
  } else if (
    parseFloat(a) <= parseFloat(cbm) &&
    parseFloat(cbm) <= parseFloat(min)
  ) {
    // 4.A<=CBM && CBM<=min, min*计费吨单价
    cost = min * price;
  }
  return cost;
}

/**
 * 获取某天是周几
 * dayValue=“2014-01-01”
 * @param {*} dayValue
 * return  周几(dayValue)
 */
export function getWeekByDay(dayValue) {
  var day = new Date(Date.parse(dayValue.replace(/-/g, "/"))); //将日期值格式化
  var today = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六"); //创建星期数组
  return today[day.getDay()] + "(" + dayValue + ")"; //返一个星期中的某一天，其中0为星期日
}

/**
 * 填写整箱订单校验
 * @param data
 * @param type 1：订单 2：查询单
 */
export function checkFclData(data, type) {
  var msg = "";
  if (!data.origin || !data.destination) {
    msg = "起运地、目的地不能为空!";
    return msg;
  }
  if (type === 1 && !data.sailingsDate) {
    msg = "请选择预计出运日期!";
    return msg;
  }
  if (type === 1 && !data.closingDate) {
    msg = "请选择截仓日期!";
    return msg;
  }
  if (type === 2 && !data.startTime) {
    msg = "请选择预计出运开始时间!";
    return msg;
  }
  if (type === 2 && !data.endTime) {
    msg = "请选择预计出运结束时间!";
    return msg;
  }
  if (data.trailerService === "1" && !data.factoryId) {
    msg = "请选择生产地!";
    return msg;
  }
  if (data.declareService === "1" && !data.declareNum) {
    msg = "请填写报关票数!";
    return msg;
  }
  msg = checkInsuranceService(data);
  if (msg) {
    return msg;
  }
  msg = checkFumigateService(data);
  if (msg) {
    return msg;
  }
}

/**
 * 填写拼箱订单校验
 * @param data
 * @param type 1：订单 2：查询单
 */
export function checkLclData(data, type) {
  var msg = "";
  if (!data.origin || !data.destination) {
    msg = "起运地、目的地不能为空!";
    return msg;
  }
  if (data.cargoType < 0) {
    msg = "请选择货物类型!";
    return msg;
  }
  if (!data.cargoName) {
    msg = "请输入货物名称!";
    return msg;
  }
  if (!data.cargoWeight) {
    msg = "请输入货物重量!";
    return msg;
  }
  if (!data.cargoSize) {
    msg = "请输入货物体积!";
    return msg;
  }
  if (!data.cargoNum) {
    msg = "请输入货物件数!";
    return msg;
  }
  if (!data.cargoPacking) {
    msg = "请选择货物包装!";
    return msg;
  }
  if (type == 1 && !data.sailingsDate) {
    msg = "请选择预计出运日期!";
    return msg;
  }
  if (type == 1 && !data.closingDate) {
    msg = "请选择截仓日期!";
    return msg;
  }
  if (type === 2 && !data.startTime) {
    msg = "请选择预计出运开始时间!";
    return msg;
  }
  if (type === 2 && !data.endTime) {
    msg = "请选择预计出运结束时间!";
    return msg;
  }
  if (data.doorDelivery === "0") {
    if (!data.factoryId) {
      msg = "请选择提货地!";
      return msg;
    }
    if (!data.pickupUser) {
      msg = "请输入提货联系人!";
      return msg;
    }
    if (!data.pickupPhone) {
      msg = "请输入联系电话!";
      return msg;
    }
    if (!data.pickupTime) {
      msg = "请选择提货时间!";
      return msg;
    }
  }
  if (data.declareService === "1" && !data.declareNum) {
    msg = "请填写报关票数!";
    return msg;
  }
  msg = checkInsuranceService(data);
  if (msg) {
    return msg;
  }
  msg = checkFumigateService(data);
  if (msg) {
    return msg;
  }
}

/**
 * 填写拖车订单校验
 * @param data
 * @param type 1：订单 2：查询单
 */
export function checkTrailerData(data, type) {
  var msg = "";
  if (!data.origin || !data.destination) {
    msg = "起运地、目的地不能为空!";
    return msg;
  }
  if (!data.factoryId) {
    msg = "请选择生产地!";
    return msg;
  }
  if (type === 2 && !data.startTime) {
    msg = "请选择预计出运开始时间!";
    return msg;
  }
  if (type === 2 && !data.endTime) {
    msg = "请选择预计出运结束时间!";
    return msg;
  }
  if (!data.clientName) {
    msg = "请输入委托人!";
    return msg;
  }
  if (!data.clientPhone) {
    msg = "请输入联系电话!";
    return msg;
  }
}

/**
 * 校验保险服务
 * @param data
 */
export function checkInsuranceService(data) {
  var msg = "";
  if (data.insuranceService) {
    if (
      data.insuranceService.type === "1" ||
      data.insuranceService.type === "3"
    ) {
      if (!data.insuranceService.insuranceCompany) {
        msg = "请选择保险公司!";
        return msg;
      }
      if (!data.insuranceService.amount) {
        msg = "请填写发票金额!";
        return msg;
      }
    }
    if (
      data.insuranceService.type === "2" ||
      data.insuranceService.type === "3"
    ) {
      if (!data.insuranceService.companyName) {
        msg = "请填写企业名称!";
        return msg;
      }
      if (
        !data.insuranceService.province ||
        !data.insuranceService.city ||
        !data.insuranceService.district
      ) {
        msg = "请选择省市区!";
        return msg;
      }
      if (!data.insuranceService.addr) {
        msg = "请填写企业详细地址!";
        return msg;
      }
    }
  }
  return msg;
}

/**
 * 校验熏蒸服务
 * @param data
 */
export function checkFumigateService(data) {
  var msg = "";
  if (data.fumigateService) {
    if (data.fumigateService.type === "1") {
      checkCargoInfo(data);
      if (!data.fumigateService.loadDate) {
        msg = "请选择装柜时间!";
        return msg;
      }
      if (!data.fumigateService.pickupDate) {
        msg = "请选择上门提货时间!";
        return msg;
      }
      if (!data.fumigateService.returnDate) {
        msg = "请选择包装物返回客户工厂时间!";
        return msg;
      }
    }
    if (data.fumigateService.type === "2") {
      checkCargoInfo(data);
      if (!data.fumigateService.sendDate) {
        msg = "请选择客户工厂自行上门送达时间!";
        return msg;
      }
      if (!data.fumigateService.takeDate) {
        msg = "请选择客户工厂自行提走包装物时间!";
        return msg;
      }
    }
    if (data.fumigateService.type === "3") {
      checkCargoInfo(data);
      if (!data.fumigateService.visitDate) {
        msg = "请选择上门熏蒸时间!";
        return msg;
      }
    }
  }
  return msg;
}

/**
 * 熏蒸服务校验货物信息
 * @param data
 */
export function checkCargoInfo(data) {
  var msg = "";
  if (!data.fumigateService.cargoName) {
    msg = "请输入货物名称!";
    return msg;
  }
  if (!data.fumigateService.cargoCount) {
    msg = "请输入货物件数!";
    return msg;
  }
  if (!data.fumigateService.cargoPacking) {
    msg = "请选择货物包装!";
    return msg;
  }
}
