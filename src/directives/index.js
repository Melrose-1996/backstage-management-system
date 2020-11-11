import Vue from 'vue'
// import {
// 	getAllAuthButtons
// } from '@/api/common/layout/layout'
// v-dialogDrag: 弹窗拖拽属性
Vue.directive('dialogDrag', {
	bind(el, binding, vnode, oldVnode) {
		const dialogHeaderEl = el.querySelector('.el-dialog__header');
		const dragDom = el.querySelector('.el-dialog');
		// dialogHeaderEl.style.cursor = 'move';
		dialogHeaderEl.style.cssText += ';cursor:move;'
		dragDom.style.cssText += ';top:0px;'
		// 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
		const sty = (function () {
			if (window.document.currentStyle) {
				return (dom, attr) => dom.currentStyle[attr];
			} else {
				return (dom, attr) => getComputedStyle(dom, false)[attr];
			}
		})()
		dialogHeaderEl.onmousedown = (e) => {
			// 鼠标按下，计算当前元素距离可视区的距离
			const disX = e.clientX - dialogHeaderEl.offsetLeft;
			const disY = e.clientY - dialogHeaderEl.offsetTop;
			const screenWidth = document.body.clientWidth; // body当前宽度
			const screenHeight = document.documentElement.clientHeight; // 可见区域高度(应为body高度，可某些环境下无法获取)
			const dragDomWidth = dragDom.offsetWidth; // 对话框宽度
			const dragDomheight = dragDom.offsetHeight; // 对话框高度
			const minDragDomLeft = dragDom.offsetLeft;
			const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth;
			const minDragDomTop = dragDom.offsetTop;
			const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomheight;
			// 获取到的值带px 正则匹配替换
			let styL = sty(dragDom, 'left');
			let styT = sty(dragDom, 'top');
			// 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
			if (styL.includes('%')) {
				styL = +document.body.clientWidth * (+styL.replace(/%/g, '') / 100);
				styT = +document.body.clientHeight * (+styT.replace(/%/g, '') / 100);
			} else {
				styL = +styL.replace(/\px/g, '');
				styT = +styT.replace(/\px/g, '');
			};
			document.onmousemove = function (e) {
				// 通过事件委托，计算移动的距离
				if (dragDomheight > screenHeight) {
					return
				}
				let left = e.clientX - disX;
				let top = e.clientY - disY;
				// 边界处理
				if (-(left) > minDragDomLeft) {
					left = -(minDragDomLeft);
				} else if (left > maxDragDomLeft) {
					left = maxDragDomLeft;
				}
				if (-(top) > minDragDomTop) {
					top = -(minDragDomTop);
				} else if (top > maxDragDomTop) {
					top = maxDragDomTop;
				}
				// 移动当前元素
				dragDom.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`;
			};
			document.onmouseup = function (e) {
				document.onmousemove = null;
				document.onmouseup = null;
			};
		}
	}
})

// 限制某个区域托动 v-limitDialogDrag
// 传入限制区域的容器 id v-limitDialogDrag:id (eg: v-limitDialogDrag:main) main 为 id
Vue.directive('limitDialogDrag', {
	bind(el, binding, vnode, oldVnode) {
		const dialogHeaderEl = el.querySelector('.el-dialog__header');
		const dragDom = el.querySelector('.el-dialog');
		let id = binding.arg;
		// const mainContainerWidth = mainSelector.offsetWidth; // 限定区域div宽度
		// const mainContainerHeight = mainSelector.clientHeight || mainSelector.offsetHeight; // 限定区域div高度
		// const disW = document.body.clientWidth - mainContainerWidth;
		// const disH = document.documentElement.clientHeight - mainContainerHeight;
		// console.log(disW, disH);
		dialogHeaderEl.style.cursor = 'move';
		dialogHeaderEl.style.cssText += ';cursor:move;'
		dragDom.style.cssText += ';top:0px;'
		// 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
		const sty = (function () {
			if (window.document.currentStyle) {
				return (dom, attr) => dom.currentStyle[attr];
			} else {
				return (dom, attr) => getComputedStyle(dom, false)[attr];
			}
		})()
		dialogHeaderEl.onmousedown = (e) => {
			let mainSelector = document.getElementById(id);
			const mainContainerWidth = mainSelector.clientWidth || mainSelector.offsetWidth; // 限定区域div宽度
			const mainContainerHeight = mainSelector.clientHeight || mainSelector.offsetHeight; // 限定区域div高度
			const disW = document.body.clientWidth - mainContainerWidth;
			const disH = document.documentElement.clientHeight - mainContainerHeight;
			console.log(disW, disH);
			// 鼠标按下，计算当前元素距离可视区的距离
			const disX = e.clientX - dialogHeaderEl.offsetLeft;
			const disY = e.clientY - dialogHeaderEl.offsetTop;
			const screenWidth = document.body.clientWidth; // body当前宽度
			const screenHeight = document.documentElement.clientHeight; // 可见区域高度(应为body高度，可某些环境下无法获取)
			const dragDomWidth = dragDom.offsetWidth; // 对话框宽度
			const dragDomheight = dragDom.offsetHeight; // 对话框高度
			const minDragDomLeft = dragDom.offsetLeft - disW;
			const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth;
			const minDragDomTop = dragDom.offsetTop - disH;
			const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomheight;
			// 获取到的值带px 正则匹配替换
			let styL = sty(dragDom, 'left');
			let styT = sty(dragDom, 'top');
			// 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
			if (styL.includes('%')) {
				styL = +document.body.clientWidth * (+styL.replace(/%/g, '') / 100);
				styT = +document.body.clientHeight * (+styT.replace(/%/g, '') / 100);
			} else {
				styL = +styL.replace(/\px/g, '');
				styT = +styT.replace(/\px/g, '');
			};
			document.onmousemove = function (e) {
				// 通过事件委托，计算移动的距离
				let left = e.clientX - disX;
				let top = e.clientY - disY;
				// 边界处理
				if (-(left) > minDragDomLeft) {
					left = -(minDragDomLeft);
				} else if (left > maxDragDomLeft) {
					left = maxDragDomLeft;
				}
				if (-(top) > minDragDomTop) {
					top = -(minDragDomTop);
				} else if (top > maxDragDomTop) {
					top = maxDragDomTop;
				}
				// 移动当前元素
				dragDom.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`;
			};
			document.onmouseup = function (e) {
				document.onmousemove = null;
				document.onmouseup = null;
			};
		}
	}
})

// v-has: 是否拥有该button权限
Vue.directive('has', {
	bind(el, binding, vnode, oldVnode) {
		// let buttonId = binding.value
		// el.disabled = true // 按钮禁止
		// el.classList.add('btn-disabled')
		// el.title = '没有权限'

		// let buttons = sessionStorage.getItem('authButtonList')
		// if (buttons) {
		// 	buttons = buttons.split(',')
		// 	if (buttons.includes(buttonId.toString())) { // 如果有该权限,不禁止
		// 		el.disabled = false
		// 		el.classList.remove('btn-disabled')
		// 		el.title = ''
		// 	}
		// 	return
		// }

		// getAllAuthButtons().then(res => {
		// 	if (res.code == 0) {
		// 		let buttonList = res.entity
		// 		if (buttonList.includes(buttonId.toString())) { // 如果有该权限,不禁止
		// 			el.disabled = false
		// 			el.classList.remove('btn-disabled')
		// 			el.title = ''
		// 		}
		// 		sessionStorage.setItem('authButtonList', res.entity.join(','))
		// 	}
		// })
	}
})
