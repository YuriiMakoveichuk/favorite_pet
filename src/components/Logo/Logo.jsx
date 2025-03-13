import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.svg";

import css from "./Logo.module.css";

const Logo = () => {
  return (
    <Link to="/home">
      <img className={css.img} width={76} height={20} src={logo} alt="logo" />
    </Link>
  );
};

export default Logo;
