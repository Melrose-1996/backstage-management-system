export default (routeData) => {
	let result = []
	const transform = word => {
		let str = ''
		word.split('').forEach(item => {
			if (/[A-Z]/.test(item)) {
				item = '_' + item.toLowerCase()
			}
			str += item
		})
		return str
	}
	const getName = (name1, name2) => `${name1}${name2.slice(0, 1).toUpperCase()}${name2.slice(1)}`
	routeData.children.forEach(item => {
		let {
			children,
			title,
			name,
			id
		} = item
		let data = {
			path: '/' + transform(routeData.name),
			component: (resolve) => require(['@/pages/layout/index'], resolve),
			meta: {
				title,
				name,
				id
			}
		}
		data.children = children.map(innerItem => {
			let {
				title: innerTitle,
				name: innerName,
				id: innerId,
				component
			} = innerItem
			return {
				path: transform(innerName),
				name: getName(routeData.name, innerName),
				component,
				meta: {
					title: innerTitle,
					keepAlive: true,
					isChild: true,
					id: innerId
				}
			}
		})
		result.push(data)
	})
	return result
}
