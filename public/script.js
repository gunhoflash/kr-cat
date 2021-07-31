const birthday = dayjs('1996-10-24');

function getDayCount() {
  const dayCounts = [
    12345,
    11111,
    10001,
    10000,
    9999,
    9876,
  ];

  return dayCounts.reduce((prevDayCount, dayCount) => {
    const anniversary = birthday.add(dayCount - 1, 'day');
    const millisecond = anniversary - dayjs();
    if (millisecond > 0) return dayCount;
    if (millisecond > - 18 * 60 * 60 * 1000) return dayCount;
    return prevDayCount;
  }, dayCounts[0]);
}

function showRemainedDate() {
  const dayCount = getDayCount();
  const birthday = dayjs('1996-10-24');
  const anniversary = birthday.add(dayCount - 1, 'day');
  const millisecond = anniversary - dayjs();

  const subtitleElement = document.getElementById('subtitle');
  const titleElement = document.getElementById('title');

  if (millisecond > 0) {
    const day    = Math.floor(millisecond / 1000 / 60 / 60 / 24);
    const hour   = Math.floor(millisecond / 1000 / 60 / 60) % 24;
    const minute = Math.floor(millisecond / 1000 / 60) % 60;
    const second = Math.floor(millisecond / 1000) % 60;

    let titleString = '';
    if (day                            ) titleString += `<p class="title">${day}일</p>`;
    if (day || hour                    ) titleString += `<p class="title">${('0'  +        hour).slice(-2)}시간</p>`;
    if (day || hour || minute          ) titleString += `<p class="title">${('0'  +      minute).slice(-2)}분</p>`;
    if (day || hour || minute || second) titleString += `<p class="title">${('0'  +      second).slice(-2)}초</p>`;
    titleString += `<p class="title">${('00' + millisecond).slice(-3)}</p>`;

    subtitleElement.innerHTML = `${dayCount}까지`;
    titleElement.innerHTML = titleString;
    requestAnimationFrame(showRemainedDate);
  } else {
    subtitleElement.innerHTML = `${dayCount}: ${anniversary.format('YYYY-MM-DD')}`;
    titleElement.innerHTML = 'Congratulations!';
  }
}

requestAnimationFrame(showRemainedDate);

// ============================= LOL ============================= //
const summonerName = document.getElementById('summoner-name');
const summonerLevel = document.getElementById('summoner-level');
const winLose = document.getElementById('win-lose');

const baseUrl = "https://kr-carrot.herokuapp.com/api";
// const baseUrl = "http://localhost:8080/api"
const xmlHttpRequest = new XMLHttpRequest();

xmlHttpRequest.open("GET", baseUrl + "/summoner/아트런/10", true); // 하드코딩 ㅈㅅ
xmlHttpRequest.send();
xmlHttpRequest.onload = function() {
  if(xmlHttpRequest.status == 200) {
    showLolInfo(xmlHttpRequest.response);
  }
  else {
    console.log('123');
    handleLolError();
  }
}
    
/**
* lol 정보 조회 성공
*/
function showLolInfo(data) {
  const obj = JSON.parse(data);
  // console.log(obj);

  summonerName.innerHTML = obj.response.summonerName;
  summonerLevel.innerHTML = `Lv.${obj.response.summonerLevel}`;
  const win = obj.response.win;
  const lose = obj.response.lose;
  winLose.innerHTML = `${win + lose}전 ${win}승 ${lose}패`;
}

/**
* 통신 실패
*/
function handleLolError() {

  // display register api key
  console.log(document.getElementById("api-key-form"));
  document.getElementById("api-key-form").style.display = 'block';
  
  console.log(document.getElementById("api-key-form"));
}

/**
* api key 등록
*/
function onClickApiKeySubmit() {
  const apiKey = document.getElementById("api-key");
  const body = { "apiKey": apiKey.value };
  xmlHttpRequest.open('POST', baseUrl + '/api-key', true);
  xmlHttpRequest.setRequestHeader('Content-Type', 'application/json');
  xmlHttpRequest.send(JSON.stringify(body));
  window.location.reload();
}
