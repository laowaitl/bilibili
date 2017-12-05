function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds();


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

//签名(sign)生成方式
/**
 * @param $params array 参数列表
 * @param $key 加密密钥
 * @return array sign:加密校验串,params:参数拼接串
 */
function get_sign(params, key) {
  var s_keys = [];
  for (var i in params) {
    s_keys.push(i);
  }
  s_keys.sort();
  var data = "";
  for (var i = 0; i < s_keys.length; i++) {
    // encodeURIComponent 返回的转义数字必须为大写( 如 %2F )
    data += (data ? "&" : "") + s_keys[i] + "=" + encodeURIComponent(params[s_keys[i]]);
  }
  return {
    "sign": hex_md5(data + key),
    "params": data
  };
}
//获取舞台宽高
function stagePoint() {
  var stageSize = {};
  wx.getSystemInfo({
    success: function (res) {
      stageSize.stageWidth = res.windowWidth;
      stageSize.stageHeight = res.windowHeight;
    }
  });
  return stageSize;
}
function imageUtil(e) {
  var imageSize = {};
  var originalWidth = e.detail.width;
  var originalHeight = e.detail.height;
  var originalScale = originalWidth / originalHeight;//图片高宽比 
  wx.getSystemInfo({
    success: function (res) {
      var windowWidth = res.windowWidth;
      var windowHeight = res.windowHeight;
      //判断按照那种方式进行缩放
      if (originalWidth > windowWidth) {//在图片width大于手机屏幕width时候
        var autoWidth = windowWidth;
        var autoHeight = (autoWidth * originalHeight) / originalWidth;
        imageSize.imageWidth = autoWidth;
        imageSize.imageheight = autoHeight;
      } else {//否则展示原来的数据
        imageSize.imageWidth = windowWidth;
        imageSize.imageheight = originalHeight;
      }
    }
  })
  return imageSize;
}