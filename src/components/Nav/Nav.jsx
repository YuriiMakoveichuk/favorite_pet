import { NavLink } from "react-router-dom";
import clsx from "clsx";

import css from "./Nav.module.css";
const Nav = ({ onClick }) => {
  return (
    <>
      <ul className={css.listNav}>
        <li>
          <NavLink
            className={({ isActive }) => clsx(css.link, isActive && css.active)}
            to="/news"
            onClick={onClick}
          >
            News
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => clsx(css.link, isActive && css.active)}
            to="/notices"
            onClick={onClick}
          >
            Find pet
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => clsx(css.link, isActive && css.active)}
            to="/friends"
            onClick={onClick}
          >
            Our friends
          </NavLink>
        </li>
      </ul>
    </>
  );
};

export default Nav;
