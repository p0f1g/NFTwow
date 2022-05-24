import mobileMenu from './modules/mobileMenu.js';
import toggleButton from './modules/themeSwitcher.js';

document.addEventListener('DOMContentLoaded', () => {
  mobileMenu();
  toggleButton(window, document);
});
