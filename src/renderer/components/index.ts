/**
 * Visher UI 组件库统一导出
 */

// 基础组件
export { default as Alert } from './Alert';
export type { AlertProps } from './Alert';

// 现有组件
export { default as Diff2Html } from './Diff2Html';
export { default as FlexFullContainer } from './FlexFullContainer';
export { default as IconParkHOC } from './IconParkHOC';
export { default as LanguageSwitcher } from './LanguageSwitcher';
export { default as LocalImageView } from './LocalImageView';
export { default as Markdown } from './Markdown';
export { default as ThemeSwitcher } from './ThemeSwitcher';
export { default as SendBox } from './sendbox';

// 组件分组导出
export const UI = {
  Alert,
  Diff2Html,
  FlexFullContainer,
  IconParkHOC,
  LanguageSwitcher,
  LocalImageView,
  Markdown,
  ThemeSwitcher,
  SendBox,
};

export default UI;
