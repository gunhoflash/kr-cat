/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';

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

const TitleText = ({text}: {text: string}) => useMemo(() => (
  <p className="title m-0 leading-none">{text}</p>
), [text]);

const SubTitle = ({isTheDay, dayCount, anniversary}: {isTheDay: boolean; dayCount: number; anniversary: Dayjs}) => useMemo(() => (
  <div className="subtitle pl-0.5">
    {isTheDay
      ? `${dayCount}: ${anniversary.format('YYYY-MM-DD')}`
      : `${dayCount}까지`}
  </div>
), [isTheDay, dayCount]);

const Timer = () => {
  const [now, setNow] = useState(0);

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
  const isTheDay = millisecond <= 0;

  const day    = isTheDay ? 0 : Math.floor(millisecond / 1000 / 60 / 60 / 24);
  const hour   = isTheDay ? 0 : Math.floor(millisecond / 1000 / 60 / 60) % 24;
  const minute = isTheDay ? 0 : Math.floor(millisecond / 1000 / 60) % 60;
  const second = isTheDay ? 0 : Math.floor(millisecond / 1000) % 60;

  function showRemainedDate() {
    setNow(dayjs().valueOf());
    requestAnimationFrameRef.current = requestAnimationFrame(showRemainedDate);
  }

  useEffect(() => {
    requestAnimationFrameRef.current = requestAnimationFrame(showRemainedDate);
    return () => cancelAnimationFrame(requestAnimationFrameRef.current as number);
  }, []);

  return (
    <>
      <SubTitle isTheDay={isTheDay} dayCount={dayCount} anniversary={anniversary} />
      <div>
        {isTheDay ? 'Congratulations!' : (
          <>
            {!!(day                            ) && <TitleText text={`${day}일`} />}
            {!!(day || hour                    ) && <TitleText text={`${('0' + hour).slice(-2)}시간`} />}
            {!!(day || hour || minute          ) && <TitleText text={`${('0' + minute).slice(-2)}분`} />}
            {!!(day || hour || minute || second) && <TitleText text={`${('0' + second).slice(-2)}초`} />}
            <TitleText text={('00' + millisecond).slice(-3)} />
          </>
        )}
      </div>
    </>
  );
}

export default Timer;
