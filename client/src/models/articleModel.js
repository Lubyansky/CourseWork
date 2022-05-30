module.exports = class userModel {
    info;
    author;
    content;
    sources;
    comments;

    constructor(article) {
        this.info = {
            article_id: article.article_id,
            title: article.title,
            description: article.description,
            tag: article.tag,
            date_of_creation: article.date_of_creation,
            number_of_views: article.number_of_views,
            preview_image: article.preview_image
        },
        this.author = {
            author_id: article.fk_author_id,
            username: article.username,
            name: article.name,
            surname: article.surname
        },
        this.content = convertContent(article),
        this.sources = convertSources(article),
        this.comments = convertComments(article)
    }
    convertContent(article){
        var content = []
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

        return content
    }
    convertSources(article){
        var sources = []
        article.sources.forEach(source =>{
            sources.push({body: source})
        })
        return sources
    }
    convertComments(article){
        var comments = []
        if(article.comments){
            article.comments.forEach(comment =>{
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
        return comments
    }
}
