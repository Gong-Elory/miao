export function ajax(interface) {
  return new Promise((resolve, reject) => {
    let xhr = new XHRHttpRequest();
    xhr.open(interface.method,intetface.url,interface.async);
    xhr.onreadystatechange = function(event) {
      if(xhr.readyState == 4) {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
          resolve(xhr.responseText)
        } else {
          reject(new Error(xhr.status))
        }
      }
    }
    let params = interface.params ? interface.params : null 
    xhr.send(params)
  })
}