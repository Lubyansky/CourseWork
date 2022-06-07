<template>
  <div class = "articles__search">
    <h4 class = "search__title">Введите название статьи для поиска</h4>
    <kiku-input type="text" :value = "search" @input = "search = $event.target.value" />
  </div>
  <div class = "articles__list-container" v-if="Articles.length">
    <div class = "articles__content">
      <div class = "articles__article" v-for="article in Articles" :key="article">
        <ArticleItem :article = "article"/>
      </div>
    </div>
    <button class = "control__button-cover-all" :class="{button__uncover_all: !isHidden}" @click="CoverAll" title="Свернуть/развернуть все" id="CoverAll"></button>
  </div>
  <div v-else class = "no_articles">Статьи не найдены</div>
</template>

<script>
import ArticleItem from "@/components/ArticleItem.vue"
import { mapMutations, mapState } from 'vuex'

export default {
    components:{
        ArticleItem
    },
    props:{
        articles:{
          type: Array
        }
    },
    data(){
        return{
          Articles: [],
          temp_articles: [],
          search: '',
        }
    },
    computed:{
      ...mapState({
        isHidden: state => state.isHidden
      })
    },
    methods: {
      ...mapMutations({
        setIsHidden: 'setIsHidden'
      }),
      async CoverAll(){
        if(this.isHidden){
          this.articles.forEach(article => {
            article.isHidden = false
          })
          this.setIsHidden(false)
        }
        else{
          this.articles.forEach(article => {
            article.isHidden = true
          })
          this.setIsHidden(true)
        }
      }
    },
    mounted(){
      this.Articles = this.temp_articles = this.articles
    },
    watch: {
        search(){
            if(this.search){
                var sort_articles = []
                this.temp_articles.forEach(article =>{
                    if(article.info.title.toLowerCase().trim().includes(this.search.toLowerCase().trim())){
                        sort_articles.push(article)
                    }
                })
                this.Articles = sort_articles
            }
            else{
                this.Articles = this.temp_articles
            }
        }
    }
}
</script>

<style scoped>
    .articles__search{
        width: 100%;
        padding-left: 42px;
        padding-right: 42px;
        margin-bottom: 42px;
    }
    .search__title{
        margin-bottom: 10px;
        text-align: center;
    }
    .no_articles{
        font-size: 24px;
        text-align: center;
        padding-bottom: 120px;
    }
    .articles__list-container{
      padding-left: 42px;
      padding-right: 42px;
      position: relative;
      display: inline-flex;
      justify-content: center;
    }
    .articles__content{
        max-width: 942px;
        width: 100%;
        max-height: 100%;
    }
    .articles__article{
        width: 100%;
        position: relative;
        padding-bottom: 132px;

        transition: color 0.3s;
    }
    .articles__article::after{
        position: absolute;
        content: "";
        width: 100%;
        height: 1px;
        top: calc(100% + -70px);
        background-color: #000000;
    }
    .control__button-cover-all{
        position:-webkit-sticky; 
        position: sticky;
        margin-top: -1px;
        top:10px;
        width: 20px;
        height:25px;

        background-image: url("@/assets/images/UI/buttons/to_cover_all.svg");
        background-position: center;
        background-size: 20px 25px;
        background-repeat: no-repeat;
    }

    .control__button-cover-all:hover{
        background-size: 17px 22px;
    }

    .button__uncover_all{
        margin-top: 1px;
        background-image: url("@/assets/images/UI/buttons/to_uncover_all.svg");
    }

    @media(max-width: 640px){
      .control__button-cover-all{
        margin-left: 10px;
      }
      .articles__list-container{
        padding-left: 15px;
        padding-right: 15px;
      }

       .articles__search{
        padding-left: 15px;
        padding-right: 15px;
      }
    }
    @media(max-width: 568px){
      .articles__article{
        width: 100%;
        position: relative;
        padding-bottom: 92px;

        transition: color 0.3s;
    }
    .articles__article::after{
        position: absolute;
        content: "";
        width: 100%;
        height: 1px;
        top: calc(100% + -55px);
        background-color: #000000;
    }
    }
</style>