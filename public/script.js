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

xmlHttpRequest.open("GET", baseUrl + "/summoner/아트런/3", true); // 하드코딩 ㅈㅅ
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
  console.log(obj);

  summonerName.innerHTML = obj.response.summonerName;
  summonerLevel.innerHTML = `Lv.${obj.response.summonerLevel}`;
  const win = obj.response.win;
  const lose = obj.response.lose;
  winLose.innerHTML = `${win + lose}전 ${win}승 ${lose}패`;

  document.getElementById('profile-icon').src = getProfileIconSrcPath(obj.response.profileIcon);

  // 이미지 세팅 -> n번 반복 해야됨..
  document.getElementById('champion').src = getChampionSrcPath(obj.response.inGamePlayerInfos[0].champion);
  document.getElementById('summoner-spell-d').src = getSummonerSpellSrcPath(obj.response.inGamePlayerInfos[0].spell1);
  document.getElementById('summoner-spell-f').src = getSummonerSpellSrcPath(obj.response.inGamePlayerInfos[0].spell2);
  document.getElementById('item-0').src = getItemSrcPath(obj.response.inGamePlayerInfos[0].item0);
  document.getElementById('item-1').src = getItemSrcPath(obj.response.inGamePlayerInfos[0].item1);
  document.getElementById('item-2').src = getItemSrcPath(obj.response.inGamePlayerInfos[0].item2);
  document.getElementById('item-3').src = getItemSrcPath(obj.response.inGamePlayerInfos[0].item3);
  document.getElementById('item-4').src = getItemSrcPath(obj.response.inGamePlayerInfos[0].item4);
  document.getElementById('item-5').src = getItemSrcPath(obj.response.inGamePlayerInfos[0].item5);
  document.getElementById('win').innerHTML = 'win = ' + obj.response.inGamePlayerInfos[0].win; // 이거 이기고 진거에 따라 배경색 다르게 해주세요

  // show lol main frame
  document.getElementById("lol-main-div").style.display = 'block';
}

/**
* 통신 실패
*/
function handleLolError() {

  // display register api key
  document.getElementById("api-key-form").style.display = 'block';
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

/**
 * profile icon Id -> profile icon image path
 */
function getProfileIconSrcPath(profileIconId) {
  return `http://ddragon.leagueoflegends.com/cdn/11.15.1/img/profileicon/${profileIconId}.png`;
}

/**
 * champion name -> champion icon image path
 */
function getChampionSrcPath(championName) {
  return `http://ddragon.leagueoflegends.com/cdn/11.15.1/img/champion/${championName}.png`;
}

/**
 * item id -> item icon image path
 */
function getItemSrcPath(itemId) {
  return `http://ddragon.leagueoflegends.com/cdn/11.15.1/img/item/${itemId}.png`;
}

/**
 * summoner spell name -> summoner spell icon image path
 */
function getSummonerSpellSrcPath(spellName) {
  return `http://ddragon.leagueoflegends.com/cdn/11.15.1/img/spell/${spellName}.png`;
}