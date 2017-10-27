export function ajax(interfac) {
  let {method, url, asyn, params,type} = {...interfac}
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest()
    xhr.open(method, url, asyn)
    xhr.responseType = "text"
    xhr.onreadystatechange = function(event) {
      if(xhr.readyState == 4) {
        if ((xhr.status >= 200 && xhr.status < 300)) {
          resolve(xhr.responseText)
        } else {
          reject(new Error(xhr.status))
        }
      }
    }
    params = params ? params : null
    // const formData = new FormData()
    // for (let key in params) {
    //   formData.append(''+key,''+params[key])
    // }
    xhr.send(null)
  })
}

export function tips(msg) {
  alert(msg)
}

export class Song{
  constructor(song){
    this.songname = song.songname
    this.songid = song.songid
    this.songimage= `https://y.gtimg.cn/music/photo_new/T002R300x300M000${song.picis}.jpg?max_age=2592000`
    this.songlink =  `http://ws.stream.qqmusic.qq.com/${song.songid}.m4a?fromtag=46`
    this.rate = song.like
    this.youatti = song.youlike
    this.singer = song.singer
  }
}

export function getSong(song){
  return new Song(song)
}

export function formatDate(timestamp) {
  let date = new Date(timestamp)
  let nowDate = new Date()
  let month = date.getMonth() + 1
  let year  = date.getFullYear() 
  let nyear  = nowDate.getFullYear() 
  let day   = date.getDate()
  let nday   = nowDate.getDay()
  let prefix
  if((nday- day) == 1) {
    prefix = '昨天'
  } else if ((nday- day) == 2) {
    prefix = '前天'
  } else if (year == nyear) {
    prefix = `${month}-${day}`
  } else {
    prefix = `${year}-${month}-${day}`
  }
  
  let hours = date.getHours()
  let hdate = Math.floor(date / 1000 / 3600);
  let ndate = Math.floor(nowDate / 1000 / 3600);
  let minut = date.getMinutes()
  let nminut = nowDate.getMinutes()
  let time = minut - nminut
  if(hdate == ndate && time == 0) {
    return `刚刚`
  } else {
    return `${prefix} ${(''+hours).padStart(2, '0')}:${(''+minut).padStart(2, '0')}`
  }
}