import React, { useEffect, useState } from "react";

import Trip from "./Trip";

// import { withRouter } from "react-router-dom";

const TripList = (props) => {
  const list = props.list.map((item) => {
    return (
      <Trip
        id={item.id}
        title={item.title}
        image_url={item.image_url}
        start_date={item.start_date}
        end_date={item.end_date}
        address={item.address}
        room_id={item.room_id}
        host_id={item.host_id}
        activeTab={props.activeTab}
      />
    );
  });
  return <TripLists>{list}</TripLists>;
};

export default TripList;

const TripLists = styled.div`
  display: flex;
  flex-wrap: wrap;
`;