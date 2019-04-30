// pages/user/editAddress/editAddress.js
import T from '../../../utils/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    add:true,
    defaultData: {
      name: '',
      phone: '',
      address: '',
      index: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.add){
      this.setData({
        add: false
      })
    }else{
      this.setData({
        defaultData: options
      })
    }
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
  handleSubmit(e){
    let value = e.detail.value;
    let data = {
      atr: 'address',
      data: value
    }
    debugger;
    if(this.data.add){
      data.index = this.data.defaultData.index;
    } else {
      data.operate = 'add';
    }
    T.updateAtrData(data).then(res => {
      if(res.success){
        wx.navigateBack({})
      }
    })
  },
  /**
   * 删除当前地址
   */
  delete(e){
    let data = {
      index: this.data.defaultData.index,
      atr: 'address',
      operate: 'delete'
    }
    T.updateAtrData(data).then(res => {
      if (res.success) {
        wx.navigateBack({})
      }
    })
  }
})