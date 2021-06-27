chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, tabs => {
  const url = tabs[0].url
  const content=document.getElementById("content");
  var point=-1
  var listener = function(e){
      e.clipboardData.setData("text/plain" , "https://www.amazon.co.jp/"+middleURL+url.substr(point,dpendslash-point));
      e.preventDefault();
      document.removeEventListener("copy", listener);
  }
  if(url.indexOf('dp/',24)!=-1){
    var middleURL="dp/";
    point=url.indexOf('dp/',24)+3;
  }else{
    if(url.indexOf('gp/product',24)!=-1){
      var middleURL="gp/product";
      point=url.indexOf('gp/product',24)+10;
    }else content.innerHTML="dpまたはgpの位置が取得できませんでした。";
  }
  var dpendslash= url.indexOf('/',point+3) !=-1 ? dpendslash=url.indexOf('/',point+3) : dpendslash=url.indexOf('?',point+3)
  if(dpendslash==-1)content.innerHTML="スラッシュ位置が取得できませんでした。";
  if(point!=-1 && dpendslash!=-1){
    document.addEventListener("copy" , listener);
    document.execCommand("copy");
    content.innerHTML="URLをコピーしました";
  }
})
