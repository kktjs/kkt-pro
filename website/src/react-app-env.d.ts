/// <reference types="react-scripts" />

declare module '*.md' {
  const src: any;
  export default src;
}

declare module '*.module.less' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
declare var VERSION: string;

declare module '*.less' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

  const src: string;
  export default src;
}
