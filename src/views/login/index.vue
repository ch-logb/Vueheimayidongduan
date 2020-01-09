<template>
  <div class="login">
    <!-- 导航栏 -->
    <van-nav-bar title="登录"></van-nav-bar>
    <!-- 表单 -->
    <van-cell-group>
      <van-field
        v-model="user.mobile"
        clearable
        class="iconfont icon-phone_icon"
        placeholder="请输入手机号"
      ></van-field>
      <van-field
        v-model="user.code"
        center
        clearable
        class="iconfont icon-mima"
        placeholder="请输入短信验证码">
        <van-count-down  v-if="isCountDownShow" slot="button" :time="1000 * 5" format="ss s" @finish="isCountDownShow = false" />
        <van-button v-else slot="button" size="small" type="primary" round @click="onSendSmsCode">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <!-- 登录按钮 -->
    <div class="login-btn-box">
      <van-button @click="onLogin" type="info">登录</van-button>
    </div>
  </div>
</template>

<script>
import { login, getSmsCode } from '@/api/user'
export default {
  name: 'LoginPage',
  components: {},
  props: {},
  // 数据绑定
  // 根据接口绑定表单获取数据
  data () {
    return {
      // 获取数据
      user: {
        mobile: '',
        code: ''
      },
      // 添加倒计时的显示和隐藏
      isCountDownShow: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  methods: {
    async onLogin () {
      // 表单验证
      this.$toast.loading({
        duration: 0, // 持续时间不断
        message: '登录中...',
        forbidClick: true // 是否禁止背影点击
      })
      try {
        const res = await login(this.user)
        this.$toast.success('登录成功')
        console.log('登录成功', res)
      } catch (err) {
        console.log('登录失败', err)
        this.$toast.fail('登录失败')
      }
    },
    async onSendSmsCode () {
      // 1. 获取手机号
      const { mobile } = this.user
      // 2. 校验手机号是否有效
      const res = await getSmsCode(mobile)
      console.log(res)

      // 3. 发送验证码
      try {
      // 显示倒计时
        this.isCountDownShow = true

      // 发送
      } catch (err) {
        console.log(err)

        // 发送失败，关闭倒计时
        this.isCountDownShow = false

        if (err.response.status === 429) {
          this.$toast('请勿频繁发送')
          return
        }

        this.$toast('发送失败')
      }
    }

  }
}
</script>
<style lang="less" scoped>
.login-btn-box {
  padding: 27px 16px;
  .van-button {
    width: 100%;
  }
}
</style>
