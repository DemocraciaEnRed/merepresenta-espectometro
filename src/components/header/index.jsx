import Logo from "../logo";
import { ReactComponent as ArrowBack } from '../../images/arrow_back.svg';
import "./index.css";

const Header = ({ follow }) =>
    <div className="header">
        <div onClick={follow} className=" arrow mx-0">
            <ArrowBack fill="#fff" />

        </div>
        <div className="mx-2 header-logo">
            <Logo color="white" />

        </div>
    </div>

export default Header;