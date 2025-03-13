import css from "./Header.module.css";

import Logo from "../Logo/Logo.jsx";
import Nav from "../Nav/Nav.jsx";
import AuthNav from "../AuthNav/AuthNav.jsx";
import { useSelector } from "react-redux";
import { selectAuthIsLoggedIn } from "../../redux/auth/selectors.js";

const Header = () => {
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);
  return (
    <header className={css.header}>
      <Logo />
      <nav className={css.nav}>
        <Nav />
        {isLoggedIn ? <h2>UserNav</h2> : <AuthNav />}
      </nav>
    </header>
  );
};

export default Header;
