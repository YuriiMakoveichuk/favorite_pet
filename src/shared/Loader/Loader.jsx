import Container from "../Container/Container.jsx";
import css from "./Loader.module.css";

const Loader = () => {
  return (
    <>
      <Container>
        <div className={css.loader}></div>
      </Container>
    </>
  );
};

export default Loader;
