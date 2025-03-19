import css from "./CardLoginRegister.module.css";

const CardLoginRegister = ({ image, image2x, title, text, paragraph }) => {
  return (
    <>
      <div className={css.boxCard}>
        <img
          className={css.boxImg}
          srcSet={`${image} 1x, ${image2x} 2x`}
          src={image}
          alt="Photo of cat"
        />
        <div>
          <div className={css.boxCardTitle}>
            <h3 className={css.cardTitle}>{title}</h3>
            <p className={css.cardText}>
              <span className={css.spanCardText}> Birthday:</span>
              {text}
            </p>
          </div>
          <p className={css.cardParagraph}>{paragraph}</p>
        </div>
      </div>
    </>
  );
};

export default CardLoginRegister;
