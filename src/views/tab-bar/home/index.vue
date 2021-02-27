<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button class="search-btn" slot="title" type="info" size="small" round icon="search">搜索</van-button>
    </van-nav-bar>
    <!-- /导航栏 -->
    <!-- animated 切换标签 转场动画 swipeable 滑动切换标签页 -->
    <van-tabs v-model="active" animated swipeable>
      <van-tab v-for="value in userNavList" :title="value.name" :key="value.id">
        <!-- 频道文章列表 -->
        <artiveList :newsNav='value'></artiveList>
      </van-tab>

      <!-- 用于在导航栏的最后 避免 汉堡按钮 遮挡 最后一个tab栏 -->
      <div slot="nav-right" class="placeholder">
      </div>
      <!-- 汉堡按钮 -->
      <div slot="nav-right" class="hamburger-btn" @click="navListShow=true">
        <i class="iconfont icon-gengduo"></i>
      </div>
    </van-tabs>

    <!-- 汉堡按钮弹出层 -->
    <van-popup v-model="navListShow" :overlay='false' closeable position="bottom" round :style="{ height: '100%' }" class="edit-channel-popup">
      <!-- 弹出层内容 -->
      <navListShow :userNavList='userNavList' />
    </van-popup>
  </div>
</template>

<script>
import { getUserNewsNav } from '@/api/user'
import artiveList from './components/acticle-list'
import navListShow from './components/navlist-show'
export default {
  name: 'home',
  components: {
    artiveList,
    navListShow
  },
  props: {},
  data() {
    return {
      active: 0,
      userNavList: [],
      // 汉堡按钮弹出层
      navListShow: false
    }
  },
  created() {
    this.getUserNewsNav()
  },
  mounted() {},
  methods: {
    // 获取 新闻导航 列表
    async getUserNewsNav() {
      try {
        const { data } = await getUserNewsNav()
        this.userNavList = data.data.channels
        // console.log(this.userNavList)
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
  // deep 能将 css样式 影响到 子组件
  /deep/ .van-nav-bar__title {
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
    .van-tabs__content {
      padding-top: 90px;
    }
    .van-tabs__nav--line {
      height: unset; // 不设置
      .artcile-list {
        height: 79vh;
        overflow: auto;
      }
    }
    .van-tabs__nav {
      padding: 0;
      position: fixed;
      top: 92px;
      z-index: 2;
      width: 100%;
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
  .edit-channel-popup {
    padding-top: 100px;
    box-sizing: border-box;
  }
}
</style>
