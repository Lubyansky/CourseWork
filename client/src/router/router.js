import { createRouter, createWebHistory } from "vue-router";
import store from '@/store'
import Main from "@/pages/Main"
import Profile from "@/pages/Profile"
import Periods from "@/pages/Periods"
import Article from "@/pages/Article"
import Article_Management from "@/pages/Article_Management"
import Article_Editing from "@/pages/Article_Editing"
import Error from "@/pages/Error"
import Test from "@/pages/Test"

const routes = [
    {
        path: '/',
        name: 'main',
        component: Main
    },
    {
        path: '/periods',
        name: 'periods',
        component: Periods
    },
    {
        path: '/profile/:id',
        name: 'profile',
        component: Profile,
    },
    {
        path: '/article/:id',
        name: 'article',
        component: Article
    },
    {
        path: '/article_management',
        name:'article_management',
        component: Article_Management
    },
    {
        path: '/article_editing',
        name:'article_editing',
        component: Article_Editing
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'error',
        component: Error
    },
    {
        path: '/test',
        name: 'Test',
        component: Test
    }
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

router.beforeResolve(async (to, from, next) => {
    if(!store.state.user.isLogin){
        await store.dispatch('user/Authorization').then(async res=>{
            if(to.name === "profile"){
                if(to.params.id == store.state.user.body.user_id) {
                    await store.dispatch('user/GetSavedArticles', to.params.id).then(articles => {
                        store.state.saved_articles = articles
                    })
                }
            }
        })
        next()
    }
    else {
      next()
    }
})

export default router;