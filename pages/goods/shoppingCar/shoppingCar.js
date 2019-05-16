// pages/goods/shoppingCar/shoppingCar.js
import T from '../../../utils/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsData: [],
    management_good: true,
    price: 0,
    selGoods: [],
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
    this.initData();
    this.find_goods_list();
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
   * 加载默认数据
   */
  initData(){
    this.setData({
      selGoods: []
    })
  },
  /**
   * 查找商品列表
   */
  find_goods_list(){
    T.findToCar().then(res => {
      console.log(res);
      if (res.success) {
        let dealData = res.value.map(item => {
          item.checked = false;
          return item;
        });
        this.setData({
          goodsData: dealData
        });
      }
    })
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
  /**
   * 计算价格
   */
  calculatePrice(){
    let selGoods = this.data.selGoods;
    let goods = selGoods.map(item => {
      return {
        id: item.goods._id,
        quality: item.goods.quality
      }
    });
    let data = {
      goods
    };
    T.calculatePrice(data).then(res => {
      if (res.success) {
        this.setData({
          price: res.data
        })
      }
    })
  },
  /**
   * 发送数量更新请求
   */
  managerQuality(id, index, type='add'){
    let modify = this.data.goodsData;
    if (type === 'reduce') {
      if (modify[index].quality <= 1) {
        wx.showToast({
          title: '不能再减了啦',
          icon: 'none'
        });
        return;
      }
    }
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
        });
        this.calculatePrice();
      }
    });
  },
  /**
   * 选择购买
   */
  checkGoods(e){
    let goodsData = this.data.goodsData;
    let index = e.currentTarget.dataset.index;
    this.updateGoodsData(index, true);
  },
  /**
   * 取消购买
   */
  cancelCheck(e){
    let goodsData = this.data.goodsData;
    let index = e.currentTarget.dataset.index;
    this.updateGoodsData(index, false);
  },
  /**
   * 全选事件
   */
  selAll(){
    let goodsData = this.data.goodsData;
    let selGoods = goodsData.map((item,index) => {
      goodsData[index].checked = true;
      return {
        index: index,
        goods: item
      }
    });
    this.setData({
      selGoods,
      goodsData: goodsData
    });
    this.calculatePrice()
  },
  /**
   * 取消选择所有
   */
  cancelAll(){
    let goodsData = this.data.goodsData;
    goodsData.forEach(item => {
      item.checked = false;
    });
    this.setData({
      selGoods: [],
      goodsData
    });
    this.calculatePrice()
  },
  /**
   * 更新数据的选择状态
   */
  updateGoodsData(index, bool){
    let goodsData = this.data.goodsData;
    let selGoods = this.data.selGoods;
    goodsData[index].checked = bool;
    // 判断是加入计算列表还是从计算列表删除
    if (bool) {
      selGoods.push({index, goods: goodsData[index]});
    } else {
      selGoods.forEach((item,dex) => {
        if (item.index === index) {
          selGoods.splice(dex, 1);
        }
      })
    }
    this.setData({
      goodsData,
      selGoods
    });
    this.calculatePrice()
  },
})