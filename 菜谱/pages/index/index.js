//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    list:[],
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.getList();
  },
  /**
   * 获取菜谱列表
   */
  getList:function(){
    var $this = this;
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: app.globalData.url + "/category/query?key=" + app.globalData.key,
      success:function(res){
        wx.hideLoading();
        if(res.statusCode ==200 && res.data.msg =="success"){
          $this.setData({
            list:res.data.result.childs
          })
        }
      }
    })
  },
  skip:function(event){
    var id   = event.target.dataset.id;
    var name = event.target.dataset.name;
    wx.navigateTo({
      url: '../list/list?id='+id+"&name="+name,
    }) 
  }
})
