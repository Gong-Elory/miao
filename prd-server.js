/*
* @Author: Elory
* @Date:   2017-11-12 10:22:35
* @Last Modified by:   Elory
* @Last Modified time: 2017-11-12 10:36:47
*/
var express = require('express')
var config = require('./config/index')
var axios = require('axios')

const app = express()

const apiRoutes = express.Router()
apiRoutes.get('/getStoryList/:id',function(req, res){
  let url = `./src/mock/storyList.json`
  if(req.params.id) {
    url = `./src/mock/storyList${req.params.id}.json`
  }
  const story = require(url)
  res.json(story)
})
apiRoutes.get('/commentList',function(req, res){
  let url = `./src/mock/comment.json`
  const story = require(url)
  res.json(story)
})

apiRoutes.get('/getTopList',function (req, res) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'

  axios.get(url, {
    headers: {
      referer: 'https://y.qq.com/n/yqq/toplist/4.html',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    var ret = response.data
    if (typeof ret === 'string') {
      var reg = /"songlist"\:\s*\[.+\]/
      var matches = ret.match(reg)
      if (matches) {
        ret = JSON.parse("{"+matches[0]+"}")
      }
    }
    res.json(ret)
  }).catch((e) => {
    console.log(e)
  })
})

apiRoutes.get('/getSearchResult',function (req, res) {
  const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'

  axios.get(url, {
    headers: {
      referer: 'https://m.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    var ret = response.data
    res.json(ret)
  }).catch((e) => {
    console.log(e)
  })
})


app.use(apiRoutes)
//静态资源入口 dist目录
app.use(express.static('./dist'))

//
console.log('test')
var port = process.env.PORT || config.build.port
module.exports = app.listen(port, function(error){
  if(error){
    console.log(error)
    return
  }
  console.log('已经启动啦...')
})