<template>
  <div class="my-container">
    <!-- 已登录 -->
    <div v-if="token" class="header">
      <!-- 基本信息 -->
      <div class="base">
        <div class="left">
          <van-image fit="cover" :src="user.photo" class="avatar" round />
          <span class="name">{{user.name}}</span>
        </div>
        <div class="right">
          <van-button type="default" size="mini" round style="color:#666">编辑资料</van-button>
        </div>
      </div>
      <!-- 粉丝、关注 -->
      <div class="data">
        <div class="data-item">
          <span>{{user.art_count}}</span>
          <span>头条</span>
        </div>
        <div class="data-item">
          <span>{{user.follow_count}}</span>
          <span>关注</span>
        </div>
        <div class="data-item">
          <span>{{user.fans_count}}</span>
          <span>粉丝</span>
        </div>
        <div class="data-item">
          <span>{{user.like_count}}</span>
          <span>获赞</span>
        </div>
      </div>
    </div>
    <!-- 未登录 -->
    <div v-else class="header" style="align-items: center;">
      <img class="mobile-img" src="~@/assets/mobile.png" @click="$router.push('/login')">
      <div class="zhuce">注册/登录</div>
    </div>

    <!-- 宫格 -->
    <van-grid class="nav-grid" :column-num="2" clickable>
      <van-grid-item text="收藏">
        <i slot="icon" class="iconfont icon-shoucang"></i>
        <span class="text" slot="text">收藏</span>
      </van-grid-item>
      <van-grid-item text="历史">
        <i slot="icon" class="iconfont icon-lishi"></i>
        <span class="text" slot="text">历史</span>
      </van-grid-item>
    </van-grid>
    <!-- 列表 -->
    <van-cell title="消息通知" is-link />
    <van-cell title="实名认证" is-link />
    <van-cell title="用户反馈" is-link />
    <van-cell title="小智同学" is-link />
    <van-cell title="系统设置" is-link />
    <van-cell v-if="token" class="logout-cell" title="退出登录" center clickable @click="loginOut" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUser } from '@/api/user.js'
export default {
  name: 'mine',
  components: {},
  props: {},
  data() {
    return {
      user: {}
    }
  },
  created() {
    if (this.token) {
      this.getUser()
    }
  },
  mounted() {},
  methods: {
    // 退出功能
    loginOut() {
      this.$dialog
        .confirm({
          title: '确认退出吗？'
        })
        .then(() => {
          this.$store.commit('removeToken')
        })
        .catch(() => {
          this.$toast.fail('操作失败')
        })
    },
    // 获取用户信息
    async getUser() {
      try {
        const { data } = await getUser()
        console.log(data)
        this.user = data.data
      } catch (err) {
        console.log(err)
        this.$toast.fail('信息加载失败')
      }
    }
  },
  computed: {
    ...mapState(['token'])
  },
  watch: {}
}
</script>

<style scoped lang="less">
.my-container {
  padding-bottom: 100px;
  .header {
    height: 401px;
    background: url('~@/assets/banner.png') no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .mobile-img {
      width: 132px;
      height: 132px;
    }
    .zhuce {
      margin-top: 15px;
      font-size: 28px;
      color: #ffffff;
    }
    .base {
      height: 231px;
      padding: 76px 32px 23px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          width: 132px;
          height: 132px;
          border: 2px solid #fff;
        }
        .name {
          font-size: 29px;
          margin-left: 22px;
          color: #fff;
        }
      }
    }
    .data {
      display: flex;
      justify-content: space-around;
      .data-item {
        height: 130px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        color: #fff;
        span:nth-child(1) {
          font-size: 36px;
          margin-bottom: 15px;
        }
        span:nth-child(2) {
          font-size: 23px;
        }
      }
    }
  }
  .nav-grid {
    background: #fff;
    margin-bottom: 10px;
    .iconfont {
      font-size: 45px;
    }
    .icon-shoucang {
      color: #eb5253;
    }
    .icon-lishi {
      color: #ff9d1d;
    }
    .text {
      color: #000;
      margin-top: 8px;
      font-size: 28px;
    }
  }
  .logout-cell {
    height: 100px;
    text-align: center;
    color: #eb5253;
    margin: 10px 0;
    font-size: 30px;
  }
}
</style>
