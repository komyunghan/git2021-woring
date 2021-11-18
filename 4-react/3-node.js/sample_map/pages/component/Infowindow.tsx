import React from 'react'

const infowindow_contents = [];
let info_cnt = 0;

function makeInfowindow(place: { name: string; vicinty: string; rating: string; }) {
  infowindow_contents[info_cnt] =
    "<div><div id='info_title'>" +
    place.name +
    "</div><br>" +
    place.vicinty +
    "<br>" +
    place.rating +
    "</div>";
  info_cnt++;
}