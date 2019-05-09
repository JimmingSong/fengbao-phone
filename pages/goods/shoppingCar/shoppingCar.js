// pages/goods/shoppingCar/shoppingCar.js
import T from '../../../utils/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsData: [],
    management_good: true
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
    let userInfo = JSON.parse(wx.getStorageSync('userInfo'));
    T.findToCar({id: userInfo._id}).then(res => {
      console.log(res);
      if(res.success){
        this.setData({
          goodsData: res.value
        });
      }
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
  /**
   * 清空购物车  删除所有商品
   */
  clearShopCar(){
    T.clearShopCar().then(res => {
      console.log(res);
    })
  }
})