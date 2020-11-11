## 最重要一点，id用_，class用-
1.所有router的name要是唯一，取名规则需要带项目的文件夹的缩写，驼峰规则  

2.所有vue里面，最外一层div类的取名规则是router里面的name名称加wrapper，例如：应用配置router配置的name是syssConfiguration,
则对应vue文件中最外层div的class取值为syss-configuration-wrapper。此vue对应的style所有的样式都包含在syss-configuration-wrapper中，并且不能使用scope.  

3.使用到ctable的控件，ctable的id必须在整个项目中都是唯一，取名规则是此项目名称缩写前缀（例如：syss）+ vue文件名称
(例如：appConfiguration缩写ac)+后缀，后缀可以随便取值,因此，appConfiguration.vue里面table的缩写为syss_ac_table14  

4.所有pages/ 下面的vue页面文件  methods中必须写一个resetAll 函数 用来初始化当前页面  

5.所有pages/ 下面的vue页面文件有用到dialog弹窗的  methods中必须写一个dialogAllHide 函数 用来让所有的dialog的 visible数据 置为false

6.多用es6 能用es6的就用es6 (async 慎用 免得性能问题, 会的随便用)

7.settimeout setInterval 用了一定要销毁

8.注释要全 特别是data/computed 里面定义的数据含义 methods里面的函数作用

9.代码尽量复用 能用公共方法一定要用 后期好维护

10.加减乘除必须用公用方法 表格校验尽量用公用表格校验 没有的自行编写

11.v-for 记得加:key 防止渲染顺序不对
## 文件目录
```
    -api  api文件
    -assets  图片/i18n/css
    -components  组件
        --common  公用组件
            ---airlines  航司
            ---ctable  表格
            ---customSelect  输入框(可输,可选,可本地搜索)
            ---echarts  图标
            ---selectAirportWithCityName  选机场
            ---selectAllRegion  省市区
            ---selectCity  选城市
            ---upload  上传
    -directives  指令
        --v-dialogDrag  dialog弹框可拖拽
        --v-has  按钮权限控制
    -pages  页面
    -router  路由
    -store  vuex
    -util  公用函数
        --axios  请求axios
        --common  公用函数
        --download  文件导出
        --filters  过滤器
        --formValid  表单校验
        --globalData  公用数据,本地缓存
        --LodopFuncs  打印插件
```
## 样式说明
```
    一 dialog
        1. dialog 默认不显示 右上角 X 特殊需要要示(css,display控制)
        2. 按钮默认居左显示, 如果不是的,自行调位置
        3. width 自行调节 最好给死的px值 不用百分比 防止 屏幕过小 显示错位
    二 message
        1. 表单点击保存的时候 校验不通过 需message提示 (调用公用common.formValidFail方法)
        2. message error类型 要尽量少用  级别太高(尽量用warning)  上级反馈说 怕吓着用户
        3. 关于表格多选框  选一个 或者选多个的提示 用公用方法 已经写好 便于国际化
    三 input button
        1. input 除个性化表单之外 用共有样式 搜索部分: s-input  表单默认用 m-input 或者 l-input(自定义需求随便)
        2. input的placehoder 没有特殊需求 全部置为空
        3. button 指定 size="small" 表单提交 dialog弹窗表单 size默认(不写该属性)
        4. button 文字 两个字的加 图标 >2个字的全文字不要图标
        5. 导出统一用 type= 'info'
        6. 支持多选的button的用el-badge 包起来  文字显示(可多选) 用公用样式 button-multiple
        7. 新做的页面，button样式分6种
			<el-button>默认按钮</el-button>
			<el-button type="primary">蓝色按钮</el-button>
			<el-button type="info">白色按钮</el-button>
			<el-button type="danger">红色按钮</el-button>
			<el-button type="success">绿色按钮</el-button>
			<el-button disabled>禁止按钮</el-button>

    四 ctable
        1. 表格除非特殊需求 全部用多选框 (防止前期用单选后期该需求变多选)
        2. 勾选框  跟表格行点击事件(表格行单击主要是用来实现父子表格) 严格区分  不可耦合
        3. 表格第一列 自动flxed 宽度 固定
        4. 尽量用input框展示搜索条件 保持统一  不要用checkbox switch radio 之内的
        5. 对列表数据的操作按钮 原则上全部放在表格上方 (不建议放在列表里面,要多写代码,权限验证又要重复写代码,还不方便)
        6. 非父子表格,不需要表格title
    五 form
        1. 所有表单的input 除特殊要求 placeholder置为空  表格校验 配合  <el-form-item></el-form-item> 来做 必填的用红*标识
        2. 校验尽量用公用校验方法 自定义除外 必填的 不需要加 clearable 非必填的select 加 clearable属性
        3. 表格清空 用element重置 可能有问题 如有问题可配合一个延时器来做

    六 cDialog
        参数:
        :visible.sync="" // 是否显示
        :title="appTitle"  // 标题
        limitArea=""  // 限定区域的id 
        width="650" 
        height="385"

        <c-dialog :visible.sync="isShowAddApp" :title="appTitle" limitArea="subject_main_section" width="650" height="385">
            // 操作内容区域
			<div slot="cDialogBtn">
            // 单独独立出btn的区域
			</div>
		</c-dialog>
    7.cButton 
    参数:
    需在父组件实现 destroyCButton 方法 
    // 销毁自身 通过操作数组实现
    destroyCButton(index) {
        this.roleBtnList.splice(index, 1);
    },
    <c-button :key="index" v-for="(item, index) in roleBtnList" @destroyCButton="destroyCButton(index)">{{item}}</c-button>  

    8. tTable 分页
    父组件向table组件传递分页相关配置 
    tablePageObj: { // 分页
        totalCount: 0,
        currentPage: 1,
        pageSize: 10,
        pageSizeOption: [10, 20, 30, 40],
        callback: this.getMemberList
    },
    this.getMemberList 获取表格数据
    totalCount 总条数 后端返回总条数数量
    pageSizeOption 分页条数

 七 关于图标icon的引用：
    1. 目前已经将icon的矢量图库上传到文件夹下（atp-front-portal\src\assets\fonts）, 在main.js引入了公用矢量图iconfont.css（该步骤可以忽略，知晓就行）
    2. 从assets\fonts下的demo_fontclass.html里挑选相应图标并获取类名，应用于页面：<i class="iconfont icon-xxx"></i>即可。
    3. 若想更改矢量图颜色，请在css写,如：icon-xxx{color: #ccc}; 若想更改矢量图大小， 请在css写,如:icon-xxx{font-size: 30px;}

 八 关于图标icon创建步骤如下：
    1. 首先要求UI提供SVG图标，然后将svg图标上传到阿里矢量库iconfont： https://www.iconfont.cn,  iconfont参与项目是atp-front-portal（阿里矢量库仅仅是转换矢量图的工具）
    2. 然后将阿里icon矢量图包，下载至本地，将icon整个矢量图包 上传至开发环境atp-front-portal上，文件路径是：atp-front-portal\src\assets\fonts.
    

