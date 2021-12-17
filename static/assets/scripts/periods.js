import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js'

var vm = new Vue({
    el: '#Articles',
    data(){
      return{
        loading: false,
        articles: []
      }
    },
    methods: {
      async tagPressed(Tag){
        this.loading = true
        const response = await fetch("/api/articles/" + Tag)
        const data = await response.json()
        if(data[0] != undefined){
          for(var i in data)
          {
            this.articles.push(data[i])
          }
        }
        this.loading = false
        console.log("Pressed tag: " + Tag)
      },
      async tagUnpressed(Tag){
        this.loading = true
        if(this.articles.length > 0) {
          let temp = [];
          for(let article in this.articles)
          {
            if(this.articles[article].tag != Tag) temp.push(this.articles[article])
          }
          this.articles = temp
        }
        this.loading = false
        console.log("Unpressed tag: " + Tag)
      }
    },
    async mounted() {
      //Вывести все статьи
      /*const response = await fetch("/api/articles")
      const data = await response.json()
      this.articles = data*/

      this.loading = true
      var url = new URL(window.location.href);
      var tags = []
      tags = url.searchParams.getAll("tag");
      console.log("Selected tags: " + tags)
      tags.forEach(tag => {
        $("#"+tag).removeClass('unpressed');
        $("#"+tag).addClass('pressed');
        this.tagPressed(tag);
      });
      this.loading = false
    } 

})

$('.tags__tag').click(function(){
  if ( $(this).closest('.tags__tag').length) {

    var tag = $(this).attr('id');
    if($(this).hasClass('unpressed')){
        $(this).removeClass('unpressed');
        $(this).addClass('pressed');
        vm.tagPressed(tag);
    }
    else if ($(this).hasClass('pressed'))
    {
        $(this).removeClass('pressed');
        $(this).addClass('unpressed');
        vm.tagUnpressed(tag);
    }
  }
});