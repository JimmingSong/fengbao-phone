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
  // 发送验证码
  sendCode(data){
    return ajax('/sendMail', data);
  },
  // 注册用户
  register(data){
    return ajax('/addCustomer', data);
  },
  customerLogout(data){
    return ajax('/logoutCustomer', data);
  },
  // 查询商品数据
  searchGoods(data){
    return ajax('/goods/searchGoodsByType', data)
  },
  searchGoodsById(data){
    return ajax('/goods/searchGoodsById', data);
  }
}