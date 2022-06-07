<template>
  <div class = "container__loader" v-if = "loading" style = "padding-top: 180px; padding-bottom:240px">
    <div class = "loader"></div>
  </div>
  <div class = "management" v-else-if = "(permission.canEditArticles || permission.canAddArticles) && !isBanned" v-cloak>
    <div class = "container__loader" v-if = "loading" style = "padding-top: 180px; padding-bottom:240px">
      <div class = "loader"></div>
    </div>
    <div class = "management__container" v-else-if = "user_id !== null">
      <h1 class = "management__title">Управление статьями</h1>
      <kiku-button class = "management__add-article" v-if = "permission.canAddArticles" @click = "AddArticle">Добавить статью</kiku-button>
      <ArticleList :articles="articles" v-if = "articles.length"/>
    </div>
  </div>
</template>

<script>
import ArticleList from "@/components/ArticleList.vue"
import articleMixin from "@/mixins/articleMixin"
import { mapActions, mapState } from 'vuex'

export default {
    mixins: [articleMixin],
    components:{
        ArticleList
    },
    data(){
        return {
            articles: [],
            loading: false
        }
    },
    computed:{
        ...mapState({
            isBanned: state => state.user.body.is_banned,
            user_id: state => state.user.body.user_id,
            permission: state => state.permission,
            isLogin: state => state.user.isLogin
        })
    },
    methods:{
        ...mapActions({
            GetArticlesToChange: 'user/GetArticlesToChange'
        }),
        async AddArticle(){
            this.$router.push({path: '/article_editing'})
        }
    },
    created(){
        if(!(this.permission.canEditArticles || this.permission.canAddArticles) || this.isBanned){
            this.$router.push('/')
        }
    },
    async mounted(){
        this.loading = true
        if(this.isLogin){
            this.GetArticlesToChange().then(value => {
            const dataArticles = value
            const articles = []

            dataArticles.forEach(article =>{
                this.Decrease(article).then(res => {
                    var _article = res
                    if(this.isHidden){
                        _article.isHidden = true
                    }
                    else _article.isHidden = false
                    _article.isHidden = true
                    articles.push(_article)
                })
            })

            this.articles = this.temp_articles = articles
            }).finally(this.loading = false)
        }
    }
}
</script>

<style scoped>
    .management{
        margin-top:80px;
        background-color: #FFF6F6;
        height: 100%;
    }

    .management__container{
        max-width: 1020px;
        margin-left: auto;
        margin-right: auto;
        width: 100%;
        height: 100%;

        display: flex;
        align-items: center;
        flex-flow: column;

        background-color: #ffffff;
    }

    .management__title{
        margin-left: auto;
        margin-right: auto;
        margin-top: 66px;
        margin-bottom: 65px;
        font-size: 32px;
        text-align: center;
    }

    .management__add-article{
        margin-bottom: 65px;
    }
</style>