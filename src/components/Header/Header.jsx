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

const Header = () => {
  const dispatch = useDispatch();
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
      <header className={css.header}>
        <Container className={css.containerHeader}>
          <Logo />

          <nav className={css.nav}>
            <Nav />
            {isLoggedIn ? <UserNav /> : <AuthNav />}
          </nav>
          <button className={css.btnMenu} onClick={handleOpenModal}>
            <svg width={36} height={36}>
              <use href={`${sprite}#icon-menu`}></use>
            </svg>
          </button>
        </Container>
      </header>
      {isModalOpen && (
        <div className={css.backdrop} onClick={handleBackDropClick}>
          <div className={css.modal}>
            <button type="button" className={css.btn} onClick={onCloseModal}>
              <svg className={css.svg} width={24} height={24}>
                <use href={`${sprite}#icon-x`}></use>
              </svg>
            </button>
            <nav className={css.navModal}>
              <Nav onClick={onCloseModal} />
              {isLoggedIn ? (
                <UserNav onClick={onCloseModal} />
              ) : (
                <AuthNav onClick={onCloseModal} />
              )}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
