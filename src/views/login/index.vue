<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar title="登录" class="page-nav-bar" left-text="返回" left-arrow @click-left="$router.back()" />
    <!-- Form表单 -->
    <van-form @submit="onSubmit" ref="loginFormRef">
      <!-- 手机号 -->
      <van-field v-model="loginForm.mobile" type="tel" name="mobile" placeholder="请输入手机号" maxlength="11" :rules="loginFormRules.mobile">
        <i slot="left-icon" class="icon iconfont icon-shouji"></i>
      </van-field>
      <!-- 验证码 -->
      <van-field v-model="loginForm.code" type="digit" name="code" placeholder="请输入验证码" maxlength="6" :rules="loginFormRules.code">
        <i slot="left-icon" class="icon iconfont icon-yanzhengma"></i>
        <template #button>
          <van-button v-if='timeoutShow' native-type="button" class="send-sms-btn" round size="small" type="default">
            <van-count-down v-if='timeoutShow' :time="1000 * 30" format="ss s" @finish='timeoutShow = false' class="timeout" />
          </van-button>
          <van-button v-else native-type="button" class="send-sms-btn" round size="small" type="default" @click="sendCode">获取验证码</van-button>
        </template>
      </van-field>
      <!-- 登录 -->
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendCode } from '@/api/user.js'
export default {
  name: 'LoginPage',
  components: {},
  props: {},
  data() {
    return {
      // 登录表单
      loginForm: {
        mobile: '13911111117',
        code: '246810'
      },
      // 登录表单验证规则
      loginFormRules: {
        mobile: [
          { required: true, message: '手机号不能为空' },
          { pattern: /^1[3578]\d{9}$/, message: '手机号格式错误' }
        ],
        code: [
          { required: true, message: '验证码不能为空' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      },
      // 控制倒计时的显示和隐藏
      timeoutShow: false
    }
  },
  created() {},
  mounted() {},
  methods: {
    async onSubmit() {
      this.$toast.loading({
        duration: 0, // 持续时间，0表示持续展示
        forbidClick: true, // 是否禁止背景点击
        message: '登陆中...' // 提示消息
      })
      // 错误捕获语法
      try {
        const { data } = await login(this.loginForm)
        console.log(data)
        this.$toast.success('登录成功')
        // 调用 vuex 中 getToken 函数 将 token 存在 vuex 中
        this.$store.commit('getToken', data.data)
        this.$router.push('/')
      } catch (err) {
        console.log(err)
        this.$toast.fail('登录失败，手机号或验证码错误')
      }
    },
    // 发送 验证码
    async sendCode() {
      // 验证手机号码格式
      try {
        await this.$refs.loginFormRef.validate('mobile')
      } catch (err) {
        return this.$toast.fail('手机号格式错误')
      }
      this.timeoutShow = true
      // 发送验证码 请求
      try {
        const data = await sendCode(this.loginForm.mobile)
        console.log(data)
        this.$toast.success('发送成功')
      } catch (err) {
        if (err.response.status === 429) {
          return this.$toast('发送太频繁，请稍后重试')
        } else {
          return this.$toast('发送失败，请稍后重试')
        }
      }
    }
  },
  computed: {},
  watch: {}
}
</script>

<style scoped lang="less">
.login-container {
  .icon {
    font-size: 50px;
    margin-right: 20px;
    position: relative;
    top: 4px;
  }
  .send-sms-btn {
    width: 180px;
    height: 50px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
    .timeout {
      font-size: 22px;
      color: #666;
    }
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
