<template>
  <div id='main' :style='styles'></div>
</template>
<script>
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts'
// 引入折线图
import 'echarts/lib/chart/line'
// 引入柱状图
import 'echarts/lib/chart/bar'
// 引入饼状图
import 'echarts/lib/chart/pie'
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/toolbox'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legendScroll'
import 'echarts/lib/component/dataZoom'
export default {
  props: {
    option: { // echart 配置参数
      type: Object,
      default: function () {
        return {}
      },
      required: true
    },
    styles: { // echart 配置参数
      type: Object,
      default: function () {
        return {}
      },
      required: true
    }
  },
  data () {
    return {}
  },
  created () {
  },
  mounted () {
    let myChart = echarts.init(document.getElementById('main'))
    // 指定图表的配置项和数据
    let option = this.option
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option)
  },
  destroyed () {
  },
  methods: {
  },
  watch: {
    option: {
      handler (newVal, oldVal) {
		let myChart = echarts.init(document.getElementById('main'))
		// 指定图表的配置项和数据
		let option = newVal
		// 使用刚指定的配置项和数据显示图表。
		console.log(option)
		myChart.setOption(option)
		console.log(myChart)
	  },
      deep: true
    }
  }
}
</script>
<style lang="less" scoped>
</style>