import "./AboutComponent.scss";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

function AboutComponent() {
  return (
    <div className="about">
      <div className="about__wrapper">
        <h2 className="about__title">About us</h2>
        <div className="about__descriptions">
          <p className="about__descriptions-paragraph">
            ShopItAll is an online clothing store. <br />I started building this
            project for my capstone in BrainStation. Things that you will see in
            this project:
          </p>
          <ul className="about__descriptions-list">
            <li>- A homepage.</li>
            <li>- A products page.</li>
            <li>- A cart.</li>
          </ul>
          <p className="about__descriptions-paragraph">
            This project is just beginning, I am planning to add more things in
            the future, like the dashboard, and stripe checkout, among other
            things.
          </p>
        </div>
        <ul className="about__contact-me">
          <h2 className="about__title">Contact us</h2>
          <li className="about__contact-me-link">
            <a
              href="https://www.linkedin.com/in/natanaeljavier"
              className="about__contact-me-anchor"
            >
              <LinkedInIcon className="about__contact-me-icon" />
              <p className="about__contact-me-address">
                www.linkedin.com/in/natanaeljavier
              </p>
            </a>
          </li>
          <li className="about__contact-me-link">
            <a
              href="https://github.com/natanaeldev"
              className="about__contact-me-anchor"
            >
              <GitHubIcon className="about__contact-me-icon" />
              <p className="about__contact-me-address">
                https://github.com/natanaeldev
              </p>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AboutComponent;
