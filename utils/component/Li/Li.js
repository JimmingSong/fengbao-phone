// utils/component/Li/Li.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    text: {
      type: String,
      value: 'li list'
    },
    icon: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    jumpToPage(){
      this.triggerEvent('toPage')
    }
  }
})
