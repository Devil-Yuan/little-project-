let express=require('express')
let MongoClient=require('mongodb').MongoClient
let app=express()
let ObjectId=require('mongodb').ObjectId
let dataUrl='mongodb://127.0.0.1:27017'

//解决跨域问题
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
    });

//修改数据
app.get('/update',(req,res)=>{
    var query=req.query
    // console.log(query)
    MongoClient.connect(dataUrl,{useNewUrlParser:true},(err,client)=>{
        if (err){
            var jso={
                ok:false,
                msg:"连接数据库失败！"
            }
            res.send(jso)
        } else{
            var olds=query.OldMsg
            var news={$set:query.NewMsg}
            client.db('test1').collection('msg').updateOne(olds,news,(err,data)=>{
                if (err){
                    var jso={
                        ok:false,
                        msg:"修改数据失败"
                    }
                    res.send(jso)
                } else{
                    var jso={
                        ok:true,
                        msg:"修改数据成功",
                    }
                    res.send(jso)
                }
            })
        }
    })

})
//删除数据
app.get('/del',(req,res)=>{
    var query=req.query
    // console.log(req.query)
    MongoClient.connect(dataUrl,{useNewUrlParser:true},(err,client)=>{
        if (err){
            var jso={
                ok:false,
                msg:"连接数据库失败！"
            }
            res.send(jso)
        } else{
            var jwe={
                _id:ObjectId(query._id)
            }
            client.db('test1').collection('msg').deleteOne(jwe,(err,data)=>{
                if (err){
                    var jso={
                        ok:false,
                        msg:"删除数据失败"
                    }
                    res.send(jso)
                } else{
                    var jso={
                        ok:true,
                        msg:"删除数据成功"
                    }
                    res.send(jso)
                }
            })
        }
    })
})
//将数据库数据显示出来 即查数据
app.get('/find',(req,res)=>{
    MongoClient.connect(dataUrl,{useNewUrlParser:true},(err,client)=>{
        if (err){
            var jso={
                ok:false,
                msg:"连接数据库失败！"
            }
            res.send(jso)
        } else{
            client.db('test1').collection('msg').find().toArray((err,datas)=>{
                if (err){
                    var jso={
                        ok:false,
                        msg:"从数据库导出数据失败"
                    }
                    res.send(jso)
                } else{
                    var jso={
                        ok:false,
                        msg:"成功",
                        result:datas
                    }
                    res.send(jso)
                }
            })
        }
    })
})
//插入数据
app.get('/add',(req,res)=>{
    var query=req.query
    if (query.name==''||query.age==''||query.remk==''){
        var jso={
            ok:false,
            msg:"输入不能为空"
        }
        res.send(jso)
        return
    }else{
        MongoClient.connect(dataUrl,{useNewUrlParser:true},(err,client)=>{
            if (err){
                var jso={
                    ok:false,
                    msg:"连接数据库失败！"
                }
                res.send(jso)
            } else{
                client.db('test1').collection('msg').insertOne(query,(err,data)=>{
                    if (err){
                        var jso={
                            ok:false,
                            msg:"插入数据失败"
                        }
                        res.send(jso)
                    } else{
                        var jso={
                            ok:true,
                            msg:"插入数据成功"
                        }
                        res.send(jso)
                    }
                })
            }
        })
        // res.send('服务器搭建成功')
    }
    // console.log(query)
    // res.send('服务器搭建成功')
})
app.listen(80)