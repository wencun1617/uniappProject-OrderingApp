export default {
  // context的解构
  //添加商品进购物车
  asyncAddToCart({commit,getters,state}, payload) {
    commit("addToCart",payload)
  },

  //单个产品的选择
  asyncClickSingle({commit}, payload) {
    commit('clickSingle', payload)
  },

  //是否全选
  asyncClickAll({commit}, payload) {
    commit('clickAll', payload)
  },
  //清空购物车
  asyncEmptyCart({commit}) {
	  commit('emptyCart')
  },
  //增加某个商品的数量
  asyncIncrease({commit}, payload) {
	  commit('increase',payload)
  },
  //减少某个商品的数量
  asyncDecrease({commit}, payload) {
	  commit('decrease',payload)
  },
  //新增地址
  asyncAddAddress({commit}, payload) {
	  commit('addAddress', payload)
  },
  //更改选中的地址
  asyncChange({commit}, payload) {
	  commit('change', payload)
  },
  asyncUpadte({commit}, payload) {
	  commit('update', payload)  
  }
}