<template>
  <div class="navlist-show">
    <van-cell title="我的频道" :border="false">
      <van-button size="mini" round type="danger" plain class="btn">编辑</van-button>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item class="channel-item" v-for="value in userNavList" :key="value.id" :text="value.name" icon="close" />
    </van-grid>
    <van-cell title="频道推荐" :border="false"></van-cell>
    <van-grid :gutter="10">
      <van-grid-item class="channel-item" v-for="value in recomendList" :key="value.id" :text="value.name" icon="plus" clickable />
    </van-grid>
  </div>
</template>

<script>
import { getNewsNav } from '@/api/user'
export default {
  name: 'navListShow',
  components: {},
  props: ['userNavList'],
  data() {
    return {
      navListAll: []
    }
  },
  created() {
    this.getNewsNav()
  },
  mounted() {},
  methods: {
    // 获取 全部的 nav 列表
    async getNewsNav() {
      try {
        const { data } = await getNewsNav()
        this.navListAll = data.data.channels
      } catch (err) {
        this.$toast('推荐频道列表获取失败')
      }
    }
  },
  computed: {
    // 推荐列表 = 所有频道 - 用户频道
    recomendList() {
      return this.navListAll.filter((item) => {
        const a = this.userNavList.find((index) => {
          return index.id === item.id
        })
        console.log(a)
        return !a
      })
    }
  },
  watch: {}
}
</script>
<style scoped lang="less">
.navlist-show {
  .channel-item {
    height: 86px;
    /deep/ .van-icon-close {
      position: absolute;
      right: -10px;
      top: -10px;
      font-size: 36px;
      color: #ccc;
    }
    /deep/ .van-icon-plus {
      position: absolute;
      left: 0px;
      font-size: 36px;
      color: #ccc;
    }
    /deep/ .van-grid-item__content {
      flex-direction: row;
      color: #222;
      background-color: #f4f5f6;
      .van-icon {
        font-size: 24px;
      }
      .van-grid-item__text {
        font-size: 20px;
        margin-top: 0;
      }
    }
  }
  .btn {
    padding: 0 20px;
  }
}
</style>
