import React from "react";
import "../../App.css";
import 'animate.css';
import "./index.css";

const WithBackground = ({ background, children, light, className, ...props }) => <div {...props} className={`game-container ${className} ${light? "light" : ""}`} style={{ backgroundImage: `url(${background})` }}>
  {children}
</div>

export default WithBackground;