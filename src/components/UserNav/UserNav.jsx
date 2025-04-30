import css from "./UserNav.module.css";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { apiLogout } from "../../redux/auth/operations.js";

const UserNav = ({ onClick }) => {
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(apiLogout());
    onClick;
  };
  return (
    <>
      <button
        className={clsx(css.linkUserNav, css.linkLogout)}
        onClick={onLogout}
      >
        Log In
      </button>
    </>
  );
};

export default UserNav;
