// pages/goods/goodsDetail/goodsDetail.js
import T from '../../../utils/request.js';
const App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsData: {},
    like_icon: 'icon-collection'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    let userInfo = JSON.parse(wx.getStorageSync('userInfo'));
    let data = {
      customerId: userInfo._id,
      ...options
    }
    T.searchGoodsById(data).then(res => {
      if(res.success){
        let resData = res.value[0];
        if(resData.collection){
          this.setData({
            like_icon: 'icon-collection_fill'
          })
        }
        this.setData({
          goodsData: resData
        });
      }
    })
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
  /**
   * 收藏/取消收藏 事件
   */
  collection(){
    // let userInfo = App.globalData.userInfo;
    let userInfo = JSON.parse(wx.getStorageSync('userInfo'));
    let goodsData = this.data.goodsData;
    let data = {
      like: 'cancel', // add 收藏 cancel 取消收藏
      update: userInfo._id,
      id: this.data.goodsData._id
    }
    if (this.data.like_icon === 'icon-collection'){
      data.like = 'add'
    }
    T.collectionGoods(data).then(res => {
      console.log(res);
      if(res.success){
        if (data.like === 'add') {
          goodsData.like++;
          this.setData({
            like_icon: 'icon-collection_fill',
            goodsData,
          })
        }else{
          goodsData.like--;
          this.setData({
            like_icon: 'icon-collection',
            goodsData
          })
        }
      }
    })
  }
})