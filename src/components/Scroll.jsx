import React, { useState, useEffect } from 'react';
import News from './News';

const axios = require('axios');

const STATUS_OK = 200;
const LEN = 10;

const Scroll = () => {
  const [news, setNews] = useState(null);
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    setNewsData();
  }, []);

  useEffect(() => {
    console.log(feed);
    setInfiniteScroll();
  }, [feed])

  const setInfiniteScroll = () => {
    window.addEventListener("scroll", checkScroll);
  }

  const checkScroll = () => {
    if (!news) return;

    const scrollHeight = document.documentElement.scrollHeight;
    const scrollPos = document.documentElement.scrollTop;
    const screenY = window.innerHeight;
    const boxHeight = 100;

    if ((scrollPos + screenY) > (scrollHeight - boxHeight)) {
      const newFeed = [...feed, ...news.slice(feed.length, feed.length + LEN)];
      setFeed(newFeed);
      window.removeEventListener("scroll", checkScroll);
    }
  }

  const setNewsData = () => {
    axios.get('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
    .then(res => {
      if (res.status === STATUS_OK) {
        const list = res.data;

        setNews(list);
        setFeed(list.slice(0, LEN));
      }
    }).catch(err => {
      console.error(err);
    })
  }

  const generateNewsList = () => {
    if (feed) {
      return feed.map((info, index) => <li key={index} className='News-content'>
          <News id={info}></News>
        </li>);
    } else {
      return <div></div>;
    }
  }

  return <ul className='News-scroll'>
    {feed && generateNewsList()}
  </ul>
}

export default Scroll;