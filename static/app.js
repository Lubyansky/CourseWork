/*const { Pool } = require('pg')
const pool = new Pool({
  user: 'postresql',
  host: 'localhost',
  database: 'Kiku',
  password: '63947',
  port: 5432,
})
pool.query('SELECT * FROM public."Articles"', (err, res) => {
  console.log(err, res)
  pool.end()
})*/

/*const App = {
  data() {
    return {
      servers: [],
      name: ''
    }
  },
  methods: {
    async createServer() {
      const data = {
        name: this.name,
        status: 'created'
      }
      const res = await fetch('/api/server', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      this.name = ''
      const newServer = await res.json()
      this.servers.push(newServer)
    },
    async remove(id) {
      await fetch(`/api/server/${id}`, {method: 'DELETE'})
      this.servers = this.servers.filter(s => s.id !== id)
    }
  },
  async mounted() {
    const res = await fetch('/api/server')
    this.servers = await res.json()
  }
}*/


/*const { Client } = require('pg')
const client = new Client({
  user: 'postresql',
  host: 'localhost',
  database: 'Kiku',
  password: '63947',
  port: 5432,
})
client.connect()

client.query("SELECT * FROM public.\"Articles\"")
  .then(function (data) {
    console.log("DATA:", data.value);
  })
  .catch(function (error) {
    console.log("ERROR:", error);
})*/

/*Vue.createApp(App).mount('#app')*/

import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js'

new Vue({
  el: '#Subscribe',
  data(){
    return{
      form: {
        email: ''
      }
    }
  },
  methods: {
    async makeSubscribe(){
      const {...subscriber} = this.form
      console.log(subscriber)

      this.form.email =  ''
    }
  }
})

new Vue({
  el: '#Find',
  data(){
    return{
      form: {
        searchInput: ''
      }
    }
  },
  methods: {
    async toSearch(){
      const {...input} = this.form
      console.log(input)

      this.form.searchInput =  ''
    }
  }
})

new Vue({
  el: '#Articles',
  data(){
    return{
      articles: []
    }
  },
  async mounted() {
    const response = await fetch("/api/articles")
    const data = await response.json()
    this.articles = data
  } 
})

new Vue({
  el: '#Article',
  data(){
    return{
      article: [],
      length: 0
    }
  },
  methods: {
  },
  async mounted() {
    const response = await fetch("/api/article/" + 3)
    const data = await response.json()
    this.article = data
    /*const paragraphs = this.article.paragraphs.length
    const titles = this.article.titles.length
    if(paragraphs >= titles) this.length = paragraphs
    else this.length = titles*/
    this.length = this.article.titles.length + 1
  } 
})
