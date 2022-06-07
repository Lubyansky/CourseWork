import {createStore} from "vuex";
import {userModule} from "@/store/userModule";

export default createStore({
    state: () =>  ({
        URL:{
            /*BASE: `http://localhost:5500/`,
            API: `http://localhost:5500/api`,
            USER: `http://localhost:5500/user`*/
            /*BASE: `http://5.206.78.61:5500/`,
            API: `http://5.206.78.61:5500/api`,
            USER: `http://5.206.78.61:5500/user`*/
            BASE: `http://192.168.95.131:5500/`,
            API: `http://192.168.95.131:5500/api`,
            USER: `http://192.168.95.131:5500/user`
        },
        tags:[
            {id: 'tag1', title:'Доисторическая Япония'},
            {id: 'tag2', title:'Эра родовой аристократии'},
            {id: 'tag3', title:'Эра военной аристократии'},
            {id: 'tag4', title:'Эпоха воюющих провинций'},
            {id: 'tag5', title:'Сёгунат Токугава'},
            {id: 'tag6', title:'Модернизация'},
            {id: 'tag7', title:'Япония в качестве\nВеликой Державы'},
            {id: 'tag8', title:'Современность'}
        ],
        roles: [
            {
                id: 'user',
                display: "Пользователь",
                rights: {
                    canEditComments: false,
                    canAddArticles: false,
                    canEditArticles: false,
                    canAssignRoles: false,
                    canEditUsers: false,
                    canDeleteUsers: false,
                    canBan: false
                }
            },
            {
                id: 'author',
                display: "Автор",
                rights:{
                    canEditComments: false,
                    canAddArticles: true,
                    canEditArticles: false,
                    canAssignRoles: false,
                    canEditUsers: false,
                    canDeleteUsers: false,
                    canBan: false
                }
                
            },
            {
                id: 'moderator',
                display: "Модератор",
                rights:{
                    canEditComments: true,
                    canAddArticles: false,
                    canEditArticles: true,
                    canAssignRoles: false,
                    canEditUsers: false,
                    canDeleteUsers: false,
                    canBan: true
                }
            },
            {
                id: 'admin',
                display: "Администратор",
                rights:{
                    canEditComments: true,
                    canAddArticles: true,
                    canEditArticles: true,
                    canAssignRoles: true,
                    canEditUsers: true,
                    canDeleteUsers: true,
                    canBan: true
                }
            },
        ],
        article_edit: {
            article: {},
            isEdit: false
        },
        permission:{
            canEditComments: false,
            canAddArticles: false,
            canEditArticles: false,
            canAssignRoles: false,
            canEditUsers: false,
            canDeleteUsers: false,
            canBan: false
        },
        saved_articles: [],
        isHidden: true
    }),
    getters: {
        getSavedArticles(state){
            return state.saved_articles
        }
    },
    mutations:{
        setIsHidden(state, value){
            state.isHidden = value
        },
        setArticleEdit(state, value){
            state.article_edit = value
        }
    },
    modules: {
        user: userModule
    }
})
