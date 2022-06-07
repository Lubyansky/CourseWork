<template>
	<div class = "articles">
    <div class = "articles__container" id="articles">
      <h1 class = "articles__title">Материалы</h1>
      <nav class = "articles__tags"> 
        <kiku-tag 
          v-for="(tag, index) in tags" 
          :key="tag.id" 
          :isPressed = "tag.isPressed"
          @click="tagPress(index, tag.id)"
        >
          {{tag.title}}
        </kiku-tag>
        <h5 style="margin-top:10px; text-align: center;">Нажмите на тег чтобы добавить/убрать период (жёлтый тег — активный)</h5>
      </nav>
      <h2 class = "articles__found-articles">Найденые статьи</h2>
      <div v-cloak>
        <div class = "container__loader" v-if = "loading">
          <div class = "loader"></div>
        </div>
        <div class = "articles__list" v-else-if = "articles.length">
         <ArticleList :articles="articles"/>
        </div>
        <div class = "articles__found-articles_none" v-else>Статьи не найдены</div>
      </div>
    </div>
	</div>
</template>

<script>
import axios from "axios";
import ArticleList from "@/components/ArticleList"
import articleMixin from "@/mixins/articleMixin"
import { mapState } from 'vuex';

export default {
    mixins: [articleMixin],
    components: {
      ArticleList
    },
    data(){
      return{
        tags: [],
        articles: [],
        loading: false
      }
    },
    computed:{
      ...mapState({
        URL: state => state.URL,
        Tags: state => state.tags,
        saved_articles: state => state.user.body.saved_articles,
        isLogin: state => state.user.isLogin,
        isHidden: state => state.isHidden
      }),
    },
    methods: {
      async tagPress(index, tag_id){
        this.loading = true
        if(!this.tags[index].isPressed){
            var articles = []
            const url = (this.URL.API + "/articles/" + tag_id)
            await axios.get(url).then(res => {
                articles = res.data
            })
            articles.forEach(article => {
                this.Decrease(article).then(res => {
                  article = res
                  if(this.isLogin && this.saved_articles && this.saved_articles.includes(article.info.article_id)){
                    article.isSave = true
                  }
                  else{
                    article.isSave = false
                  }
                  if(this.isHidden){
                    article.isHidden = true
                  }
                  else article.isHidden = false
                  this.articles.push(article)
                })
                .catch(e=>console.log(e))
            })
            this.tags[index].isPressed = true
            console.log("Pressed tag: " + tag_id)
        }
        else{
            if(this.articles.length > 0) {
                let temp = [];
                this.articles.forEach(article => {
                    if(article.info.tag != this.tags[index].id){
                        temp.push(article)
                    }
                })
                this.articles = temp
            }
            this.tags[index].isPressed = false
            console.log("Unpressed tag: " + tag_id)
        }
        this.loading = false
      }
    },
    async mounted() {
      this.loading = true
      const pressedTags = this.$route.query.tags
      if(pressedTags) {
        this.Tags.forEach((tag, index = 1)=>{
          if(pressedTags.includes(tag.id)){
            tag.isPressed = false
            this.tags.push(tag)
            this.tagPress(index, tag.id)
          }
          else {
            this.tags.push(tag)
            tag.isPressed = false
          }
        })
      }
      else{
        this.Tags.forEach((tag, index = 1)=>{
          tag.isPressed = false
          this.tags.push(tag)
          this.tagPress(index, tag.id)
        })
      }
      
      this.loading = false
    } 
}

</script>

<style scopes>
    .articles{
        margin-top:80px;
        background-color: #FFF6F6;
        height: 100%;
    }
    .articles__container{
        max-width: 1020px;
        margin-left: auto;
        margin-right: auto;
        width: 100%;
        height: 100%;

        background-color: #ffffff;
    }
    .articles__title{
        padding-top:60px;
        padding-bottom:60px;
        font-style: normal;
        font-weight: normal;
        font-size: 50px;
        line-height: 57px;
        text-align: center;
    }

    .articles__tags{
        position: relative;
        display: flex;
        justify-content: center;
        flex-flow: wrap;
    }

    .articles__tags::before{
        position: absolute;
        content: "";
        top:-22px;
        width: 100%;
        height: 1px;
        background-color: #000000;
    }

    .articles__tags::after{
        position: absolute;
        content: "";
        top:calc(100% + 22px);
        width: 100%;
        height: 1px;
        background-color: #000000;
    }

    .articles__found-articles{
        padding-top:72px;
        padding-bottom:67px;
        font-style: normal;
        font-weight: normal;
        font-size: 38px;
        line-height: 48px;
        text-align: center;
    }

    .articles__found-articles_none{
        font-size: 24px;
        text-align: center;
        padding-bottom: 120px;
    }
    .articles__list-container{
      width: 100%;
    }

    .container__loader{
        padding-bottom: 120px;
    }

    @media (max-width: 1082px) {
        .articles__container{
            background-color: #FFF6F6;
        }
    }

    @media (max-width: 992px){
        .articles__container{
            padding-left:15px;
            padding-right:15px;
        }
        .articles__title{
            padding-top:30px;
            padding-bottom:30px;
            font-size: 32px;
            line-height: 37px;
        }
        .articles__tags{
            max-width: 591px;
            margin-left: auto;
            margin-right: auto;
        }
        .articles__tags::before{
            top:-4px;
            width: 100vw;
        }
        
        .articles__tags::after{
            top:calc(100% + 4px);
            width: 100vw;
        }
        
        .tags__tag{
            margin-top:4px;
            margin-left: 3.5px;
            margin-right: 3.5px;
            margin-bottom:4px;
        
            width: 135px;
            height: 36px;
        
            font-size: 12px;
            line-height: 14px;
        }

        .articles__found-articles{
            padding-top:41px;
            padding-bottom:33px;
            font-size: 24px;
            line-height: 27px;
        }

        .articles__found-articles_none{
            font-size: 18px;
        }
    }

    @media (max-width: 576px){
      .articles__title {
        padding-top: 20px;
        padding-bottom: 20px;
      }
    }
</style>