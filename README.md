# uniappProject-OrderingApp
1. 进入文件夹jsonServer

2. npm install (安装依赖)

3. node index.js (运行js文件,模拟后端数据)

4.项目(finalproject)需要借助 HBuilderX 方可运行在真机或者模拟器上,
  单独安装APK无法请求到数据,以及地图,登录,分享模块的功能均无法使用

（若申请到高德定位地图appkey_android,QQ登录的appid,微信登录的appid
  分享到QQ好友的appid 分享到微信消息及朋友圈的appid并在manifest.json进行配置
  再进行打包,安装好APK,在真机上运行便不需要HBuilder X）

5.使用的是模拟数据,要想在真机上请求到数据,请使用natapp进行内网穿透,
  具体操作请自行百度

6.通过natap进行内网穿透后,替换源码里common/apiVariable里的映射地址

