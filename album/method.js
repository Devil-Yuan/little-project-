let fs=require('fs')
let formidable=require('formidable')
let path=require('path')
let sd=require('silly-datetime')

//暴露出一个方法 显示首页
exports.showIndex=(req,res)=>{
    var arr=[]
    fs.readdir('./upload/',(err,file)=>{
        if (err){
            res.send('读取相册失败！！')
        }else{
            //检测文件是否是一个相册即文件夹
            file.map((item,index)=>{
                var data=fs.statSync('./upload/'+item,data)
                if (data.isDirectory()){
                    arr.push(item)
                }
            })
            var albumList={
                albumName:arr
            }
            res.render('index',albumList)
        }
    })
}
//暴露出一个方法   展示相册照片
exports.showPic=(req,res)=>{
    var imgl=[]
    if (req.params.albumName=='/favicon.ico'){return}
    var albumName=req.params.albumName
    fs.readdir('./upload/'+albumName,(err,file)=>{
        if (err){
            res.render('404')
        } else{
            file.map((item,index)=>{
                var data=fs.statSync('./upload/'+albumName+'\\'+item,data)
                if (data.isFile()){
                    imgl.push(item)
                }
            })
            var imgLi={
                abl:imgl,
                albumName:albumName
            }
            res.render('imgList',imgLi)
        }
    })
}
//暴露出一个方法  上传照片页面
exports.showUp=(req,res)=>{
    var album=[]
    fs.readdir('./upload/',(err,file)=>{
        if (err){
            res.render('404')
            // res.send('读取相册失败！！')
        }else{
            //检测文件是否是一个相册即文件夹
            file.map((item,index)=>{
                var data=fs.statSync('./upload/'+item,data)
                if (data.isDirectory()){
                    album.push(item)
                }
            })
            var albumList={
                albumName:album
            }
            res.render('upImg',albumList)
        }
    })
}
//暴露出一个方法 创建相册页面
exports.createDir=(req,res)=>{
    res.render('createDir')
}

//暴露出一个方法  通过Post上传照片
exports.doPost=(req,res)=>{
    var form=new formidable.IncomingForm()
    form.uploadDir='./temp/'
    form.parse(req,(err,field,file)=>{
        var oldDir=file.img.path
        var ename=path.extname(file.img.name)
        var times=sd.format(new Date(),'YYYYMMDDhhmmss')
        var ran=Math.floor(Math.random()*9999+7777)
        var name=times+ran
        var newDir='./upload/'+field.album+"\\"+name+ename
        fs.rename(oldDir,newDir,()=>{
            if (err){
                res.send('上传失败')
            }else{
                res.redirect('http://127.0.0.1/'+field.album)
            }
        })
       // console.log(file,111)
       // console.log(field,222)

    })

}
//暴露出一个方法  通过post的数据创建相册
exports.postDir=(req,res)=>{
    var form=new formidable.IncomingForm()
    form.uploadDir='./temp/'
    form.parse(req,(err,field,file)=>{
        if (err){
            res.render('404')
        }else{
            fs.mkdir('./upload/'+field.nameDir,(err)=>{
                if (err){
                    res.render('404')
                }else{
                    res.redirect('http://127.0.0.1')
                }
            })
        }
    })


}