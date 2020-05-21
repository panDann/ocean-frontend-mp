
import Taro from "@tarojs/taro";


const $Toast = (title)=>Taro.showToast({
    title,
    icon: 'none',
    image: '',
    duration: 1500,
    mask: true,
});

export function Validator(obj={},rules=[]) {

    let rulesLen = rules.length
        // res = false

    if(!Object.keys(obj).length||!rulesLen)return false

    for(let i=0;i < rulesLen;i++){
        for(const objKey in rules[i]){
            if(typeof obj[objKey] ==='undefined')continue
            let keyRules = rules[i][objKey]
            for(let rule of keyRules as any){
                
              if(rule.require&&!obj[objKey]){
                $Toast(rule.message||'输入有误')
                return false
              }
              if(rule.validator){
                  if(typeof rule.validator==='function'){
                    if(!rule.validator(obj[objKey]))return false
                  }else{
                    if(rule.validator.test&&!rule.validator.test(obj[objKey])){
                        $Toast(rule.message||'输入有误')
                        return false
                      }
                  }
              }
            }
        }
    }
    
    return true
}