import React from "react";

import "./style.scss";

//this coomponent brings everything on center aligned

const ContentWrapper = ({ children }) => {
    return <div className="contentWrapper">{children}</div>;
};

export default ContentWrapper;