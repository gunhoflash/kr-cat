import './style.css';
import { useEffect, useState } from 'react';
import ApiKeyPopup from './popup';

const baseUrl = "https://kr-carrot.herokuapp.com/api";
const LOL_IMG_BASE = 'http://ddragon.leagueoflegends.com/cdn/11.15.1/img';
const getLOLImgPath = (v: string, subpath: string) => `${LOL_IMG_BASE}/${subpath}/${v}.png`;
const SUMMONER_NAME = "아트런";

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
  const [show, setShow] = useState(false);

  useEffect(() => {
    // getAndSetSummonerInfo();
    // getAndSetHistories();
    
    return () => {
      
    }
  }, [])


  const getAndSetSummonerInfo = function() {
    window.fetch(`${baseUrl}/summoners/${SUMMONER_NAME}`)
      .then(response => response.json())
      .then(data => setSummonerInfo(data.response));
  }

  const getAndSetHistories = function() {
    window.fetch(`${baseUrl}/summoners/histories/${SUMMONER_NAME}`)
      .then(response => response.json())
      .then(data => setHistories(data.response.gameInfos));
  }

  const refreshHistories = function() {
    window.fetch(`${baseUrl}/summoners/histories/re/${SUMMONER_NAME}`)
      .then(response => response.json())
      .then(data => setHistories(data.response.gameInfos));
  }

  const getTotalWins = () => {
    const numWin = histories
      .filter(history => history.participant.win)
      .length;

    return numWin;
  }
  
  const openModal = () => {
    setShow(true);
  }

  return (
    <div id="section2">
      {/* lol */}
        <div className="lol-frame">
          {/* 소환사 프로필 정보 */}
          <div className="row-flex">
            <img id="profile" src={getLOLImgPath(String(summonerInfo?.profileIconId), 'profileicon')} alt="" />
            <p className="h3 ml-4">아트런</p>
          </div>
          <div className="row-flex">
            <p>Lv.{summonerInfo?.summonerLevel}</p>
            <button onClick={refreshHistories}>전적 갱신</button>
            <button onClick={openModal}>팝업오픈</button>
          </div>

          <p>{getTotalWins()} 승 {10 - getTotalWins()} 패</p>
          {/* Match Histories */}
          <div id="match-history" className="normal-scroll-element">
            {histories.map((history: any, index: number) => (
              <div className="row-flex lol-game-div" key={index}>
                <img id="champion" src={getLOLImgPath(history.participant.championName, "champion")} alt="" />
                <div className="col-flex">
                  <img id="spell" src={getLOLImgPath(history.participant.summonerSpell1, "spell")} alt="" />
                  <img id="spell" src={getLOLImgPath(history.participant.summonerSpell2, "spell")} alt="" />
                </div>
                {/* items */}
                <div className="col-flex">
                  <div className="row-flex">
                    <img id="item" src={getLOLImgPath(history.participant.item0, "item")} alt="" />
                    <img id="item" src={getLOLImgPath(history.participant.item1, "item")} alt="" />
                    <img id="item" src={getLOLImgPath(history.participant.item2, "item")} alt="" />
                    <img id="item" src={getLOLImgPath(history.participant.item3, "item")} alt="" />
                  </div>
                  <div className="row-flex">
                    <img id="item" src={getLOLImgPath(history.participant.item4, "item")} alt="" />
                    <img id="item" src={getLOLImgPath(history.participant.item5, "item")} alt="" />
                    <img id="item" src={getLOLImgPath(history.participant.item6, "item")} alt="" />
                  </div>
                </div>
                <p>게임시간: {Math.floor(history.gameDuration / 60)} 분</p>
              </div>
            ))}
          </div>
        </div>

        {show && <ApiKeyPopup />}
    </div>
  );
}

export default Section;
