import css from "./LoginPage.module.css";

import FormLogin from "../../components/FormLogin/FormLogin.jsx";
import Container from "../../shared/Container/Container.jsx";

import loginMobile from "../../assets/images/login/dog_mobile.png";
import loginMobile2x from "../../assets/images/login/dog_mobile@2x.png";
import loginTablet from "../../assets/images/login/dog_tablet.png";
import loginTablet2x from "../../assets/images/login/dog_tablet@2x.png";
import loginDesktop from "../../assets/images/login/dog_desktop.png";
import loginDesktop2x from "../../assets/images/login/dog_desktop@2x.png";
import Section from "../../shared/Section/Section.jsx";
// import CardLoginRegister from "../../shared/cardLoginRegister/cardLoginRegister.jsx";

import dog from "../../assets/images/login/dog.png";
import dog2x from "../../assets/images/login/dog@2x.png";
import CardLoginRegister from "../../shared/cardLoginRegister/cardLoginRegister.jsx";

const data = {
  title: "Rich",
  text: "21.09.2020",
  paragraph:
    "Rich would be the perfect addition to an active family that loves to play and go on walks. I bet he would love having a doggy playmate too!",
};

const LoginPage = () => {
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
                  srcSet={`${loginDesktop} 1x, ${loginDesktop2x} 2x`}
                />
                <source
                  media="(min-width: 768px)"
                  srcSet={`${loginTablet} 1x, ${loginTablet2x} 2x`}
                />
                <source
                  media="(max-width: 767.98px)"
                  srcSet={`${loginMobile} 1x, ${loginMobile2x} 2x`}
                />
                <img
                  className={css.img}
                  src={loginDesktop}
                  alt="Photo dog"
                  loading="lazy"
                />
              </picture>
              <CardLoginRegister
                image={dog}
                image2x={dog2x}
                title={title}
                text={text}
                paragraph={paragraph}
              />
            </div>
            <FormLogin />
          </div>
        </Container>
      </Section>
    </>
  );
};

export default LoginPage;
