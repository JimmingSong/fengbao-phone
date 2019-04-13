function ajax(url, data, method = 'POST',header = {}) {
  let hostname = 'http://127.0.0.1:3001';
  if(!header.token){
    header.token = wx.getStorageSync('token');
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
          wx.showToast({
            title: data.msg,
          })
        }
      },
      fail: function(res) {
        reject(res);
      },
      // complete: function(res) {},
    })
  })
}

module.exports = {
  // 检查登陆状态
  checkLogin(data){
    return ajax('/checkLogin', data);
  },
  // 登录
  customerLogin(data){
    return ajax('/loginCustomer', data);
  },
  // 发送验证码
  sendCode(data){
    return ajax('/sendMail', data);
  },
  // 注册用户
  register(data){
    return ajax('/addCustomer', data);
  },
  // 查询商品数据
  searchGoods(data){
    return ajax('/goods/phone', data)
  }
}