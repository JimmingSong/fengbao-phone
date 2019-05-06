// pages/goods/newPhoneList.js
import T from '../../../utils/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList: [],
    menuList: [
      {
        text: '全部',
        class: 'activeView'
      },
      {
        text: '手机',
        class: ''
      },
      {
        text: '配件',
        class: ''
      },
      {
        text: '服务',
        class: ''
      },
      {
        text: '其他',
        class: ''
      }
    ]
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
    this.findAll();
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
  findAll(data){
    T.searchGoods(data).then(res => {
      if(res.success){
        this.setData({
          goodsList: res.values
        })
      }else{
        this.setData({
          goodsList:[]
        })
      }
    })
  },
  /**
   * 查看商品详情
   */
  viewDetail(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../goodsDetail/goodsDetail?id='+ id,
    })
  },
  searchByType(e){
    let value = e.currentTarget.dataset;
    let menuList = this.data.menuList;
    menuList.forEach(item => item.class = '');
    menuList[value.index].class = 'activeView';
    this.setData({
      menuList,
    });
    let data = {};
    if (value.index !== 0) data.type = value.index;
    this.findAll(data);
  }
})