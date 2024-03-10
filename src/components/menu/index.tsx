import { useTranslation } from "react-i18next";
import "./style.css";

export default function Menu() {
  const { t } = useTranslation();

  return (
    <nav>
      <ul className="menu">
        <li className="home-button button">
          <a href="#calendar">{t("menu.home")}</a>
        </li>
        <li className="configuration-button button">
          <a href="#configuration">{t("menu.config")}</a>
        </li>
        <li className="theory-button button">
          <a href="#theory">{t("menu.theory")}</a>
        </li>
      </ul>
    </nav>
  );
}
