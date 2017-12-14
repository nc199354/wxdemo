//获取应用实例
const app = getApp();
var page = 1;
var getList = function(that){
  wx.showLoading({
    title: '加载中...',
    mask:true
  });
  that.setData({
    isLoad:true,
  })
  wx.request({
    url: app.globalData.url +"/menu/search",
    data: { key: app.globalData.key, cid: that.data.id, page: page,size:20},
    success:function(res){
      wx.hideLoading();
      var list = that.data.list;
      if(res.statusCode ==200 && res.data.msg=="success"){
        var data = res.data.result.list;
        for(var i=0;i<data.length;i++){
          data[i].ctgTitles = data[i].ctgTitles.split(",");
          if(!data[i].recipe.img){
            data[i].recipe.img = "../../utils/img/lazyimg.png";
          }
          list.push(data[i]);
        }
        console.log(list);
        page = page+1;
        that.setData({
          list:list,
          isLoad:false,
        })

      }
    }
  })
}


// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:null,
    name:"",
    scrollHeight:0,
    page:1,
    list:[],
    isLoad:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var $this = this;
    page = 1;
    wx.getSystemInfo({
      success: function(res) {
        $this.setData({
          id: options.id,
          name: options.name,
          scrollHeight:res.windowHeight
        });
      },
    })
    wx.setNavigationBarTitle({
      title: options.name,
    })
    getList($this);
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
  load:function(){
    
    if (!this.data.isLoad){
      getList(this);
    }else{
      return false;
    }
  },
  imgErr:function(event){
    console.log(event);
  }
})