import './style.css';
import { useEffect, useState } from 'react';
import internal from 'stream';

const baseUrl = "https://kr-carrot.herokuapp.com/api";
const LOL_IMG_BASE = 'http://ddragon.leagueoflegends.com/cdn/11.15.1/img';
const getLOLImgPath = (v: string, subpath: string) => `${LOL_IMG_BASE}/${subpath}/${v}.png`;


interface SummonerInfo {
  accountId: string;
  profileIconId: number;
  revisionDate: number;
  name: string;
  id: string;
  puuid: string;
  summonerLevel: number;
}

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
    summonerSpell1: string;
    summoner2Id: number;
    summonerSpell2: string;
    summonerLevel: number;
    summonerName: string;
    timePlayed: number;
    win: boolean;
  }
}

function Section() {
  const [summonerInfo, setSummonerInfo] = useState<SummonerInfo>();
  const [histories, setHistories] = useState<History[]>([]);

  useEffect(() => {
    getAndSetSummonerInfo();
    getAndSetHistories();
    
    return () => {
      
    }
  }, [])


  const getAndSetSummonerInfo = function() {
    window.fetch(baseUrl + "/summoners/아트런")
      .then(response => response.json())
      .then(data => {
        console.log(data.response);
        setSummonerInfo(data.response)}
        );
  }

  const getAndSetHistories = function() {
    window.fetch(baseUrl + "/summoners/histories/아트런")
    .then(response => response.json())
    .then(data => {
      console.log(data.response.gameInfos);
      setHistories(data.response.gameInfos)
    });
  }

  const getTotalWins = () => {
    const numWin = histories
      .filter(history => history.participant.win)
      .length;

    console.log(numWin);
    return numWin;
  }

  return (
    <div id="section2">
      {/* lol */}
        <div className="lol-frame">
          {/* 소환사 프로필 정보 */}
          <div>
            <div>아트런</div>
            <img src={getLOLImgPath(String(summonerInfo?.profileIconId), 'profileicon')} alt="" />
          </div>
          <p>Lv.{summonerInfo?.summonerLevel}</p>

          <p>{getTotalWins()} 승 {10 - getTotalWins()} 패</p>
          {/* Match Histories */}
          {histories.map((history: any, index: number) => (
            <div className="lol-game-div" key={index}>
              <p>게임시간: {Math.floor(history.gameDuration / 60)} 분</p>
              <img src={getLOLImgPath(history.participant.championName, "champion")} alt="" />
              <img src={getLOLImgPath(history.participant.summonerSpell1, "spell")} alt="" /> 
              <img src={getLOLImgPath(history.participant.summonerSpell2, "spell")} alt="" /> 
              <img src={getLOLImgPath(history.participant.item0, "item")} alt="" />
              <img src={getLOLImgPath(history.participant.item1, "item")} alt="" />
              <img src={getLOLImgPath(history.participant.item2, "item")} alt="" />
              <img src={getLOLImgPath(history.participant.item3, "item")} alt="" />
              <img src={getLOLImgPath(history.participant.item4, "item")} alt="" />
              <img src={getLOLImgPath(history.participant.item5, "item")} alt="" />
              <img src={getLOLImgPath(history.participant.item6, "item")} alt="" />
              {/* TODO: 이거 이기고 진거에 따라 배경색 다르게 해주세요 */}
              {/* <p>{history.win ? 'win' : 'lose'}</p> */}
            </div>
          ))}
        </div>
    </div>
  );
}

export default Section;
