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

  const obj = JSON.parse(data).response;
  console.log(obj);

  // 프로필 정보 세팅
  showProfile(obj);

  // 이미지 세팅 -> n번 반복 해야됨.. // 하드코딩함 ㅈㅅ
  showHistory(obj.inGamePlayerInfos);

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

/**
 * 소환사 프로필 정보
 */
function showProfile(obj) {

  const win = obj.win;
  const lose = obj.lose;

  document.getElementById('summoner-name').innerHTML = obj.summonerName;
  document.getElementById('summoner-level').innerHTML = `Lv.${obj.summonerLevel}`;
  document.getElementById('win-lose').innerHTML = `${win + lose}전 ${win}승 ${lose}패`;
  document.getElementById('profile-icon').src = getProfileIconSrcPath(obj.profileIcon);
}

/**
 * 게임 이력
 */
function showHistory(gameData) {

  for( var i = 0; i < gameData.length; i++) {
    document.getElementById(`g${i}-champion`).src = getChampionSrcPath(gameData[i].champion);
    document.getElementById(`g${i}-summoner-spell-d`).src = getSummonerSpellSrcPath(gameData[i].spell1);
    document.getElementById(`g${i}-summoner-spell-f`).src = getSummonerSpellSrcPath(gameData[i].spell2);
    document.getElementById(`g${i}-item-0`).src = getItemSrcPath(gameData[i].item0);
    document.getElementById(`g${i}-item-1`).src = getItemSrcPath(gameData[i].item1);
    document.getElementById(`g${i}-item-2`).src = getItemSrcPath(gameData[i].item2);
    document.getElementById(`g${i}-item-3`).src = getItemSrcPath(gameData[i].item3);
    document.getElementById(`g${i}-item-4`).src = getItemSrcPath(gameData[i].item4);
    document.getElementById(`g${i}-item-5`).src = getItemSrcPath(gameData[i].item5);
    document.getElementById(`g${i}-result`).innerHTML = gameData[i].win ? 'win' : 'lose'; // 이거 이기고 진거에 따라 배경색 다르게 해주세요
  }
}