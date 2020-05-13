
export const gTabIndex = 'tabIndex'

// 司机：driver 货主：owner setGlobalData(gLoginType , 'driver'|'owner')
export const gLoginType = 'loginType' 

const globalData = {
    [gTabIndex]:1,
    [gLoginType]: 'owner',
}
export function setGlobalData (key, val) {
  globalData[key] = val
}
export function getGlobalData (key) {
  return globalData[key]
}