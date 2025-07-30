// ==UserScript==
// @name         2025暴力破解lurl密碼|自動帶入日期|可下載影片|下載圖片🚀
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  try to take over the world!
// @author       You
// @match        https://lurl.cc/*
// @match        https://www.dcard.tw/f/sex/*
// @match        https://www.dcard.tw/f/sex
// @license MIT
// @icon         https://www.google.com/s2/favicons?sz=64&domain=lurl.cc
// @grant        none
// ==/UserScript==
 
/*
2025/07/29
很久沒使用，也很久沒玩腳本了！最近來更新一下，修正一下bug！
查看了一下是lurl的邏輯改了，但也沒有相去多遠，所以帶入當天日期失效、圖片右鍵下載失效。
花了十幾分鐘修改一下，鎖右鍵就鎖吧無所謂。
 
現在已經修復完畢，可以自動帶入"上傳日期"然後圖片下面會有個下載按鈕，點下去會是圖片位置。(自己右鍵存檔)
 
 
未來考慮更新:
目前暫時尚未考慮一次多張圖片的狀況。
可以加入dcard隱藏sex版藍頭文章。
 
好用的話點一個好評，現在是社會工廠的一個小螺絲釘，一點點的鼓勵都是很棒的支持 ( ੭ ˙ᗜ˙ )੭ ٩꒰｡
 
==============下面是舊的更新日誌==========================
1.  密碼破解-自動套入當天上傳日期
2.  影片下載功能-一鍵下載
3.  預設影片名稱-若是從D卡點擊連結，會以文章標題當作檔案名稱
4.  暴力破解-嘗試365天的日期去跑，但其實沒意義因此備注掉了XD
5.  新增下載成功提示
6.  修改播放器-可加速、投放、下載、子母畫面等
7.  在西斯版頁面自動點選"是，已經滿18歲"(設定為等待3.5秒執行)
8.  拿回移動軸(D卡發現你刪掉登入提示，會讓你不能往下滾，超姬芭。)
9.  修復按鈕消失問題(沒密碼的影片)
10. 新增可以下載圖片(開啟右鍵另存新檔功能)
*/
 
 
 
function PictureSolve(){
// 第一步：取得 preload image 的連結
const preloadImageLink = document.querySelector('link[rel="preload"][as="image"]');
 
if (preloadImageLink) {
  const imageUrl = preloadImageLink.href;
 
  // 第二步：創建 <a download> 元素，包在 <button> 裡
  const a = document.createElement('a');
  a.href = imageUrl;
  a.download = 'downloaded-image.jpg'; // 你可以自訂檔名
  a.style.textDecoration = 'none'; // 移除連結樣式
 
  const button = document.createElement('button');
  button.textContent = '下載圖片';
  button.className = 'btn btn-primary'; // 加上 Bootstrap 樣式（如有使用）
 
  a.appendChild(button);
 
  // 第三步：外層 col-12 包住按鈕
  const colDiv = document.createElement('div');
  colDiv.className = 'col-12';
  colDiv.appendChild(a);
 
  // 第四步：插入到指定的 row 容器中
  const targetRow = document.querySelector('div.row[style*="margin: 10px"][style*="border-style:solid"]');
  if (targetRow) {
    targetRow.appendChild(colDiv);
  } else {
    console.warn('找不到指定的 <div class="row"> 元素');
  }
} else {
  console.warn('找不到 preload image 的 <link> 元素');
}
 
 
}
//----------------------------------------------------------------
 
function SexBoard(){
 
// 查找页面上所有的按钮元素
var buttons = document.querySelectorAll('button');
 
// 检查按钮数量
if (buttons.length == 13) {
    // 如果条件符合
    ClickOK();
}
 
function ClickOK(){
var pElements = document.getElementsByTagName('p');
var nextSiblingElement = pElements[1].nextSibling;
 
// 检查nextSiblingElement是否为元素节点
if (nextSiblingElement.nodeType === 1) { // 1 表示元素节点
    // 查找并点击第二个按钮
    var buttons = nextSiblingElement.querySelectorAll('button');
 
    if (buttons.length >= 2) {
        buttons[1].click();
    }
 
 }
}
 
// 查找所有具有class为__portal的div元素
var portalDivs = document.querySelectorAll('.__portal');
 
// 遍历找到的div元素并删除它们
portalDivs.forEach(function(div) {
    div.remove(); // 从DOM中移除div元素
});
document.body.style.overflow = 'auto';
 
}
 
 
function Newplayer(){
let TureUrl=document.querySelector('source').src
 
// 取得現有的 video 元素
var existingVideo = document.querySelector('video');
 
// 創建新的 video 元素
var newVideo = document.createElement('video');
 
// 設定新 video 元素的屬性和特性
newVideo.src = TureUrl; // 設定新 video 的來源
newVideo.controls = true; // 新 video 加入控制選項
newVideo.autoplay = true; // 如有需要，啟用自動播放
newVideo.width = 640; // 設定新 video 的寬度
newVideo.height = 360; // 設定新 video 的高度
newVideo.preload = 'metadata'; // 設定 preload 屬性為 'metadata'
newVideo.classList.add('vjs-tech'); // 添加 class 屬性
newVideo.setAttribute('data-setup', '{"aspectRatio":"16:9"}'); // 設定 data-setup 屬性
newVideo.id = 'vjs_video_3_html5_api'; // 設定 id 屬性
newVideo.tabIndex = -1; // 設定 tabindex 屬性
newVideo.setAttribute('role', 'application'); // 設定 role 屬性
 
// 用新的 video 元素替換現有的 video 元素
existingVideo.parentNode.replaceChild(newVideo, existingVideo);
 
 
 
// 获取具有 id 为 vjs_video_3 的 div 元素
var videoContainer = document.getElementById('vjs_video_3');
 
// 移除 oncontextmenu 和 controlslist 属性
videoContainer.removeAttribute('oncontextmenu');
videoContainer.removeAttribute('controlslist');
 
 
// 获取所有具有 class 为 vjs-control-bar 的元素
var controlBars = document.querySelectorAll('.vjs-control-bar');
 
// 遍历所有匹配的元素并删除它们
controlBars.forEach(function(controlBar) {
    controlBar.parentNode.removeChild(controlBar);
});
}
//----------------------------------------------------------------
 
 
// 创建 <link> 元素来加载 CSS 文件 (toast的CDN)
var linkElement = document.createElement('link');
linkElement.setAttribute('rel', 'stylesheet');
linkElement.setAttribute('type', 'text/css');
linkElement.setAttribute('href', 'https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css');
 
// 创建 <script> 元素来加载 JavaScript 文件
var scriptElement = document.createElement('script');
scriptElement.setAttribute('type', 'text/javascript');
scriptElement.setAttribute('src', 'https://cdn.jsdelivr.net/npm/toastify-js');
 
// 找到页面的 <head> 元素
var headElement = document.head || document.getElementsByTagName('head')[0];
 
// 将 <link> 和 <script> 元素添加到 <head> 中，以加载文件
headElement.appendChild(linkElement);
headElement.appendChild(scriptElement);
 
//----------------------------------------------------------------
 
// 獲取當前頁面的網址
var currentUrl = window.location.href;
 
// 檢查網址是否以 'https://www.dcard.tw/f/sex' 開頭
if (currentUrl.startsWith('https://www.dcard.tw/f/sex')) {
    DcardEvent();
 
    setTimeout(function() {
        SexBoard();
}, 3500);
 
if (currentUrl=='https://www.dcard.tw/f/sex') {
 
    document.body.style.overflow = 'auto';
 
// 存储当前页面的URL
var currentURL = window.location.href;
 
// 添加点击事件监听器
document.addEventListener('click', function() {
    // 获取当前页面的新URL
    var newURL = window.location.href;
 
    // 检查新旧URL是否不同，如果不同就重新加载页面
    if (newURL !== currentURL) {
        window.location.reload();
    }
 
    var currentURL = window.location.href;
});
}
 
}else {
    LurlEvent();
}
 
//----------------------------------------------------------------
function DcardEvent(){
 
// 找到頁面上的所有 <a> 元素
var links = document.querySelectorAll('a');
 
// 遍歷所有 <a> 元素
for (var i = 0; i < links.length; i++) {
    var link = links[i];
 
    // 註冊點擊事件
    link.addEventListener('click', function (event) {
        // 獲取被點擊的 <a> 元素的 href 屬性
        var href = event.currentTarget.getAttribute('href');
 
        // 檢查 href 屬性是否以 'https://lurl.cc/' 開頭
        if (href && href.startsWith('https://lurl.cc/')) {
            event.preventDefault(); // 阻止連結的默認操作
 
            var WebTitle = document.title;
            // 在這裡執行你的自定義事件 XYZ
            console.log('點擊了連結並觸發 XYZ 事件');
               window.open(href + '?title=' + encodeURIComponent(WebTitle), '_blank');
        }
    });
}
}
 
 
 
function LurlEvent(){
 
//----------------------------------------------------------------
 
 
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let pageTitle = urlParams.get('title');
 
 
//----------------------------------------------------------------
function DownloadBtn(){
    function downloadURI(uri, name) {
   fetch(uri).then((response) => response.blob())
   .then((blobresp) => {
       var blob = new Blob([blobresp], {type: "octet/stream"});
       var url = window.URL.createObjectURL(blob);
 
       var link = document.createElement("a");
       link.download = name;
       link.href = url;
       document.body.appendChild(link);
       link.click();
       document.body.removeChild(link);
       delete link;
   })
}
 
 
//----------------------------------------------------------------
 
 
let TureUrl=document.querySelector('source').src
 
// 創建一個<a>元素
var link = document.createElement('a');
link.setAttribute('class', 'btn btn-primary');
link.setAttribute('style', 'color: white; float: right;');
link.setAttribute('href', TureUrl); // 在這裡設定x的值
link.setAttribute('download', pageTitle + ".mp4"); // 在這裡設定檔案名稱
 
// 設定<a>元素的文本內容
link.innerText = '下載影片';
 
 
let h2=document.querySelectorAll('h2')
if (h2.length==3){// 获取id为vjs_video_3的div元素
// 获取id为vjs_video_3的div元素
var videoDiv = document.getElementById("vjs_video_3");
 
// 创建一个新的h2元素
var h2Element = document.createElement("h2");
 
// 设置h2元素的文本内容
h2Element.textContent = "✅助手啟動";
 
// 设置h2元素的样式，将字体颜色设置为白色，并设置文本居中
h2Element.style.color = "white";
h2Element.style.textAlign = "center";
h2Element.style.marginTop = "25px"; // 5像素的上边距
 
// 将h2元素插入到div前面
videoDiv.parentNode.insertBefore(h2Element, videoDiv);
h2Element.appendChild(link);
}else{
// 找到要插入的<h2>元素
let h2Element = document.querySelector('h2');
 
// 插入<a>元素到<h2>元素的內部
h2Element.appendChild(link);
}
 
link.addEventListener('click',function(e){
    e.preventDefault();
 
    let fileUrl=e.target.href;
    let fileName=e.target.download;
 
// 檢查按鈕元素是否包含 'disabled' class
if (!link.classList.contains('disabled-button')) {
 
    downloadURI(fileUrl, fileName);
 
//----------------------------------------------------------------
    Toastify({
        text: "🎉成功下載！請稍等幾秒......",
        duration: 5000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "#28a745",
        },
        onClick: function(){} // Callback after click
    }).showToast();
 
//----------------------------------------------------------------
 
   // 禁用 <a> 元素
    link.setAttribute('disabled', 'true');
 
    // 添加一個自定義 class（例如，'disabled'）
    link.classList.add('disabled-button');
 
    // 設定 n 秒後移除禁用狀態
    setTimeout(function () {
        link.removeAttribute('disabled');
        link.classList.remove('disabled-button');
    }, 7000);
}
 
})
 
 
//----------------------------------------------------------------
    // 創建一個新的 <style> 元素
var styleElement = document.createElement('style');
 
// 定義你的 CSS 樣式
var cssStyles = `
.disabled-button {
    background-color: #ccc; /* 灰色背景 */
    color: #999; /* 灰色文字顏色 */
    opacity: 0.5; /* 半透明效果 */
    cursor: not-allowed; /* 鼠標指針顯示為不允許 */
}
`;
 
// 將 CSS 樣式添加到 <style> 元素內
styleElement.innerHTML = cssStyles;
 
// 將 <style> 元素附加到 <head> 中，這樣樣式將應用於整個頁面
document.head.appendChild(styleElement);
 
}
 
 
//----------------------------------------------------------------
window.addEventListener('load', function(){
     var videoElement = document.querySelector('video');
    if (videoElement) {
        // 如果頁面包含<video>元素
        DownloadBtn();
        Newplayer();
    } else {
        console.log('頁面不包含<video>元素');
        PictureSolve();
    }
});
 
 
//----------------------------------------------------------------
 
// 从当前页面的URL中提取特定部分来构建Cookie名称
 
 
let cookieName=getCookieNameFromURL()
 
// 获取当前的psc_t2Ic0 Cookie值
function getPscCookieValue() {
  var cookies = document.cookie.split('; ');
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].split('=');
    if (cookie[0] === cookieName) {
      return cookie[1];
    }
  }
  return null;
}
 
let stopCondition = "成功";
let stopWrong = "錯誤";
 
function checkStopCondition() {
  var stopElement = document.querySelector("#back_top > div.container.NEWii_con > section:nth-child(6) > div > div > h2 > span");
  return stopElement.textContent.includes(stopCondition)||stopElement.textContent.includes(stopWrong);
}
 
function padZero(number) {
  return (number < 10 ? '0' : '') + number;
}
 
function simulateCookieModification() {
  var currentCookieValue = getPscCookieValue();
 
  if (!checkStopCondition()) {
    // 确保当前Cookie值存在且是数字
    if (currentCookieValue !== null && !isNaN(parseInt(currentCookieValue))) {
      var currentValue = parseInt(currentCookieValue);
 
      // 增加日期
      if (currentValue >= 101 && currentValue <= 1231) {
        currentValue++; // 增加一天
        if (currentValue % 100 > 31) {
          currentValue = (Math.floor(currentValue / 100) + 1) * 100 + 1; // 下一个月的第一天
        }
 
        // 更新Cookie值并添加零
        var paddedValue = padZero(currentValue);
        document.cookie = cookieName + "=" + paddedValue;
        console.log("目前进度: " + paddedValue);
 
        // 设置定时器，在1秒后刷新页面
        setTimeout(function() {
          location.reload();
        }, 1000);
      }
    }
  } else {
    console.log("已停止循环，找到符合条件的内容");
  }
}
 
function getCookieNameFromURL() {
  var url = window.location.href;
  var match = url.match(/https:\/\/lurl.cc\/(\w+)/);
  if (match && match[1]) {
    return "psc_" + match[1];
  }
  return null;
}
 
 
function tryToday(){
 
// 获取包含日期信息的文本
var dateText = document.querySelectorAll(".login_span")[1].textContent;
 
// 使用正则表达式匹配日期部分（yyyy-mm-dd hh:mm:ss）
var datePattern = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;
var match = dateText.match(datePattern);
 
if (match) {
  // 提取月份和日期部分
  var year = match[1];
  var month = match[2];
  var day = match[3];
 
  // 将月份和日期部分组合成 "mmdd" 格式
  var formattedDate = month + day;
 
  console.log("提取的日期部分：" + formattedDate);
} else {
  console.log("未找到日期信息。");
}
 
 document.cookie = cookieName + "=" + formattedDate;
 
 
location.reload()
}
 
if (!checkStopCondition()) {
    tryToday()
}
 
 
}
 
 
//----------------------------------------------------------------
