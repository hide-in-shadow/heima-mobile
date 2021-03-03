<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" left-arrow title="黑马头条" @click-left='$router.back()'></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="isLoading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="isArticle">
        <!-- 文章标题 -->
        <h1 class="article-title">{{article.title}}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image class="avatar" slot="icon" round fit="cover" :src="article.aut_photo" />
          <div slot="title" class="user-name">{{article.aut_name}}</div>
          <div slot="label" class="publish-date">{{article.pubdate | relativeTime}}</div>
          <!-- 关注按钮 -->
          <!-- <userFollow :isFollow='article.is_followed' :userId="article.aut_id" @change="(value) => article.is_followed = value"></userFollow> -->
          <!-- 上下相同 v-model 实现父子传值绑定 -->
          <userFollow v-model='article.is_followed' :use-id="article.aut_id"></userFollow>
          <!-- /关注按钮 -->
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div class="article-content markdown-body" v-html="article.content" ref='contentRef'></div>
        <van-divider>正文结束</van-divider>
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errStatus">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="getActicle()">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

    <!-- 文章评论 -->
    <acticleComment></acticleComment>
    <!-- /文章评论 -->

    <!-- 底部区域 -->
    <!-- 当 article 数据获取成功后 再向子组件传值 -->
    <div class="article-bottom" v-if="isArticle">
      <van-button class="comment-btn" type="default" round size="small">写评论</van-button>
      <!-- 评论 -->
      <van-icon name="comment-o" badge="321" color="#777" />
      <!-- 收藏 -->
      <collectArticle v-model="article.is_collected" :acticle-id="article.art_id"></collectArticle>
      <!-- 点赞 -->
      <likeArticle v-model="article.attitude" :acticle-id="article.art_id"></likeArticle>
      <!-- 转发 -->
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- /底部区域 -->
  </div>
</template>

<script>
import { getActicleById } from '@/api/acticle'
import './github-markdown.css'
import { ImagePreview } from 'vant'
import userFollow from './components/userFollow'
import likeArticle from './components/likeArticle'
import collectArticle from './components/collectArticle'
import acticleComment from './components/acticleComment'
export default {
  name: 'acticle',
  components: {
    userFollow,
    likeArticle,
    collectArticle,
    acticleComment
  },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      article: {},
      isArticle: false, // 判断数据已经获取
      isLoading: true, // 加载中
      errStatus: false // 404报错 则 变为 true
    }
  },
  created() {
    this.getActicle()
  },
  mounted() {},
  methods: {
    // 获取文章详情数据
    async getActicle() {
      try {
        const { data } = await getActicleById(this.articleId)
        this.article = data.data
        this.isArticle = true // 数据获取完成 可以渲染组件
        // 数据加载完成
        setTimeout(() => {
          this.showImg() // 调用预览图片函数
        }, 10)
      } catch (err) {
        // 加载失败 404
        if (err.response && err.response.status === 404) {
          this.errStatus = true
        }
        this.$toast('获取失败')
      }
      // 加载完成
      this.isLoading = false
    },
    // 预览图片函数
    showImg() {
      // 用 ref 属性 获取 文章内容 所有节点
      const contentEl = this.$refs.contentRef
      // 获取 文章内容节点 里的 所有 img
      const allImg = contentEl.querySelectorAll('img')
      // console.log(allImg)
      const images = []
      // 遍历 img 数组 将 img.src 加入新数组 并注册点击事件
      allImg.forEach((e, i) => {
        images.push(e.src)
        e.onclick = () => {
          ImagePreview({
            images, // 需要预览的图片 URL 数组
            startPosition: i // 图片预览起始位置索引
          })
        }
      })
    }
  },
  computed: {},
  watch: {}
}
</script>

<style scoped lang="less">
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      /deep/.follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
