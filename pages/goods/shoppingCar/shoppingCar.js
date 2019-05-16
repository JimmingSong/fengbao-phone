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
    this.calculatePrice();
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
  },
  /**
   * 加数量
   */
  addQuality(e){
    console.log(e);
    let index = e.currentTarget.dataset.index;
    let {_id} = this.data.goodsData[index];
    this.managerQuality(_id, index);
  },
  /**
   * 减数量
   */
  reduceQuality(e){
    console.log(e);
    let index = e.currentTarget.dataset.index;
    let { _id } = this.data.goodsData[index];
    this.managerQuality(_id, index, 'reduce');
  },
  calculatePrice(){
    T.calculatePrice().then(res => {
      console.log(res);
    })
  },
  /**
   * 发送数量更新请求
   */
  managerQuality(id, index, type='add'){
    let modify = this.data.goodsData;
    T.addAndDelShopCar({ goodsId: id, type: type}).then(res => {
      console.log(res);
      if (res.success) {
        if(type === 'reduce'){
          modify[index].quality -= 1;
        } else {
          modify[index].quality += 1;
        }
        this.setData({
          goodsData: modify
        })
      }
    });
  }
})