import React, {ReactNode } from 'react';

interface Props {
  children:  ReactNode | ReactNode[];
  className?:string
}

const CardComponent = ({ children,className }: Props) => {
    const classes = `${className}`
  return <div className={classes}>{children}</div>;
};

export default CardComponent;
