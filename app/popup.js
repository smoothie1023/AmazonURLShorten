chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, tabs => {
  const url = tabs[0].url
  //省略するURLのホスト部分(https://.www.amazon.co.jp)
  var HeadURL=url.substr(0,25)
  var point=url.indexOf('dp',24);
  var middleURL="dp/"
  var content=document.getElementById("content");
  if(point==-1){
    var point=url.indexOf('gp/product',24);
    if(point!=-1){
      var middleURL="gp/product"
      point+=10
    }
    if(point==-1){content.innerHTML="dpまたはgpの位置が取得できませんでした。";}
  }
  var dpendslash=url.indexOf('/',point+3);
  if(dpendslash==-1){
    var dpendslash=url.indexOf('?',point+3);
  }
  if(dpendslash==-1){content.innerHTML="スラッシュ位置が取得できませんでした。";}
  var dp=url.substr(point,dpendslash-point);

  var listener = function(e){
      e.clipboardData.setData("text/plain" , HeadURL+middleURL+dp);
      // 本来のイベントをキャンセル
      e.preventDefault();
      // 終わったら一応削除
      document.removeEventListener("copy", listener);
  }
  // コピーのイベントが発生したときに、クリップボードに書き込むようにしておく
  document.addEventListener("copy" , listener);
  // コピー
  document.execCommand("copy");
  if(point!=-1 && dpendslash!=-1){
    content.innerHTML="URLをコピーしました";
  }
})
