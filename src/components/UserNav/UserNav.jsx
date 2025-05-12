import css from "./UserNav.module.css";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { apiLogout } from "../../redux/auth/operations.js";
import { useNavigate } from "react-router-dom";

const UserNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(apiLogout());
    navigate("/");
  };
  return (
    <>
      <button
        className={clsx(css.linkUserNav, css.linkLogout)}
        type="button"
        onClick={onLogout}
      >
        Logout
      </button>
    </>
  );
};

export default UserNav;
