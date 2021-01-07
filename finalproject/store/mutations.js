export default {
	//添加商品进入购物车
	addToCart(state, payload) {

		//some() 方法测试数组中是不是至少有1个元素通过了 所提供的函数测试,返回的是一个Boolean类型的值
		//callback  用来测试每个元素的函数，接受三个参数：element,index,array
		if (state.cart != undefined) {
			let isExist = false;
			if (state.cart != null) {
				isExist = state.cart.some(element => {
					if (element.id == payload.id) { //id相等说明已经添加过该商品 数量加一便可
						element.num++
						return true
					}
				})
			}
			if (!isExist) {
				state.cart.push({
					id: payload.id,
					name: payload.name,
					price: payload.price,
					desc: payload.desc,
					category: payload.category,
					pic: payload.pic,
					selected: true,
					num: 1
				})
			}
			//将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个同步接口
			uni.setStorageSync("cart", JSON.stringify(state.cart))
		}
	},
	//单个产品的选择
	clickSingle(state, payload) {
		state.cart.some(element => { //符合的只有一个, 不用forEach
			if (element.id == payload.id) {
				element.selected = !element.selected
			}
		})
	},
	//是否全选
	clickAll(state, payload) {
		state.cart.forEach(value => {
			value.selected = !payload //把原先的改反
		})
	},
	//增加某个商品的数量
	increase(state, payload) {
		state.cart.some(item => {
			if (item.id == payload.id) {
				item.num++
			}
		})
	},
	//减少某个商品的数量
	decrease(state, payload) {
		state.cart.some(item => {
			if (item.id == payload.id) {
				item.num--
			}
		})
	},
	//清空购物车
	emptyCart(state) {
		state.cart = [],
			uni.setStorageSync("cart", JSON.stringify(state.cart))
	},
	//新增地址
	addAddress(state, payload) {
		state.addressLists.push({
			id: state.addressLists.length + 1,
			linkMan: payload.linkMan,
			mobile: payload.mobile,
			address: payload.address,
			isDefault:false
		})
		//将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个同步接口
		uni.setStorageSync("addressLists", JSON.stringify(state.addressLists))
	},
	//更改选中的地址
	change(state, payload) {
		state.addressLists.forEach(value => {
			if (value.id == payload) {
				value.isDefault = !value.isDefault
			} else {
				value.isDefault = false
			}
		})
	},
	//更改地址信息
	update(state, payload) {
		state.addressLists.some(element => { //符合的只有一个
			if (element.id == payload.id) {
				element.linkMan =  payload.linkMan,
				element.mobile = payload.mobile,
				element.address = payload.address
			}
		})
	},
	//登录和退出
	login(state, userName) {
		state.userName = userName || '新用户';
		state.hasLogin = true;
	},
	logout(state) {
		state.userName = "";
		state.hasLogin = false;
	}
}
