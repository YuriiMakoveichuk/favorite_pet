import css from "./Header.module.css";

import Logo from "../Logo/Logo.jsx";
import Nav from "../Nav/Nav.jsx";
import AuthNav from "../AuthNav/AuthNav.jsx";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthIsLoggedIn } from "../../redux/auth/selectors.js";
import Container from "../../shared/Container/Container.jsx";

import sprite from "../../assets/sprite.svg";
import { closeModal, openModal, selectIsOpenModal } from "../../redux/modal.js";
import { useCallback, useEffect } from "react";
import UserNav from "../UserNav/UserNav.jsx";
import { useLocation } from "react-router-dom";
import clsx from "clsx";

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const isLoggedIn = useSelector(selectAuthIsLoggedIn);
  const isModalOpen = useSelector(selectIsOpenModal);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onCloseModal = useCallback(() => {
    dispatch(closeModal());
  });

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Escape") {
        onCloseModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onCloseModal]);

  const handleBackDropClick = (event) => {
    if (event.target === event.currentTarget) {
      onCloseModal();
    }
  };

  const handleOpenModal = () => {
    dispatch(openModal());
  };

  return (
    <>
      <header
        className={location.pathname === "/home" ? css.headerHome : css.header}
      >
        <Container
          className={clsx(
            css.containerHeader,
            location.pathname === "/home" && css.containerHeaderHome
          )}
        >
          <Logo />

          <nav className={css.nav}>
            <Nav />
            {isLoggedIn ? <UserNav /> : <AuthNav />}
          </nav>
          <div className={css.tabletNav}>
            {!isModalOpen && location.pathname !== "/home" && (
              <div className={css.loginRegister}>
                {isLoggedIn ? <UserNav /> : <AuthNav onClick={onCloseModal} />}
              </div>
            )}
            <button className={css.btnMenu} onClick={handleOpenModal}>
              <svg width={36} height={36}>
                <use href={`${sprite}#icon-menu`}></use>
              </svg>
            </button>
          </div>
          <button
            className={clsx(css.btnMenu, css.btnMenuTablet)}
            onClick={handleOpenModal}
          >
            <svg width={36} height={36}>
              <use href={`${sprite}#icon-menu`}></use>
            </svg>
          </button>
        </Container>
      </header>
      {isModalOpen && (
        <div className={css.backdrop} onClick={handleBackDropClick}>
          <div className={css.modal}>
            <button
              type="button"
              className={css.btnModalClosed}
              onClick={onCloseModal}
            >
              <svg className={css.svgModalClosed} width={32} height={32}>
                <use href={`${sprite}#icon-x`}></use>
              </svg>
            </button>
            <nav className={css.navModalMenu}>
              <div>
                <Nav onClick={onCloseModal} />
              </div>
              <div>
                {isLoggedIn ? <UserNav /> : <AuthNav onClick={onCloseModal} />}
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
