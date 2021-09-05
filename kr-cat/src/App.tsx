import React, { useEffect, useState } from 'react';
import './App.css';
import Timer from './components/Timer';

const baseUrl = "https://kr-carrot.herokuapp.com/api";
const LOL_IMG_BASE = 'http://ddragon.leagueoflegends.com/cdn/11.15.1/img';

const xmlHttpRequest = new XMLHttpRequest();
const getLOLImgPath = (v: string, subpath: string) => `${LOL_IMG_BASE}/${subpath}/${v}.png`;

function App() {
  const [apiKey, setApiKey] = useState('');
  const [LOLInfo, setLOLInfo] = useState<any>(null);
  const [histories, setHistories] = useState([]);
  const [isShowAPIInput, setIsShowAPIInput] = useState(false);

  useEffect(() => {
    xmlHttpRequest.open("GET", baseUrl + "/summoner/아트런/3", true); // 하드코딩 ㅈㅅ
    xmlHttpRequest.send();
    xmlHttpRequest.onload = () => {
      if (xmlHttpRequest.status === 200) {
        const obj = JSON.parse(xmlHttpRequest.response).response;
        console.log(obj);
        setLOLInfo(obj);
        setHistories(obj.inGamePlayerInfos);
      } else {
        // handle LoL Error: display register api key
        setIsShowAPIInput(true);
      }
    }
  }, []);

  // api key 등록
  function onSubmitApiKey() {
    xmlHttpRequest.open('POST', baseUrl + '/api-key', true);
    xmlHttpRequest.setRequestHeader('Content-Type', 'application/json');
    xmlHttpRequest.send(JSON.stringify({apiKey}));
    window.location.reload();
  }

  return (
    <div>
      <Timer />

      {/* lol */}
      {LOLInfo && (
        <div className="lol-frame">
          {/* 소환사 프로필 정보 */}
          <div>
            <div>{LOLInfo.summonerName}</div>
            <img src={getLOLImgPath(LOLInfo.profileIcon, 'profileicon')} alt="" />
          </div>
          <p>Lv.{LOLInfo.summonerLevel}</p>
          <p>{LOLInfo.win + LOLInfo.lose}전 {LOLInfo.win}승 {LOLInfo.lose}패</p>

          {/* Match Histories */}
          {histories.map((history: any, index: number) => (
            <div className="lol-game-div" key={index}>
              <img src={getLOLImgPath(history.champion, 'champion')} alt="" />
              <img src={getLOLImgPath(history.spell1, 'spell')} alt="" />
              <img src={getLOLImgPath(history.spell2, 'spell')} alt="" />
              <img src={getLOLImgPath(history.item0, 'item')} alt="" />
              <img src={getLOLImgPath(history.item1, 'item')} alt="" />
              <img src={getLOLImgPath(history.item2, 'item')} alt="" />
              <img src={getLOLImgPath(history.item3, 'item')} alt="" />
              <img src={getLOLImgPath(history.item4, 'item')} alt="" />
              <img src={getLOLImgPath(history.item5, 'item')} alt="" />
              {/* TODO: 이거 이기고 진거에 따라 배경색 다르게 해주세요 */}
              <p>{history.win ? 'win' : 'lose'}</p>
            </div>
          ))}
        </div>
      )}

      {/* register api key */}
      {isShowAPIInput && (
        <form onSubmit={onSubmitApiKey}>
          <div>enter api key</div>
          <input
            id="api-key"
            type="text"
            value={apiKey}
            onChange={e => setApiKey(e.target.value)}
          />
          <button type="submit">submit</button>
        </form>
      )}
    </div>
  );
}

export default App;
