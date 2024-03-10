import { useTranslation } from 'react-i18next';
import './style.css';

export default function Menu() {
  const { t } = useTranslation();

  return (
    <div className="menu">
      <button className="home-button">{t('menu.home')}</button>
      <button className="configuration-button">{t('menu.config')}</button>
      <button className="theory-button">{t('menu.theory')}</button>
    </div>
  );
}
