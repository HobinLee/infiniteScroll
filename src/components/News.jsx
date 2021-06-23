import React, {useEffect, useState} from 'react';
import DoubleQuoteIcon from '../rsc/double-quotes.svg';
const axios = require('axios');

const News = ({id}) => {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    getContentInfo();
  }, []);

  const getContentInfo = () => {
    axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
      .then(res => {
        setInfo(res.data);
      })
      .catch(err => console.error(err));
  }

  const timeToDate = (time) => {
    return new Date(time).toDateString();
  }

  if (info) {
    return <div>
      <img className="News-doubleQuotes" src={DoubleQuoteIcon} alt="double-quotes"></img>
      <h3 className="News-title">{info.title}</h3>
      <div className="News-date">
        {timeToDate(info.time)}
      </div>
    </div>
  } else {
    return <div className="indicator">Loading ...</div>
  }
}

export default News;