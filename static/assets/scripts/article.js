import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js'

new Vue({
    el: '#Article',
    data(){
      return{
        loading: false,
        article: '',
        length: 0,  //"размер статьи", сколько раз надо будет повторить цикл в шаблоне
        id: '',     //id статьи, считывается из url
        URI: '',
        tag: ''     //преобразованный тег для вывода в шаблон
      }
    },
    created(){
      this.URI = window.location.href
      let uri = this.URI.split('/')
      this.id = uri[uri.length - 1]
    },
    async mounted() {
      this.loading = true
      const response = await fetch("/api/article/" + this.id)
      try {
        const data = await response.json()
        this.article = data
        this.length = this.article.titles.length + 1
      }
      catch(e) {}
  
      this.loading = false

      switch (this.article.tag) {
        case 'tag1':
          this.tag = 'Доисторическая Япония'
          break
        case 'tag2':
          this.tag = 'Эра родовой аристократии'
          break
        case 'tag3':
          this.tag = 'Эра военной аристократии'
          break
        case 'tag4':
          this.tag = 'Эпоха воюющих провинций'
          break
        case 'tag5':
          this.tag = 'Сёгунат Токугава'
          break
        case 'tag6':
          this.tag = 'Модернизация'
          break
        case 'tag7':
          this.tag = 'Япония в качестве Великой Державы'
          break
        case 'tag8':
          this.tag = 'Современность'
          break
      }
    } 
})