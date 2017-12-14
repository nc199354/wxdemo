//获取应用实例
const app = getApp();
// pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img:"",//主图
    title:"",//标题
    sumary:"",//描述
    ingredients:[],//食材
    method:[],//步骤
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var $this = this;
    wx.setNavigationBarTitle({
      title: options.name,
    })
    wx.request({
      url: app.globalData.url +"/menu/query",
      data:{key:app.globalData.key,id:options.id},
      success:function(res){
        var data = res.data.result;
        var ingredients = "";
        if (data.recipe.ingredients){
          ingredients = JSON.parse(data.recipe.ingredients);
        }
         $this.setData({
           title: data.recipe.title,
           sumary: data.recipe.sumary,
           img:data.recipe.img,
           ingredients: ingredients,
           method:JSON.parse(data.recipe.method),
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
  
  }
})