export type ThemeTokenName =
  | "surface-container"
  | "background"
  | "surface"
  | "on-surface"
  | "outline"
  | "primary"
  | "on-primary"
  | "shadow";

export type ThemeTokens = Record<ThemeTokenName, string>;

export type Theme = {
  light: ThemeTokens;
  dark: ThemeTokens;
};

const THEME_TOKEN_NAMES: ThemeTokenName[] = [
  "surface-container",
  "background",
  "surface",
  "on-surface",
  "outline",
  "primary",
  "on-primary",
  "shadow",
];

export const getThemeCssVarEntries = (
  theme: Theme,
): Array<[string, string]> => {
  const entries: Array<[string, string]> = [];

  for (const token of THEME_TOKEN_NAMES) {
    entries.push([`--theme-light-${token}`, theme.light[token]]);
    entries.push([`--theme-dark-${token}`, theme.dark[token]]);
  }

  return entries;
};

export const applyThemeToRoot = (root: HTMLElement, theme: Theme) => {
  for (const [variable, value] of getThemeCssVarEntries(theme)) {
    root.style.setProperty(variable, value);
  }
};

export const getRootThemeStyle = (theme: Theme): string => {
  const declarations: string[] = [];

  for (const [variable, value] of getThemeCssVarEntries(theme)) {
    declarations.push(`${variable}: ${value}`);
  }

  return declarations.join("; ");
};
