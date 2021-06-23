chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, tabs => {
  const url = tabs[0].url
  //省略するURLのホスト部分(https://.www.amazon.co.jp)
  var shortenURL=url.substr(0,25)
  var dppoint=url.indexOf('dp',24);
  if(dppoint==-1){alert("dpの位置が取得できませんでした。")}
  var dpendslash=url.indexOf('/',dppoint+3);
  if(dpendslash==-1){
    var dpendslash=url.indexOf('?',dppoint+3);
  }
  if(dpendslash==-1){alert("dpのスラッシュ位置が取得できませんでした。")}
  var dp=url.substr(dppoint,dpendslash-dppoint);
  
  var listener = function(e){
      e.clipboardData.setData("text/plain" , shortenURL+dp);
      // 本来のイベントをキャンセル
      e.preventDefault();
      // 終わったら一応削除
      document.removeEventListener("copy", listener);
  }
  // コピーのイベントが発生したときに、クリップボードに書き込むようにしておく
  document.addEventListener("copy" , listener);
  // コピー
  document.execCommand("copy");


})
