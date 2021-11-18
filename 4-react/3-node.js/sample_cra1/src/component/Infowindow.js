import React, { useState, useEffect } from "react";
// eslint-disable-next-line
import { Link, useNavigate } from "react-router-dom";
import '../style/Infowindow.css';

const Infowindow = ({ place, category, getData }) => {
  const {
    place_id,
    name,
    formatted_address,
    formatted_phone_number,
    opening_hours,
    rating
  } = place;


  const [isClick, setIsClick] = useState(false);
  const Navigate = useNavigate();

  const periods = opening_hours ? opening_hours.periods : null;
  const weekday_text = opening_hours ? opening_hours.weekday_text : null;


  useEffect(() => {
    if (getData && isClick) {
      Navigate.push({
        pathname: `${url}/place/${place_id}`,
        state: {
          name,
          formatted_address,
          formatted_phone_number,
          periods,
          weekday_text,
          rating
        }
      })
    }
    // eslint-disable-next-line
  }, [getData, isClick]);


  const onClickShowDetailInfo = () => {
    setIsClick(true);
  }

  const url = category ? "/" + category : ""
  return (
    <div className='infowindow_wrap'>
      <div className='infowindow'>
        <div id='infoTitle' className='info_title'>
          <div className='place_name'>{name}</div>
          <div className='more_detail' onClick={onClickShowDetailInfo}>&#62;</div>
        </div>
        <div className='info_etc'>
          <p>{place.vicinity || formatted_address}</p>
          <p>⭐{rating || "별점없음"}</p>
        </div>
      </div>
      <div className='infowindow_anchor'></div>
    </div>
  )

}

export default Infowindow;