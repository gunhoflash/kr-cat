import { useEffect, useState } from 'react';
import './style.css';

const URL_BASE = 'http://35.211.55.170:9510';

function Section() {
  const [winStatus, setWinStatus] = useState<string>('(불러오는 중)');

  const requestWinStatus = async () => {
    const response = await fetch(
      `${URL_BASE}/user/data`,
      {method: 'GET'}
    );
    const data = (await response.text()) as string;
    setWinStatus(data);
  };

  useEffect(() => {
    requestWinStatus();
  }, []);

  return (
    <div id="section3">
      <h1>오버워치</h1>
      {winStatus}
    </div>
  );
}

export default Section;
