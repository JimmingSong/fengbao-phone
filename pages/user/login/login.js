// pages/user/login/login.js
import T from '../../../utils/request.js'
//获取应用实例
const App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
  userLogin(e) {
    let data = e.detail.value;
    T.customerLogin(data).then((res)=>{
      if (res.success){
        wx.setStorageSync('token', res.token)
        wx.switchTab({
          url: '../../goods/newPhoneList/newPhoneList',
        })
      }else{
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    });
  },
  getUserInfo(e) {
    let data = e.detail;
    console.log(e);
    if (data.errMsg === 'getUserInfo:ok'){
      let userInfo = data.userInfo;
      console.log(data);
      T.customerLogin({ encryptedData: data.encryptedData, userInfo, iv: data.iv, appSession: App.globalData.appId}).then(res => {
        if(res.success){
          App.setCustomerData(res.value);
          wx.setStorageSync('userInfo', JSON.stringify(res.value));
          wx.setStorageSync('sessionId', res.sessionId);
          wx.switchTab({
            url: '../../goods/newPhoneList/newPhoneList',
          });
        } else {
          wx.showToast({
            title: res.msg,
            icon: 'none'
          })
        }
      })
    }
  },
  register(){
    wx.navigateTo({
      url: '../register/register',
    })
  }
})