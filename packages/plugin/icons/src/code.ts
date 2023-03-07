/**
 * 生成组件
 */
export const createIndex = () => {
  const jsContent = `
import React from 'react';
import './index.css';

export interface KKtproIconsProps {
  type?: string;
  className?: string;
  style?: React.CSSProperties;
}

const isExternal = (path: string) => /^(https?:|mailto:|tel:)/.test(path);

const Icons = (props: KKtproIconsProps) => {
  const { type, style, className } = props;
  if (!type) return <React.Fragment />
  if (isExternal(type)) {
    const clsExternal = ['kktp-External', className].filter(Boolean).join(' ').trim();
    const externalStyle: React.CSSProperties = {
      mask: 'url(' + type + ') no-repeat 50% 50%',
      WebkitMask: 'url(' + type + ') no-repeat 50% 50%'
    }
    return <div style={{ ...style, ...externalStyle }} className={clsExternal} />
  }

  const cls = ['kktp-icon', className].filter(Boolean).join(' ').trim();
  return (
    <svg aria-hidden="true" className={cls} style={style}>
      <use xlinkHref={'#' + type} />
    </svg>
  )
}

export default Icons;
`;
  return jsContent;
};

/**
 * 生成 css 文件
 */
export const createCss = () => {
  const cssContent = `
.kktp-icon {
  width: 1em;
  height: 1em;
  vertical-align: middle;
  fill: currentColor;
  overflow: hidden;
}

.kktp-External {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
  width: 1em;
  height: 1em;
  vertical-align: middle;
}
`;
  return cssContent;
};

/**
 * 生成 icons ts 文件
 */
export const createIndexTs = () => {
  const jsContent = `
import React from 'react';
import Icons from './';

export interface KKtproIconsProps {
  type?: string;
  className?: string;
  style?: React.CSSProperties;
}
export default Icons;

export declare function Icons(props?: KKtproIconsProps): JSX.Element;
`;
  return jsContent;
};
