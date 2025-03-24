import { SVG_ARROW, SVG_DEFAULT, SVG_PERSON } from "../svg";

export type MenuItem = {
  title: string;
  label: string;
  href: string;
  icon: string;
  description: string;
};

export const MENU_HOME: MenuItem = {
  href: "/",
  title: "Igor Lemeshkin",
  label: "Home",
  icon: SVG_DEFAULT,
  description: "Product designer",
};

export const MENU_ABOUT: MenuItem = {
  href: "/about",
  title: "About",
  label: "About",
  icon: SVG_ARROW,
  description: "What drives my work.",
};

export const MENU_WORK: MenuItem = {
  href: "/work",
  title: "Work",
  label: "Work",
  icon: SVG_ARROW,
  description: "Latest case studies.",
};

export const MENU_CV: MenuItem = {
  href: "/cv",
  title: "CV / Resume",
  label: "CV",
  icon: SVG_ARROW,
  description: "My experience and skills.",
};

export const MENU_CONTACT: MenuItem = {
  href: "/contact",
  title: "Contact me",
  label: "Contact",
  icon: SVG_ARROW,
  description: "Open to opportunities.",
};

export const MENU_404: MenuItem = {
  href: "/404",
  title: "Not found",
  label: "404",
  icon: SVG_ARROW,
  description: "",
};
