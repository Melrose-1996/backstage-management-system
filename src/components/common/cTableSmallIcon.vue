<template>
	<el-table-column :width="item.width" :fixed="item.fixed" :class-name="item.className">
		<template slot-scope="scope">
			<!-- 货代舱位维护 -->
			<template v-if="item.type == 'cabin_maintenance'">
				<div class="selectMark" v-if="scope.row.isWarnming == 0" @dblclick='item.showInfo(scope.row,scope.$index)' :title="scope.row.peakBeginDate + '-' + scope.row.peakEndDate + scope.row.peakTypeName">
					<div class="icon-top" :style="{backgroundColor: item.backgroundColor}">
						<span class="icon-text">{{item.name}}</span>
					</div>
					<div class="icon-bottom" :style="{borderTop: '8px solid ' + item.backgroundColor}"></div>
				</div>
			</template>
			<!-- 货主舱位维护 -->
			<template v-if="item.type == 'cabin_maintain'">
				<div class="selectMark" v-if="scope.row.isWarnming == 0 && scope.row.abilityCabin === 0 " @dblclick.stop='item.showInfo(scope.row,scope.$index)' :title="scope.row.peakBeginDate + '-' + scope.row.peakEndDate + scope.row.peakTypeName">
					<div class="icon-top" :style="{backgroundColor: item.backgroundColor}">
						<span class="icon-text">{{item.name}}</span>
					</div>
					<div class="icon-bottom" :style="{borderTop: '8px solid ' + item.backgroundColor}"></div>
				</div>
			</template>
			<!-- 散航发货 -->
			<template v-else-if="item.type == 'sf_delivery_goods'">
				<div class="selectMark" v-if="scope.row.transferTaskFlag != 0">
					<div class="icon-top" :style="{backgroundColor: item.backgroundColor}">
						<span class="icon-text">{{item.name}}</span>
					</div>
					<div class="icon-bottom" :style="{borderTop: '8px solid ' + item.backgroundColor}"></div>
				</div>
				<div class="select-mark-small" v-if="scope.row.urgentRecordFlag == 1" title="信息未录入">
					!
				</div>
			</template>
			<!-- 散航发货:异常列表 -->
			<template v-else-if="item.type == 'sf_delivery_goods_ecpt'">
				<div class="selectMark" v-if="scope.row.ecptStatus == 1">
					<div class="icon-top" :style="{backgroundColor: item.backgroundColor}">
						<span class="icon-text">{{item.name}}</span>
					</div>
					<div class="icon-bottom" :style="{borderTop: '8px solid ' + item.backgroundColor}"></div>
				</div>
			</template>
			<!-- 散航提货 -->
			<template v-else-if="item.type == 'sf_pick_up_goods'">
				<div class="selectMark" v-if="scope.row.ecptStatus == 1">
					<div class="icon-top" :style="{backgroundColor: item.backgroundColor}">
						<span class="icon-text">{{item.name}}</span>
					</div>
					<div class="icon-bottom" :style="{borderTop: '8px solid ' + item.backgroundColor}"></div>
				</div>
				<template v-if="scope.row.acceptDelayFlag == 1">
					<div v-if="scope.row.input" class="select-mark-small" title="航班延误 信息未录入">
						！
					</div>
					<div v-else class="select-mark-small" title="航班延误">
						！
					</div>
				</template>
				<template v-else>
					<div v-if="scope.row.input" class="select-mark-small" title="信息未录入">
						！
					</div>
				</template>
			</template>
			<!-- 全货机订舱 -->
			<template v-else-if="item.type == 'shipper_booking'">
				<div class="selectMark" v-if="scope.row.isCancel==1">
					<div class="icon-top" :style="{backgroundColor: item.backgroundColor}">
						<span class="icon-text">{{item.name}}</span>
					</div>
					<div class="icon-bottom" :style="{borderTop: '8px solid ' + item.backgroundColor}"></div>
				</div>
			</template>
			<!-- 散航批舱 -->
			<template v-else-if="item.type == 'cabin_capacity_operation'">
				<div class="selectMark" v-if="scope.row.reply == 2">
					<div class="icon-top" :style="{backgroundColor: item.backgroundColor[0]}">
						<span class="icon-text">{{item.name[0]}}</span>
					</div>
					<div class="icon-bottom" :style="{borderTop: '8px solid ' + item.backgroundColor[0]}"></div>
				</div>
				<div class="selectMark" v-else-if="scope.row.addOrSub == 2">
					<div class="icon-top" :style="{backgroundColor: item.backgroundColor[1]}">
						<span class="icon-text">{{item.name[1]}}</span>
					</div>
					<div class="icon-bottom" :style="{borderTop: '8px solid ' + item.backgroundColor[1]}"></div>
				</div>
				<div class="selectMark" v-else-if="scope.row.addOrSub == 1">
					<div class="icon-top" :style="{backgroundColor: item.backgroundColor[2]}">
						<span class="icon-text">{{item.name[2]}}</span>
					</div>
					<div class="icon-bottom" :style="{borderTop: '8px solid ' + item.backgroundColor[2]}"></div>
				</div>
			</template>
			<!-- 客户报价管理 全货机发货 全货机提货-->
			<template v-else-if="item.type == 'customer_quotation'">
				<div class="selectMark" v-if="scope.row[item.prop]==1">
					<div class="icon-top" :style="{backgroundColor: item.backgroundColor}">
						<span class="icon-text">{{item.name}}</span>
					</div>
					<div class="icon-bottom" :style="{borderTop: '8px solid ' + item.backgroundColor}"></div>
				</div>
			</template>
            <!-- 财务发票-开票信息(使用svg) -->
			<template v-else-if="item.type == 'invoice_info'">
				<div class="selectMark" v-if="scope.row[item.prop]==1">
                    <span :class="['iconfont', item.iconName]" :style="{color: item.backgroundColor}"></span>
				</div>
            </template>
            <!-- 主单异常备注 -->
			<template v-else-if="item.type == 'hwbNo_exception'">
				<!-- <el-tooltip :content="scope.row[item.prop]" placement="top"> -->
					<div class="selectMark"  v-if="scope.row[item.prop]" style="cursor: default" :title="scope.row[item.prop]">
						<div class="icon-top" :style="{backgroundColor: item.backgroundColor}">
							<span class="icon-text">{{item.name}}</span>
						</div>
						<div class="icon-bottom" :style="{borderTop: '8px solid ' + item.backgroundColor}"></div>
					</div>
				<!-- </el-tooltip> -->
            </template>
		</template>
	</el-table-column>
</template>
<script>
export default {
	data() {
		return {

		}
	},
	props: {
		item: {
			type: Object,
            default() {

			}
		}
	},
	methods: {

	}
}
</script>
<style lang="scss">
    @import '~assets/styles/util.scss';

    .table-mark {
        .cell {
            padding-left: 0px !important;
            padding-right: 0px !important;
        }
    }

	.select-mark-small {
		width: 16px;
		height: 16px;
		line-height: 16px;
		border-radius: 50%;
		text-align: center;
		cursor: pointer;
		color: white;
		background-color: $btnDanger;
	}
	.selectMark {
		position: absolute;
		top: 0;

		.icon-top {
			width: 46px;
			height: 18px;
			line-height: 12px;
			text-align: center;
			border-radius: 1px;

			.icon-text {
				line-height: 18px;
				text-align: center;
				font-size: 12px;
				color: white;
			}
		}
		.icon-bottom {
			border-radius: 1px;
			border: 22px solid transparent;
        }
        .icon-moren {
            font-size: 35px;
        }
    }
</style>
