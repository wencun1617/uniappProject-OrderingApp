export default {
  //各个商品的数量全部总和
  productNum(state) {
    if(state.cart == undefined || state.cart == null) {
      return 0
    }
    let sum = 0;
    state.cart.forEach( value => {
      sum += value.num 
    })
    return sum 
  },
  //选中商品的总价格
  totalPrice(state) {
    if(state.cart == undefined || state.cart == null) {
      return 0
    }
    let total = 0; 
    state.cart.forEach( value => {
      if(value.selected == true) {
        total += value.num * value.price 
      } 
    })
    return total
  },
  //是否全部选中
  isAllchecked(state) {
    if(state.cart == undefined || state.cart == null) {
      return false
    }

    let result = state.cart.some(item => {
      
      return item.selected == false  //有一个商品不选中，便返回false
    })

    return !result
  },
  //有商品是选中 用来控制SubmitBar 提交订单栏 是否可用
  hasCheckedGoods(state) {
    if(state.cart == undefined || state.cart == null) {
      return false
    }

    let result = state.cart.some(item => {
      return item.selected == true  //有一个商品选中，便返回true
    })
    return result
  },
  //state.cart 是否存在,用来控制全选按钮的禁用与否
  cartCondition(state){
    if(state.cart == undefined || state.cart == null) {
      return true
    }
    return false
  }
}