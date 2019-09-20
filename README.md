# 微信旧岛小程序

## 1. 起步
### 1.1 开发环境配置

1. 到官方网址下载[微信小程序开发工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/stable.html)
1. 申请微信小程序开发账号

一个邮箱只能申请一个微信小程序账号,只能申请开发一个微信小程序,目前微信小程序开发注册机制是这样的,有点不太友好.
[https://mp.weixin.qq.com/](https://mp.weixin.qq.com/)
申请好微信小程序开发账号进入之后,左侧菜单栏->设置->找到账号信息,有appID,这是我们要使用的,请保存好不要告诉别人

3. 使用微信开发者工具创建一个项目,填入appid,一个项目就创建了
3. 使用第三方开发工具进行开发只能进行编辑工作,其他测试发布等等,都还要使用微信开发者工具
  1. vscode: 安装`minapp`或者`小程序开发助手`插件,即可正常查看文件以及代码提示等等
### 1.2. 项目结构
一个良好的项目结构,可以让我们的开发与维护变得更简单,使用组件化开发可以提高我们的开发效率
![QQ截图20190920095947.png](https://cdn.nlark.com/yuque/0/2019/png/243804/1568944836016-5fb00169-866d-40e0-adf7-a6790cd695da.png#align=left&display=inline&height=518&name=QQ%E6%88%AA%E5%9B%BE20190920095947.png&originHeight=518&originWidth=1042&size=616973&status=done&width=1042)

## 2. 项目开发
### 2.1 app.json
先学习下`app.json`的[配置](https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html)
1. pages 用于指定小程序由哪些页面组成
2. window 用于设置小程序的状态栏、导航条、标题、窗口背景色。
3. tabBar 用于切换页面

### 2.2 代码规范
[小程序开发规范](https://www.yuque.com/ynzy/xiaochengxu/guifan)

订制一个规范要基于这样几个标准
* 保证不会出现代码错误
* 要在一个大规范的前提下订制规范

### 2.3 组件使用
1. 创建
使用微信开发者工具创建一个components,一般创建一个components文件夹,存放所有公共组件,比如: `components/like`
2. 引用组件
在pages页面要使用组件的页面中的`.json`文件中进行引用
> pages/classic/classic.json
引用路径要使用绝对路径:
```json
{
  "usingComponents": {
    "v-like": "/components/like/index"
  }
}
```

