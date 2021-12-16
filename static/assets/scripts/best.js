import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js'

new Vue({
    el: '#BestArticles',
    data(){
      return{
        articles: [],
        bestArticle: []
      }
    },
    updated: function () {
      const slider = new ChiefSlider('.best__slider', {
        loop: true,
        swipe: false
      });
    },
    async mounted() {
      const response1 = await fetch("/api/best-articles")
      const data1 = await response1.json()
      this.articles = data1
      const response2 = await fetch("/api/best-article")
      const data2 = await response2.json()
      this.bestArticle = data2
    } 
  })