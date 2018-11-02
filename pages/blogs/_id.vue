<template>
  <v-layout row wrap>
    <v-flex md9>
      <v-card hover to='/blog/1'>
        <v-img src="https://cdn.sspai.com/article/b73981b9-2abd-1aa7-5694-288bab62a443.jpg?imageMogr2/quality/95/thumbnail/!700x233r/gravity/Center/crop/700x233" aspect-ratio="2.75">
        </v-img>
        <v-card-title primary-title class="pb-1">
          <v-layout column>
            <v-flex>
              <div class="body-1 font-weight-thin">
                <span>2018-09-25</span> | <span>admin</span>
              </div>
            </v-flex>
            <v-flex>
              <h3 class="title">如何给捷径添加自动运行请求</h3>
            </v-flex>
            <v-flex>
              <div>
                捷径正式推出以后我在微博收到了很多咨询，发现大家有很多需求都是捷径本身并不支持的，其中包括在指定的时间或地点自动运行预先设置好的捷径。比如下面这两种应用场景：
                每天下午 5:00，我需要运行捷径来做这一天的 工作总结 记录到 Day One 的 Markdown 表格中。
                如果我到海口市出差，就运行捷径整理出我的 空闲时间，完成以后用邮件发送给指定的朋友。
                在 iOS 的机制中，捷径无法在指定条件下自动打开运行，但是每一个捷径都有对应的 URL Schemes，借此我们可以通过其他软件来间接地解决这个问题。
                iOS 的机制问题
                在 iOS 设备上，除了电话，短信和闹钟之外几乎找不到可以自动触发运行的应用，这样做的好处是节省电量和内存资源。但是弊端同样明显，有些依赖于指定时间或指定地点运行软件的情景无法实现。取代这项功能的是系统通知，苹果允许软件在用户指定条件下弹出通知以便提醒用户运行软件，所以我们可以利用通知功能来触发捷径。
                请求运行的实现原理
                实现一键运行捷径，就需要使用对应捷径的链接，这种链接可以自制，下载这个 捷径规则，运行以后选择想要获得链接的捷径，就会把所需链接写入剪贴板以供使用。
                在这里我举例两种方案：分别通过第三方软件 IFTTT 和 LCP 来实现。
                IFTTT ：在指定条件下，弹出一条带有链接的富通知（Rich Notification），点击通知自动跳转并运行指定的捷径规则。
                LCP ：配置自带的链接方案来运行指定的捷径，然后按需要增加需要提醒运行的条件。
                这两种方案本质上都是一样的：弹出带有链接的通知，打开链接自动运行捷径。
                捷径运行请求制作
                到这里就说说正事，要实现指定条件运行捷径，你至少需要一步操作。也就是说，捷径运行请求弹出以后你至少需要点击一次来运行它。严格来说这样的操作已经不能再算是自动运行了，但至少它的确解决了捷径无法实现的需求。
                IFTTT 在指定条件下弹出通知
                相比捷径来说，IFTTT 制作起来要简单许多，全程只需两步：满足指定条件（trigger），则弹出一条带有捷径链接的富通知（action）。 步骤如下：
                设置指定的触发条件（Trigger）：根据需求选用指定时间或指定地点
                指定时间：新建小程序，选择时间，选择每天指定时间，然后设置时间：5:00 PM
                指定地点：新建小程序，选择位置，选择到达位置，最后设置位置范围，可以直接输入，也可以通过地图拖放
                设置对应的动作（Action）:因为捷径请求是通过弹出带有链接的富通知来实现的，所以这里就选择富通知
                设定通知：选择通知，富通知，然后编辑通知内容：Title 是标题，Message 是正文，Link URL 填入准备的捷径链接，Image URL 填入图标链接，最后点击创建就完成了
                最终完成效果如下图：
                说明：IFTTT 定时提醒是依赖网络服务的，所以可能存在延时情况。而且地图服务在国内不是很好用，可能会出现不弹出通知的情况。
                LCP指定条件触发运行捷径请求
                LCP 相对 IFTTT 来说设置时间更加精准灵活，同时也无需账号注册，更不依赖在线网络，实现起来更加容易。在 LCP 中你可以不用预先获取捷径的链接，因为它本身就是靠链接的支持来实现各种高效率自动化流程的。
                下面就从配置链接开始吧。首先打开 LCP，然后选择编辑，点击加号选择动作 Action，进入到 Action 编辑页面。
                点击 Action Composer ，在里面选择新增动作，找到捷径，选择运行捷径 Run Shortcut，打开以后简单填写 Action 名称和捷径名称即可完成链接配置：
                接下来选择什么情景下请求运行：
                当然情景还是只有两个，在指定的时间请求运行或在指定的地点请求运行，需要哪个就在对应的位置设置就行，非常简单，过程就不讲了。
              </div>
            </v-flex>
          </v-layout>
        </v-card-title>
        <v-card-actions class="pt-0">
          <v-btn-toggle>
            <v-btn flat disabled class="mx-0">
              <v-icon size="10">mdi-eye</v-icon><span class="ml-1">1</span>
            </v-btn>
            <v-btn flat disabled class="mx-0">
              <v-icon size="10">mdi-thumb-up</v-icon><span class="ml-1">99</span>
            </v-btn>
          </v-btn-toggle>
          <v-spacer></v-spacer>
          <v-avatar :size="20">
            <img src="https://cdn.sspai.com/article/b73981b9-2abd-1aa7-5694-288bab62a443.jpg?imageMogr2/quality/95/thumbnail/!700x233r/gravity/Center/crop/700x233" alt="avatar">
          </v-avatar>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-flex md3 class="right-content">
      <v-layout column>
        <v-flex>
          <v-card>
            <v-card-title>
              <h2 class="font-weight-regular">
                <span class="primary--text font-weight-medium">#</span> 分类
              </h2>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text class="px-0 py-0">
              <v-list dense subheader>
                <v-list-tile to='/'>
                  <v-list-tile-title flat>首页</v-list-tile-title>
                </v-list-tile>
                <v-list-tile to='/archive'>
                  <v-list-tile-title>归档</v-list-tile-title>
                </v-list-tile>
                <v-list-tile to='/about'>
                  <v-list-tile-title>关于</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex>
          <v-card>
            <v-card-title>
              <h2 class="font-weight-regular">
                <span class="primary--text font-weight-medium">#</span> 标签
              </h2>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-chip outline color="primary" text-color="black">
                Code
              </v-chip>
              <v-chip outline color="primary" text-color="black">
                Vue
              </v-chip>
              <v-chip outline color="primary" text-color="black">
                JS
              </v-chip>
              <v-chip outline color="primary" text-color="black">
                Node
              </v-chip>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>