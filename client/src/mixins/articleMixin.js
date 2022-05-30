export default{
    data(){
        return{
        }
    },
    methods: {
        async Expand(article){
            var titles = []
            var paragraphs = []
            var pictures = []
            var sources = []
            article.content.forEach((item, index = 0) => {
                if(index != 0 && item.title) {
                  titles.push(item.title)
                }
                item.paragraphs.forEach(paragraph => {
                  paragraphs.push([index, paragraph.body])
                })
                if(item.picture.url) {
                  pictures[index] = []
                  pictures[index].push(index)
                  pictures[index].push(item.picture.url)
                  pictures[index].push(item.picture.desc)
                  pictures[index].push(item.picture.copyright)
                }
            })
            article.sources.forEach(source =>{
                sources.push(source.body)
            })
            return {
                title: article.info.title.charAt(0).toUpperCase() + article.info.title.slice(1),
                description: article.info.description.charAt(0).toLowerCase() + article.info.description.slice(1),
                tag: article.info.tag,
                preview_image: article.info.preview_image,
                titles: titles,
                paragraphs: paragraphs,
                pictures: pictures,
                sources: sources
            }
        },
        async Decrease(article){
            var content = []
            var sources = []
            var comments = []

            //Конвертируем параграфы
            var index = 0
            article.paragraphs.forEach(paragraph => {
                if(Number(paragraph[0]) != index){
                index += 1
                }
                if(!content[index]){
                content[index] = {
                    title: '',
                    paragraphs: [],
                    picture: {
                    url: '',
                    desc: '',
                    copyright: '' 
                    }
                }
                }
                content[index].paragraphs.push({body:paragraph[1]})
            })

            //Конвертируем заголовки
            article.titles.forEach((title, index = 0) => {
                content[index + 1].title = title
            })
            
            //Конвертируем картинки
            article.pictures.forEach(picture => {
                content[picture[0]].picture.url = picture[1]
                content[picture[0]].picture.desc = picture[2]
                content[picture[0]].picture.copyright = picture[3]
            })

            //Конвертируем источники
            article.sources.forEach(source =>{
                sources.push({body: source})
            })

            if(article.comments){
                article.comments.forEach(comm =>{
                    var comment = {
                        comment_id: comm.comment_id,
                        date_of_writing: comm.date_of_writing,
                        fk_article_id: comm.fk_article_id,
                        fk_user_id: comm.fk_user_id,
                        name: comm.name,
                        roles: comm.roles,
                        surname: comm.surname,
                        text: comm.text,
                        username: comm.username,
                    }
                    var roles = []
                    comment.roles.forEach(commentRole =>{
                        roles.push(this.$store.state.roles.find(role => role.id === commentRole))
                    })
                    this.$store.getters['user/RolesWithoutAuthor'](roles).then(res => {
                        comment.roles = res
                        if(article.fk_author_id == comment.fk_user_id){
                            if(comment.roles){
                                comment.roles += ", "
                            }
                            comment.roles += ("Автор")
                        }
                        comments.push(comment)
                    })
                })
            }

            return {
                info: {
                    article_id: article.article_id,
                    title: article.title,
                    description: article.description,
                    tag: article.tag,
                    date_of_creation: article.date_of_creation,
                    number_of_views: article.number_of_views,
                    preview_image: article.preview_image
                },
                author: {
                    author_id: article.fk_author_id,
                    username: article.username,
                    name: article.name,
                    surname: article.surname
                },
                content: content,
                sources: sources,
                comments: comments
            }
        }
    }
}