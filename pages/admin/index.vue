<template>
  <!-- 控制台 -->
  <div class="dashboard">
    <div class="count-container">
      <el-row :gutter="20">
        <el-col v-for="(item, index) in countData" :key="index" :span="6">
          <el-card>
            <div class="count-card">
              <img :src="item.icon" />
              <div class="detail">
                <div class="detail-title">{{ item.title }}</div>
                <div class="detail-count">{{ item.count }}</div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="main-container">
      <el-row :gutter="20" style="height:100%">
        <el-col :span="15" style="height:100%">
          <el-card style="height:100%" :body-style="{ height: 'calc(100% - 57px)' }">
            <div slot="header">
              <span>近半年用户博客数量统计</span>
              <el-button
                icon="el-icon-refresh"
                style="float: right; padding: 3px 0"
                type="text"
                @click="getBlogCountTrend"
              >
                刷新
              </el-button>
            </div>
            <ve-histogram :data="lineChartData" :extend="extend" height="100%" />
          </el-card>
        </el-col>
        <el-col :span="9" style="height:100%">
          <div class="pie-container">
            <el-card style="height:49%" :body-style="{ height: 'calc(100% - 57px)' }">
              <div slot="header">
                <span>类别占比统计</span>
                <el-button
                  icon="el-icon-refresh"
                  style="float: right; padding: 3px 0"
                  type="text"
                  @click="getCategoryProportionData"
                >
                  刷新
                </el-button>
              </div>
              <!-- <ve-pie :settings="pieChartSettings" :data="categoryProportionData" height="100%" /> -->
              <ve-ring :settings="ringChartSettings" :data="categoryProportionData" height="100%" />
            </el-card>
            <el-card style="height:49%" :body-style="{ height: 'calc(100% - 57px)' }">
              <div slot="header">
                <span>标签占比统计</span>
                <el-button
                  icon="el-icon-refresh"
                  style="float: right; padding: 3px 0"
                  type="text"
                  @click="getTagProportionData"
                >
                  刷新
                </el-button>
              </div>
              <ve-pie :settings="pieChartSettings" :data="tagProportionData" height="100%" />
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
if (process.client) {
  var VePie = require('v-charts/lib/pie.common')
  var VeHistogram = require('v-charts/lib/histogram.common')
  var VeRing = require('v-charts/lib/ring.common')
}

export default {
  layout: 'admin',
  components: { VeHistogram, VePie, VeRing },
  data() {
    this.ringChartSettings = {
      radius: [60, 70],
      offsetY: 140
    }
    this.pieChartSettings = {
      radius: 70,
      offsetY: 140
    }
    return {
      countData: [
        { title: '用户', count: 0, icon: '/user.svg' },
        { title: '博客', count: 0, icon: '/blog.svg' },
        { title: '类别', count: 0, icon: '/category.svg' },
        { title: '标签', count: 0, icon: '/tag.svg' }
      ],
      extend: {},
      lineChartData: {
        columns: ['date'],
        rows: []
      },
      categoryProportionData: {
        columns: ['_id', 'count'],
        rows: []
      },
      tagProportionData: {
        columns: ['_id', 'count'],
        rows: []
      }
    }
  },
  created() {
    if (process.client) {
      this.getCountData()
      this.getBlogCountTrend()
      this.getCategoryProportionData()
      this.getTagProportionData()
    }
  },
  methods: {
    // 获取用户、博客、类别和标签数量
    async getCountData() {
      const res = await this.$axios.$get('/statistic/allCount')
      if (res && res.success) {
        for (let i = 0; i < this.countData.length; i++) {
          this.countData[i].count = res.data[i]
        }
      }
    },
    // 获取近半年用户博客数量统计数据
    async getBlogCountTrend() {
      const res = await this.$axios.$get('/statistic/blogCountTrend')
      if (res && res.success) {
        const { users, data } = res
        // 获取半年前的日期
        let now = this.$dayjs().subtract(6, 'month')
        // 博客趋势数据
        let blogTrendData = []
        // 临时对象，存储图表对应格式数据
        let obj = {}
        // 所有用户名组成的数组
        let userArr = []
        users.forEach(item => {
          obj[item.name] = 0
          userArr.push(item.name)
        })
        for (let i = 1; i <= 6; i++) {
          let temp = JSON.parse(JSON.stringify(obj))
          temp.date = now.add(i, 'month').format('YYYY-MM')
          blogTrendData.push(temp)
        }
        blogTrendData.forEach(item => {
          let temp = data.filter(i => {
            return i.date == item.date && item.hasOwnProperty(i.user)
          })
          if (temp) {
            temp.forEach((j, index) => {
              item[j.user] = j.count
            })
          }
        })
        this.lineChartData.columns = ['date', ...userArr]
        this.lineChartData.rows = blogTrendData
        this.extend = {
          series: {
            label: { show: true, position: 'top' }
          }
        }
      }
    },
    // 获取类别占比数据
    async getCategoryProportionData() {
      const res = await this.$axios.$get('/statistic/categoryProportionData')
      if (res && res.success) {
        this.categoryProportionData.rows = res.data
      }
    },
    // 获取标签占比数据
    async getTagProportionData() {
      const res = await this.$axios.$get('/statistic/tagProportionData')
      if (res && res.success) {
        this.tagProportionData.rows = res.data
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  height: 100%;
  display: flex;
  flex-direction: column;
  .count-card {
    display: flex;
    align-items: center;
    justify-content: space-around;
    img {
      width: 30%;
      height: 80px;
    }
    .detail {
      width: 70%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .detail-title {
        margin-bottom: 10px;
        font-size: 12px;
      }
      .detail-count {
        font-size: 24px;
        font-weight: bold;
      }
    }
  }
  .main-container {
    margin-top: 20px;
    flex-basis: 100%;
    .pie-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      justify-content: space-between;
    }
  }
}
</style>
