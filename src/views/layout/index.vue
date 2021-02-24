<template>
  <div class="layout-container">
    <router-view></router-view>

    <!-- footer导航栏 -->
    <van-tabbar v-model="active" class="layout-tabbar" route>
      <van-tabbar-item name='shouye' to='/'>
        <span>首页</span>
        <template #icon>
          <i class="iconfont icon-shouye"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item name='wenda' to='/wenda'>
        <span>问答</span>
        <template #icon>
          <i class="iconfont icon-wenda"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item name='shipin' to='/shipin'>
        <span>视频</span>
        <template #icon>
          <i class="iconfont icon-shipin"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item name='wode' to='/mine'>
        <span>我的</span>
        <template #icon>
          <i class="iconfont icon-wode"></i>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'layout',
  components: {},
  props: {},
  data() {
    return {
      active: 'shouye'
    }
  },
  created() {},
  mounted() {},
  methods: {},
  computed: {},
  watch: {}
}
</script>
<style scoped lang="less">
.layout-container {
  .layout-tabbar {
    border-top: 1px solid #f5f7f9;
    i {
      font-size: 40px;
    }
    span {
      font-size: 20px;
    }
  }
}
</style>
