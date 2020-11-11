export default {
	state: {
		isWiden: 0, // 增加自定义弹框的宽度
		isHeight: 0 // 增加自定义弹框的高度
	},
	getters: {
		isWiden: state => state.isWiden,
		isHeight: state => state.isHeight
	},
	mutations: {
		SET_WIDEN: (state, isWiden) => {
			state.isWiden = isWiden;
		},
		SET_HEIGHT: (state, isHeight) => {
			state.isHeight = isHeight;
		}
	},
	actions: {
		setWiden({
			commit
		}, isWiden) {
			commit('SET_WIDEN', isWiden)
		},
		setHeight({
			commit
		}, isHeight) {
			commit('SET_HEIGHT', isHeight)
		}

	}
}