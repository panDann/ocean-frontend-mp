export const USER_TYPE = {
  /**1：司机 */
  DRIVER: "1",
  /**货主 */
  OWNER: "2"
};

/** esr接口有效/无效状态 */
export const ESR_STATUS = {
  enabled: "enabled",
  disable: "disabled"
};

/** esr接口审核进度*/
export const ESR_STEP = {
  draft: "draft",
  check: "check",
  pass: "pass",
  return: "return",
  reject: "reject"
};

/** 拖车子订单物流状态 */
export const btnRemark = [
  { key: "0", value: "确认出发" },
  { key: "1", value: "装货" },
  { key: "2", value: "到达" },
  { key: "3", value: "" }
];

/**保险公司类型 */
export const insuranceCompanyType = ["中保", "平安"];

/**货物类型 */
export const cargo_type = ["普货"];

/**拼箱下单：货物包装 */
export const cargoPacking = [
  "木托盘",
  "胶托盘",
  "铁托盘",
  "纸箱",
  "木箱",
  "航空箱",
  "泡沫箱",
  "袋卷",
  "桶",
  "其他"
];

/**熏蒸服务--货物包装 */
export const fumigateServicePacking = ["木托", "木箱", "木板", "木条"];

/**
 * 订单类型：1、2、3==整箱、拼箱、拖车
 */
export const ORDER_TRANSPORT_TYPE = {
  /**1：航运整箱 */
  FCL: "1",
  /**2：航运拼箱 */
  LCL: "2",
  /**3：拖车 */
  Trailer: "3"
};

/**
 * 箱型
 */
export const BOX_TYPE = {
  GP20: "20GP",
  GP40: "40GP",
  HQ40: "40HQ"
};
