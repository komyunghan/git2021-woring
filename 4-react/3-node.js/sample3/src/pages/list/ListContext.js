import React, { useState, createContext } from "react";

export const ListContext = createContext();

export const ListProvider = (props) => {
  const [selected, setSelected] = useState([]);

  return (
    <ListContext.Provider value={[selected, setSelected]}>
      {props.children}
    </ListContext.Provider>
  );
};