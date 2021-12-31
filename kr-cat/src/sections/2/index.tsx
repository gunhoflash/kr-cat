import './style.css';
import { useEffect, useState } from 'react';
import internal from 'stream';

const baseUrl = "https://kr-carrot.herokuapp.com/api";
const LOL_IMG_BASE = 'http://ddragon.leagueoflegends.com/cdn/11.15.1/img';
const getLOLImgPath = (v: string, subpath: string) => `${LOL_IMG_BASE}/${subpath}/${v}.png`;


interface History {
  gameDuration: number;
  gameEndTimestamp: number;
  gameStartTimestamp: number;
  participant: {
    assists: number;
    champLevel: number;
    championId: number;
    championName: string;
    deaths: number;
    item0: number;
    item1: number;
    item2: number;
    item3: number;
    item4: number;
    item5: number;
    item6: number;
    kills: number;
    summoner1Id: number;
    summoner2Id: number;
    summonerLevel: number;
    summonerName: string;
    timePlayed: number;
    win: boolean;
  }
}

function Section() {
  const [LOLInfo, setLOLInfo] = useState<any>(null);
  const [histories, setHistories] = useState<History[]>([]);

  useEffect(() => {

    console.log("use effect");
    window.fetch(baseUrl + "/summoner/아트런")
      .then(response => response.json())
      .then(data => {
        console.log(data.response.gameInfos);
        setHistories(data.response.gameInfos)
      });

    return () => {

    }
  }, [])

  const getTotalWins = () => {
    const numWin = histories
      .filter(history => history.participant.win)
      .length;

    console.log(numWin);
    return numWin;
  }

  // TODO: 이거 구현 
  //
  // xmlHttpRequest.open("GET", baseUrl + "/summoner/아트런/3", true); // 하드코딩 ㅈㅅ
  // xmlHttpRequest.send();
  // xmlHttpRequest.onload = () => {
  //   if (xmlHttpRequest.status === 200) {
  //     const obj = JSON.parse(xmlHttpRequest.response).response;
  //     console.log(obj);
  //     setLOLInfo(obj);
  //     setHistories(obj.inGamePlayerInfos);
  //   } else {
  //     // handle LoL Error: display register api key
  //     setIsShowAPIInput(true);
  //   }
  // }

  return (
    <div id="section2">
      {/* lol */}
        <div className="lol-frame">
          {/* 소환사 프로필 정보 */}
          <div>
            <div>아트런</div>
            {/* <img src={getLOLImgPath(LOLInfo.profileIcon, 'profileicon')} alt="" /> */}
          </div>
          {/* <p>Lv.{LOLInfo.summonerLevel}</p> */}
          {/* <p>{LOLInfo.win + LOLInfo.lose}전 {LOLInfo.win}승 {LOLInfo.lose}패</p> */}

          <p>{getTotalWins()} 승 {10 - getTotalWins()} 패</p>
          {/* Match Histories */}
          {histories.map((history: any, index: number) => (
            <div className="lol-game-div" key={index}>
              <p>게임시간: {Math.floor(history.gameDuration / 60)} 분</p>
              <img src={getLOLImgPath(history.participant.championName, "champion")} alt="" />
              <img src={getLOLImgPath(history.participant.item0, "item")} alt="" />
              <img src={getLOLImgPath(history.participant.item1, "item")} alt="" />
              <img src={getLOLImgPath(history.participant.item2, "item")} alt="" />
              <img src={getLOLImgPath(history.participant.item3, "item")} alt="" />
              <img src={getLOLImgPath(history.participant.item4, "item")} alt="" />
              <img src={getLOLImgPath(history.participant.item5, "item")} alt="" />
              <img src={getLOLImgPath(history.participant.item6, "item")} alt="" />
              {/* TODO: 스펠 이름으로 바꾸기 <img src={getLOLImgPath(history.participant.summoner1Id, "spell")} alt="" /> */} 
              {/* <img src={getLOLImgPath(history.champion, 'champion')} alt="" />
              {/* TODO: 이거 이기고 진거에 따라 배경색 다르게 해주세요 */}
              {/* <p>{history.win ? 'win' : 'lose'}</p> */}
            </div>
          ))}
        </div>
    </div>
  );
}

export default Section;
