<template>
    <div class="syss-app-configuration-wrapper default-theme" id="syss_app_configuration_wrapper">
        <el-row class="search-wrapper">
            <el-col :span="8">
                <el-button v-has="'r01010101'" size="small" type="primary" @click="showAddApp">
                    <i class="el-icon-plus"></i> 新增应用</el-button>
                <el-button v-has="'r01010102'" size="small" type="primary" @click="showAddSource">
                    <i class="el-icon-plus"></i> 新增资源</el-button>
                <el-button v-has="'r01010103'" size="small" type="info" @click="deleteResource">删除</el-button>
            </el-col>
        </el-row>
        <div class="main-wrapper">
            <div class="tree-info-wrapper padding-bottom">
                <p class="title">
                    <span class="bl-label">应用资源库</span>
                </p>
                <el-row>
                    <el-col>
                        <div>
                            <el-tree
                                ref="resourceTree"
                                :data="appResourceTree"
                                node-key="id"
                                draggable
                                :allow-drop="allowDrop"
                                :allow-drag="allowDrag"
                                @node-drop="handleDrop"
                                :highlight-current="true"
                                @node-click="getCurrentNode"
                                :default-expanded-keys="currentChooseTreeKeys">
                                <span class="custom-tree-node" slot-scope='{node, data}'>
                                    <span>
                                        <i v-if="data.icon" :class='data.icon'></i>{{ node.label }}
                                    </span>
                                </span>
                            </el-tree>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="app-info">
                <p class="title">
                    <span class="bl-label">详细信息</span>
                </p>
                <el-form :model="appInfoForm" ref="appInfoForm" :rules="appInfoFormRules" label-width="80px">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="应用编码">
                                <el-input class="m-input" v-model="appInfoForm.applicationCode" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="状态">
                                <el-switch type="success" active-color="#2bcf9d" v-model="appInfoForm.applicationStatus" :disabled="appInfoDisabled">
                                </el-switch>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="应用名称">
                                <el-input class="m-input" v-model="appInfoForm.applicationName" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="应用类型">
                                <el-input class="m-input" v-model="appInfoForm.terminalChannelTypeName" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-form-item label="描述">
                                <el-input class="l-input" v-model="appInfoForm.description" :disabled="appInfoDisabled"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-form-item label="链接地址">
                                <el-input class="l-input" v-model="appInfoForm.linkAddress" :disabled="appInfoDisabled"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <p class="form-line"></p>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="资源编码" v-if="currentTreeNode.resourceType == 1">
                                <el-input class="m-input" v-model="appInfoForm.resourceCode" :disabled="resourceInfoDisabled"></el-input>
                            </el-form-item>
                            <el-form-item label="资源编码" prop="resourceCode" v-else>
                                <el-input class="m-input" v-model="appInfoForm.resourceCode" :disabled="resourceInfoDisabled"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="父资源">
                                <el-input class="m-input" v-model="appInfoForm.resourceParent" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="资源名称" v-if="currentTreeNode.resourceType == 1 || currentTreeNode.resourceType == 2">
                                <el-input class="m-input" v-model="appInfoForm.name" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="资源名称" prop="name" v-else>
                                <el-input class="m-input" v-model="appInfoForm.name" :disabled="resourceInfoDisabled"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="资源类型">
                                <el-input class="m-input" v-model="appInfoForm.resourceTypeName" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="资源描述">
                                <el-input class="m-input" v-model="appInfoForm.resourceDescription" :disabled="resourceInfoDisabled"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="排序序号">
                                <el-input class="m-input" v-model="appInfoForm.displayIndex" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="链接地址" prop="resourceLinkAddress" v-if="currentTreeNode.resourceType == 4">
                                <el-input class="l-input" v-model="appInfoForm.resourceLinkAddress" :disabled="resourceInfoDisabled"></el-input>
                            </el-form-item>
                            <el-form-item label="链接地址" v-else>
                                <el-input class="l-input" v-model="appInfoForm.resourceLinkAddress" :disabled="resourceInfoDisabled"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="ajax地址" v-if="resourceInfoDisabled">
                                <el-input
                                    type="textarea"
                                    class="detail-textarea"
                                    v-model="appInfoForm.ajaxUrls"
                                    :autosize="{minRows: 6, maxRows: 8}"
                                    :disabled="true">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="ajax地址" v-else>
                                <el-input
                                    type="textarea"
                                    class="detail-textarea"
                                    :autosize="{minRows: 6, maxRows: 8}"
                                    v-model="appInfoForm.ajaxUrls">
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-form-item>
                                <el-button v-has="'r01010104'" size="small" type="primary" @click.native="modifyDetailInfo" plain>修改</el-button>
                                <el-button v-has="'r01010105'" size="small" type="primary" @click.native="saveModifyDetailInfo" :loading="ajaxLoading">保存</el-button>
                                <el-button v-has="'r01010106'" size="small" type="info" @click.native="closeModifyDetailInfo">取消</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </div>

        <c-dialog :visible.sync="isShowAddApp" title="新增应用" limitArea="subject_main_section" width="650">
            <el-form :model="addAppForm" ref="addAppForm" class="dialog-form" :rules="addAppFormRules" label-width="80px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="应用编码" prop="applicationCode">
                            <el-input class="m-input" v-model="addAppForm.applicationCode"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="应用名称" prop="applicationName">
                            <el-input class="m-input" v-model="addAppForm.applicationName"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="描述" prop="description">
                            <el-input class="m-input" v-model="addAppForm.description"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="应用类型" prop="terminalChannelType">
                            <el-select class="m-input" v-model="addAppForm.terminalChannelType" placeholder="请选择">
                                <el-option v-for="item in appTypeOption" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="链接地址" prop="linkAddress">
                            <el-input class="l-input" v-model="addAppForm.linkAddress"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <el-form-item label="状态" prop="applicationStatus">
                            <el-switch type="success" active-color="#2bcf9d" v-model="addAppForm.applicationStatus">
                            </el-switch>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer">
                <el-button size="medium" type="primary" @click.native="addAppOperation" :loading="ajaxLoading">保存</el-button>
                <el-button size="medium" type="info" @click.native="isShowAddApp=!isShowAddApp">取消</el-button>
            </div>
        </c-dialog>

        <c-dialog :visible.sync="isShowAddSource" title="新增资源" limitArea="subject_main_section" width="480">
            <el-form :model="addSourceForm" ref="addSourceForm" :rules="addSourceFormRules" class="dialog-form" label-width="120px">
                <el-row>
                    <el-col>
                        <el-form-item label="父资源" prop="parentResource">
                            <el-input class="m-input" v-model="addSourceForm.parentResource" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <el-form-item label="资源编码" prop="resourceCode">
                            <el-input class="m-input" v-model="addSourceForm.resourceCode"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <el-form-item label="资源类型" prop="resourceTypeName" v-if="currentTreeNode.resourceType == 1 && currentTreeNode.parentId != 1">
                            <el-input class="m-input" v-model="addSourceForm.resourceTypeName" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="资源类型" prop="resourceType" v-else>
                            <el-select class="m-input" v-model="addSourceForm.resourceType">
                                <el-option v-for="item in resourceTypeOption" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <el-form-item label="资源名称" prop="businessRoleCode" v-if="currentTreeNode.resourceType == 1 && currentTreeNode.parentId != 1">
                            <el-select class="m-input" v-model="addSourceForm.businessRoleCode">
                                <el-option v-for="item in currentBusinessRoleData" :key="item.businessRoleCode" :label="item.businessRoleName" :value="item.businessRoleCode">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="资源名称" prop="name" v-else>
                            <el-input class="m-input" v-model="addSourceForm.name"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <el-form-item label="资源描述" prop="description">
                            <el-input class="m-input" v-model="addSourceForm.description"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col>
                        <!-- 只有新增资源为菜单时，链接地址为必填 -->
                        <el-form-item label="链接地址" prop="linkAddress" v-if="addSourceForm.resourceType == 4">
                            <el-input class="m-input" v-model="addSourceForm.linkAddress"></el-input>
                        </el-form-item>
                        <el-form-item label="链接地址" v-else>
                            <el-input class="m-input" v-model="addSourceForm.linkAddress"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col>
                        <el-form-item label="ajax地址" prop="ajaxUrls">
                            <el-input
                                type="textarea"
                                class="resource-textarea"
                                v-model="addSourceForm.ajaxUrls">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer">
                <el-button size="medium" type="primary" @click.native="addResourceOperation" :loading="ajaxLoading">保存</el-button>
                <el-button size="medium" type="info" @click.native="isShowAddSource=!isShowAddSource">取消</el-button>
            </div>
        </c-dialog>
    </div>
</template>

<script>
	import {
		baseRule
	} from '@/util/formValid'
	// import {
	// 	saveApplication,
	// 	saveResource,
	// 	sortResource,
	// 	getAllResource,
	// 	getResourceType,
	// 	deleteResource,
	// 	getResourceInfo,
	// 	updateResource
	// } from '@/api/systemSetting/appManagement'
	import util from '@/util/common'
	import resource from '@/mockData/resource.json'
	import l1 from '@/mockData/l1.json'
	import CDialog from '@/components/common/cDialog'

	export default {
		components: {
			CDialog
		},
		created() {
			this.getAllResourceTree()
			// this.getResourceType()
		},
		data() {
			return {
				appTitle: '', // 修改 or 新增应用
				isShowAddApp: false, // 新增应用弹框
				addAppForm: {
					applicationCode: '',
					applicationName: '',
					description: '',
					terminalChannelType: '',
					linkAddress: '',
					applicationStatus: false // 1.启用、2.停用
				},
				appTypeOption: [{ // 应用类型
					value: '1',
					label: 'Web端'
				}, {
					value: '2',
					label: 'APP端'
				}, {
					value: '3',
					label: '微信公众号'
				}],
				appInfoForm: { // 应用信息
					applicationCode: '',
					applicationStatus: false,
					applicationName: '',
					terminalChannelType: '',
					terminalChannelTypeName: '',
					description: '',
					linkAddress: '',
					resourceCode: '',
					resourceParent: '',
					name: '',
					resourceType: '',
					resourceTypeName: '',
					resourceDescription: '',
					displayIndex: '',
					ajaxUrls: '',
					businessRoleCode: '',
					resourceLinkAddress: ''
				},
				appInfoFormRules: {
					resourceCode: baseRule,
					name: baseRule,
					resourceLinkAddress: baseRule
				},
				addAppFormRules: {
					applicationCode: baseRule,
					applicationName: baseRule,
					terminalChannelType: baseRule
				},
				isShowAddSource: false, // 新增资源弹框
				currentTreeNode: [], // 当前选择树节点包含的信息
				currentBusinessRoleData: [], // 当前业务角色名称，即货主 货代 供应商
				resourceTypeOption: [],
				addSourceForm: {
					parentResource: '',
					parentId: '',
					name: '',
					resourceCode: '',
					resourceType: '',
					resourceTypeName: '',
					businessRoleCode: '',
					linkAddress: '',
					description: '',
					ajaxUrls: ''
				},
				addSourceFormRules: {
					parentResource: baseRule,
					resourceCode: baseRule,
					resourceTypeName: baseRule,
					name: baseRule,
					resourceType: baseRule,
					businessRoleCode: baseRule,
					linkAddress: baseRule
				},
                appResourceTree: [],
                currentChooseTreeKeys: [], // 定位到当前所在的节点上
				defaultProps: {
					children: 'children',
					label: 'label'
				},
				appInfoDisabled: true, // 应用信息禁止更改标志位
				resourceInfoDisabled: true, // 资源信息
				ajaxLoading: false
			};
		},
		watch: {
			isShowAddApp(val) {
				if (!val) {
					this.resetForm()
				}
			},
			isShowAddSource(val) {
				if (!val) {
					this.resetForm()
				}
			}
		},
		methods: {
			showAddApp(type) { // 新增或者修改应用弹框
				if (this.currentTreeNode.length == 0) {
					this.$message({
						type: 'warning',
						message: '请选择一条资源'
					})
					return
				}
				if (this.currentTreeNode.parentId != 0) {
					this.$message({
						type: 'warning',
						message: '请选择一条根资源'
					})
					return
				}
				this.isShowAddApp = true;
			},
			allowDrop(draggingNode, dropNode, type) {
				// 同级才能挪动 && 不能成为另一节点的子集 && 不同父节点之间不能挪动
				if (draggingNode.level == dropNode.level && type != 'inner' && draggingNode.data.parentId == dropNode.data.parentId) {
					return true;
				}
				return false;
			},
			allowDrag(draggingNode) {
				return true;
			},
			// 拖拽成功完成时触发的事件
			handleDrop(before, after, inner) {
				// sortResource({
				// 	fromId: before.data.id,
				// 	toId: after.data.id,
				// 	onOrUnder: inner == 'before' ? 1 : 2
				// })
			},

			// 提交新增app
			addAppOperation() {
				this.$refs.addAppForm.validate((valid) => {
					if (valid) {
						let params = {
							...this.addAppForm
						}
						params.applicationStatus = params.applicationStatus ? 1 : 2
						params.parentId = this.currentTreeNode.id
						this.ajaxLoading = true
						// saveApplication(params).then(res => {
						// 	if (res.code == 0) {
						// 		this.$message({
						// 			type: 'success',
						// 			message: res.detail
						// 		})
						// 		this.isShowAddApp = false
						// 		this.getAllResourceTree()
						// 	} else {
						// 		this.$message({
						// 			type: 'error',
						// 			message: res.detail
						// 		})
						// 	}
						// 	this.ajaxLoading = false
						// }).catch(() => {
						// 	this.ajaxLoading = false
						// })
					}
				})
			},

			getAllResourceTree() {
				let res = resource;
				if (res.code == 0) {
					this.appResourceTree = util.toTreeData(res.entity)
                    this.reRenderTreeData()
				}
				// getAllResource().then(res => {
				// 	if (res.code == 0) {
				// 		this.appResourceTree = util.toTreeData(res.entity)
    //                     this.reRenderTreeData()
				// 	}
				// })
			},
			showAddSource() {
				if (this.currentTreeNode.length == 0) {
					this.$message({
						type: 'warning',
						message: '请选择一条资源'
					})
					return
				}
				if (this.currentTreeNode.parentId == 0) {
					this.$message({
						type: 'warning',
						message: '根资源不能新增资源'
					})
					return
				}
				if (this.currentTreeNode.resourceType == 5) {
					this.$message({
						type: 'warning',
						message: '按钮类型不能新增资源'
					})
					return
				}
				this.addSourceForm.parentResource = this.currentTreeNode.label
				this.addSourceForm.parentId = this.currentTreeNode.id

				// 当父资源的资源类型为应用（1）时，资源类型只能为分类
				if (this.currentTreeNode.resourceType == 1 && this.currentTreeNode.parentId != 1) {
					this.addSourceForm.resourceTypeName = '分类'
					this.addSourceForm.resourceType = 2 // resourceType  1 应用 2分类 3 菜单分类 4 菜单 5 按钮
				} else if (this.currentTreeNode.resourceType == 1 || this.currentTreeNode.resourceType == 2 || this.currentTreeNode
					.resourceType == 3) {
					this.addSourceForm.resourceTypeName = ''
					this.addSourceForm.resourceType = '' // resourceType  1 应用 2分类 3 菜单分类 4 菜单 5 按钮
					this.resourceTypeOption = [{
						value: '3',
						label: '菜单分类'
					}, {
						value: '4',
						label: '菜单'
					}, {
						value: '5',
						label: '按钮',
						disabled: true
					}]
				} else {
					this.addSourceForm.resourceTypeName = ''
					this.addSourceForm.resourceType = '' // resourceType  1 应用 2分类 3 菜单分类 4 菜单 5 按钮
					this.resourceTypeOption = [{
						value: '3',
						label: '菜单分类',
						disabled: true
					}, {
						value: '4',
						label: '菜单',
						disabled: true
					}, {
						value: '5',
						label: '按钮'
					}]
				}

				this.isShowAddSource = true
			},
			resetForm() {
				this.$refs['addAppForm'] && this.$refs['addAppForm'].resetFields();
				this.$refs['addSourceForm'] && this.$refs['addSourceForm'].resetFields();
				// resetFields方法并没有清空这个值
				this.addSourceForm.linkAddress = ''
			},
			// 获取当前树节点数据
			getCurrentNode(data, node, item) {
				this.currentTreeNode = data

				if (data.parentId != 0) {
					// 当点击不是应用时，才显示右侧数据
					this.getResourceInfo(data)
				} else {
					this.appInfoForm.applicationCode = '';
					this.appInfoForm.applicationStatus = false;
					this.appInfoForm.applicationName = '';
					this.appInfoForm.terminalChannelType = '';
					this.appInfoForm.terminalChannelTypeName = '';
					this.appInfoForm.description = '';
					this.appInfoForm.linkAddress = '';
					this.appInfoForm.resourceCode = '';
					this.appInfoForm.resourceParent = '';
					this.appInfoForm.name = '';
					this.appInfoForm.resourceType = '';
					this.appInfoForm.resourceTypeName = '';
					this.appInfoForm.resourceDescription = '';
					this.appInfoForm.displayIndex = '';
					this.appInfoForm.ajaxUrls = '';
					this.appInfoForm.businessRoleCode = '';
				}
				this.closeModifyDetailInfo()
			},

			/**
			 *  获取资源类型
			 *  资源类型为分类时，资源名称为下拉框，取值从这个接口里面拿
			 **/
			// getResourceType() {
			// 	let self = this
			// 	getResourceType().then(res => {
			// 		self.currentBusinessRoleData = res.entity
			// 	})
			// },

			// 提交新增资源
			addResourceOperation() {
				this.$refs.addSourceForm.validate((valid) => {
					if (valid) {
						let params = {
							...this.addSourceForm
						}
						/**
						 * resourceType：1 应用 2分类 3 菜单分类 4 菜单 5 按钮
						 * 父资源为应用，即this.currentTreeNode.resourceType == 1，则name为businessRoleName
						 * 父资源为应用，即this.currentTreeNode.resourceType == 2 || 3，则name为输入的资源名称
						 */
						if (this.currentTreeNode.resourceType == 1 && this.currentTreeNode.parentId != 1) {
							this.currentBusinessRoleData.map((cur, index, item) => {
								if (cur.businessRoleCode == params.businessRoleCode) {
									params.name = cur.businessRoleName
								}
							})
                        }
                        params.ajaxUrls = this.addSourceForm.ajaxUrls != '' ? this.addSourceForm.ajaxUrls.split(',') : []
						this.ajaxLoading = true
						// saveResource(params).then(res => {
						// 	if (res.code == 0) {
						// 		this.$message({
						// 			type: 'success',
						// 			message: res.detail
						// 		})
						// 		this.isShowAddSource = false
						// 		this.getAllResourceTree()
						// 	} else {
						// 		this.$message({
						// 			type: 'error',
						// 			message: res.detail
						// 		})
						// 	}
      //                       this.ajaxLoading = false
      //                       this.currentChooseTreeKeys.push(res.entity)
						// }).catch(() => {
						// 	this.ajaxLoading = false
						// })
					}
				})
			},

			// 删除资源
			deleteResource() {
				if (this.currentTreeNode.length == 0) {
					this.$message({
						type: 'warning',
						message: '请选择一条资源'
					})
					return
				}

				if (this.currentTreeNode.parentId == 0) {
					this.$message({
						type: 'warning',
						message: '根资源不能删除'
					})
					return
				}
				this.$confirm(`此操作将删除“${this.currentTreeNode.label}”及其所有子资源, 是否继续?`, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					// this.ajaxLoading = true
					// deleteResource({
					// 	id: this.currentTreeNode.id
					// }).then(res => {
					// 	if (res.code == 0) {
					// 		let deleteNode = this.$refs.resourceTree.getCurrentNode()
					// 		let parentNodeOfDeleteNode = deleteNode.parentId
					// 		this.$refs.resourceTree.setCurrentKey(parentNodeOfDeleteNode)
					// 		this.$refs.resourceTree.remove(deleteNode)
					// 		this.currentTreeNode = this.$refs.resourceTree.getCurrentNode()
					// 		this.getResourceInfo(this.currentTreeNode)
					// 		this.closeModifyDetailInfo()

					// 		this.$message({
					// 			type: 'success',
					// 			message: res.detail
					// 		});
					// 	} else {
					// 		this.$message({
					// 			type: 'error',
					// 			message: res.detail
					// 		});
					// 	}
					// 	this.ajaxLoading = false
					// }).catch(() => {
					// 	this.ajaxLoading = false
					// })
				});
			},

			/**
			 * 当重新刷新tree的数据的时候，会刷新掉当前选中的节点，需要重新选中当前选中的节点
			 * 为什么不用append来重建，因为后端没给完整的新增节点的数据
			 */
			reRenderTreeData() {
				if (this.currentTreeNode.length > 0) {
                    this.$refs.resourceTree.setCurrentKey(this.currentTreeNode.id)
				}
			},

			// 获取右边的详细信息
			getResourceInfo(data) {
				// getResourceInfo({
				// 	id: data.id
				// }).then(res => {
					console.log(data.id, 'dataid')
					let res = l1[data.id];
					if (res) {
						this.appInfoForm.applicationCode = res.applicationInfo.applicationCode
						this.appInfoForm.applicationStatus = res.applicationInfo.applicationStatus == 1
						this.appInfoForm.applicationName = res.applicationInfo.applicationName
						this.appInfoForm.terminalChannelType = res.applicationInfo.terminalChannelType
						this.getApplicationTypeName(this.appInfoForm.terminalChannelType)
						this.appInfoForm.description = res.applicationInfo.description
						this.appInfoForm.linkAddress = res.applicationInfo.linkAddress

						if (this.currentTreeNode.resourceType == 1) {
							this.appInfoForm.resourceCode = ''
							this.appInfoForm.resourceParent = ''
							this.appInfoForm.name = ''
							this.appInfoForm.resourceType = ''
							this.appInfoForm.resourceTypeName = ''
							this.appInfoForm.resourceDescription = ''
							this.appInfoForm.displayIndex = ''
							this.appInfoForm.resourceLinkAddress = ''
							this.appInfoForm.ajaxUrls = ''
							this.appInfoForm.businessRoleCode = ''
						} else {
							this.appInfoForm.resourceCode = res.resourceCode
							this.appInfoForm.resourceParent = this.$refs.resourceTree.getNode(this.currentTreeNode.parentId).data.label
							this.appInfoForm.name = res.name
							this.appInfoForm.resourceType = res.resourceType
							this.appInfoForm.resourceTypeName = res.resourceTypeName
							this.appInfoForm.resourceDescription = res.description
							this.appInfoForm.displayIndex = res.displayIndex
							this.appInfoForm.resourceLinkAddress = res.linkAddress
							this.appInfoForm.ajaxUrls = res.ajaxUrls.join(',')
							this.appInfoForm.businessRoleCode = res.businessRoleCode
						}

					}
				// })
			},

			// 点击详细信息中的修改按钮
			modifyDetailInfo() {
				if (this.currentTreeNode.length == 0) {
					return
				}
				if (this.currentTreeNode.resourceType != 1) {
					this.resourceInfoDisabled = false
				}
				this.appInfoDisabled = false
			},
			// 取消详细信息中的修改
			closeModifyDetailInfo() {
				if (this.currentTreeNode.length == 0) {
					return
				}
				this.resourceInfoDisabled = true
				this.appInfoDisabled = true
			},

			// 获取应用类型名称
			getApplicationTypeName(type) {
				this.appTypeOption.map((cur, index, item) => {
					if (type == cur.value) {
						this.appInfoForm.terminalChannelTypeName = cur.label
					}
				})
			},

			// 保存修改详细信息
			saveModifyDetailInfo() {
				if (this.resourceInfoDisabled == false || this.appInfoDisabled == false) {
					this.$refs.appInfoForm.validate((valid) => {
						if (valid) {
							let params = {}
							params.id = this.currentTreeNode.id
							params.application = {}
							params.application.applicationStatus = this.appInfoForm.applicationStatus ? 1 : 2
							params.application.linkAddress = this.appInfoForm.linkAddress
							params.application.description = this.appInfoForm.description
							if (this.currentTreeNode.resourceType != 1) {
								params.resourceCode = this.appInfoForm.resourceCode
								params.description = this.appInfoForm.resourceDescription
								params.linkAddress = this.appInfoForm.resourceLinkAddress
								params.ajaxUrls = this.appInfoForm.ajaxUrls != '' ? this.appInfoForm.ajaxUrls.split(',') : []
								params.name = this.appInfoForm.name
								params.businessRoleCode = this.appInfoForm.businessRoleCode
							}
							this.ajaxLoading = true
							// updateResource({
							// 	...params
							// }).then(res => {
							// 	if (res.code == 0) {
							// 		this.$message({
							// 			type: 'success',
							// 			message: res.detail
							// 		});
							// 		this.closeModifyDetailInfo()
							// 	}
							// 	this.ajaxLoading = false
							// }).catch(() => {
							// 	this.ajaxLoading = false
							// })
						}
					})
				}
			}
		}
	}

</script>

<style lang="scss">
	@import '../../../assets/styles/util.scss';
	.syss-app-configuration-wrapper {
		.custom-tree-node i{
			width:20px !important;
			height:19px !important;
			line-height:19px !important;
			display:inline-block !important;
			position: static !important;
			padding:0 !important;
			top:0 !important;
		}
		background: #fff;
		position: relative;
		width: 100%;
		padding: 20px 0 0 0;
		min-width: 1200px;

		.search-wrapper {
			margin-bottom: 20px;
			margin-left: 50px;
		}

		.main-wrapper {
			background: #fff;
			border-top: 1px solid #ddd;
			width: 100%;
			display: flex;
			align-items: stretch;
			min-height: 700px;

			.title {
				margin: 40px 0 25px;

				.bl-label {
					font-weight: bolder;
					font-size: 16px;
					color: $fc333;
					border-left: 4px solid $auxiliary1;
					text-indent: 20px;
					display: inline-block;
					height: 16px;
					line-height: 1;
				}
			}

			.tree-info-wrapper {
				width: 24%;
				max-height: 780px;
				border-right: 1px solid #ddd;
				margin-left: 20px;
				padding-right: 30px;
				padding-bottom: 20px;
				overflow: auto;

				.el-row {
					margin-left: 20px;
				}
			}

			.app-info {
				width: 70%;
				margin-left: 50px;

				.el-form {
					width: 650px;

					.el-row {
						margin-bottom: 12px;

						.l-input {
							input {
								width: 550px;
							}
						}

                        .detail-textarea {
                            width: 550px;
                        }
					}

				}

				.form-line {
					border-top: 1px dashed $borderColor;
					margin: 30px 0;
				}
			}
		}
	}
    .resource-textarea {
        width: 224px;
    }
</style>
