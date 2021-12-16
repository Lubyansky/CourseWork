import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js'

var vm = new Vue({
    el: '#Articles',
    data(){
      return{
        articles: []
      }
    },
    methods: {
      async tagPressed(Tag){
        const response = await fetch("/api/articles/" + Tag)
        const data = await response.json()
        if(data[0] != undefined){
          this.articles.push(data[0])
        }
      },
      async tagUnpressed(Tag){
        if(this.articles.length > 0) {
          let temp = [];
          for(let article in this.articles)
          {
            if(this.articles[article].tag != Tag) temp.push(this.articles[article])
          }
          this.articles = temp
        }
      }
    },
    async mounted() {
      /*const response = await fetch("/api/articles")
      const data = await response.json()
      this.articles = data*/
      let uri = window.location.href.split('/')
      let inquiry = uri[uri.length - 1].split('?')
      if(inquiry.length === 2){
        let tag = inquiry[1]
        $("#"+tag).removeClass('unpressed');
        $("#"+tag).addClass('pressed');
        this.tagPressed(tag);
      }
      console.log(uri)
      console.log(inquiry)
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