import React from "react";
import { useTranslation } from "react-i18next";

import { PostsFeed } from "../features/post-feed/PostFeed";
import { availableLanguages } from "..";

import "./App.css";
import img from "./resources/LogoMakr-37nEYx.png";

function App() {
  const { t, i18n } = useTranslation();

  return (
    <div className="App">
      <header className="header">
        <h1>{t("h1")}</h1>
        <h2>{t("h2")}</h2>
        <h3>{t("h3")}</h3>
        <h4>{t("h4")}</h4>
        <p>{t("p")}</p>
      </header>
      <section className="sidebar">
        {
          // Disabled links? https://tenor.com/view/emoji-emoge-dust-emoji-turns-into-dust-emoji-turning-into-dust-gif-24630075
        }
        <img className="logo" src={img} alt="logo" />
        <a className="active" href="#home">
          {t("home")}
        </a>
        <a href="#news" className="disabled-link">
          {t("news")}
        </a>
        <a href="#contact" className="disabled-link">
          {t("contact")}
        </a>
        <a href="#about" className="disabled-link">
          {t("about")}
        </a>
        <p className="language-selector">
          {t("language")}
          &nbsp;&nbsp;
          <select
            defaultValue={i18n.language}
            onChange={(e) => i18n.changeLanguage(e.target.value)}
          >
            {availableLanguages.map((language) => (
              <option key={language}>{language}</option>
            ))}
          </select>
        </p>
      </section>
      <section className="post-feed">
        <PostsFeed />
      </section>
    </div>
  );
}

export default App;
