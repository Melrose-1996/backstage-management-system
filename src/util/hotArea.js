const HOT_CITY = [ // 热门城市
    {code: '110100', name: '北京市'},
    {code: '310100', name: '上海市'},
    {code: '440100', name: '广州市'},
    {code: '440300', name: '深圳市'},
    {code: '510100', name: '成都市'},
    {code: '330100', name: '杭州市'},
    {code: '420100', name: '武汉市'},
    {code: '610100', name: '西安市'},
    {code: '500100', name: '重庆市'},
    {code: '370200', name: '青岛市'},
    {code: '430100', name: '长沙市'},
    {code: '320100', name: '南京市'},
    {code: '350200', name: '厦门市'},
    {code: '530100', name: '昆明市'},
    {code: '210200', name: '大连市'},
    {code: '120100', name: '天津市'},
    {code: '410100', name: '郑州市'},
    {code: '460200', name: '三亚市'},
    {code: '370100', name: '济南市'},
    {code: '350100', name: '福州市'}
]
const HOT_CITY_PET = [ // 热门城市
    {code: '5025', name: '北京市'},
    {code: '5026', name: '上海市'},
    {code: '289', name: '广州市'},
    {code: '291', name: '深圳市'},
    {code: '467811123', name: '成都市'},
    {code: '8120001', name: '杭州市'},
    {code: '258', name: '武汉市'},
    {code: '438', name: '西安市'},
    {code: '5028', name: '重庆市'},
    {code: '224', name: '青岛市'},
    {code: '275', name: '长沙市'},
    {code: '490000001', name: '南京市'},
    {code: '204', name: '厦门市'},
    {code: '415', name: '昆明市'},
    {code: '108', name: '大连市'},
    {code: '5027', name: '天津市'},
    {code: '240', name: '郑州市'},
    {code: '325', name: '三亚市'},
    {code: '223', name: '济南市'},
    {code: '203', name: '福州市'}
]
const HOT_AIRPORT = { // 热门机场
    city: [
        {code: 'PEK', name: '北京首都'},
        {code: 'SHA', name: '上海虹桥'},
        {code: 'CAN', name: '广州'},
        {code: 'SZX', name: '深圳'},
        {code: 'CTU', name: '成都'},
        {code: 'HGH', name: '杭州'},
        {code: 'WUH', name: '武汉'},
        {code: 'XIY', name: '西安'},
        {code: 'CKG', name: '重庆'},
        {code: 'TAO', name: '青岛'},
        {code: 'CSX', name: '长沙'},
        {code: 'NKG', name: '南京'},
        {code: 'XMN', name: '厦门'},
        {code: 'KMG', name: '昆明'},
        {code: 'DLC', name: '大连'},
        {code: 'TSN', name: '天津'},
        {code: 'CGO', name: '郑州'},
        {code: 'SYX', name: '三亚'},
        {code: 'TNA', name: '济南'},
        {code: 'FOC', name: '福州'}
    ],
    air: [
        {code: 'PEK', name: '首都机场'},
        {code: 'SHA', name: '虹桥机场'},
        {code: 'CAN', name: '白云机场'},
        {code: 'SZX', name: '宝安机场'},
        {code: 'CTU', name: '双流国际机场'},
        {code: 'HGH', name: '萧山机场'},
        {code: 'WUH', name: '天河机场'},
        {code: 'XIY', name: '咸阳机场'},
        {code: 'CKG', name: '江北机场'},
        {code: 'TAO', name: '流亭机场'},
        {code: 'CSX', name: '黄花机场'},
        {code: 'NKG', name: '禄口机场'},
        {code: 'XMN', name: '高崎机场'},
        {code: 'KMG', name: '长水机场'},
        {code: 'DLC', name: '周水子机场'},
        {code: 'TSN', name: '滨海机场'},
        {code: 'CGO', name: '新郑机场'},
        {code: 'SYX', name: '凤凰机场'},
        {code: 'TNA', name: '遥墙机场'},
        {code: 'FOC', name: '长乐机场'}
    ]
}
let REGION_HOT_CITY = [ // 热门城市 省市区信息
	{
		children: [
			{ parentRegion: null, regionCode: '110100', regionName: '不选择' },
			{ parentRegion: '110100', regionCode: '110101', regionName: '东城区' },
			{ parentRegion: '110100', regionCode: '110102', regionName: '西城区' },
			{ parentRegion: '110100', regionCode: '110105', regionName: '朝阳区' },
			{ parentRegion: '110100', regionCode: '110106', regionName: '丰台区' },
			{ parentRegion: '110100', regionCode: '110107', regionName: '石景山区' },
			{ parentRegion: '110100', regionCode: '110108', regionName: '海淀区' },
			{ parentRegion: '110100', regionCode: '110109', regionName: '门头沟区' },
			{ parentRegion: '110100', regionCode: '110111', regionName: '房山区' },
			{ parentRegion: '110100', regionCode: '110112', regionName: '通州区' },
			{ parentRegion: '110100', regionCode: '110113', regionName: '顺义区' },
			{ parentRegion: '110100', regionCode: '110114', regionName: '昌平区' },
			{ parentRegion: '110100', regionCode: '110115', regionName: '大兴区' },
			{ parentRegion: '110100', regionCode: '110116', regionName: '怀柔区' },
			{ parentRegion: '110100', regionCode: '110117', regionName: '平谷区' },
			{ parentRegion: '110100', regionCode: '110118', regionName: '密云区' },
			{ parentRegion: '110100', regionCode: '110119', regionName: '延庆区' }
		],
		parentRegion: '110000',
		regionCode: '110100',
		regionName: '北京市'
	},
	{
		children: [
			{ parentRegion: null, regionCode: '310100', regionName: '不选择' },
			{ parentRegion: '310100', regionCode: '310101', regionName: '黄浦区' },
			{ parentRegion: '310100', regionCode: '310104', regionName: '徐汇区' },
			{ parentRegion: '310100', regionCode: '310105', regionName: '长宁区' },
			{ parentRegion: '310100', regionCode: '310106', regionName: '静安区' },
			{ parentRegion: '310100', regionCode: '310107', regionName: '普陀区' },
			{ parentRegion: '310100', regionCode: '310109', regionName: '虹口区' },
			{ parentRegion: '310100', regionCode: '310110', regionName: '杨浦区' },
			{ parentRegion: '310100', regionCode: '310112', regionName: '闵行区' },
			{ parentRegion: '310100', regionCode: '310113', regionName: '宝山区' },
			{ parentRegion: '310100', regionCode: '310114', regionName: '嘉定区' },
			{ parentRegion: '310100', regionCode: '310115', regionName: '浦东新区' },
			{ parentRegion: '310100', regionCode: '310116', regionName: '金山区' },
			{ parentRegion: '310100', regionCode: '310117', regionName: '松江区' },
			{ parentRegion: '310100', regionCode: '310118', regionName: '青浦区' },
			{ parentRegion: '310100', regionCode: '310120', regionName: '奉贤区' },
			{ parentRegion: '310100', regionCode: '310151', regionName: '崇明区' }
		],
		parentRegion: '310000',
		regionCode: '310100',
		regionName: '上海市'
	},
	{
		children: [
			{ parentRegion: null, regionCode: '440100', regionName: '不选择' },
			{ parentRegion: '440100', regionCode: '440103', regionName: '荔湾区' },
			{ parentRegion: '440100', regionCode: '440104', regionName: '越秀区' },
			{ parentRegion: '440100', regionCode: '440105', regionName: '海珠区' },
			{ parentRegion: '440100', regionCode: '440106', regionName: '天河区' },
			{ parentRegion: '440100', regionCode: '440111', regionName: '白云区' },
			{ parentRegion: '440100', regionCode: '440112', regionName: '黄埔区' },
			{ parentRegion: '440100', regionCode: '440113', regionName: '番禺区' },
			{ parentRegion: '440100', regionCode: '440114', regionName: '花都区' },
			{ parentRegion: '440100', regionCode: '440115', regionName: '南沙区' },
			{ parentRegion: '440100', regionCode: '440117', regionName: '从化区' },
			{ parentRegion: '440100', regionCode: '440118', regionName: '增城区' }
		],
		parentRegion: '440000',
		regionCode: '440100',
		regionName: '广州市'
	},
	{
		children: [
			{ parentRegion: null, regionCode: '440300', regionName: '不选择' },
			{ parentRegion: '440300', regionCode: '440303', regionName: '罗湖区' },
			{ parentRegion: '440300', regionCode: '440304', regionName: '福田区' },
			{ parentRegion: '440300', regionCode: '440305', regionName: '南山区' },
			{ parentRegion: '440300', regionCode: '440306', regionName: '宝安区' },
			{ parentRegion: '440300', regionCode: '440307', regionName: '龙岗区' },
			{ parentRegion: '440300', regionCode: '440308', regionName: '盐田区' },
			{ parentRegion: '440300', regionCode: '440309', regionName: '龙华区' },
			{ parentRegion: '440300', regionCode: '440310', regionName: '坪山区' }
		],
		parentRegion: '440000',
		regionCode: '440300',
		regionName: '深圳市'
	},
	{
		children: [
			{ parentRegion: null, regionCode: '510100', regionName: '不选择' },
			{ parentRegion: '510100', regionCode: '510104', regionName: '锦江区' },
			{ parentRegion: '510100', regionCode: '510105', regionName: '青羊区' },
			{ parentRegion: '510100', regionCode: '510106', regionName: '金牛区' },
			{ parentRegion: '510100', regionCode: '510107', regionName: '武侯区' },
			{ parentRegion: '510100', regionCode: '510108', regionName: '成华区' },
			{ parentRegion: '510100', regionCode: '510112', regionName: '龙泉驿区' },
			{ parentRegion: '510100', regionCode: '510113', regionName: '青白江区' },
			{ parentRegion: '510100', regionCode: '510114', regionName: '新都区' },
			{ parentRegion: '510100', regionCode: '510115', regionName: '温江区' },
			{ parentRegion: '510100', regionCode: '510116', regionName: '双流区' },
			{ parentRegion: '510100', regionCode: '510117', regionName: '郫都区' },
			{ parentRegion: '510100', regionCode: '510121', regionName: '金堂县' },
			{ parentRegion: '510100', regionCode: '510129', regionName: '大邑县' },
			{ parentRegion: '510100', regionCode: '510131', regionName: '蒲江县' },
			{ parentRegion: '510100', regionCode: '510132', regionName: '新津县' },
			{ parentRegion: '510100', regionCode: '510181', regionName: '都江堰市' },
			{ parentRegion: '510100', regionCode: '510182', regionName: '彭州市' },
			{ parentRegion: '510100', regionCode: '510183', regionName: '邛崃市' },
			{ parentRegion: '510100', regionCode: '510184', regionName: '崇州市' },
			{ parentRegion: '510100', regionCode: '510185', regionName: '简阳市' }
		],
		parentRegion: '510000',
		regionCode: '510100',
		regionName: '成都市'
	},
	{
		children: [
			{ parentRegion: null, regionCode: '330100', regionName: '不选择' },
			{ parentRegion: '330100', regionCode: '330102', regionName: '上城区' },
			{ parentRegion: '330100', regionCode: '330103', regionName: '下城区' },
			{ parentRegion: '330100', regionCode: '330104', regionName: '江干区' },
			{ parentRegion: '330100', regionCode: '330105', regionName: '拱墅区' },
			{ parentRegion: '330100', regionCode: '330106', regionName: '西湖区' },
			{ parentRegion: '330100', regionCode: '330108', regionName: '滨江区' },
			{ parentRegion: '330100', regionCode: '330109', regionName: '萧山区' },
			{ parentRegion: '330100', regionCode: '330110', regionName: '余杭区' },
			{ parentRegion: '330100', regionCode: '330111', regionName: '富阳区' },
			{ parentRegion: '330100', regionCode: '330112', regionName: '临安区' },
			{ parentRegion: '330100', regionCode: '330122', regionName: '桐庐县' },
			{ parentRegion: '330100', regionCode: '330127', regionName: '淳安县' },
			{ parentRegion: '330100', regionCode: '330182', regionName: '建德市' }
		],
		parentRegion: '330000',
		regionCode: '330100',
		regionName: '杭州市'
	},
	{
		children: [
			{ parentRegion: null, regionCode: '420100', regionName: '不选择' },
			{ parentRegion: '420100', regionCode: '420102', regionName: '江岸区' },
			{ parentRegion: '420100', regionCode: '420103', regionName: '江汉区' },
			{ parentRegion: '420100', regionCode: '420104', regionName: '硚口区' },
			{ parentRegion: '420100', regionCode: '420105', regionName: '汉阳区' },
			{ parentRegion: '420100', regionCode: '420106', regionName: '武昌区' },
			{ parentRegion: '420100', regionCode: '420107', regionName: '青山区' },
			{ parentRegion: '420100', regionCode: '420111', regionName: '洪山区' },
			{ parentRegion: '420100', regionCode: '420112', regionName: '东西湖区' },
			{ parentRegion: '420100', regionCode: '420113', regionName: '汉南区' },
			{ parentRegion: '420100', regionCode: '420114', regionName: '蔡甸区' },
			{ parentRegion: '420100', regionCode: '420115', regionName: '江夏区' },
			{ parentRegion: '420100', regionCode: '420116', regionName: '黄陂区' },
			{ parentRegion: '420100', regionCode: '420117', regionName: '新洲区' }
		],
		parentRegion: '420000',
		regionCode: '420100',
		regionName: '武汉市'
	},
	{
		children: [
			{ parentRegion: null, regionCode: '610100', regionName: '不选择' },
			{ parentRegion: '610100', regionCode: '610102', regionName: '新城区' },
			{ parentRegion: '610100', regionCode: '610103', regionName: '碑林区' },
			{ parentRegion: '610100', regionCode: '610104', regionName: '莲湖区' },
			{ parentRegion: '610100', regionCode: '610111', regionName: '灞桥区' },
			{ parentRegion: '610100', regionCode: '610112', regionName: '未央区' },
			{ parentRegion: '610100', regionCode: '610113', regionName: '雁塔区' },
			{ parentRegion: '610100', regionCode: '610114', regionName: '阎良区' },
			{ parentRegion: '610100', regionCode: '610115', regionName: '临潼区' },
			{ parentRegion: '610100', regionCode: '610116', regionName: '长安区' },
			{ parentRegion: '610100', regionCode: '610117', regionName: '高陵区' },
			{ parentRegion: '610100', regionCode: '610118', regionName: '鄠邑区' },
			{ parentRegion: '610100', regionCode: '610122', regionName: '蓝田县' },
			{ parentRegion: '610100', regionCode: '610124', regionName: '周至县' }
		],
		parentRegion: '610000',
		regionCode: '610100',
		regionName: '西安市'
	},
	{
		children: [
			{ parentRegion: null, regionCode: '500100', regionName: '不选择' },
			{ parentRegion: '500100', regionCode: '500101', regionName: '万州区' },
			{ parentRegion: '500100', regionCode: '500102', regionName: '涪陵区' },
			{ parentRegion: '500100', regionCode: '500103', regionName: '渝中区' },
			{ parentRegion: '500100', regionCode: '500104', regionName: '大渡口区' },
			{ parentRegion: '500100', regionCode: '500105', regionName: '江北区' },
			{ parentRegion: '500100', regionCode: '500106', regionName: '沙坪坝区' },
			{ parentRegion: '500100', regionCode: '500107', regionName: '九龙坡区' },
			{ parentRegion: '500100', regionCode: '500108', regionName: '南岸区' },
			{ parentRegion: '500100', regionCode: '500109', regionName: '北碚区' },
			{ parentRegion: '500100', regionCode: '500110', regionName: '綦江区' },
			{ parentRegion: '500100', regionCode: '500111', regionName: '大足区' },
			{ parentRegion: '500100', regionCode: '500112', regionName: '渝北区' },
			{ parentRegion: '500100', regionCode: '500113', regionName: '巴南区' },
			{ parentRegion: '500100', regionCode: '500114', regionName: '黔江区' },
			{ parentRegion: '500100', regionCode: '500115', regionName: '长寿区' },
			{ parentRegion: '500100', regionCode: '500116', regionName: '江津区' },
			{ parentRegion: '500100', regionCode: '500117', regionName: '合川区' },
			{ parentRegion: '500100', regionCode: '500118', regionName: '永川区' },
			{ parentRegion: '500100', regionCode: '500119', regionName: '南川区' },
			{ parentRegion: '500100', regionCode: '500120', regionName: '璧山区' },
			{ parentRegion: '500100', regionCode: '500151', regionName: '铜梁区' },
			{ parentRegion: '500100', regionCode: '500152', regionName: '潼南区' },
			{ parentRegion: '500100', regionCode: '500153', regionName: '荣昌区' },
			{ parentRegion: '500100', regionCode: '500154', regionName: '开州区' },
			{ parentRegion: '500100', regionCode: '500155', regionName: '梁平区' },
			{ parentRegion: '500100', regionCode: '500156', regionName: '武隆区' },
			{ parentRegion: '500100', regionCode: '500229', regionName: '城口县' },
			{ parentRegion: '500100', regionCode: '500230', regionName: '丰都县' },
			{ parentRegion: '500100', regionCode: '500231', regionName: '垫江县' },
			{ parentRegion: '500100', regionCode: '500233', regionName: '忠县' },
			{ parentRegion: '500100', regionCode: '500235', regionName: '云阳县' },
			{ parentRegion: '500100', regionCode: '500236', regionName: '奉节县' },
			{ parentRegion: '500100', regionCode: '500237', regionName: '巫山县' },
			{ parentRegion: '500100', regionCode: '500238', regionName: '巫溪县' },
			{ parentRegion: '500100', regionCode: '500240', regionName: '石柱土家族自治县' },
			{ parentRegion: '500100', regionCode: '500241', regionName: '秀山土家族苗族自治县' },
			{ parentRegion: '500100', regionCode: '500242', regionName: '酉阳土家族苗族自治县' },
			{ parentRegion: '500100', regionCode: '500243', regionName: '彭水苗族土家族自治县' }
		],
		parentRegion: '500000',
		regionCode: '500100',
		regionName: '重庆市'
	},
	{
		children: [
			{ parentRegion: null, regionCode: '370200', regionName: '不选择' },
			{ parentRegion: '370200', regionCode: '370202', regionName: '市南区' },
			{ parentRegion: '370200', regionCode: '370203', regionName: '市北区' },
			{ parentRegion: '370200', regionCode: '370211', regionName: '黄岛区' },
			{ parentRegion: '370200', regionCode: '370212', regionName: '崂山区' },
			{ parentRegion: '370200', regionCode: '370213', regionName: '李沧区' },
			{ parentRegion: '370200', regionCode: '370214', regionName: '城阳区' },
			{ parentRegion: '370200', regionCode: '370215', regionName: '即墨区' },
			{ parentRegion: '370200', regionCode: '370281', regionName: '胶州市' },
			{ parentRegion: '370200', regionCode: '370283', regionName: '平度市' },
			{ parentRegion: '370200', regionCode: '370285', regionName: '莱西市' }
		],
		parentRegion: '370000',
		regionCode: '370200',
		regionName: '青岛市'
	},
	{
		children: [
			{ parentRegion: null, regionCode: '430100', regionName: '不选择' },
			{ parentRegion: '430100', regionCode: '430102', regionName: '芙蓉区' },
			{ parentRegion: '430100', regionCode: '430103', regionName: '天心区' },
			{ parentRegion: '430100', regionCode: '430104', regionName: '岳麓区' },
			{ parentRegion: '430100', regionCode: '430105', regionName: '开福区' },
			{ parentRegion: '430100', regionCode: '430111', regionName: '雨花区' },
			{ parentRegion: '430100', regionCode: '430112', regionName: '望城区' },
			{ parentRegion: '430100', regionCode: '430121', regionName: '长沙县' },
			{ parentRegion: '430100', regionCode: '430181', regionName: '浏阳市' },
			{ parentRegion: '430100', regionCode: '430182', regionName: '宁乡市' }
		],
		parentRegion: '430000',
		regionCode: '430100',
		regionName: '长沙市'
	},
	{
		children: [
			{ parentRegion: null, regionCode: '320100', regionName: '不选择' },
			{ parentRegion: '320100', regionCode: '320102', regionName: '玄武区' },
			{ parentRegion: '320100', regionCode: '320104', regionName: '秦淮区' },
			{ parentRegion: '320100', regionCode: '320105', regionName: '建邺区' },
			{ parentRegion: '320100', regionCode: '320106', regionName: '鼓楼区' },
			{ parentRegion: '320100', regionCode: '320111', regionName: '浦口区' },
			{ parentRegion: '320100', regionCode: '320113', regionName: '栖霞区' },
			{ parentRegion: '320100', regionCode: '320114', regionName: '雨花台区' },
			{ parentRegion: '320100', regionCode: '320115', regionName: '江宁区' },
			{ parentRegion: '320100', regionCode: '320116', regionName: '六合区' },
			{ parentRegion: '320100', regionCode: '320117', regionName: '溧水区' },
			{ parentRegion: '320100', regionCode: '320118', regionName: '高淳区' }
		],
		parentRegion: '320000',
		regionCode: '320100',
		regionName: '南京市'
	},
	{
		children: [
			{ parentRegion: null, regionCode: '350200', regionName: '不选择' },
			{ parentRegion: '350200', regionCode: '350203', regionName: '思明区' },
			{ parentRegion: '350200', regionCode: '350205', regionName: '海沧区' },
			{ parentRegion: '350200', regionCode: '350206', regionName: '湖里区' },
			{ parentRegion: '350200', regionCode: '350211', regionName: '集美区' },
			{ parentRegion: '350200', regionCode: '350212', regionName: '同安区' },
			{ parentRegion: '350200', regionCode: '350213', regionName: '翔安区' }
		],
		parentRegion: '350000',
		regionCode: '350200',
		regionName: '厦门市'
	},
	{
		children: [
			{ parentRegion: null, regionCode: '530100', regionName: '不选择' },
			{ parentRegion: '530100', regionCode: '530102', regionName: '五华区' },
			{ parentRegion: '530100', regionCode: '530103', regionName: '盘龙区' },
			{ parentRegion: '530100', regionCode: '530111', regionName: '官渡区' },
			{ parentRegion: '530100', regionCode: '530112', regionName: '西山区' },
			{ parentRegion: '530100', regionCode: '530113', regionName: '东川区' },
			{ parentRegion: '530100', regionCode: '530114', regionName: '呈贡区' },
			{ parentRegion: '530100', regionCode: '530115', regionName: '晋宁区' },
			{ parentRegion: '530100', regionCode: '530124', regionName: '富民县' },
			{ parentRegion: '530100', regionCode: '530125', regionName: '宜良县' },
			{ parentRegion: '530100', regionCode: '530126', regionName: '石林彝族自治县' },
			{ parentRegion: '530100', regionCode: '530127', regionName: '嵩明县' },
			{ parentRegion: '530100', regionCode: '530128', regionName: '禄劝彝族苗族自治县' },
			{ parentRegion: '530100', regionCode: '530129', regionName: '寻甸回族彝族自治县' },
			{ parentRegion: '530100', regionCode: '530181', regionName: '安宁市' }
		],
		parentRegion: '530000',
		regionCode: '530100',
		regionName: '昆明市'
	},
	{
		children: [
			{ parentRegion: null, regionCode: '210200', regionName: '不选择' },
			{ parentRegion: '210200', regionCode: '210202', regionName: '中山区' },
			{ parentRegion: '210200', regionCode: '210203', regionName: '西岗区' },
			{ parentRegion: '210200', regionCode: '210204', regionName: '沙河口区' },
			{ parentRegion: '210200', regionCode: '210211', regionName: '甘井子区' },
			{ parentRegion: '210200', regionCode: '210212', regionName: '旅顺口区' },
			{ parentRegion: '210200', regionCode: '210213', regionName: '金州区' },
			{ parentRegion: '210200', regionCode: '210214', regionName: '普兰店区' },
			{ parentRegion: '210200', regionCode: '210224', regionName: '长海县' },
			{ parentRegion: '210200', regionCode: '210281', regionName: '瓦房店市' },
			{ parentRegion: '210200', regionCode: '210283', regionName: '庄河市' }
		],
		parentRegion: '210000',
		regionCode: '210200',
		regionName: '大连市'
	},
	{
		children: [
			{ parentRegion: null, regionCode: '120100', regionName: '不选择' },
			{ parentRegion: '120100', regionCode: '120101', regionName: '和平区' },
			{ parentRegion: '120100', regionCode: '120102', regionName: '河东区' },
			{ parentRegion: '120100', regionCode: '120103', regionName: '河西区' },
			{ parentRegion: '120100', regionCode: '120104', regionName: '南开区' },
			{ parentRegion: '120100', regionCode: '120105', regionName: '河北区' },
			{ parentRegion: '120100', regionCode: '120106', regionName: '红桥区' },
			{ parentRegion: '120100', regionCode: '120110', regionName: '东丽区' },
			{ parentRegion: '120100', regionCode: '120111', regionName: '西青区' },
			{ parentRegion: '120100', regionCode: '120112', regionName: '津南区' },
			{ parentRegion: '120100', regionCode: '120113', regionName: '北辰区' },
			{ parentRegion: '120100', regionCode: '120114', regionName: '武清区' },
			{ parentRegion: '120100', regionCode: '120115', regionName: '宝坻区' },
			{ parentRegion: '120100', regionCode: '120116', regionName: '滨海新区' },
			{ parentRegion: '120100', regionCode: '120117', regionName: '宁河区' },
			{ parentRegion: '120100', regionCode: '120118', regionName: '静海区' },
			{ parentRegion: '120100', regionCode: '120119', regionName: '蓟州区' }
		],
		parentRegion: '120000',
		regionCode: '120100',
		regionName: '天津市'
	},
	{
		children: [
			{ parentRegion: null, regionCode: '410100', regionName: '不选择' },
			{ parentRegion: '410100', regionCode: '410102', regionName: '中原区' },
			{ parentRegion: '410100', regionCode: '410103', regionName: '二七区' },
			{ parentRegion: '410100', regionCode: '410104', regionName: '管城回族区' },
			{ parentRegion: '410100', regionCode: '410105', regionName: '金水区' },
			{ parentRegion: '410100', regionCode: '410106', regionName: '上街区' },
			{ parentRegion: '410100', regionCode: '410108', regionName: '惠济区' },
			{ parentRegion: '410100', regionCode: '410122', regionName: '中牟县' },
			{ parentRegion: '410100', regionCode: '410181', regionName: '巩义市' },
			{ parentRegion: '410100', regionCode: '410182', regionName: '荥阳市' },
			{ parentRegion: '410100', regionCode: '410183', regionName: '新密市' },
			{ parentRegion: '410100', regionCode: '410184', regionName: '新郑市' },
			{ parentRegion: '410100', regionCode: '410185', regionName: '登封市' }
		],
		parentRegion: '410000',
		regionCode: '410100',
		regionName: '郑州市'
	},
	{
		children: [
			{ parentRegion: null, regionCode: '460200', regionName: '不选择' },
			{ parentRegion: '460200', regionCode: '460202', regionName: '海棠区' },
			{ parentRegion: '460200', regionCode: '460203', regionName: '吉阳区' },
			{ parentRegion: '460200', regionCode: '460204', regionName: '天涯区' },
			{ parentRegion: '460200', regionCode: '460205', regionName: '崖州区' }
		],
		parentRegion: '460000',
		regionCode: '460200',
		regionName: '三亚市'
	},
	{
		children: [
			{ parentRegion: null, regionCode: '370100', regionName: '不选择' },
			{ parentRegion: '370100', regionCode: '370102', regionName: '历下区' },
			{ parentRegion: '370100', regionCode: '370103', regionName: '市中区' },
			{ parentRegion: '370100', regionCode: '370104', regionName: '槐荫区' },
			{ parentRegion: '370100', regionCode: '370105', regionName: '天桥区' },
			{ parentRegion: '370100', regionCode: '370112', regionName: '历城区' },
			{ parentRegion: '370100', regionCode: '370113', regionName: '长清区' },
			{ parentRegion: '370100', regionCode: '370114', regionName: '章丘区' },
			{ parentRegion: '370100', regionCode: '370124', regionName: '平阴县' },
			{ parentRegion: '370100', regionCode: '370125', regionName: '济阳县' },
			{ parentRegion: '370100', regionCode: '370126', regionName: '商河县' }
		],
		parentRegion: '370000',
		regionCode: '370100',
		regionName: '济南市'
	},
	{
		children: [
			{ parentRegion: null, regionCode: '350100', regionName: '不选择' },
			{ parentRegion: '350100', regionCode: '350102', regionName: '鼓楼区' },
			{ parentRegion: '350100', regionCode: '350103', regionName: '台江区' },
			{ parentRegion: '350100', regionCode: '350104', regionName: '仓山区' },
			{ parentRegion: '350100', regionCode: '350105', regionName: '马尾区' },
			{ parentRegion: '350100', regionCode: '350111', regionName: '晋安区' },
			{ parentRegion: '350100', regionCode: '350112', regionName: '长乐区' },
			{ parentRegion: '350100', regionCode: '350121', regionName: '闽侯县' },
			{ parentRegion: '350100', regionCode: '350122', regionName: '连江县' },
			{ parentRegion: '350100', regionCode: '350123', regionName: '罗源县' },
			{ parentRegion: '350100', regionCode: '350124', regionName: '闽清县' },
			{ parentRegion: '350100', regionCode: '350125', regionName: '永泰县' },
			{ parentRegion: '350100', regionCode: '350128', regionName: '平潭县' },
			{ parentRegion: '350100', regionCode: '350181', regionName: '福清市' }
		],
		parentRegion: '350000',
		regionCode: '350100',
		regionName: '福州市'
	}
]
let REGION_HOT_CITY_PET = [ // 宠宝热门城市数据
	{
	  'children': [
		{
		  'parentRegion': '5025',
		  'regionCode': '37',
		  'regionName': '东城区'
		},
		{
		  'parentRegion': '5025',
		  'regionCode': '38',
		  'regionName': '西城区'
		},
		{
		  'parentRegion': '5025',
		  'regionCode': '41',
		  'regionName': '朝阳区'
		},
		{
		  'parentRegion': '5025',
		  'regionCode': '42',
		  'regionName': '丰台区'
		},
		{
		  'parentRegion': '5025',
		  'regionCode': '43',
		  'regionName': '石景山区'
		},
		{
		  'parentRegion': '5025',
		  'regionCode': '44',
		  'regionName': '海淀区'
		},
		{
		  'parentRegion': '5025',
		  'regionCode': '45',
		  'regionName': '门头沟区'
		},
		{
		  'parentRegion': '5025',
		  'regionCode': '46',
		  'regionName': '房山区'
		},
		{
		  'parentRegion': '5025',
		  'regionCode': '47',
		  'regionName': '通州区'
		},
		{
		  'parentRegion': '5025',
		  'regionCode': '48',
		  'regionName': '顺义区'
		},
		{
		  'parentRegion': '5025',
		  'regionCode': '49',
		  'regionName': '昌平区'
		},
		{
		  'parentRegion': '5025',
		  'regionCode': '50',
		  'regionName': '大兴区'
		},
		{
		  'parentRegion': '5025',
		  'regionCode': '51',
		  'regionName': '怀柔区'
		},
		{
		  'parentRegion': '5025',
		  'regionCode': '52',
		  'regionName': '平谷区'
		},
		{
		  'parentRegion': '5025',
		  'regionCode': '53',
		  'regionName': '密云区'
		},
		{
		  'parentRegion': '5025',
		  'regionCode': '54',
		  'regionName': '延庆区'
		}
	  ],
	  'parentRegion': '1',
	  'regionCode': '5025',
	  'regionName': '北京市'
	},
	{
	  'children': [
		{
		  'parentRegion': '5026',
		  'regionCode': '143',
		  'regionName': '黄浦区'
		},
		{
		  'parentRegion': '5026',
		  'regionCode': '145',
		  'regionName': '徐汇区'
		},
		{
		  'parentRegion': '5026',
		  'regionCode': '146',
		  'regionName': '长宁区'
		},
		{
		  'parentRegion': '5026',
		  'regionCode': '147',
		  'regionName': '静安区'
		},
		{
		  'parentRegion': '5026',
		  'regionCode': '148',
		  'regionName': '普陀区'
		},
		{
		  'parentRegion': '5026',
		  'regionCode': '150',
		  'regionName': '虹口区'
		},
		{
		  'parentRegion': '5026',
		  'regionCode': '151',
		  'regionName': '杨浦区'
		},
		{
		  'parentRegion': '5026',
		  'regionCode': '152',
		  'regionName': '闵行区'
		},
		{
		  'parentRegion': '5026',
		  'regionCode': '153',
		  'regionName': '宝山区'
		},
		{
		  'parentRegion': '5026',
		  'regionCode': '154',
		  'regionName': '嘉定区'
		},
		{
		  'parentRegion': '5026',
		  'regionCode': '155',
		  'regionName': '浦东新区'
		},
		{
		  'parentRegion': '5026',
		  'regionCode': '156',
		  'regionName': '金山区'
		},
		{
		  'parentRegion': '5026',
		  'regionCode': '157',
		  'regionName': '松江区'
		},
		{
		  'parentRegion': '5026',
		  'regionCode': '158',
		  'regionName': '青浦区'
		},
		{
		  'parentRegion': '5026',
		  'regionCode': '160',
		  'regionName': '奉贤区'
		},
		{
		  'parentRegion': '5026',
		  'regionCode': '161',
		  'regionName': '崇明区'
		}
	  ],
	  'parentRegion': '9',
	  'regionCode': '5026',
	  'regionName': '上海市'
	},
	{
	  'children': [
		{
		  'parentRegion': '291',
		  'regionCode': '3058',
		  'regionName': '南山区'
		},
		{
		  'parentRegion': '291',
		  'regionCode': '3059',
		  'regionName': '宝安区'
		},
		{
		  'parentRegion': '291',
		  'regionCode': '3060',
		  'regionName': '盐田区'
		},
		{
		  'parentRegion': '291',
		  'regionCode': '3061',
		  'regionName': '福田区'
		},
		{
		  'parentRegion': '291',
		  'regionCode': '3062',
		  'regionName': '罗湖区'
		},
		{
		  'parentRegion': '291',
		  'regionCode': '3063',
		  'regionName': '龙岗区'
		},
		{
		  'parentRegion': '291',
		  'regionCode': '502000028',
		  'regionName': '龙华新区'
		},
		{
		  'parentRegion': '291',
		  'regionCode': '502000029',
		  'regionName': '坪山新区'
		},
		{
		  'parentRegion': '291',
		  'regionCode': '502000030',
		  'regionName': '大鹏新区'
		},
		{
		  'parentRegion': '291',
		  'regionCode': '502000031',
		  'regionName': '光明新区'
		}
	  ],
	  'parentRegion': '19',
	  'regionCode': '291',
	  'regionName': '深圳市'
	},
	{
	  'children': [
		{
		  'parentRegion': '8120001',
		  'regionCode': '24240001',
		  'regionName': '上城区'
		},
		{
		  'parentRegion': '8120001',
		  'regionCode': '24250001',
		  'regionName': '下城区'
		},
		{
		  'parentRegion': '8120001',
		  'regionCode': '24260001',
		  'regionName': '江干区'
		},
		{
		  'parentRegion': '8120001',
		  'regionCode': '24270001',
		  'regionName': '拱墅区'
		},
		{
		  'parentRegion': '8120001',
		  'regionCode': '24280001',
		  'regionName': '西湖区'
		},
		{
		  'parentRegion': '8120001',
		  'regionCode': '24290001',
		  'regionName': '滨江区'
		},
		{
		  'parentRegion': '8120001',
		  'regionCode': '24300001',
		  'regionName': '萧山区'
		},
		{
		  'parentRegion': '8120001',
		  'regionCode': '24310001',
		  'regionName': '余杭区'
		},
		{
		  'parentRegion': '8120001',
		  'regionCode': '24320001',
		  'regionName': '桐庐县'
		},
		{
		  'parentRegion': '8120001',
		  'regionCode': '24330001',
		  'regionName': '淳安县'
		},
		{
		  'parentRegion': '8120001',
		  'regionCode': '24340001',
		  'regionName': '建德市'
		},
		{
		  'parentRegion': '8120001',
		  'regionCode': '24350001',
		  'regionName': '富阳区'
		},
		{
		  'parentRegion': '8120001',
		  'regionCode': '24360001',
		  'regionName': '临安区'
		}
	  ],
	  'parentRegion': '11',
	  'regionCode': '8120001',
	  'regionName': '杭州市'
	},
	{
	  'children': [
		{
		  'parentRegion': '240',
		  'regionCode': '2653',
		  'regionName': '上街区'
		},
		{
		  'parentRegion': '240',
		  'regionCode': '2654',
		  'regionName': '中原区'
		},
		{
		  'parentRegion': '240',
		  'regionCode': '2655',
		  'regionName': '中牟县'
		},
		{
		  'parentRegion': '240',
		  'regionCode': '2656',
		  'regionName': '二七区'
		},
		{
		  'parentRegion': '240',
		  'regionCode': '2657',
		  'regionName': '巩义市'
		},
		{
		  'parentRegion': '240',
		  'regionCode': '2658',
		  'regionName': '惠济区'
		},
		{
		  'parentRegion': '240',
		  'regionCode': '2659',
		  'regionName': '新密市'
		},
		{
		  'parentRegion': '240',
		  'regionCode': '2660',
		  'regionName': '新郑市'
		},
		{
		  'parentRegion': '240',
		  'regionCode': '2661',
		  'regionName': '登封市'
		},
		{
		  'parentRegion': '240',
		  'regionCode': '2662',
		  'regionName': '管城回族区'
		},
		{
		  'parentRegion': '240',
		  'regionCode': '2663',
		  'regionName': '荥阳市'
		},
		{
		  'parentRegion': '240',
		  'regionCode': '2664',
		  'regionName': '金水区'
		},
		{
		  'parentRegion': '240',
		  'regionCode': '46781114010',
		  'regionName': '高新区'
		},
		{
		  'parentRegion': '240',
		  'regionCode': '502000027',
		  'regionName': '郑东新区'
		},
		{
		  'parentRegion': '240',
		  'regionCode': '502000032',
		  'regionName': '经济开发区'
		}
	  ],
	  'parentRegion': '16',
	  'regionCode': '240',
	  'regionName': '郑州市'
	},
	{
	  'children': [
		{
		  'parentRegion': '275',
		  'regionCode': '2914',
		  'regionName': '天心区'
		},
		{
		  'parentRegion': '275',
		  'regionCode': '2915',
		  'regionName': '宁乡市'
		},
		{
		  'parentRegion': '275',
		  'regionCode': '2916',
		  'regionName': '岳麓区'
		},
		{
		  'parentRegion': '275',
		  'regionCode': '2917',
		  'regionName': '开福区'
		},
		{
		  'parentRegion': '275',
		  'regionCode': '2918',
		  'regionName': '望城区'
		},
		{
		  'parentRegion': '275',
		  'regionCode': '2919',
		  'regionName': '浏阳市'
		},
		{
		  'parentRegion': '275',
		  'regionCode': '2920',
		  'regionName': '芙蓉区'
		},
		{
		  'parentRegion': '275',
		  'regionCode': '2921',
		  'regionName': '长沙县'
		},
		{
		  'parentRegion': '275',
		  'regionCode': '2922',
		  'regionName': '雨花区'
		}
	  ],
	  'parentRegion': '18',
	  'regionCode': '275',
	  'regionName': '长沙市'
	},
	{
	  'children': [
		{
		  'parentRegion': '223',
		  'regionCode': '2513',
		  'regionName': '历下区'
		},
		{
		  'parentRegion': '223',
		  'regionCode': '2514',
		  'regionName': '历城区'
		},
		{
		  'parentRegion': '223',
		  'regionCode': '2515',
		  'regionName': '商河县'
		},
		{
		  'parentRegion': '223',
		  'regionCode': '2516',
		  'regionName': '天桥区'
		},
		{
		  'parentRegion': '223',
		  'regionCode': '2517',
		  'regionName': '市中区'
		},
		{
		  'parentRegion': '223',
		  'regionCode': '2518',
		  'regionName': '平阴县'
		},
		{
		  'parentRegion': '223',
		  'regionCode': '2519',
		  'regionName': '槐荫区'
		},
		{
		  'parentRegion': '223',
		  'regionCode': '2520',
		  'regionName': '济阳县'
		},
		{
		  'parentRegion': '223',
		  'regionCode': '2521',
		  'regionName': '章丘区'
		},
		{
		  'parentRegion': '223',
		  'regionCode': '2522',
		  'regionName': '长清区'
		}
	  ],
	  'parentRegion': '15',
	  'regionCode': '223',
	  'regionName': '济南市'
	},
	{
	  'children': [
		{
		  'parentRegion': '289',
		  'regionCode': '3037',
		  'regionName': '南沙区'
		},
		{
		  'parentRegion': '289',
		  'regionCode': '3038',
		  'regionName': '从化区'
		},
		{
		  'parentRegion': '289',
		  'regionCode': '3039',
		  'regionName': '增城区'
		},
		{
		  'parentRegion': '289',
		  'regionCode': '3040',
		  'regionName': '天河区'
		},
		{
		  'parentRegion': '289',
		  'regionCode': '3041',
		  'regionName': '海珠区'
		},
		{
		  'parentRegion': '289',
		  'regionCode': '3042',
		  'regionName': '番禺区'
		},
		{
		  'parentRegion': '289',
		  'regionCode': '3043',
		  'regionName': '白云区'
		},
		{
		  'parentRegion': '289',
		  'regionCode': '3044',
		  'regionName': '花都区'
		},
		{
		  'parentRegion': '289',
		  'regionCode': '3045',
		  'regionName': '荔湾区'
		},
		{
		  'parentRegion': '289',
		  'regionCode': '3046',
		  'regionName': '越秀区'
		},
		{
		  'parentRegion': '289',
		  'regionCode': '3047',
		  'regionName': '黄埔区'
		}
	  ],
	  'parentRegion': '19',
	  'regionCode': '289',
	  'regionName': '广州市'
	},
	{
	  'children': [
		{
		  'parentRegion': '224',
		  'regionCode': '2523',
		  'regionName': '即墨区'
		},
		{
		  'parentRegion': '224',
		  'regionCode': '2525',
		  'regionName': '城阳区'
		},
		{
		  'parentRegion': '224',
		  'regionCode': '2526',
		  'regionName': '崂山区'
		},
		{
		  'parentRegion': '224',
		  'regionCode': '2527',
		  'regionName': '市北区'
		},
		{
		  'parentRegion': '224',
		  'regionCode': '2528',
		  'regionName': '市南区'
		},
		{
		  'parentRegion': '224',
		  'regionCode': '2529',
		  'regionName': '平度市'
		},
		{
		  'parentRegion': '224',
		  'regionCode': '2530',
		  'regionName': '李沧区'
		},
		{
		  'parentRegion': '224',
		  'regionCode': '2532',
		  'regionName': '胶州市'
		},
		{
		  'parentRegion': '224',
		  'regionCode': '2533',
		  'regionName': '莱西市'
		},
		{
		  'parentRegion': '224',
		  'regionCode': '2534',
		  'regionName': '黄岛区'
		}
	  ],
	  'parentRegion': '15',
	  'regionCode': '224',
	  'regionName': '青岛市'
	},
	{
	  'children': [
		{
		  'parentRegion': '490000001',
		  'regionCode': '18490001',
		  'regionName': '玄武区'
		},
		{
		  'parentRegion': '490000001',
		  'regionCode': '18500001',
		  'regionName': '秦淮区'
		},
		{
		  'parentRegion': '490000001',
		  'regionCode': '18510001',
		  'regionName': '建邺区'
		},
		{
		  'parentRegion': '490000001',
		  'regionCode': '18520001',
		  'regionName': '鼓楼区'
		},
		{
		  'parentRegion': '490000001',
		  'regionCode': '18530001',
		  'regionName': '浦口区'
		},
		{
		  'parentRegion': '490000001',
		  'regionCode': '18540001',
		  'regionName': '栖霞区'
		},
		{
		  'parentRegion': '490000001',
		  'regionCode': '18550001',
		  'regionName': '雨花台区'
		},
		{
		  'parentRegion': '490000001',
		  'regionCode': '18560001',
		  'regionName': '江宁区'
		},
		{
		  'parentRegion': '490000001',
		  'regionCode': '18580001',
		  'regionName': '六合区'
		},
		{
		  'parentRegion': '490000001',
		  'regionCode': '18590001',
		  'regionName': '溧水区'
		},
		{
		  'parentRegion': '490000001',
		  'regionCode': '18600001',
		  'regionName': '高淳区'
		},
		{
		  'parentRegion': '490000001',
		  'regionCode': '502000003',
		  'regionName': '白下区'
		},
		{
		  'parentRegion': '490000001',
		  'regionCode': '502000004',
		  'regionName': '下关区'
		}
	  ],
	  'parentRegion': '10',
	  'regionCode': '490000001',
	  'regionName': '南京市'
	},
	{
	  'children': [
		{
		  'parentRegion': '203',
		  'regionCode': '2329',
		  'regionName': '仓山区'
		},
		{
		  'parentRegion': '203',
		  'regionCode': '2330',
		  'regionName': '台江区'
		},
		{
		  'parentRegion': '203',
		  'regionCode': '2331',
		  'regionName': '平潭县'
		},
		{
		  'parentRegion': '203',
		  'regionCode': '2332',
		  'regionName': '晋安区'
		},
		{
		  'parentRegion': '203',
		  'regionCode': '2333',
		  'regionName': '永泰县'
		},
		{
		  'parentRegion': '203',
		  'regionCode': '2334',
		  'regionName': '福清市'
		},
		{
		  'parentRegion': '203',
		  'regionCode': '2335',
		  'regionName': '罗源县'
		},
		{
		  'parentRegion': '203',
		  'regionCode': '2336',
		  'regionName': '连江县'
		},
		{
		  'parentRegion': '203',
		  'regionCode': '2337',
		  'regionName': '长乐区'
		},
		{
		  'parentRegion': '203',
		  'regionCode': '2338',
		  'regionName': '闽侯县'
		},
		{
		  'parentRegion': '203',
		  'regionCode': '2339',
		  'regionName': '闽清县'
		},
		{
		  'parentRegion': '203',
		  'regionCode': '2340',
		  'regionName': '马尾区'
		},
		{
		  'parentRegion': '203',
		  'regionCode': '2341',
		  'regionName': '鼓楼区'
		}
	  ],
	  'parentRegion': '13',
	  'regionCode': '203',
	  'regionName': '福州市'
	},
	{
	  'children': [
		{
		  'parentRegion': '258',
		  'regionCode': '2812',
		  'regionName': '东西湖区'
		},
		{
		  'parentRegion': '258',
		  'regionCode': '2813',
		  'regionName': '新洲区'
		},
		{
		  'parentRegion': '258',
		  'regionCode': '2814',
		  'regionName': '武昌区'
		},
		{
		  'parentRegion': '258',
		  'regionCode': '2815',
		  'regionName': '汉南区'
		},
		{
		  'parentRegion': '258',
		  'regionCode': '2816',
		  'regionName': '汉阳区'
		},
		{
		  'parentRegion': '258',
		  'regionCode': '2817',
		  'regionName': '江夏区'
		},
		{
		  'parentRegion': '258',
		  'regionCode': '2818',
		  'regionName': '江岸区'
		},
		{
		  'parentRegion': '258',
		  'regionCode': '2819',
		  'regionName': '江汉区'
		},
		{
		  'parentRegion': '258',
		  'regionCode': '2820',
		  'regionName': '洪山区'
		},
		{
		  'parentRegion': '258',
		  'regionCode': '2821',
		  'regionName': '硚口区'
		},
		{
		  'parentRegion': '258',
		  'regionCode': '2822',
		  'regionName': '蔡甸区'
		},
		{
		  'parentRegion': '258',
		  'regionCode': '2823',
		  'regionName': '青山区'
		},
		{
		  'parentRegion': '258',
		  'regionCode': '2824',
		  'regionName': '黄陂区'
		}
	  ],
	  'parentRegion': '17',
	  'regionCode': '258',
	  'regionName': '武汉市'
	},
	{
	  'children': [
		{
		  'parentRegion': '204',
		  'regionCode': '2342',
		  'regionName': '同安区'
		},
		{
		  'parentRegion': '204',
		  'regionCode': '2343',
		  'regionName': '思明区'
		},
		{
		  'parentRegion': '204',
		  'regionCode': '2344',
		  'regionName': '海沧区'
		},
		{
		  'parentRegion': '204',
		  'regionCode': '2345',
		  'regionName': '湖里区'
		},
		{
		  'parentRegion': '204',
		  'regionCode': '2346',
		  'regionName': '翔安区'
		},
		{
		  'parentRegion': '204',
		  'regionCode': '2347',
		  'regionName': '集美区'
		}
	  ],
	  'parentRegion': '13',
	  'regionCode': '204',
	  'regionName': '厦门市'
	},
	{
	  'children': [
		{
		  'parentRegion': '325',
		  'regionCode': '325001',
		  'regionName': '崖州区'
		},
		{
		  'parentRegion': '325',
		  'regionCode': '325002',
		  'regionName': '天涯区'
		},
		{
		  'parentRegion': '325',
		  'regionCode': '325003',
		  'regionName': '吉阳区'
		},
		{
		  'parentRegion': '325',
		  'regionCode': '325004',
		  'regionName': '海棠区'
		}
	  ],
	  'parentRegion': '21',
	  'regionCode': '325',
	  'regionName': '三亚市'
	},
	{
	  'children': [
		{
		  'parentRegion': '415',
		  'regionCode': '4478',
		  'regionName': '东川区'
		},
		{
		  'parentRegion': '415',
		  'regionCode': '4479',
		  'regionName': '五华区'
		},
		{
		  'parentRegion': '415',
		  'regionCode': '4480',
		  'regionName': '呈贡区'
		},
		{
		  'parentRegion': '415',
		  'regionCode': '4481',
		  'regionName': '安宁市'
		},
		{
		  'parentRegion': '415',
		  'regionCode': '4482',
		  'regionName': '官渡区'
		},
		{
		  'parentRegion': '415',
		  'regionCode': '4483',
		  'regionName': '宜良县'
		},
		{
		  'parentRegion': '415',
		  'regionCode': '4484',
		  'regionName': '富民县'
		},
		{
		  'parentRegion': '415',
		  'regionCode': '4485',
		  'regionName': '寻甸回族彝族自治县'
		},
		{
		  'parentRegion': '415',
		  'regionCode': '4486',
		  'regionName': '嵩明县'
		},
		{
		  'parentRegion': '415',
		  'regionCode': '4487',
		  'regionName': '晋宁区'
		},
		{
		  'parentRegion': '415',
		  'regionCode': '4488',
		  'regionName': '盘龙区'
		},
		{
		  'parentRegion': '415',
		  'regionCode': '4489',
		  'regionName': '石林彝族自治县'
		},
		{
		  'parentRegion': '415',
		  'regionCode': '4490',
		  'regionName': '禄劝彝族苗族自治县'
		},
		{
		  'parentRegion': '415',
		  'regionCode': '4491',
		  'regionName': '西山区'
		}
	  ],
	  'parentRegion': '25',
	  'regionCode': '415',
	  'regionName': '昆明市'
	},
	{
	  'children': [
		{
		  'parentRegion': '5027',
		  'regionCode': '502701',
		  'regionName': '滨海新区'
		},
		{
		  'parentRegion': '5027',
		  'regionCode': '55',
		  'regionName': '和平区'
		},
		{
		  'parentRegion': '5027',
		  'regionCode': '56',
		  'regionName': '河东区'
		},
		{
		  'parentRegion': '5027',
		  'regionCode': '57',
		  'regionName': '河西区'
		},
		{
		  'parentRegion': '5027',
		  'regionCode': '58',
		  'regionName': '南开区'
		},
		{
		  'parentRegion': '5027',
		  'regionCode': '59',
		  'regionName': '河北区'
		},
		{
		  'parentRegion': '5027',
		  'regionCode': '60',
		  'regionName': '红桥区'
		},
		{
		  'parentRegion': '5027',
		  'regionCode': '64',
		  'regionName': '东丽区'
		},
		{
		  'parentRegion': '5027',
		  'regionCode': '65',
		  'regionName': '西青区'
		},
		{
		  'parentRegion': '5027',
		  'regionCode': '66',
		  'regionName': '津南区'
		},
		{
		  'parentRegion': '5027',
		  'regionCode': '67',
		  'regionName': '北辰区'
		},
		{
		  'parentRegion': '5027',
		  'regionCode': '68',
		  'regionName': '武清区'
		},
		{
		  'parentRegion': '5027',
		  'regionCode': '69',
		  'regionName': '宝坻区'
		},
		{
		  'parentRegion': '5027',
		  'regionCode': '70',
		  'regionName': '宁河区'
		},
		{
		  'parentRegion': '5027',
		  'regionCode': '71',
		  'regionName': '静海区'
		},
		{
		  'parentRegion': '5027',
		  'regionCode': '72',
		  'regionName': '蓟州区'
		}
	  ],
	  'parentRegion': '2',
	  'regionCode': '5027',
	  'regionName': '天津市'
	},
	{
	  'children': [
		{
		  'parentRegion': '108',
		  'regionCode': '1532',
		  'regionName': '中山区'
		},
		{
		  'parentRegion': '108',
		  'regionCode': '1533',
		  'regionName': '庄河市'
		},
		{
		  'parentRegion': '108',
		  'regionCode': '1534',
		  'regionName': '旅顺口区'
		},
		{
		  'parentRegion': '108',
		  'regionCode': '1535',
		  'regionName': '普兰店区'
		},
		{
		  'parentRegion': '108',
		  'regionCode': '1536',
		  'regionName': '沙河口区'
		},
		{
		  'parentRegion': '108',
		  'regionCode': '1537',
		  'regionName': '瓦房店市'
		},
		{
		  'parentRegion': '108',
		  'regionCode': '1538',
		  'regionName': '甘井子区'
		},
		{
		  'parentRegion': '108',
		  'regionCode': '1539',
		  'regionName': '西岗区'
		},
		{
		  'parentRegion': '108',
		  'regionCode': '1540',
		  'regionName': '金州区'
		},
		{
		  'parentRegion': '108',
		  'regionCode': '1541',
		  'regionName': '长海县'
		}
	  ],
	  'parentRegion': '6',
	  'regionCode': '108',
	  'regionName': '大连市'
	},
	{
	  'children': [
		{
		  'parentRegion': '438',
		  'regionCode': '4666',
		  'regionName': '临潼区'
		},
		{
		  'parentRegion': '438',
		  'regionCode': '4667',
		  'regionName': '周至县'
		},
		{
		  'parentRegion': '438',
		  'regionCode': '4668',
		  'regionName': '鄠邑区'
		},
		{
		  'parentRegion': '438',
		  'regionCode': '4669',
		  'regionName': '新城区'
		},
		{
		  'parentRegion': '438',
		  'regionCode': '4670',
		  'regionName': '未央区'
		},
		{
		  'parentRegion': '438',
		  'regionCode': '4671',
		  'regionName': '灞桥区'
		},
		{
		  'parentRegion': '438',
		  'regionCode': '4672',
		  'regionName': '碑林区'
		},
		{
		  'parentRegion': '438',
		  'regionCode': '4673',
		  'regionName': '莲湖区'
		},
		{
		  'parentRegion': '438',
		  'regionCode': '4674',
		  'regionName': '蓝田县'
		},
		{
		  'parentRegion': '438',
		  'regionCode': '4675',
		  'regionName': '长安区'
		},
		{
		  'parentRegion': '438',
		  'regionCode': '4676',
		  'regionName': '阎良区'
		},
		{
		  'parentRegion': '438',
		  'regionCode': '4677',
		  'regionName': '雁塔区'
		},
		{
		  'parentRegion': '438',
		  'regionCode': '4678',
		  'regionName': '高陵区'
		},
		{
		  'parentRegion': '438',
		  'regionCode': '46781114011',
		  'regionName': '西咸新区'
		}
	  ],
	  'parentRegion': '27',
	  'regionCode': '438',
	  'regionName': '西安市'
	},
	{
	  'children': [
		{
		  'parentRegion': '5028',
		  'regionCode': '345',
		  'regionName': '万州区'
		},
		{
		  'parentRegion': '5028',
		  'regionCode': '346',
		  'regionName': '涪陵区'
		},
		{
		  'parentRegion': '5028',
		  'regionCode': '347',
		  'regionName': '渝中区'
		},
		{
		  'parentRegion': '5028',
		  'regionCode': '348',
		  'regionName': '大渡口区'
		},
		{
		  'parentRegion': '5028',
		  'regionCode': '349',
		  'regionName': '江北区'
		},
		{
		  'parentRegion': '5028',
		  'regionCode': '350',
		  'regionName': '沙坪坝区'
		},
		{
		  'parentRegion': '5028',
		  'regionCode': '351',
		  'regionName': '九龙坡区'
		},
		{
		  'parentRegion': '5028',
		  'regionCode': '352',
		  'regionName': '南岸区'
		},
		{
		  'parentRegion': '5028',
		  'regionCode': '353',
		  'regionName': '北碚区'
		},
		{
		  'parentRegion': '5028',
		  'regionCode': '356',
		  'regionName': '渝北区'
		},
		{
		  'parentRegion': '5028',
		  'regionCode': '357',
		  'regionName': '巴南区'
		},
		{
		  'parentRegion': '5028',
		  'regionCode': '358',
		  'regionName': '黔江区'
		},
		{
		  'parentRegion': '5028',
		  'regionCode': '359',
		  'regionName': '长寿区'
		},
		{
		  'parentRegion': '5028',
		  'regionCode': '360',
		  'regionName': '綦江区'
		},
		{
		  'parentRegion': '5028',
		  'regionCode': '361',
		  'regionName': '潼南区'
		},
		{
		  'parentRegion': '5028',
		  'regionCode': '362',
		  'regionName': '铜梁区'
		},
		{
		  'parentRegion': '5028',
		  'regionCode': '363',
		  'regionName': '大足区'
		},
		{
		  'parentRegion': '5028',
		  'regionCode': '364',
		  'regionName': '荣昌区'
		},
		{
		  'parentRegion': '5028',
		  'regionCode': '365',
		  'regionName': '璧山区'
		},
		{
		  'parentRegion': '5028',
		  'regionCode': '366',
		  'regionName': '梁平区'
		},
		{
		  'parentRegion': '5028',
		  'regionCode': '367',
		  'regionName': '城口县'
		},
		{
		  'parentRegion': '5028',
		  'regionCode': '368',
		  'regionName': '丰都县'
		},
		{
		  'parentRegion': '5028',
		  'regionCode': '369',
		  'regionName': '垫江县'
		},
		{
		  'parentRegion': '5028',
		  'regionCode': '370',
		  'regionName': '武隆区'
		},
		{
		  'parentRegion': '5028',
		  'regionCode': '371',
		  'regionName': '忠县'
		},
		{
		  'parentRegion': '5028',
		  'regionCode': '372',
		  'regionName': '开州区'
		},
		{
		  'parentRegion': '5028',
		  'regionCode': '373',
		  'regionName': '云阳县'
		},
		{
		  'parentRegion': '5028',
		  'regionCode': '374',
		  'regionName': '奉节县'
		},
		{
		  'parentRegion': '5028',
		  'regionCode': '375',
		  'regionName': '巫山县'
		},
		{
		  'parentRegion': '5028',
		  'regionCode': '376',
		  'regionName': '巫溪县'
		},
		{
		  'parentRegion': '5028',
		  'regionCode': '377',
		  'regionName': '石柱土家族自治县'
		},
		{
		  'parentRegion': '5028',
		  'regionCode': '378',
		  'regionName': '秀山土家族苗族自治县'
		},
		{
		  'parentRegion': '5028',
		  'regionCode': '379',
		  'regionName': '酉阳土家族苗族自治县'
		},
		{
		  'parentRegion': '5028',
		  'regionCode': '380',
		  'regionName': '彭水苗族土家族自治县'
		},
		{
		  'parentRegion': '5028',
		  'regionCode': '381',
		  'regionName': '江津区'
		},
		{
		  'parentRegion': '5028',
		  'regionCode': '382',
		  'regionName': '合川区'
		},
		{
		  'parentRegion': '5028',
		  'regionCode': '383',
		  'regionName': '永川区'
		},
		{
		  'parentRegion': '5028',
		  'regionCode': '384',
		  'regionName': '南川区'
		}
	  ],
	  'parentRegion': '22',
	  'regionCode': '5028',
	  'regionName': '重庆市'
	},
	{
	  'children': [
		{
		  'parentRegion': '467811123',
		  'regionCode': '467811160',
		  'regionName': '锦江区'
		},
		{
		  'parentRegion': '467811123',
		  'regionCode': '467811165',
		  'regionName': '青羊区'
		},
		{
		  'parentRegion': '467811123',
		  'regionCode': '467811167',
		  'regionName': '金牛区'
		},
		{
		  'parentRegion': '467811123',
		  'regionCode': '467811169',
		  'regionName': '武侯区'
		},
		{
		  'parentRegion': '467811123',
		  'regionCode': '467811171',
		  'regionName': '成华区'
		},
		{
		  'parentRegion': '467811123',
		  'regionCode': '467811173',
		  'regionName': '龙泉驿区'
		},
		{
		  'parentRegion': '467811123',
		  'regionCode': '467811176',
		  'regionName': '青白江区'
		},
		{
		  'parentRegion': '467811123',
		  'regionCode': '467811179',
		  'regionName': '新都区'
		},
		{
		  'parentRegion': '467811123',
		  'regionCode': '467811181',
		  'regionName': '温江区'
		},
		{
		  'parentRegion': '467811123',
		  'regionCode': '467811183',
		  'regionName': '金堂县'
		},
		{
		  'parentRegion': '467811123',
		  'regionCode': '467811186',
		  'regionName': '双流区'
		},
		{
		  'parentRegion': '467811123',
		  'regionCode': '467811188',
		  'regionName': '郫都区'
		},
		{
		  'parentRegion': '467811123',
		  'regionCode': '467811191',
		  'regionName': '大邑县'
		},
		{
		  'parentRegion': '467811123',
		  'regionCode': '467811193',
		  'regionName': '蒲江县'
		},
		{
		  'parentRegion': '467811123',
		  'regionCode': '467811195',
		  'regionName': '新津县'
		},
		{
		  'parentRegion': '467811123',
		  'regionCode': '467811197',
		  'regionName': '都江堰市'
		},
		{
		  'parentRegion': '467811123',
		  'regionCode': '467811199',
		  'regionName': '彭州市'
		},
		{
		  'parentRegion': '467811123',
		  'regionCode': '467811201',
		  'regionName': '邛崃市'
		},
		{
		  'parentRegion': '467811123',
		  'regionCode': '467811203',
		  'regionName': '崇州市'
		},
		{
		  'parentRegion': '467811123',
		  'regionCode': '467811290',
		  'regionName': '简阳市'
		}
	  ],
	  'parentRegion': '23',
	  'regionCode': '467811123',
	  'regionName': '成都市'
	}
  ]
export {
    HOT_CITY,
    HOT_CITY_PET,
    HOT_AIRPORT,
    REGION_HOT_CITY,
	REGION_HOT_CITY_PET
}