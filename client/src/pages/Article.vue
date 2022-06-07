<template>
  <div class = "article" v-cloak>
    <div class = "container__loader" v-if = "loading" style = "padding-top: 180px; padding-bottom:240px">
      <div class = "loader"></div>
    </div>
    <div class = "article__content" v-else-if = "isLoad">
      <div class = "article__info">
        <div class = "info__info">
          <kiku-views>{{article.info.number_of_views}}</kiku-views>
          <div v-if="isLogin && !isBanned" class = "info__control">
            <save-button :isActive = "isSave" @click="Save" title="Сохранить"></save-button>
            <edit-article-button v-if = "permission.canEditArticles || article.author.author_id == user_id" title="Редактировать" @click="Edit"></edit-article-button>
          </div>
        </div>
        <div class = "info__article">
          {{article.info.date_of_creation}} · {{tag}}
        </div>
        <div class = "info__author">
          Автор {{article.author.name?article.author.name:article.author.username}} {{article.author.surname&&article.author.name?article.author.surname:''}}
        </div>
      </div>
      <h1 class = "content__article-title">{{article.info.title}}:<br>{{article.info.description}}</h1>
      <div class = "article__paragraph" v-for = "item in article.content" :key="item">
        <h2 v-if="item.title" class = "paragraph__title">{{item.title}}</h2>
        <div class = "paragraph__text" v-for = "paragraph in item.paragraphs" :key="paragraph">
          <br><p>{{paragraph.body}}</p>
        </div>
        <div class = "article__picture" v-if="item.picture.url">
            <img class = "article__picture-image" :src="item.picture.url" alt = "Изображение">
            <div class = "picture-image__signature">{{item.picture.desc}}</div>
            <div class = "picture-image__copyright">{{item.picture.copyright}}</div>
        </div>
      </div>
      <div class = "article__sources">
        <div class = "sources__title">Источники и литература</div>
			  <div class = "sources__sources-container">
					<div class = "sources-container__source" v-for = "source in article.sources" :key="source">{{source.body}}</div>
				</div>
      </div>
			<div class = "article__share">
				<a class = "share__link link_black" :href = "'http://vk.com/share.php?url='+ URL.API + $route.path + '&title=' + article.info.title + '&description=' + article.info.description + '&image=http://5.206.92.193:5500/' + article.info.preview_image + '&noparse=true'" target="_blank">
					<img class="share__link-icon" src = "/assets/images/social/share_icon-vk.svg" alt="Иконка вконтакте">
				</a>
				<a class = "share__link link_black" :href = "'http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1&st._surl=' + URL.API + $route.path + '&st.comments=' + article.info.title" target="_blank">
					<img class="share__link-icon" src = "/assets/images/social/share_icon-ok.svg" alt="Иконка одноклассники">
				</a>
				<a class = "share__link link_black" target="_blank">
					<img class="share__link-icon" src = "/assets/images/social/share_icon_telegram.png" alt="Иконка телеграм">
				</a>
			</div>
      <comment-list 
        :article_id = "article.info.article_id" 
        :author_id = "article.author.author_id"
        :comments = "article.comments"
      />
    </div>
    <div class = "article__content_none" v-else>Статья не найдена</div>
  </div>
</template>

<script>
import axios from "axios"
import {mapActions, mapGetters, mapState, mapMutations} from 'vuex'
import CommentList from "@/components/CommentList.vue"
import articleMixin from "@/mixins/articleMixin"

export default {
    mixins: [articleMixin],
    components:{
      CommentList
    },
    data(){
    return{
        article: {},
        loading: false,
        isLoad: false,
        isSave: false
      }
    },
    computed: {
      ...mapState({
        tags: state => state.tags,
        URL: state => state.URL,
        saved_articles: state => state.user.body.saved_articles,
        isLogin: state => state.user.isLogin,
        permission: state => state.permission,
        user_id: state => state.user.body.user_id,
        isBanned: state => state.user.body.is_banned
      }),
      ...mapGetters({
        isHavePermission: 'user/IsHavePermission'
      }),
      tag: function (){
        return this.tags.find(tag => tag.id === this.article.info.tag).title
      }
    },
    methods: {
      ...mapMutations({
        setArticleEdit: 'setArticleEdit'
      }),
      ...mapActions({
        DeleteArticle: 'user/DeleteArticle',
        SaveArticle: 'user/SaveArticle',
      }),
      async Save(){
        if(this.isSave){
          this.isSave = false
          this.DeleteArticle(this.article.info.article_id)
        }
        else {
          this.isSave = true
          this.SaveArticle(this.article.info.article_id)
        }
      },
      async Edit(){
        this.setArticleEdit({
          article: {
            info: this.article.info,
            content: this.article.content,  
            sources: this.article.sources
          },
          isEdit: true
        })
        this.$router.push({name: 'article_editing'})
      }
    },
    async mounted() {
      this.loading = true
      const url = (this.URL.API + "/article/" + this.$route.params.id)
      await axios.get(url).then(res => {
        this.Decrease(res.data).then(res =>{
          this.article = res
        })
        .catch(e => console.log(e))
        this.isLoad = true
      })
      .catch(e => console.log(e))
      .finally(this.loading = false)

      if(this.isLogin && this.saved_articles && this.saved_articles.includes(this.article.info.article_id)){
        this.isSave = true
      }
      else{
         this.isSave = false
      }
    } 
}
</script>

<style>
    .article{
        margin-top:80px;
        background-color: #FFF6F6;
    }
    .article__content{
        max-width: 1020px;
        margin-left: auto;
        margin-right: auto;
        width: 100%;
        height: 100%;

        background-color: #ffffff;
    }

    .article__content_none{
        font-size: 32px;
        text-align: center;
        padding-top: 180px;
        padding-bottom:240px
    }

    .article__info{
        padding-top: 80px;
        margin-left: auto;
        margin-right: auto;

        position: relative;
    }

    .article__info::before{
        content: "";
        position: absolute;

        top: 79px;
        width: 100%;
        height: 1px;

        background-color: black;
    }

    .article__info::after{
        content: "";
        position: absolute;

        
        width: 100%;
        height: 1px;
        z-index: 10;

        background-color: black;
    }
    .info__info{
        padding-top:15px;
        padding-left: 15px;
        padding-right: 15px;
        display: inline-flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 100%;
    }
    .info__control{
        display: inline-flex;
        align-items: center;
        justify-content: end;
        width: 100%;
        height: 100%;
    }
    .info__article{
        padding-top: 44px;
        font-size: 32px;
        line-height: 37px;
        text-align: center;
        color: #AEAEAE;
    }

    .info__author{
        padding-top: 44px;
        padding-bottom: 56px;
        font-size: 26px;
        line-height: 30px;
        text-align: center;
        color: #AEAEAE;
    }

    .content__article-title{
        padding-top: 27.5px;
        padding-bottom: 24px;
        margin-left: auto;
        margin-right: auto;

        max-width: 660px;

        font-family: Alice;
        font-style: normal;
        font-weight: normal;
        font-size: 50px;
        line-height: 57px;
        text-align: center;

        color: #DCA600;
    }

    .article__paragraph{
        margin-left: auto;
        margin-right: auto;
        padding-top: 22.5px;
        padding-bottom: 22.5px;
        max-width: 660px;
    }
    .paragraph__title{
        padding-bottom: 5px;

        font-family: Alice;
        font-style: normal;
        font-weight: normal;
        font-size: 26px;
        line-height: 30px;

        text-align: left;

        color: #DCA600;
    }
    .paragraph__text{

        width: 100%;
        height: 100%;

        font-size: 18px;
        line-height: 21px;
        text-align: justify;
    }

    .article__picture{
        margin-left: auto;
        margin-right: auto;
        max-width: 660px;
    }

    .article__picture-image{
        margin-top: 40px;
        width: 100%;
        height: 100%;
        max-height: 100vh;

        background-position:center;
        background-size: cover;
        background-repeat: no-repeat;

        outline: 2px solid #A5A5A5;
        box-shadow: 0px 0px 6px 2px rgba(0, 0, 0, 0.25);
    }
    .picture-image__signature{
        padding-top: 10px;
        font-size: 13px;
        line-height: 15px;
    }

    .picture-image__copyright{
        position: relative;
        padding-top: 3px;
        padding-bottom: 5px;
        font-size: 13px;
        line-height: 15px;
        color: #A5A5A5;
    }

    .picture-image__copyright::after{
        content: "";
        position: absolute;
        width: 100%;
        height: 1px;
        top: 23px;
        left:0;
        background-color: #A5A5A5;
    }

    .article__sources{
        position: relative;
        width: 100%;
        max-width: 660px;
        margin-top: 42.5px;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 102px;
        display: flex;
        
        font-size: 16px;
    }

    .article__sources::after{
        position: absolute;
        content: "";
        bottom: -32px;
        width: 100%;
        height: 1px;
        background-color: #A5A5A5;
    }

    .sources__title{
        position: relative;
        max-width: 120px;
        width: 100%;
        height: 100%;
    }
    .sources__sources-container{
        max-width: 540px;
        width: 100%;
        height: 100%;
    }

    .sources__sources-container::after{
        position: absolute;
        content: "";
        top:0;
        width: 1px;
        height: calc(100% + 10px);
        background-color: #A5A5A5;
    }

    .sources-container__source{
        padding-left: 20px;
        padding-bottom: 6px;
    }

    .article__share{
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 62px;
        width: 100%;
        height: 100%;

        display: flex;
        justify-content: center;
    }
    .share__link{
        margin-left: 9px;
        margin-right: 9px;
        width: 140px;
        height: 40px;

        display: flex;
        justify-content: center;
        align-items: center;

        outline: 2px solid #A5A5A5;
        transition: all 0.4s ease;
        box-shadow: 0px 0px 4px 0px #00000040;

    }
    .share__link:hover{
        background:#DCA600BF;
        outline-color: #DCA600;
    }
    .share__link-icon{
        width: 30px;
        height: 30px;
        background-position: center;
        background-size: 30px 30px;
        background-repeat: no-repeat;
    }

    @media (max-width: 992px){
        .article{
            margin-top:80px;
            background-color: #FFF6F6;
        
        }
        .article__info{
            padding-top: 42px;
        }
        
        .article__info::before{
            content: "";
            position: absolute;
            top: 42px;
            width: 100%;
            height: 1px;
        
            background-color: black;
        }
        
        .article__info::after{
            content: "";
            position: absolute;
        
            
            width: 100%;
            height: 1px;
        
            background-color: black;
        }
        
        .info__article{
            padding-top: 22px;
            font-size: 22px;
            line-height: 25px;
            text-align: center;
            color: #AEAEAE;
        }
        
        .info__author{
            padding-top: 19px;
            padding-bottom: 33px;
            font-size: 18px;
            line-height: 21px;
            text-align: center;
            color: #AEAEAE;
        }
        
        .content__article-title{
            padding-top: 15px;
            padding-bottom: 24px;
            margin-left: auto;
            margin-right: auto;
        
            font-family: Alice;
            font-style: normal;
            font-weight: normal;
            text-align: center;
        
            color: #DCA600;
        }
        
        .article__paragraph{
            padding-top: 15px;
            padding-bottom: 15px;
            padding-left: 15px;
            padding-right: 15px;
        }
        .paragraph__title{
            padding-bottom: 12px;
        
            font-family: Alice;
            font-style: normal;
            font-weight: normal;
            font-size: 20px;
            line-height: 23px;
        
            text-align: left;
        
            color: #DCA600;
        }
        .paragraph__text{
    
            font-size: 16px;
            line-height: 18px;
        }
        
        .article__picture{
            padding-top: 30px;
            padding-bottom:15px;
            padding-left: 15px;
            padding-right: 15px;
        
            margin-left: auto;
            margin-right: auto;
            max-width: 660px;
        }
        
        .article__picture-image{
            width: calc(100vw - 32px);
            height: 100%;

            background-position:center;
            background-size: cover;
            background-repeat: no-repeat;
        
            outline: 2px solid #A5A5A5;
        }
        .picture-image__signature{
            padding-top: 5px;
            font-size: 12px;
            line-height: 14px;
            text-align: center;
        }
        
        .picture-image__copyright{
            position: relative;
            padding-top: 3px;
            padding-bottom: 5px;
            font-size: 12px;
            line-height: 14px;
            text-align: center;
        }
        
        .picture-image__copyright::after{
            content: "";
            position: absolute;
            width: 100%;
            height: 1px;
            top: 23px;
            left:0;
            background-color: #A5A5A5;
        }
        
        .article__sources{
            padding-left: 15px;
            padding-right: 15px;
            margin-top: 42.5px;
            margin-bottom: 72px;

            display: flex;
            flex-flow: column;
            
            font-size: 16px;
        }
        
        .article__sources::before{
            position: absolute;
            content: "";
            left:15px;
            bottom: -25px;
            width: calc(100% - 30px);
            height: 1px;
            background-color: #A5A5A5;
        }

        .article__sources::after{
            position: absolute;
            content: "";
            left:15px;
            top: -14px;
            width: calc(100% - 30px);
            height: 1px;
            background-color: #A5A5A5;
        }
        
        .sources__title{
            padding-bottom: 25px;
            position: relative;
            max-width: 100%;
            width: 100%;
            height: 100%;

            font-size: 15px;
            line-height: 17px;
            text-align: center;
        }

        .sources__sources-container::after{
            display:none;
        }
        
        .sources-container__source{
            padding-left: 0px;
        }
        
        .article__share{
            margin-left: auto;
            margin-right: auto;
            margin-bottom: 62px;
            width: 100%;
            height: 100%;
        
            display: flex;
            justify-content: center;
        }
        .share__link{
            margin-left: 9px;
            margin-right: 9px;
            width: 90.6px;
            height: 36.25px;
        
            display: flex;
            justify-content: center;
            align-items: center;
        
            outline: 2px solid #A5A5A5;
            transition: all 0.4s ease;
        }
        .share__link:hover{
            background:#DCA600BF;
            outline-color: #DCA600;
        }
        .share__link-icon{
            width: 27.2px;
            height: 27.2px;
            background-position: center;
            background-size: 27.2px 27.2px;
            background-repeat: no-repeat;
        }
    }

    @media (max-width: 768px){
      .content__article-title{
        max-width: 360px;

        font-size: 34px;
        line-height: 35px;
      }
    }

    @media (max-width: 576px){
      .content__article-title{
        font-size: 27px;
        line-height: 31px;
      }
    }
</style>