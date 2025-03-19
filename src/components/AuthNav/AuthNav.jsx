import { Link } from "react-router-dom";
import css from "./AuthNav.module.css";
import clsx from "clsx";

const AuthNav = ({ onClick }) => {
  return (
    <>
      <ul className={css.listAuthNav}>
        <li>
          <Link
            className={clsx(css.linkAuthNav, css.linkLogin)}
            to="/login"
            onClick={onClick}
          >
            Log In
          </Link>
        </li>
        <li>
          <Link
            className={clsx(css.linkAuthNav, css.linkRegister)}
            to="/register"
            onClick={onClick}
          >
            Registration
          </Link>
        </li>
      </ul>
    </>
  );
};

export default AuthNav;
