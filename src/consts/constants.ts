/**手机号码正则 */
export const phonePattern = /^1[3456789]\d{9}$/;

export const options = {//add global class in *
    addGlobalClass: true
}

export const resCodes = {
    "success": 10000,
    "loginOverdue": 10011,
    "noPermisson": 10021,
    "error": 10031,
}
