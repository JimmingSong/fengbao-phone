function ajax(url, data, method = 'POST',header = {}) {
  let hostname = 'http://127.0.0.1:3001';
  if(!header.sessionId){
    header.sessionId = wx.getStorageSync('sessionId');
  }
  return new Promise((resolve,reject) => {
    wx.request({
      url: `${hostname}${url}`,
      data: JSON.stringify(data),
      header: header,
      method: method,
      success: function(res) {
        let data = res.data;
        if (data.success){
          resolve(data);
        }else{
          /**如果是未登陆状态 则跳转到登陆页面 */
          if (data.state === '001') {
            wx.navigateTo({
              url: '../../user/login/login',
            });
          } else {
            resolve(data);
          }
        }
      },
      fail: function(res) {
        reject(res);
      },
    })
  })
}

module.exports = {
  getWeChatInfo(data){
    return ajax('/ignore/weChat',data)
  },
  // 检查登陆状态
  checkLogin(data){
    return ajax('/checkLogin', data);
  },
  // 登录
  customerLogin(data){
    return ajax('/loginCustomer', data);
  },
  // 查找用户信息
  customerFind(data){
    return ajax('/customerFind', data);
  },
  // 查找指定属性
  customerField(data){
    return ajax('/customerField', data)
  },
  // 发送验证码
  sendCode(data){
    return ajax('/sendMail', data);
  },
  // 注册用户
  register(data){
    return ajax('/addCustomer', data);
  },
  // 注销用户
  customerLogout(data){
    return ajax('/logoutCustomer', data);
  },
  // 
  updateAtrData(data){
    return ajax('/updateCustomer', data)
  },
  // 查询商品数据
  searchGoods(data){
    return ajax('/goods/searchGoodsByType', data)
  },
  searchGoodsById(data){
    return ajax('/goods/searchGoodsById', data);
  },
  /**
   * 收藏
   * data: {
   *  like:boolean 操作类型
   *  update: '' 当前操作用户
   *  id: 商品ID
   * }
   */
  collectionGoods(data){
    return ajax('/goods/updateLike', data);
  },
  /**
   * 加入购物车
   */
  addToCar(data){
    return ajax('/car/addToCar', data)
  },
  /**
   * 查找购物车
   */
  findToCar(data){
    return ajax('/car/findToCar', data);
  },
  /**
   * 清空购物车  删除所有商品
   */
  clearShopCar(data){
    return ajax('/car/clearToCar', data);
  },
  /**
   * 加/减 购物车中的数量
   */
  addAndDelShopCar(data){
    return ajax('/car/qualityUpdate', data);
  },
  /**
   * 计算购物车中商品价格
   */
  calculatePrice(data) {
    return ajax('/car/calculate', data)
  },
  /**
   * 查找用户收货地址
   */
  findAddress(data) {
    return ajax('/user/address', data);
  },
  /**
   * 创建订单
   */
  createBil(data) {
    return ajax('/bill/create', data)
  },
  /**
   * 查询订单
   */
  findBild(data) {
    return ajax('/bill/find', data)
  },
  /**
   * 结算页面查询
   */
  settleFindGoods(data) {
    return ajax('/settle/find', data)
  }
}