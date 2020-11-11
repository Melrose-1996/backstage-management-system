/**
 * 使用说明
 * 1. 必填校验 validate('required')
 * 2. 其他校验直接把要使用的校验字符串放进来.任意组合 例如: validate('required', 'integerRule')
 * 3. 跟自定义校验杂糅的时候 例如: [{validator: customMawbNo1Rule, trigger: 'change'}, ...validate('mawbNo1Rule')]
 * 4. 默认校验trigger: change 如果要改变 最后一个参数直接传对象 例如: validate('mawbNo1Rule', {trigger: 'blur'})
 */
import * as formValid from './formValid'
export default (...arg) => {
    let validType = arg
    let lastItem = arg.splice(-1)[0]
    let validTrigger = 'change'
    if (typeof lastItem === 'object') { // 最后一列是配置
        validTrigger = lastItem.trigger
        validType = arg
    } else { // 非配置
        validType = [...arg, lastItem]
    }
    return validType.map(keyType => {
        let item = {}
        item.trigger = validTrigger
        if (keyType === 'required') { // 必填校验
            item.required = true
            item.message = '必填'
        } else { // 一般校验
            item.validator = formValid[keyType]
        }
        return item
    })
}