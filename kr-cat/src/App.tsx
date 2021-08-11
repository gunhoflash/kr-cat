import React, { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import './App.css';

const birthday = dayjs('1996-10-24');
const dayCounts = [
  12500,
  12345,
  12000,
  11500,
  11111,
  11000,
  10500,
  10001,
  10000,
  9999,
  9876,
  9500,
];

const baseUrl = "https://kr-carrot.herokuapp.com/api";
const LOL_IMG_BASE = 'http://ddragon.leagueoflegends.com/cdn/11.15.1/img';

const xmlHttpRequest = new XMLHttpRequest();
const getLOLImgPath = (v: string, subpath: string) => `${LOL_IMG_BASE}/${subpath}/${v}.png`;

function App() {
  const [now, setNow] = useState(0);

  const [apiKey, setApiKey] = useState('');
  const [LOLInfo, setLOLInfo] = useState<any>(null);
  const [histories, setHistories] = useState([]);
  const [isShowAPIInput, setIsShowAPIInput] = useState(false);

  const requestAnimationFrameRef = useRef<number>();

  const dayCount = dayCounts.reduce((prevDayCount, dayCount) => {
    const anniversary = birthday.add(dayCount - 1, 'day');
    const millisecond = anniversary.diff(now);
    if (millisecond > 0) return dayCount;
    if (millisecond > - 18 * 60 * 60 * 1000) return dayCount;
    return prevDayCount;
  }, dayCounts[0]);

  const anniversary = birthday.add(dayCount - 1, 'day');
  const millisecond = anniversary.diff(now);

  const day    = millisecond > 0 ? Math.floor(millisecond / 1000 / 60 / 60 / 24) : 0;
  const hour   = millisecond > 0 ? Math.floor(millisecond / 1000 / 60 / 60) % 24 : 0;
  const minute = millisecond > 0 ? Math.floor(millisecond / 1000 / 60) % 60 : 0;
  const second = millisecond > 0 ? Math.floor(millisecond / 1000) % 60 : 0;

  function showRemainedDate() {
    setNow(dayjs().valueOf());
    requestAnimationFrameRef.current = requestAnimationFrame(showRemainedDate);
  }

  useEffect(() => {
    requestAnimationFrameRef.current = requestAnimationFrame(showRemainedDate);

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

    return () => cancelAnimationFrame(requestAnimationFrameRef.current as number);
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
      <div>
        <div className="subtitle">
          {millisecond > 0
            ? `${dayCount}까지`
            : `${dayCount}: ${anniversary.format('YYYY-MM-DD')}`
          }
        </div>
        <div>
          {millisecond > 0 ? (
            <>
              {!!(day                            ) && <p className="title">{day}일</p>}
              {!!(day || hour                    ) && <p className="title">{('0' + hour).slice(-2)}시간</p>}
              {!!(day || hour || minute          ) && <p className="title">{('0' + minute).slice(-2)}분</p>}
              {!!(day || hour || minute || second) && <p className="title">{('0' + second).slice(-2)}초</p>}
              <p className="title">{('00' + millisecond).slice(-3)}</p>
            </>
          ) : 'Congratulations!'}
        </div>
      </div>

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
