export function ajax(interfac) {
  let {method, url, asyn, params,type='text'} = {...interfac}
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest()
    xhr.open(method, url, asyn)
    xhr.responseType = type
    xhr.onreadystatechange = function(event) {
      if(xhr.readyState == 4) {
        if ((xhr.status >= 200 && xhr.status < 300)) {
          resolve(xhr.responseText)
        } else {
          reject(new Error(xhr.status))
        }
      }
    }

    let param = null
    if(params != null) {
      const formData = new FormData()
      for (let key in params) {
        formData.append(key,params[key])
      }
      param = formData;
    }
    xhr.send(param)
  })
}

export const JSONP = {
  now(){
    return Date.now()
  },
  rand(){
    return Math.random().toString().substr(2)
  },
  removeElem(elem) {
    const parent = elem.parentNode
    if( parent && parent.nodeType !== 11) {
      parent.removeChild(elem)
    }
  },
  parseData(data) {
    let ret = ""
    if(typeof data == "string") {
      ret = data
    } else if (typeof data === 'object'){
      for(let key in data) {
        ret += '&' + key + '=' + encodeURIComponent(data[key])
      }
    }
    ret += '&_time' + '=' + this.now()
    ret = ret.substr(1)
    return ret
  },
  getJSON(url, data, func, callback="callback"){
    let name;
    url = url + (url.indexOf('?') === -1 ? '?' : '&') + this.parseData(data)
    
    if(callback == 'callback') {
      let match = /callback=(\w+)/.exec(url);
      if(match && match[1]) {
        name = match[1]
      } else {
        name = "jsonp_" + this.now()
        url = url.replace(`callback=?`, `callback=${name}`)
        url = url.replace(`callback=%3F`, `callback=${name}`)
      }
    } else {
      name = data[callback]
      url = url.replace(`${callback}=?`, `${callback}=${name}`)
      url = url.replace(`${callback}=%3F`, `${callback}=${name}`)
    }  
    let script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = url
    console.log('url',url)
    script.id = 'id_' + name
    window[name] = function(json) {
      window[name] = null
      var elem = document.getElementById('id_' + name)
      JSONP.removeElem(elem)
      func(json)
      console.log('has')
    }
    
    let head = document.getElementsByTagName('head')[0]
    if (head) {
      head.appendChild(script)
    }
  }
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
    this.interval = song.interval
    this.desc = song.desc
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

export function outNum(num){
  num = parseInt(num);
  if(num < 1000){
    return ''+num;
  }else if(num >= 1000 && num < 10000){
    return (num / 1000).toFixed(1)+"k";
  }else if(num >= 10000 && num < 100000){
    return (num / 10000).toFixed(1)+"w";
  }else if(num >100000 && num < 1000000){
    return (num / 10000).toFixed(0)+"w";
  }else {
    return "99w";
  }
}

export function isEmpty(obj) {
  for(var name in obj) {
    return false
  }
  return true
}