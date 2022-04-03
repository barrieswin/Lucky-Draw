//申明變量

var btn = document.getElementById("btn"),

  prize = document.getElementsByTagName("i"),
  needNum,
  result;

// 生成隨機數函數
// function getRandom(m) {
//   return Math.floor(Math.random() * m ) + 1;
// }
var getRandom = (n) => Math.floor(Math.random() * n) + 1;  //不要0,所以要+1




//按下開始後生成隨機數

btn.onclick = function () {

  //開始抽獎後限制按鈕功能及按鈕樣式變化
  btn.setAttribute("disabled", "disabled");
  btn.style.backgroundColor = "red";
  btn.innerHTML = "抽獎中";


  //設置各個品項的機率
  var rang = 0, //此數值必須為0
    rang1 = rang + 10, //設置機率
    rang2 = rang1 + 5,
    rang3 = rang2 + 2,
    rang4 = rang3 + 5,
    rang5 = rang4 + 18,
    rang6 = rang5 + 5,
    rang7 = rang6 + 10,
    rang8 = rang7 + 5,
    rang9 = rang8 + 18,
    rang10 = rang9 + 15,
    rang11 = rang10 + 2,
    rang12 = rang11 + 5;


  //依總權重的總數生成臨界值
  var threshold = getRandom(rang12);

  console.log(`計算機率總權重 = ${rang12}`);
  console.log(`隨機生成臨界值 = ${threshold}`);

  if (threshold > rang && threshold <= rang1) {
    needNum = 1;
    result = "火鍋料1份";

  } else if (threshold > rang1 && threshold <= rang2) {
    needNum = 2;
    result = "沒中獎";

  } else if (threshold > rang2 && threshold <= rang3) {
    needNum = 3;
    result = "超爽der 9折";

  } else if (threshold > rang3 && threshold <= rang4) {
    needNum = 4;
    result = "沒中獎";

  } else if (threshold > rang4 && threshold <= rang5) {
    needNum = 5;
    result = "可口可樂1罐";

  } else if (threshold > rang5 && threshold <= rang6) {
    needNum = 6;
    result = "沒中獎";

  } else if (threshold > rang6 && threshold <= rang7) {
    needNum = 7;
    result = "豆腐紙1份";

  } else if (threshold > rang7 && threshold <= rang8) {
    needNum = 8;
    result = "沒中獎";

  } else if (threshold > rang8 && threshold <= rang9) {
    needNum = 9;
    result = "冰棒1支";

  } else if (threshold > rang9 && threshold <= rang10) {
    needNum = 10;
    result = "沒中獎";

  } else if (threshold > rang10 && threshold <= rang11) {
    needNum = 11;
    result = "折價50元";

  } else if (threshold > rang11 && threshold <= rang12) {
    needNum = 12;
    result = "沒中獎";
  }
  console.log(`抽中品項 = ${needNum}, ${result}`);


  //執行滾動
  var index = 0, //當前獎品位置下標，從0開始
    roundNum = 1, //滾動次數，從1開始
    round = prize.length * 4, //滾動圈數
    end = round + needNum; //抽中的品項序號+圈數

  scrollStart();



 // 加入音效
 var audioTick = document.getElementById("myTick");
 function playTick() {
   audioTick.pause();        // 如果音效正在撥放,停住,然後倒帶.
   audioTick.currentTime = 0;
   audioTick.play();         // 播放
 }

 var audioTada = document.getElementById("myTada");
 function playTada() {
   audioTada.pause();
   audioTada.currentTime = 0;
   audioTada.play();
 }
 var audioFail = document.getElementById("myFail");
 function playFail() {
   audioFail.pause();
   audioFail.currentTime = 0;
   audioFail.play();
 }


  //封裝變色函數
  function active() {

    for (var j = 0; j < prize.length; j++) { //for迴圈所有品項，清除變色的class="active"
      prize[j].removeAttribute("class");
    }

    prize[index].className = "active"; //給當前獎品加上變色 class="active"
    playTick();
  }


  //封裝開始滾動函數
  function scrollStart() {

    var timer1 = setInterval(function () {

      if (roundNum == end - 4) { //滾動到倒數第四個時停止timer1，執行結束滾動函數
        clearInterval(timer1);
        scrollEnd();
      }

      active();
      roundNum++;
      index++;
      if (index > 11) index = 0;

    }, 80) //滾動速度mS
  }


  //封裝結束滾動函數
  function scrollEnd() {
    var timer2 = setInterval(function () {

      if (roundNum == end) { //當滾到最後一個時，停止timer2
        clearInterval(timer2);
  
        var noWin = result.indexOf("沒中"); //查找結果里是否包含字符「沒中」

        if (noWin == -1) { //沒有包含返回結果-1，則說明已中獎，返回中獎結果      
          playTada();
          prizeRslt.innerHTML = `<br>恭喜您獲得： ${result}！`
          //console.log(`恭喜你獲得：${result}`);

        } else {
          playFail();
          prizeRslt.innerHTML = `<br>您沒抽中獎品，再接再厲！`
          //console.log(`你沒抽中獎品，再接再厲！`);
        }


      //恢復抽獎按鈕功能及樣式
      btn.removeAttribute("disabled");
      btn.style.backgroundColor = "#de4d4d";
      btn.innerHTML = "抽獎";
      }

      active();
      roundNum++;
      index++;
      if (index > 11) index = 0;

    }, 350) //最後4個的滾動速度，mS
  }
};