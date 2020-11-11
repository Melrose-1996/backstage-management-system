<template>
	<div class="wecome-my-approval-new-cluster">
       	<el-card class="box-card">
			<div slot="header" class="clearfix">
			    <span>新建集群申请单</span>
			    <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
			</div>
			<div>
			   	<el-form ref="clusterForm" :model="form" :rules="formRules" label-width="100px">
					<el-row>
						<el-col :span="8">
							<el-form-item label="集群中文名" prop="cname">
								<el-input
									class="m-input"
									v-model="form.cname"
									placeholder="请输入集群中文名">
								</el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="集群英文名" prop="cname">
								<el-input
									class="m-input"
									v-model="form.ename"
									placeholder="请输入集群英文名">
								</el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="集群管理员" prop="cname">
								<el-input
									class="m-input"
									v-model="form.administrators"
									placeholder="企业微信拼音名,多个分号隔开">
								</el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row style="margin-top: 20px;">
						<el-col :span="21">
							<el-form-item label="集群集群描述" prop="cname">
								<el-input
									type="textarea"
									:autosize="{ minRows: 2, maxRows: 4}"
									placeholder="请输入内容"
									v-model="form.desc">
								</el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row style="margin-top: 20px;">
						<el-col :span="24">
							<el-form-item label="可用区" prop="cname">
								<div>
							    	<el-radio v-model="form.availableArea" label="1" border size="medium">深圳IDC</el-radio>
							    	<el-radio v-model="form.availableArea" label="2" border size="medium">武汉IDC</el-radio>
							  	</div>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row style="margin-top: 20px;">
						<el-col :span="24">
							<el-form-item label="集群类型" prop="cname">
								<div>
							    	<el-radio v-model="form.clusterType" label="1" border size="medium" disabled>
							    		HADOOP
							    	</el-radio>
							  	</div>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row style="margin-top: 20px;">
						<el-col :span="24">
							<el-form-item label="产品版本" prop="cname">
								<el-select v-model="form.version" placeholder="请选择" class="m-input">
								    <el-option
								      v-for="item in options"
								      :key="item.value"
								      :label="item.label"
								      :value="item.value">
								    </el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row style="margin-top: 20px;">
						<el-col :span="24">
							<el-form-item label="必选组件" prop="cname">
								<el-checkbox-group v-model="form.mustComponents" size="medium" disabled>
							      	<el-checkbox :label="1" border>zookeeper 3.6.1</el-checkbox>
							      	<el-checkbox :label="2" border>knox 1.2.0</el-checkbox>
							      	<el-checkbox :label="3" border>hadoop 2.8.5</el-checkbox>
							    </el-checkbox-group>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row style="margin-top: 20px;">
						<el-col :span="24" class="optional-components">
							<el-form-item label="可选组件" prop="cname">
								<el-checkbox-group v-model="form.optionalComponents" size="medium">
							      	<el-checkbox :label="1" border>ranger 1.2.0</el-checkbox>
							      	<el-checkbox :label="2" border>spark_hadoop 2.8.3.0.0</el-checkbox>
							      	<el-checkbox :label="3" border>sqoop 1.4.7</el-checkbox>
							      	<el-checkbox :label="4" border>sqoop 1.4.7</el-checkbox>
							      	<el-checkbox :label="5" border>toz 0.9.2</el-checkbox>
							      	<el-checkbox :label="6" border>zeppelin 0.8.2</el-checkbox>
							      	<el-checkbox :label="7" border>livy 0.7.0</el-checkbox>
							      	<el-checkbox :label="8" border>flume 1.9.0</el-checkbox>
							      	<el-checkbox :label="9" border>hbase 1.4.9</el-checkbox>
							      	<el-checkbox :label="10" border>hive 2.7.3</el-checkbox>
							      	<!-- <el-checkbox :label="11" border></el-checkbox> -->
							    </el-checkbox-group>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24">
							<el-form-item label="kerberos模式" prop="cname">
								<el-checkbox v-model="form.kerberos" label="开启Kerberos认证" border size="medium"></el-checkbox>
								<span style="font-size: 12px;color: #666;">开启后，集群中的开源组件以 Kerberos 的安全模式启动。</span>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row style="margin: 30px 0 20px 0;">
						<el-col :span="24" style="text-align: center;">
							<el-button type="primary">提交申请</el-button>
						</el-col>
					</el-row>
				</el-form>
			</div>
		</el-card>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				clusterForm: {},
				form: {
					version: '1',
					cname: '',
					ename: '',
					mustComponents: [1, 2, 3],
					optionalComponents: [1, 2, 3]
				},
				options: [{
					value: '1',
          			label: 'EMR V1.0'
				}],
				formRules: {}
			}
		},
		created() {
		},
		destroyed() {
		},
		computed: {
		},
		methods: {
		},
		watch: {
		}
	}
</script>
<style lang="scss">
	.wecome-my-approval-new-cluster {
		.optional-components {
			.el-checkbox-group {
				display: flex;
				flex-wrap: wrap;
				.el-checkbox {
					margin-left: 0;
					margin-bottom: 20px;
				}
			}
		}
	}
</style>