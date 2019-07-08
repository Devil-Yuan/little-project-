let express=require('express')
let sIndex=require('./method')

let app=express()

//加载静态资源
app.use(express.static('./static/'))
app.use(express.static('./upload/'))
app.use(express.static('./node_modules/'))


//设置模板引擎
app.set('view engine','ejs')


//具体功能的实现 如下
//显示首页
app.get('/',sIndex.showIndex)
//上传照片页面
app.get('/up',sIndex.showUp)
//创建相册页面
app.get('/createDir',sIndex.createDir)
//显示相册中的图片
app.get('/:albumName',sIndex.showPic)
//上传照片的post方法
app.post('/up',sIndex.doPost)
//创建相册的post方法
app.post('/createDir',sIndex.postDir)
//渲染错误页面
app.use((req,res)=>{
    res.render('404')
})
app.listen(80)