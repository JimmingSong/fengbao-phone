function ajax(url, data, method = 'POST',header = {}) {
  let hostname = 'http://127.0.0.1:3001';
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
  // 登录
  customerLogin(data){
    return ajax('/loginCustomer', data);
  },
  // 发送验证码
  sendCode(data){
    return ajax('/sendMail', data);
  },
  register(data){
    return ajax('/addCustomer', data);
  }
}