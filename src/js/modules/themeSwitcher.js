// Adds a mode toggle button, containing an SVG, to the HTML
const toggleButton = (window, document) => {
  const name = 'theme';
  const btnClass = `btn-${name}`;
  const svgClass = `${btnClass}__icon`;
  const clickedClass = 'js-clicked';
  const [light, dark] = ['light', 'dark'];
  const { body } = document;
  const btn = document.createElement('button');

  let mode;

  const setAttr = (obj, attr, value) => obj.setAttribute(attr, value);
  const modeInvert = (theme) => (theme === 'dark' ? light : dark);
  const animEnd = () => btn.classList.remove(clickedClass);

  const changeTheme = () => {
    mode = modeInvert(mode);
    body.style.colorScheme = mode; // Ignored where unsupported
    setAttr(body, 'data-theme', mode);
    setAttr(btn, 'aria-label', `Change to ${modeInvert(mode)} mode`);
    localStorage.setItem('theme', mode);
    btn.classList.add(clickedClass);
    btn.addEventListener('animationend', animEnd, { once: true });
  };

  // Using symbol defs in the HTML
  // const _getSvg = () => `<svg class=${svgClass} aria-hidden=true>
  //   <use class="${name}-${dark}" xlink:href="#icon-${name}-${dark}"></use>
  //   <use class="${name}-${light}" xlink:href="#icon-${name}-${light}"></use>
  // </svg>`;

  // Using an embedded SVG
  const getSvg =
    () => `<svg class="${svgClass}" aria-hidden=true viewbox="0 0 512 512">
    <g class="${name}-${dark}">
      <path d="M32 256C32 132.2 132.3 32 255.8 32c11.4 0 29.7 1.7 40.9 3.7 9.6 1.8 11.8 14.6 3.3 19.4-55 31.3-88.8 89.4-88.8 152.6 0 109.7 99.7 193 208.3 172.3 9.6-1.8 16.3 9.3 10.1 17-41.7 51.6-104.8 83-173.8 83C132.1 480 32 379.6 32 256z"/>
    </g>
    <g class="${name}-${light}">
      <path d="M256 405.3c10.3 0 18.7 8.4 18.7 18.7v37.3c0 10.3-8.4 18.7-18.7 18.7-10.3 0-18.7-8.4-18.7-18.7V424c0-10.3 8.4-18.7 18.7-18.7zM480 256c0 10.3-8.4 18.7-18.7 18.7H424c-10.3 0-18.7-8.4-18.7-18.7 0-10.3 8.4-18.7 18.7-18.7h37.3c10.3 0 18.7 8.4 18.7 18.7zM361.5 388l26.6 26.1c6.2 8.2 17.9 9.9 26.1 3.7 8.2-6.2 9.9-17.9 3.7-26.1-1.1-1.4-2.3-2.7-3.7-3.7L388 361.5c-7.3-7.3-19.3-7.3-26.6 0s-7.3 19.2.1 26.5zM124 414.2l26.6-26.1c7.3-7.3 7.3-19.3 0-26.6s-19.3-7.3-26.6 0L97.8 388c-8.2 6.2-9.9 17.9-3.7 26.1 6.2 8.2 17.9 9.9 26.1 3.7 1.4-1 2.7-2.2 3.8-3.6zM88 237.3c10.3 0 18.7 8.4 18.7 18.7 0 10.3-8.4 18.7-18.7 18.7H50.7c-10.3 0-18.7-8.4-18.7-18.7 0-10.3 8.4-18.7 18.7-18.7H88zM97.8 124l26.1 26.6c7.3 7.3 19.3 7.3 26.6 0s7.3-19.3 0-26.6L124 97.8c-6.2-8.2-17.9-9.9-26.1-3.7-8.2 6.2-9.9 17.9-3.7 26.1 1 1.4 2.2 2.7 3.6 3.8zM388 150.5l26.1-26.6c8.2-6.2 9.9-17.9 3.7-26.1s-17.9-9.9-26.1-3.7c-1.4 1.1-2.7 2.3-3.7 3.7L361.5 124c-7.3 7.3-7.3 19.3 0 26.6s19.2 7.3 26.5-.1zM237.3 50.7V88c0 10.3 8.4 18.7 18.7 18.7 10.3 0 18.7-8.4 18.7-18.7V50.7c0-10.3-8.4-18.7-18.7-18.7-10.3 0-18.7 8.4-18.7 18.7z"/>
      <circle cx="255.8" cy="256.2" r="112.9"/>
    </g>
  </svg>`;

  const getInitialColorMode = () => {
    const persistedColorPreference = window.localStorage.getItem(name);

    if (persistedColorPreference) {
      return persistedColorPreference;
    }

    const prefersDarkScheme = !!(
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    );

    return prefersDarkScheme ? 'dark' : 'light';
  };

  const init = () => {
    mode = getInitialColorMode();

    // color-scheme cannot be set with CSS variable
    // Ignored where unsupported
    body.style.colorScheme = mode;

    setAttr(body, 'data-theme', mode);
    setAttr(btn, 'class', btnClass);
    setAttr(btn, 'role', 'switch');
    setAttr(btn, 'aria-label', `Change to ${modeInvert(mode)} mode`);

    btn.innerHTML = getSvg();
    btn.addEventListener('click', changeTheme);

    document.querySelector('.copyright').appendChild(btn);
  };

  init();
};

export default toggleButton;
