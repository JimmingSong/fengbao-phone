// pages/goods/settleAccounts/settleAccounts.js
import T from '../../../utils/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList: [],
    price: 0,
    quality: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let idList = JSON.parse(wx.getStorageSync('carArray'));
    this.searchGoodsById({ goodsId: idList });
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
    this.findAddress();
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
  findAddress() {
    T.findAddress().then(res => {
      if(res.success){
        let cur = res.value[0];
        this.setData({
          shippingAddress: cur
        })
      }
      console.log(res);
    })
  },
  searchGoodsById(data){
    T.findToCar(data).then(res => {
      if(res.success){
        this.setData({
          goodsList: res.value,
          quality: res.value.map(item => item.quality).reduce((pre, next) => {return pre + next}, 0)
        })
        this.calculatePrice();
      }
    })
  },
  /**
   * 计算
   */
  calculatePrice(){
    let {goodsList} = this.data;
    let goods = goodsList.map(item => {
      return {
        id: item._id,
        quality: item.quality
      }
    })
    let data = {
      goods
    }
    T.calculatePrice(data).then(res => {
      console.log(res);
      if(res.success){
        this.setData({
          price: res.data
        })
      }
    })
  },
  createBill(){
    let { goodsList, shippingAddress} = this.data;
    let goods = goodsList.map(item =>{return {id: item._id,quality: item.quality}});
    let data = {
      goods,
      address: shippingAddress
    }
    T.createBil(data).then(res => {
      if(res.success){
        wx.showModal({
          title: `确认支付${this.data.price}给商家`,
          content: '',
          success:(res) => {
            if(res.confirm){
              // wx.switchTab({
              //   url: '../../user/bills/bills',
              // })
              wx.navigateTo({
                url: '../../user/bills/bills',
              })
            }else{
              wx.showToast({
                title: '支付是吧',
                icon: 'failed'
              })
            }
          }
        })
      } else {
        wx.showToast({
          title: '出单失败',
          icon: 'none'
        })
      }
    })
  }
})