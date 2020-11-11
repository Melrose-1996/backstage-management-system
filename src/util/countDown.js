/**
 * 重新发送验证码倒计时
 * @param {表单，表单中需要有issendCode:是否发送验证码(0:没发,1:已发,3:重发)，timer：计时器，timerNum：倒计时} form
 * @param {倒计时时间} TIME_COUNT
 * @param {是否停止倒计时} stop
 */
const verifyCodeCountDown = (form, TIME_COUNT, stop) => {
    if (stop) {
        form.issendCode = 0;
        clearInterval(form.timer);
        form.timer = null;
        return false;
    }
    form.timerNum = TIME_COUNT;
    if (!form.timer) {
        form.issendCode = 1;
        form.timer = setInterval(() => {
            if (form.timerNum > 1 && form.timerNum <= TIME_COUNT) {
                form.timerNum--;
            } else {
                form.issendCode = 2;
                clearInterval(form.timer);
                form.timer = null;
            }
        }, 1000)
    }
}

// 禁止连续点击
const noContinuityClick = (obj, self) => {
    obj = obj || {oldTime: '', clickCounts: 0}
    let newTime = new Date().getTime()
    if (obj.oldTime && (newTime - obj.oldTime < 500)) {
        obj.oldTime = newTime;
        obj.clickCounts++;
        if (obj.clickCounts % 4 == 0) {
            self.$message({
                type: 'warning',
                message: '操作过于频繁，请稍后重试'
            })
        }
    } else {
        obj.oldTime = newTime
        obj.clickCounts = 0
    }
    return obj
}

export {
    verifyCodeCountDown,
    noContinuityClick
}