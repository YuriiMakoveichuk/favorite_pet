import css from "./RegistrationPage.module.css";

import FormRegister from "../../components/FormRegister/FormRegister.jsx";
import Container from "../../shared/Container/Container.jsx";
import Section from "../../shared/Section/Section.jsx";

import registerMobile from "../../assets/images/register/cat_mobile.png";
import registerMobile2x from "../../assets/images/register/cat_mobile@2x.png";
import registerTablet from "../../assets/images/register/cat_tablet.png";
import registerTablet2x from "../../assets/images/register/cat_tablet@2x.png";
import registerDesktop from "../../assets/images/register/cat_desktop.png";
import registerDesktop2x from "../../assets/images/register/cat_desktop@2x.png";

import cat from "../../assets/images/register/cat.png";
import cat2x from "../../assets/images/register/cat@2x.png";
import CardLoginRegister from "../../shared/cardLoginRegister/cardLoginRegister.jsx";

const data = {
  title: "Jack",
  text: "18.10.2021",
  paragraph:
    "Jack is a gray Persian cat with green eyes. He loves to be pampered and groomed, and enjoys playing with toys.",
};

const RegistrationPage = () => {
  const { title, text, paragraph } = data;

  return (
    <>
      <Section>
        <Container>
          <div className={css.box}>
            <div className={css.boxPicture}>
              <picture>
                <source
                  media="(min-width: 1280px)"
                  srcSet={`${registerDesktop} 1x, ${registerDesktop2x} 2x`}
                />
                <source
                  media="(min-width: 768px)"
                  srcSet={`${registerTablet} 1x, ${registerTablet2x} 2x`}
                />
                <source
                  media="(max-width: 767.98px)"
                  srcSet={`${registerMobile} 1x, ${registerMobile2x} 2x`}
                />
                <img
                  className={css.img}
                  src={registerDesktop}
                  alt="Photo dog"
                  loading="lazy"
                />
              </picture>
              <CardLoginRegister
                image={cat}
                image2x={cat2x}
                title={title}
                text={text}
                paragraph={paragraph}
              />
            </div>
            <FormRegister />
          </div>
        </Container>
      </Section>
    </>
  );
};

export default RegistrationPage;
