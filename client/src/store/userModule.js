import axios from "axios";

export const userModule = {
    state: () => ({
        body: {},
        isLogin: false
    }),
    getters: {
        IsHavePermission: (state) => async (key) =>{
            var result = false
            if(state.body.roles){
                state.body.roles.forEach(role => {
                    if(role.rights[key]){
                        result = true
                    }
                })
            }
            return result
        },
        Roles(state){
            var result = ""
            state.body.roles.forEach(role => {
                if(role.id != "user"){
                    if(result){
                        result += ", "
                    }
                    result += role.display
                }
            })
            return result
        },
        RolesWithoutAuthor:() => async (roles) =>{
            var result = ""
            roles.forEach(role => {
                if(role.id != "user" && role.id != "author"){
                    if(result){
                        result += ", "
                    }
                    result += role.display
                }
            })
            return result
        }
    },
    mutations: {
        setRoles(state, roles){
            state.body.roles = roles;
        },
        setIsLogin(state, isLogin){
            state.isLogin = isLogin
        },
        setUser(state, user){
            state.body = user
        }
    },
    actions: {
        async SetUser({state, commit}, user){
            commit('setIsLogin', true)
            commit('setUser', user)
        },
        async RemoveUser({state, commit}){
            commit('setIsLogin', false)
            commit('setUser', {})
        },
        async Registration({state, commit, rootState}, input){
            try {
                const url = (rootState.URL.USER + `/registration`)
                console.log(url)
                var data = []
                await axios.post(url, {username: input.username, password: input.password}, { withCredentials: true })
                .then(res => {
                    data = res
                })
                .then(res => {
                        if(data.status === 200){
                            data = data.data
                            console.log(data)
                            this.dispatch('user/SetUser', data.user)
                            this.dispatch('user/SetRoles')
                            this.dispatch('user/SetPermission')
                        }
                    }
                )
            }
            catch(e) {
                console.log(e)
                var error = ''
                var status = e.toString()
                status = status.substring(status.length - 3)
                if(status === "403"){
                    error = "Данное имя уже занято"
                }
                else error = "Пользователь не был зарегистрирован"
                return error
            }
        },
        async Login({state, commit, rootState}, input){
            try {
                const url = (rootState.URL.USER + `/login`)
                var data = [];
                await axios
                .post(url, {username: input.username, password: input.password}, { 
                    withCredentials: true, 
                })
                .then(res => {
                    data = res.data
                    console.log(data)
                });
                this.dispatch('user/SetUser', data.user)
                this.dispatch('user/SetRoles')
                this.dispatch('user/SetPermission')
            }
            catch(e) {
                var error = ''
                var status = e.toString()
                status = status.substring(status.length - 3)
                if(status === "403"){
                    error = "Введен неверный пароль"
                }
                else if(status === "400") error = "Пользователь с таким именем не существует"
                else error = "Ошибка авторизации"
                return error
            }
        },
        async Logout({state, commit, rootState}){
            const url = (rootState.URL.USER + `/logout`)
            await axios.post(url, {}, { withCredentials: true })
            this.dispatch('user/RemoveUser')
            this.dispatch('user/ClearPermission')
        },
        async Authorization({state, commit, rootState}){
            const url = (rootState.URL.USER + `/get_user`)
            var data = {};
            await axios.get(url, {withCredentials: true})
            .then(res => {
                data = res.data
                this.dispatch('user/SetUser', data)
                this.dispatch('user/SetRoles')
                this.dispatch('user/SetPermission')
            })
            .catch(e =>{
            })
        },
        async GetUser({state, commit, rootState}, user_id){
            const url = (rootState.URL.USER + `/get_user/` + user_id)
            var user = {}
            await axios.get(url, {withCredentials: true})
            .then(res => {
                user = res.data
                if(user){
                    var roles = []
                    this.dispatch('user/SetRolesUser', user).then(res => {
                        res.forEach(role =>{
                            roles.push(role)
                        })
                    })
                    user.roles = roles
                }
            })
            .catch(e =>{
            })
            return user
        },
        async SetRoles({state, commit, rootState}){
            var roles = []
            rootState.roles.forEach(role => {
                if(state.body.roles.includes(role.id)){
                    roles.push(role)
                }
            })
            commit('setRoles', roles)
        },
        async SetRolesUser({state, commit, rootState}, user){
            var roles = []
            rootState.roles.forEach(role => {
                if(user.roles.includes(role.id)){
                    roles.push(role)
                }
            })
            return roles
        },
        async Delete({state, commit, rootState}, user_id){
            const url = (rootState.URL.USER + `/delete_user`)
            const user = {
                id: user_id
            }
            try{
                await axios.delete(url, { data: user, withCredentials: true })
            }
            catch(e){}
            if(user_id === state.body.user_id) {
                this.dispatch('user/RemoveUser')
            }
        },
        async EditUser({state, commit, rootState}, user){
            const url = (rootState.URL.USER + `/update_user`)
            try{
                console.log(user)
                await axios.put(url, {user}, {withCredentials: true })
            }
            catch(e){
                return "Это имя пользователя уже занято"
            }
        },
        async EditPass({state, commit, rootState}, input){
            const url = (rootState.URL.USER + `/edit_password`)
            try{
                var data = []
                await axios.put(url, {input}, {withCredentials: true })
                .then(res=>{
                    data = res
                })
            }
            catch(e){
                var error = ''
                var status = e.toString()
                status = status.substring(status.length - 3)
                if(status === "403"){
                    error = "Введен неверный пароль"
                }
                else error = "Пароль не был изменен"
                return error
            }
        },
        async SaveArticle({state, commit, rootState}, article_id){
            const url = (rootState.URL.USER + `/save_article`)
            try{
                await axios.put(url, {article_id}, {withCredentials: true })
            }
            catch(e){}
        },
        async DeleteArticle({state, commit, rootState}, article_id){
            const url = (rootState.URL.USER + `/delete_article`)
            try{
                await axios.put(url, {article_id}, {withCredentials: true })
            }
            catch(e){}
        },
        async GetSavedArticles({state, commit, rootState}, user_id){
            try {
                var saved_articles = []
                const url = (rootState.URL.USER + "/saved_articles/" + user_id)
                await axios.get(url).then(res => {
                    saved_articles = res.data
                })
                return saved_articles
            }
            catch(e) {}
        },
        async GetArticlesToChange({state, commit, rootState}){
            var articles = {}
            try {
                const url = (rootState.URL.USER + "/articles_to_change")
                await axios.get(url, {withCredentials:true}).then(res => {
                    articles = res.data
                })
                return articles
            }
            catch(e) {}
        },
        async SetPermission({state, commit, rootState}){
            this.getters['user/IsHavePermission']('canEditComments').then(res=>{
                rootState.permission.canEditComments = res
            })
            this.getters['user/IsHavePermission']('canAddArticles').then(res=>{
                rootState.permission.canAddArticles = res
            })
            this.getters['user/IsHavePermission']('canEditArticles').then(res=>{
                rootState.permission.canEditArticles = res
            })
            this.getters['user/IsHavePermission']('canAssignRoles').then(res=>{
                rootState.permission.canAssignRoles = res
            })
            this.getters['user/IsHavePermission']('canEditUsers').then(res=>{
                rootState.permission.canEditUsers = res
            })
            this.getters['user/IsHavePermission']('canDeleteUsers').then(res=>{
                rootState.permission.canDeleteUsers = res
            })
            this.getters['user/IsHavePermission']('canBan').then(res=>{
                rootState.permission.canBan = res
            })
        },
        async ClearPermission({state, commit, rootState}){
            rootState.permission = {
                canEditComments: false,
                canAddArticles: false,
                canEditArticles: false,
                canAssignRoles: false,
                canEditUsers: false,
                canDeleteUsers: false,
                canBan: false
            }
        },
        async BanControl({state, commit, rootState}, data){
            const user_id = data.user_id
            if(data.value){
                const url = (rootState.URL.USER + "/ban_user")
                await axios.put(url, {user_id}, {withCredentials: true }).then(res => {})
            }
            else{
                const url = (rootState.URL.USER + "/unban_user")
                await axios.put(url, {user_id}, {withCredentials: true }).then(res => {})
            }
        }
    },
    namespaced: true
}
