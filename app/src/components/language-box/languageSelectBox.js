import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './languageSelectBox.scss';

export default function LanguageSelectBox() {
  const [isOpened, setIsOpened] = React.useState(false);
  const [currentLanguage, setCurrentLanguage] = React.useState('English');

  const toggleContainer = React.createRef();

  const [t, i18n] = useTranslation('common');

  useEffect(() => {
    window.addEventListener('click', onClickOutsideHandler);
  });

  const handleClick = (language) => {
    setCurrentLanguage(language);
    setIsOpened(!isOpened);
    if (language === 'English') {
      i18n.changeLanguage('en');
    } else {
      i18n.changeLanguage('de');
    }
  };

  const onClickOutsideHandler = (event) => {
    if (isOpened && toggleContainer.current && !toggleContainer.current.contains(event.target)) {
      setIsOpened(false);
    }
  };

  return (
    <div className="language-selectbox" ref={toggleContainer}>
      <img
        className="flag"
        src={`/assets/flags/${currentLanguage === 'English' ? 'gb' : 'de'}.png`}
        alt="flag"
        onClick={() => setIsOpened(!isOpened)}
      />
      {isOpened && (
        <ul className="language-menu">
          <li className="language-item" onClick={() => handleClick('English')}>
            <img className="flag" src="/assets/flags/gb.png" alt="gb-flag" />
            <span>English</span>
          </li>
          <li className="language-item" onClick={() => handleClick('Germany')}>
            <img className="flag" src="/assets/flags/de.png" alt="de-flag" />
            <span>Germany</span>
          </li>
        </ul>
      )}
    </div>
  );
}
