import React, { useMemo } from "react";

import ReactDOM from "react-dom";

const Portal = ({ children }) => {
  const el = useMemo(() => document.getElementById("modal-root"));
  return ReactDOM.createPortal(children, el);
};

export default Portal;