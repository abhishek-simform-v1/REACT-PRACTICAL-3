// Importing the necessary modules from React
import React, { ReactNode } from 'react';

// Defining the props interface for the "CardComponent" component
interface Props {
  children: ReactNode | ReactNode[]; // Children can be a single node or an array of nodes
  className?: string; // className is an optional string type prop
}

// Defining the "CardComponent" component
const CardComponent = ({ children, className }: Props) => {
  // Declaring the "classes" constant and setting it to the value of "className"
  const classes = `${className}`;
  // Rendering a div element with the "children" as its content and the "className" as its class
  return <div className={classes}>{children}</div>;
};

// Exporting the "CardComponent" component
export default CardComponent;
