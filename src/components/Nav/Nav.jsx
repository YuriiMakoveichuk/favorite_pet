import { NavLink } from "react-router-dom";
import clsx from "clsx";

import css from "./Nav.module.css";
const Nav = () => {
  return (
    <>
      <ul className={css.listNav}>
        <li>
          <NavLink
            className={({ isActive }) => clsx(css.link, isActive && css.active)}
            to="/news"
          >
            News
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => clsx(css.link, isActive && css.active)}
            to="/notices"
          >
            Find pet
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => clsx(css.link, isActive && css.active)}
            to="/friends"
          >
            Our friends
          </NavLink>
        </li>
      </ul>
    </>
  );
};

export default Nav;
