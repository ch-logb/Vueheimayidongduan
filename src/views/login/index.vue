<template>
  <div class="login">
    <!-- 导航栏 -->
    <van-nav-bar title="登录"></van-nav-bar>
    <!-- 表单 -->
    <!-- 登录验证 -->
    <!-- 用 ValidationObserver 把整个表单都包起来-->
    <!-- 用ValidationProvider 把具体的表单元素包起来 input-->
    <validationObserver ref="form">
      <validationProvider name="手机号" rules="required|mobile" immediate>
      <van-field
        v-model="user.mobile"
        clearable
        class="iconfont icon-phone_icon"
        placeholder="请输入手机号"
      ></van-field>
      </validationProvider>
      <validationProvider name="验证码" rules="required|code" immediate>
      <van-field
        v-model="user.code"
        center
        clearable
        class="iconfont icon-mima"
        placeholder="请输入短信验证码"
      >
        <van-count-down
          v-if="isCountDownShow"
          slot="button"
          :time="1000 * 5"
          format="ss s"
          @finish="isCountDownShow = false"
        />
        <van-button
          v-else
          slot="button"
          size="small"
          type="primary"
          round
          @click="onSendSmsCode"
        >发送验证码</van-button>
      </van-field>
    </validationProvider>
    </validationObserver>
    <!-- 登录按钮 -->
    <div class="login-btn-box">
      <van-button @click="onLogin" type="info">登录</van-button>
    </div>
  </div>
</template>

<script>
import { login, getSmsCode } from '@/api/user'
import { validate } from 'vee-validate'
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
        mobile: '', // 手机号
        code: '' // 验证码
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
      // 获取表单数据
      // const user = this.user

      // 表单验证
      const success = await this.$refs.form.validate()
      if (!success) {
        console.log('表单验证失败')
        // 注意：如果你需要在 JS 验证中能马上获取到错误消息
        // 必须给每一个 ValidationProvider 配置 immediate 初始验证
        const errors = this.$refs.form.errors
        for (let key in errors) {
          const item = errors[key]
          if (item[0]) {
            this.$toast(item[0])
            // 找到第1个有错误的消息，给出提示，停止遍历
            return
          }
        }
        // 获取验证失败的错误消息，轻提示
        return
      }

      // 开启登录中 lading

      this.$toast.loading({
        duration: 0, // 持续时间不断
        message: '登录中...',
        forbidClick: true // 是否禁止背影点击
      })

      try {
        const res = await login(this.user)
        // res.data.data =>{ token:'xxx', refresh_token:'xxx'}
        this.$store.commit('setUser', res.data.data)
        // 提示 success 或者 fail  的时候，会先把其他的toast 先清除
        this.$toast.success('登录成功')
        console.log('登录成功', res)
      } catch (err) {
        console.log('登录失败', err)
        this.$toast.fail('登录失败')
      }
      // 根据返回结果执行后续业务
    },
    async onSendSmsCode () {
      try {
        const { mobile } = this.user
        // 1. 验证手机号是否有效
        const validateResult = await validate(mobile, 'required|mobile', {
          name: '手机号'
        })
        if (!validateResult.valid) {
          this.$toast(validateResult.errors[0])
          return
        }
        const res = await getSmsCode(mobile)
        console.log(res)
        // 3. 发送验证码

        // 显示倒计时
        this.isCountDownShow = true

      // 发送
      } catch (err) {
        console.log(err)

        // 发送失败，关闭倒计时
        this.isCountDownShow = false
        this.$toast('请勿频繁发送')
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
  .van-cell {
    height: 45px;
    align-items: center;
  }
</style>
