<template>
	<div class="scroll-list-wrapper">
		<div class="list-title">
			<!-- <p class="checkbox"><el-checkbox disabled></el-checkbox></p> -->
			<p :key="index" v-for="(item, index) in listTitle">{{item.text}}</p>
		</div>
		<div class="list-content" ref="listContent" id="mescroll">
			<div class="list-wrapper">
				<div class="role-list-item" :class="{'active': item.active}" @click="clickRow(item, index)" :key="index" v-for="(item, index) in pdlist">
					<el-checkbox-group class="checkGroup" v-model="listPageObj.selectIdList">
						<p class="checkbox" @click.stop="stop"><el-checkbox :checked="item.startSelect" :label="item.id" :key="item.id"  @change="selectRole($event, item)"></el-checkbox></p>
					</el-checkbox-group>
					<p :title="item[val]" :key="key" v-for="(val, key) in getFieldName">
						{{item[val]}}</p>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import MeScroll from 'mescroll.js'
	import 'mescroll.js/mescroll.min.css'
	import Vue from 'vue'
	export default {
		name: 'ScrollList',
		data() {
			return {
				isShowLoading: false,
				checked: false,
				pdlist: [],
				pdlist1: [],
				start: 1,
				mescroll: '',
				selectList: [],
				active: false,
				repeatId: false
			}
		},
		props: {
			listTitle: {
	            type: Array,
		        default: function () {
		            return []
		        }
        	},
        	height: {
        		type: String,
		        default: '200'
        	},
        	listPageObj: {
        		type: Object,
		        default: function () {
		            return {}
		        }
			},
			showProp: {
        		type: Boolean,
		        default: false
			},
			userName: {
        		type: String,
		        default: ''
			},
			accountType: {
        		type: Number,
		        default: 4
			},
			userIds: {
        		type: Array,
		        default: function () {
		            return []
		        }
			},
			isButtonDown: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			getFieldName() {
				let FieldArr = [];
				this.listTitle.map((item, index) => {
					FieldArr.push(item.field);
				});
				return FieldArr;
			}
		},
		created() {
			this.pdlist = [];
		},
		methods: {
			stop() {},
			clickRow(val, index) { // 单击行
				let checkArray = this.listPageObj.selectIdList
				if (checkArray.length !== 0) {
					for (let i in checkArray) {
						if (checkArray[i] == val.id) {
							this.repeatId = false
							i = Number(i)
							checkArray.splice(i, 1)
							this.selectRole(false, val)
							return false;
						} else {
							this.repeatId = true
						}
					}
					if (this.repeatId) {
						this.listPageObj.selectIdList.unshift(val.id)
						this.selectRole(true, val)
						this.repeatId = false
					}
				} else {
					this.listPageObj.selectIdList.unshift(val.id)
					this.selectRole(true, val)
				}
				this.pdlist.forEach((item) => {
					if (item.id == val.id) {
						item.active = true;
					} else {
						item.active = false;
					}
				});
				this.$emit('clickRow', val);
			},
			selectRole(flag, val) { // 单击多选框
				this.$emit('selectRole', val, this.listPageObj.selectIdList, flag);
			},
		    upCallback(page) {
				let self = this;
				this.getListDataFromNet(page.num, page.size, (pageData) => {
					if (page.num == 1) self.pdlist = [];
					self.pdlist = self.pdlist.concat(pageData.entity.list);
					self.pdlist.forEach((item) => {
						Vue.set(item, 'active', false); // 记录点击状态
					});
					self.mescroll.endByPage(pageData.entity.list.length, pageData.entity.page.pageCount);
				}, () => {
					self.mescroll.endErr();
				})
			},
			getListDataFromNet(pageNum, pageSize, successCallback, errorCallback) {
				if (pageNum == 1) {
					this.listPageObj.pageSize = 11
					pageSize = 11
				} else {
					this.listPageObj.pageSize = 10
					pageSize = 10
				}
				this.listPageObj.callback({
					start: this.listPageObj.currentPage || pageNum,
					pageSize: this.listPageObj.pageSize || pageSize,
					userIds: this.userIds,
					accountType: this.accountType,
					userName: this.userName
				}).then((response) => {
					successCallback && successCallback(response); // 成功回调
				}).catch((error) => {
					errorCallback && errorCallback(error)// 失败回调
				})
			}
		},
		mounted() {
			this.$refs.listContent.style.height = this.height + 'px';
			let self = this;
			self.mescroll = new MeScroll('mescroll', {
				up: {
					callback: self.upCallback, // 上拉回调
					// 以下参数可删除,不配置
					auto: false,
					isBounce: false,
					empty: { // 配置列表无任何数据的提示
						warpId: 'mescroll',
						tip: '暂无数据' // 提示
					},
					lazyLoad: {
						use: true // 是否开启懒加载,默认false
					},
					htmlNodata: '<p class="upwarp-nodata">-------------- 没有更多数据 --------------</p>' // 下拉到底时说明文字
				}
			})
		},
		watch: {
			isButtonDown(val) {
				if (val) {
					this.pdlist = []
					this.mescroll.resetUpScroll(true) // 查询
				}
			},
			showProp(val) {
				if (val) {
					this.listPageObj.selectIdList = []
					this.pdlist = []
				} else {
					this.pdlist = []
				}
			},
			isShowLoading(val) {
				if (val) {
					this.mescroll.resetUpScroll(true)
					this.isShowLoading = false
				}
			}
		}
	}
</script>
<style lang="scss">
	@import '../../assets/styles/util.scss';
	.scroll-list-wrapper {
	// overflow: auto;
		position:relative;
		width: 100%;
		.list-title {
    		display: flex;
    		padding: 10px 0px;
    		// text-align: center;
			height:40px;
    		border-bottom: 1px solid #ddd;
    		// align-items: center;
    		justify-content: left;
    		p:nth-child(1) {
				margin-left: 42px;
    		}
    		p:not(.checkbox) {
				flex: 1;
    		}
		}
		.list-content {
			overflow: auto;
			width: 100%;
			// .mescroll-empty:nth-last-child(1) {
			// 	display: none;
			// }
			.el-checkbox__label {
				display: none;
			}
			.role-list-item {
				width: 100%;
				display: flex;
				cursor: pointer;
				height:39px;
				line-height:39px;
				padding:0 !important;
	    		// justify-content: space-around;
	    		// text-align: center;
	    		padding: 10px 0px;
	    		// align-items: center;
	    		p:nth-child(1) {
					// width: 30px;
					margin: 0 15px;
    			}
    			p:not(.checkbox) {
					flex: 2;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					margin-right: 10px;
					cursor: pointer;
					z-index:1000;
    			}
    			&.active {
					background: #f2f2f2;
    			}
			}
			.loading {
				margin-top: 10px;
			}
		}
	}
</style>