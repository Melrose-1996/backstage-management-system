// 背景中的canvas流星
const canvasStarBg = (el) => {
    let canvasElement = el;
    let ctx = canvasElement.getContext('2d');
    let windowW = window.innerWidth;
    let windowh = window.innerHeight;
    canvasElement.width = windowW;
    canvasElement.height = windowh;
    let imgLoading = false; // 图加载是否生成
    let imgNum = 0; // 有多少张图片
    let imgArr = []; // 图片初始信息
    let conter = 0; // 有几个图片超出屏幕
    function draw() {
        // canvas图纸背景色
        ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        let colors = ctx.createLinearGradient(0, 0, 0, canvasElement.height);
        colors.addColorStop(0, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = colors;
        ctx.fillRect(0, 0, canvasElement.width, canvasElement.height)
        if (imgLoading) {
            for (let i = 0; i < imgArr.length; i++) {
                let child = imgArr[i];
                child.initX -= child.speed;
                child.initY += child.speed;
                // 图片initX = 0 时是图片左边在屏幕边缘，图片要全部移出屏幕，initX < -图片宽度
                if (child.initX < -120 || child.initY > canvasElement.height + 120) {
                    conter = i + 1
                }
                if (conter == imgArr.length) {
                    conter = 0;
                    imgLoading = false;
                }
                loadingImg(child, require(`../assets/images/common/login/login-star${i + 1}.png`), child.initX, child.initY)
            }
        } else {
            createImg();
        }
    }
    function createImg() {
        imgNum = Math.ceil((Math.random() * 4) + 1); // 加载流星图片的个数，现有5张图片
        imgArr = [];
        for (let i = 0; i < imgNum; i++) {
            let lx = Math.random() * canvasElement.width + 120; // 避免出现坐标生成太靠左，移动后直接超出屏幕
            let ly = -120 // 图片先在屏幕上方看不见的地方
            loadingImg(imgArr[i], require(`../assets/images/common/login/login-star${i + 1}.png`), lx, ly);
            imgArr[i] = {
                initX: lx,
                initY: ly,
                speed: Math.random() * 15 + 5
            }
        }
        imgLoading = true;
    }
    function loadingImg(img, url, initX, initY) {
        img = new Image(); // 创建一个Image对象,实现图片的预下载
        img.src = url;
        if (img.complete) {
            ctx.drawImage(img, initX, initY);
            return;
        }
        img.onload = function () { // 图片下载完毕时异步调用callback函数
            ctx.drawImage(img, initX, initY);
        }
    }
    draw();
    let timer = setInterval(draw, 50);
    return timer;
}

export {
    canvasStarBg
}