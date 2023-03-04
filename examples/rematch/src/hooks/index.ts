import React, { useState, createContext, createElement, useContext } from 'react';

const Context = createContext<{
  count: number;
  setCount?: React.Dispatch<React.SetStateAction<number>>;
}>({ count: 0 });

const Provider = (props: { children: React.ReactNode }) => {
  const [count, setCount] = useState(0);
  return createElement(Context.Provider, { value: { count, setCount }, children: props.children });
};
export const useStore = () => useContext(Context);

export default Provider;
