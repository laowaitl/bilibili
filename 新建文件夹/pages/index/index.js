
var url = "http://api.bilibili.cn/recommend";
var page = 0;
var pagesize = 10;





// 获取数据的方法，具体怎么获取列表数据大家自行发挥
var GetList = function (that) {
  that.setData({
    hidden: false
  });
  wx.request({
    url: url,
    data: {
      page: page,
      pagesize: pagesize,

    },
    success: function (res) {
      //console.info(that.data.list);
      var list = that.data.list;
      for (var i = 0; i < res.data.list.length; i++) {
        list.push(res.data.list[i]);
      }
      that.setData({
        list: list
      });
      console.log(list);
      page++;
      that.setData({
        hidden: true
      });
    }

  });
}
Page({
  data: {
    hidden: true,
    list: [],
    scrollTop: 0,
    scrollHeight: 0
  },
  onLoad: function () {
    //  这里要非常注意，微信的scroll-view必须要设置高度才能监听滚动事件，所以，需要在页面的onLoad事件中给scroll-view的高度赋值
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.info(res.windowHeight);
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
  },
  onShow: function () {
    //  页面展示之后先获取一次数据
    var that = this;
    GetList(that);

  },
  bindDownLoad: function () {
    //  页面滑动到底部的事件
    var that = this;
    GetList(that);
  },
  scroll: function (event) {
    //  绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
    this.setData({
      scrollTop: event.detail.scrollTop
    });
  },
  refresh: function (event) {
    //  该方法绑定了页面滑动到顶部的事件，然后做上拉刷新
    page = 0;
    this.setData({
      list: [],
      scrollTop: 0
    });
    GetList(this)
  },
  //点击跳转播放页面
  onPlay: function (event) {

    console.log(event.currentTarget.id),
      wx.navigateTo({
      url: "../../pages/play/paly?id=" + event.currentTarget.id,
      })
  }
})
