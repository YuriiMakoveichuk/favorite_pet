import { Link } from "react-router-dom";
import css from "./AuthNav.module.css";
import clsx from "clsx";

const AuthNav = () => {
  return (
    <>
      <ul className={css.listAuthNav}>
        <li>
          <Link className={clsx(css.linkAuthNav, css.linkLogin)} to="/login">
            Log In
          </Link>
        </li>
        <li>
          <Link
            className={clsx(css.linkAuthNav, css.linkRegister)}
            to="/register"
          >
            Registration
          </Link>
        </li>
      </ul>
    </>
  );
};

export default AuthNav;
