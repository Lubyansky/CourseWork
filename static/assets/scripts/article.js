import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js'

new Vue({
    el: '#Article',
    data(){
      return{
        article: [],
        length: 0,
        id: 0,
        URI: '',
      }
    },
    created(){
      this.URI = window.location.href
      let uri = this.URI.split('/')
      this.id = uri[uri.length - 1]
    },
    async mounted() {
      const response = await fetch("/api/article/" + this.id)
      const data = await response.json()
  
      this.article = data
      this.length = this.article.titles.length + 1
    } 
})