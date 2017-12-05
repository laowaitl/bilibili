var id=0;

Page({


  data: {
    post:[]
  },


  onLoad: function (options) {
    // console.log(options.id);
    
    id=options.id;
    
    var that=this;

    wx.request({
      url: 'http://9bl.bakayun.cn/API/GetVideoInfo.php',

      data: {
        aid:id,
        type: 'json',
        p:'1'
      },
      
      success: function (res) {
        console.log(res);
        that.setData({
          post: res.data.Result.VideoInfo

        })
        
      }

    });

    
  }
})