import React from "react";
import { ReactComponent as IconSvg } from '../../images/meRepresentaIcon.svg';
import { ReactComponent as LogoSvg } from '../../images/meRepresentaLogo.svg';
import WithTopicColor from "../withTopicColor";
import 'animate.css';
import "./index.css";


const Logo = ({ topic, color }) => <div>
  {
    topic?
      <div>
      <WithTopicColor
        render={color => <IconSvg fill={color} className="icon"/>}
        topic={topic}
        />
      <LogoSvg fill="black"/>
      </div>
    :
    <div>
      <IconSvg fill={color} className="icon"/>
      <LogoSvg fill={color} />
    </div>
  }
</div>

export default Logo;