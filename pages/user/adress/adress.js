// pages/user/adress/adress.js
import T from '../../../utils/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList: []
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
    T.customerField({ atr: 'address' }).then(res => {
      this.setData({
        addressList: res.value
      });
    })
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
  toPage(e){
    console.log(e);
    let tar = e.currentTarget.dataset;
    let name = tar.name;
    let phone = tar.phone;
    let address = tar.address;
    let index = tar.index;
    wx.navigateTo({
      url: `../editAddress/editAddress?name=${name}&phone=${phone}&address=${address}&index=${index}`,
    })
  },
  addAddress(e){
    wx.navigateTo({
      url: '../editAddress/editAddress?add=add',
    })
  }
})