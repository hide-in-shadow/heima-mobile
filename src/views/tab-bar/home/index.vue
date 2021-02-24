<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar">
      <van-button class="search-btn" slot="title" type="info" size="small" round icon="search">搜索</van-button>
    </van-nav-bar>
    <!-- /导航栏 -->
    <!-- animated 切换标签 转场动画 swipeable 滑动切换标签页 -->
    <van-tabs v-model="active" animated swipeable>
      <van-tab v-for="value in newsNavList" :title="value.name" :key="value.id">
        <!-- 频道文章列表 -->
        <artiveList :newsNav='value'></artiveList>
      </van-tab>

      <!-- 用于在导航栏的最后 避免 汉堡按钮 遮挡 最后一个tab栏 -->
      <div slot="nav-right" class="placeholder">
      </div>
      <!-- 汉堡按钮 -->
      <div slot="nav-right" class="hamburger-btn">
        <i class="iconfont icon-gengduo"></i>
      </div>
    </van-tabs>
  </div>
</template>

<script>
import { getNewsNav } from '@/api/user'
import artiveList from './components/acticle-list'
export default {
  name: 'home',
  components: {
    artiveList
  },
  props: {},
  data() {
    return {
      active: 0,
      newsNavList: []
    }
  },
  created() {
    this.getNewsNav()
  },
  mounted() {},
  methods: {
    // 获取 新闻导航 列表
    async getNewsNav() {
      try {
        const { data } = await getNewsNav()
        this.newsNavList = data.data.channels
        // console.log(this.newsNavList)
      } catch (err) {
        this.$toast('频道列表获取失败')
      }
    }
  },
  computed: {},
  watch: {}
}
</script>

<style scoped lang="less">
.home-container {
  .van-tabs__wrap {
    position: fixed;
    top: 92px;
    z-index: 2;
    width: 100%;
  }
  // 用于更改框架的深层格式，默认最大宽度为60%
  /deep/.van-nav-bar__title {
    max-width: unset; // 不设置
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
      color: #ffffff;
    }
  }
  // 更改框架的深层格式
  /deep/ .van-tabs {
    .van-tab {
      border-right: 1px solid #edeff3;
      min-width: 200px;
      .van-tab__text {
        font-size: 27px;
        color: #777777;
      }
    }
    .van-tab--active .van-tab__text {
      color: #333 !important;
    }
    .van-tabs__nav {
      padding: 0;
      .van-tabs__line {
        width: 31px !important;
        height: 6px;
        background: rgba(50, 150, 250, 1);
        border-radius: 3px;
        bottom: 8px;
      }
    }
  }
  .placeholder {
    flex-shrink: 0;
    width: 66px;
    height: 82px;
  }
  .hamburger-btn {
    position: fixed;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 66px;
    height: 82px;
    background-color: #fff;
    opacity: 0.8;
    i.iconfont {
      font-size: 33px;
    }
    &:before {
      content: '';
      position: absolute;
      left: 0;
      width: 2px;
      height: 70%;
      background-image: url(~@/assets/gradient-gray-line.png);
      background-size: contain;
    }
  }
}
</style>
