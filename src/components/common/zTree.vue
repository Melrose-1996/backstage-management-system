<template>
	<el-tree
		class="elTree"
		ref="tree"
		:data="zNodes"
		:props="defaultProps"
		show-checkbox
		:default-checked-keys="trueNode"
		node-key="id"
		highlight-current
		@check-change="getSelect">
		<!--
			data 展示数据
			props 配置选项
			default-expand-all 是否默认展开所有节点
			show-checkbox 节点是否可被选择
			default-checked-keys 默认勾选的节点的 key 的数组
			node-key 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的
			highlight-current 是否高亮当前选中节点，默认值是 false。
		-->
		<span class="custom-tree-node" slot-scope='{node, data}'>
            <span>
                <i v-if="data.icon" :class='data.icon'></i>{{ node.label }}
            </span>
        </span>
	</el-tree>
</template>
<script>
	export default {
		data () {
			return {
				defaultProps: { // 右侧弹出框结构设定
					children: 'children',
					label: 'name'
				},
				trueNode: [], // 默认勾选组成的数组
				zNodes: [] // 弹框权限集合
			}
		},
		props: {
			listData: { // 传过来未处理的数组
				type: [Array, Object]
			},
			checkStrictly: {
				type: Boolean,
		        default: true
			},
			isShowAll: { // 如果为false返回选中的列表,否则返回所有列表
				type: Boolean,
		        default: true
			},
			isDisabled: { // 是否启用禁用
				type: Boolean,
				default: false
			}
    	},
		created () {
		},
		methods: {
			toTreeData(data, checkStrictly, isShowAll) {
				if (data.length == 0) {
					this.zNodes = []
					return
				}
				// 清空zNodes数据
                this.zNodes = []
                this.trueNode = []
				// 获取根数据
				let level0 = []
				let level1 = []
				let level2 = []
				let level3 = []
                let level4 = []
                let level5 = []
				data.map(item => {
                    if (item.level == 0) {
                        level0.push(this.compileTreeData(item))
                    } else if (item.level == 1) {
                        level1.push(this.compileTreeData(item))
                    } else if (item.level == 2) {
                        level2.push(this.compileTreeData(item))
                    } else if (item.level == 3) {
                        if (isShowAll) {
                            level3.push(this.compileTreeData(item))
                        } else {
                            if (item.check == 1) {
                                level3.push(this.compileTreeData(item))
                            }
                        }
                    } else if (item.level == 4) {
                        if (isShowAll) {
                            level4.push(this.compileTreeData(item))
                        } else {
                            if (item.check == 1) {
                                level4.push(this.compileTreeData(item))
                            }
                        }
                    } else if (item.level == 5) {
                        if (isShowAll) {
                            level5.push(this.compileTreeData(item))
                        } else {
                            if (item.check == 1) {
                                level5.push(this.compileTreeData(item))
                            }
                        }
                    }
                })
                if (level0.length == 0) {
                    return
                }
                // 将第五级子节点挂载在其父节点上
				if (level5.length > 0) {
					level4.forEach((item, index) => {
						level5.forEach((cur) => {
							if (cur.parentId == item.id) {
								item.children.push(cur)
                            }
                            if (checkStrictly) {
                                if (cur.check == 1) { // 没儿子节点且选中时打勾
                                    this.trueNode.push(cur.id)
                                }
                            } else {
                                if (cur.children.length == 0 && cur.check == 1) { // 有儿子节点且选中时打勾
                                    this.trueNode.push(cur.id)
                                }
                            }
                        })
					})
				}
				if (level4.length > 0) {
					level3.forEach((item, index) => {
						level4.forEach((cur) => {
							if (cur.parentId == item.id) {
								item.children.push(cur)
                            }
                            if (checkStrictly) {
                                if (cur.check == 1) { // 没儿子节点且选中时打勾
                                    this.trueNode.push(cur.id)
                                }
                            } else {
                                if (cur.children.length == 0 && cur.check == 1) { // 有儿子节点且选中时打勾
                                    this.trueNode.push(cur.id)
                                }
                            }
                        })
					})
				}

				if (level3.length > 0) {
					level2.forEach((item, index) => {
						level3.forEach((cur) => {
							if (cur.parentId == item.id) {
								item.children.push(cur)
                            }
                            if (checkStrictly) {
                                if (cur.check == 1) { // 没儿子节点且选中时打勾
                                    this.trueNode.push(cur.id)
                                }
                            } else {
                                if (cur.children.length == 0 && cur.check == 1) { // 有儿子节点且选中时打勾
                                    this.trueNode.push(cur.id)
                                }
                            }
                        })
					})
				}

				if (level2.length > 0) {
					level1.forEach((item, index) => {
						level2.forEach((cur) => {
							if (cur.parentId == item.id) {
								item.children.push(cur)
                            }
                            if (checkStrictly) {
                                if (cur.check == 1) { // 没儿子节点且选中时打勾
                                    this.trueNode.push(cur.id)
                                }
                            } else {
                                if (cur.children.length == 0 && cur.check == 1) { // 有儿子节点且选中时打勾
                                    this.trueNode.push(cur.id)
                                }
                            }
                        })
					})
                }

                if (level1.length > 0) {
                    level0.forEach((item, index) => {
                        level1.forEach(cur => {
                            if (cur.parentId == item.id) {
								item.children.push(cur)
                            }
                            if (checkStrictly) {
                                if (cur.check == 1) { // 没儿子节点且选中时打勾
                                    this.trueNode.push(cur.id)
                                }
                            } else {
                                if (cur.children.length == 0 && cur.check == 1) { // 有儿子节点且选中时打勾
                                    this.trueNode.push(cur.id)
                                }
                            }
                        })
					    this.zNodes.push(item)
                    })
                }
            },
            // 将后端数据编译成ztree要求的
			compileTreeData(data) {
				let objTemp = {
					id: data.id,
					name: data.name,
					order: data.level,
					parentId: data.parentId,
					check: data.check,
					disabled: data.edit == 2 || this.isDisabled,
					resourceType: data.resourceType,
					children: [],
					icon: data.resourceType == 1 ? 'iconfont icon-yingyong' : data.resourceType == 2 ? 'iconfont icon-jiaose' : data.resourceType == 3 ? 'iconfont icon-fenji' : data.resourceType == 4 ? 'iconfont icon-yemian' : ''
				}
				return objTemp
			},
			getSelect() { // 选中的ID集合
				let zTreeSelectedId = [...this.$refs.tree.getCheckedKeys(), ...this.$refs.tree.getHalfCheckedKeys()]
				this.$emit('zTreeSelectedId', zTreeSelectedId)
			}
		},
		watch: {
			listData(val) {
				if (val) {
					this.toTreeData(this.listData, this.checkStrictly, this.isShowAll)
				}
			}
		}
	}
</script>
<style lang="scss">
 @import '../../assets/styles/util.scss';
	.custom-tree-node i{
	width:20px !important;
	height:19px !important;
	line-height:19px !important;
	display:inline-block !important;
	position: static !important;
	padding:0 !important;
	top:0 !important;
}
</style>
