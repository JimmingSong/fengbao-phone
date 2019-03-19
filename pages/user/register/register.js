// pages/user/register/register.js
import T from '../../../utils/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sendCodeMsg: '发送验证码',
    emailAccount: 'sljym0611@163.com',
    radiocheck: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  setEmail(e){
    this.setData({
      emailAccount: e.detail.value
    })
  },
  sendCode(){
    let email = this.data.emailAccount;
    if (this.data.sendCodeMsg !== '发送验证码'){
      return
    }
    if (!email){
      wx.showToast({
        title: '请填写邮箱账户',
        icon: 'none'
      })
      return;
    }
    let reg = /[.com]$/g;
    if (email.indexOf('@') < 0 || !reg.test(email)){
      wx.showToast({
        title: '请填写正确的邮箱账户',
        icon: 'none'
      });
      return;
    }
    T.sendCode({email}).then(res => {
      if(res.success){
        this.cookie = res.sessionId;
        let time = 60;
        let T = setInterval(() => {
          time--;
          this.setData({
            sendCodeMsg: time + '秒'
          });
          if (time === 1) {
            clearInterval(T);
            this.setData({
              sendCodeMsg: '发送验证码'
            })
          }
        }, 1000);
      }
    })
  },
  // 阅读协议change事件
  radiochange(e){
    let check = e.detail.value;
    if(check){
      this.setData({
        radiocheck: true
      })
    }
  },
  // 注册事件
  registerAccount(val){
    let {radiocheck} = this.data;
    if(!radiocheck){
      wx.showToast({
        title: '请先阅读注册协议',
        icon: 'none'
      });
      return;
    }
    let data = val.detail.value;
    data.sessionId = this.cookie;
    T.register(data).then(res => {
      console.log(res);
    })
    console.log(val);
  }
})