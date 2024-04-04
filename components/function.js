/* -----------------------------------------
c()
機能：コンソールへの標準出力
----------------------------------------- */

const c = (value) => {
  console.log(value);
}

/* -----------------------------------------
toggleClass()
機能：クラスの付け替え
----------------------------------------- */

const toggleClass = (ele, className) => {
  if (ele.classList.contains(className)) {
    ele.classList.remove(className);
  } else {
    ele.classList.add(className);
  }
  return 0;
}

/* -----------------------------------------
setPageTitle()
機能：titleタグの値をファイル名に変更する
----------------------------------------- */

const setPageTitle = () => {
  // 現在のページのURLを取得する
  var currentPageUrl = window.location.href;
  // ファイル名のみを抽出する
  var fileName = currentPageUrl.split("/").pop();
  // 拡張子を除去する
  var pageTitle = fileName.split(".")[0];
  // <title> 要素にタイトルを設定する
  document.title = pageTitle;
}

/* -----------------------------------------
fadeOut()
機能：opacityを下げ、最終的にdisplay:noneとなる
----------------------------------------- */

const fadeOut = (ele, speed = 'medium') => {
  const speedList = {slow: 100, medium: 50, fast: 10};
  if (speedList[speed]) {
    ele.style.opacity = 1;
    let t = 1;
    let interval = 1;
    const coefficient = speedList[speed];
    fadeOutFn(ele, coefficient, t, interval);
  }
}

const fadeOutFn = (ele, coefficient, t, interval) => {
  let opacity = ele.style.opacity - Math.exp(t/100)/coefficient;
  t += interval;

  ele.style.opacity = opacity;
  const timeId = setTimeout(function(){
    fadeOutFn(ele, coefficient, t, interval);
  }, 50);
  if (opacity < 0) {

    // 新たに追加した（前はvisibility: hidden;）
    ele.style.display = 'none';

    clearTimeout(timeId);
  }
  return 0;
}

/* -----------------------------------------
fadeIn()
機能：opacityを上げ、最終的にopacity:1となる
----------------------------------------- */

const fadeIn = (ele, speed = 'medium') => {
  const speedList = {slow: 100, medium: 50, fast: 10};
  ele.style.display = 'block';
  ele.style.opacity = 0;
  if (speedList[speed]) {
    let t = 1;
    let interval = 1;
    const coefficient = speedList[speed];
    fadeInFn(ele, coefficient, t, interval);
  }
  return 0;
}

const fadeInFn = (ele, coefficient, t, interval) => {
  let opacity = parseFloat(ele.style.opacity) + 0.1 * t / coefficient;

  t += interval;
  ele.style.opacity = opacity;

  const timeId = setTimeout(function(){
    fadeInFn(ele, coefficient, t, interval);
  }, 10);

  if (opacity > 1) {
    clearTimeout(timeId);
    ele.style.opacity = 1;
  }
  return 0;
}

/* -----------------------------------------
XXX()
機能：XXX
----------------------------------------- */