export default {
	baseIp: '',
	ip: '/webmicroservice',
	portalIp: '/webmicroservice',
    imgViewIp: '/webmicroservice', // 图片网关
    // agentImgHost: '/webmicroservice/atp-baseinfo/common/getPicture',
    agentPetImgHost: '/webmicroservice/transport/wxopen/viewPic',
	locationIp: `${window.location.origin}`,
    imgHost: `${window.location.origin}/nfsc/SCS_PAY_SERVER/componyAptitude/tmpFile/`,
    agentImgHost: '/webmicroservice/atp-baseinfo/common/getPicture',
    agentImgHosts: '/webmicroservice/atp-baseinfo/common/getPictures',
	isDecode: true,
	timeout: 60 * 1000,
	downloadTimeout: 3 * 60 * 1000 // 下载超时时间
}
