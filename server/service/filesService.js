const config = require('../config')
const fs = require('fs')
const ApiError = require('../exceptions/apiError');

class FilesService {
    async uploadPicturePreview(file, article_id){
        let fullPath = config.PATH
        let relativePath = `/assets/images/preview/${article_id}`
  
        fullPath += relativePath
        if(!fs.existsSync(fullPath)){
          fs.mkdirSync(fullPath, err => {
            if(err) throw err
          })
        }
  
        relativePath += `/${file.name}`
        fullPath += `/${file.name}`
  
        if (fs.existsSync(fullPath)) {
            throw ApiError.BadRequest('Файл уже существует')
        }
  
        file.mv(fullPath)

        return relativePath
    }
    async deleteDirPreview(article_id) {

        const fullPath = `${config.PATH}/assets/images/preview/${article_id}`

        if (fs.existsSync(fullPath)) {
            fs.rm(fullPath, { recursive: true, force: true }, (err) =>{
              if(err) throw err
            })
        }
        /*else{
            throw ApiError.BadRequest(`Директория /assets/images/preview/${article_id} не существует`)
        }*/
    }
    async deleteDirArticle(article_id){

        const fullPath = `${config.PATH}/assets/images/article/${article_id}`

        if (fs.existsSync(fullPath)) {
            fs.rm(fullPath, { recursive: true, force: true }, (err) =>{
              if(err) throw err
            })
        }
        /*else{
            throw ApiError.BadRequest(`Директория /assets/images/article/${article_id} не существует`)
        }*/
    }
}

module.exports = new FilesService();