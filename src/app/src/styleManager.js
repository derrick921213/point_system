// 定義 StyleManager
const StyleManager = {
  originalStyles: new Map(),
  styleLinks: [],

  setStyle(element, styles) {
    let elementStyles = this.originalStyles.get(element) || {};

    for (const [key, value] of Object.entries(styles)) {
      if (!elementStyles.hasOwnProperty(key)) {
        elementStyles[key] = element.style[key] || "";
      }
      element.style[key] = value;
    }

    this.originalStyles.set(element, elementStyles);
  },

  resetStyle(element) {
    let elementStyles = this.originalStyles.get(element);
    if (elementStyles) {
      Object.assign(element.style, elementStyles);
      this.originalStyles.delete(element);
    }
  },

  loadAndStoreStyleSheet(href, options = {}) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    Object.entries(options).forEach(([key, value]) => {
      link.setAttribute(key, value);
    });
    document.head.appendChild(link);
    this.styleLinks.push(link);
  },

  resetAll() {
    this.originalStyles.forEach((styles, element) => {
      Object.assign(element.style, styles);
    });
    this.originalStyles.clear();
    this.styleLinks.forEach((link) => {
      document.head.removeChild(link);
    });
    this.styleLinks = [];
  },
};
export default StyleManager;
