import React from "react";
import styles from "./ColorPicker.css";
import { Colors } from "../../typeBuilders";

export default ({ x, y, onColorPicked, onRequestClose }) => {
  /** 
   * Here I'm going to explain the useRef-Hook
   * useRef is a hook provided by React and is the equivalent of createRef which is used the class component
   * the useRef hook is a function that returns a mutable ref object whose .current property is initialized with an argument (initialvalue).
   * the returned object will persist for the full lifetime of the component. For components lifecycle see https://www.youtube.com/watch?v=Oioo0IdoEls
   * the useRef hook served two primary uses in the project: accessing DOM nodes/elements and storing mutable information. 
   * the marketing pitch for useState is that it allows you to add state to function components. This is true, but we can break it down even further. Fundamentally, the useState Hook gives you two things - a value that will
   * persist across renders and an API to update that value and trigger a re-render. When building UI, both are necessary. Without the ability to persist the value across renders, you'd lose the ability to have dynamic data in your app.
   * Without the ability to update the value and trigger a re-render, the UI would never update. Now, what if you had a use case where you weren't dealing with any UI, so you did't care about re-rendering, but you did need to persist a value across renders?
   * In this scenario, it's like you need the half of useState that lets you persist a value across renders but not the other half that triggers a re-remder.
   * So in short: If you want to add state to your component that persisty across renders and can trigger a re-render when it's updated, go with useState or useReducer. If you want to add state to your component that persisty across renders but doesn't trigger a re-render when it's updated, go with useRef.
   * what is a ref? - It is an attribute that is used either on an HTML element or a component tag. It provides us a way of referencing DOM nodes in React.
   * in React, the ref attribute will allow us to reference that element and provide us access to its methods.
   * It acccepts an initial value as its first argument an it returns an object that has a current property. From there, anything you add to current will be persisted across renders.
  */
  const wrapper = React.useRef();

  /** 
   * Here I am going to explain the useCallback() usage.  
   * 1. Understanding functions equality check - Functions in JS are first-class citizens, meaning that a function is a regular object.
   * The function object can be returned by other functions (like factory() does) An object (including a function object) equals only to itself.
   * 2. The purpose of useCallback() - Different function objects sharing the same code are often created inside React components.  
   */
  const testClickOutside = React.useCallback(
    e => {
      if (!wrapper.current.contains(e.target)) {
        onRequestClose();
        document.removeEventListener("click", testClickOutside);
        document.removeEventListener("contextmenu", testClickOutside);
      }
    },
    [wrapper, onRequestClose]
  );

  const testEscape = React.useCallback(
    e => {
      if (e.keyCode === 27) {
        onRequestClose();
        document.removeEventListener("keydown", testEscape);
      }
    },
    [onRequestClose]
  );

  React.useEffect(() => {
    document.addEventListener("keydown", testEscape);
    document.addEventListener("click", testClickOutside);
    document.addEventListener("contextmenu", testClickOutside);
    return () => {
      document.removeEventListener("click", testClickOutside);
      document.removeEventListener("contextmenu", testClickOutside);
      document.removeEventListener("keydown", testEscape);
    };
  }, [testClickOutside, testEscape]);

  return (
    <div
      ref={wrapper}
      className={styles.wrapper}
      style={{
        left: x,
        top: y
      }}
    >
      {Object.values(Colors).map(color => (
        <ColorButton
          onSelected={() => {
            onColorPicked(color);
            onRequestClose();
          }}
          color={color}
          key={color}
        />
      ))}
    </div>
  );
};

const ColorButton = ({ color, onSelected }) => (
  <div className={styles.colorButtonWrapper}>
    <button
      className={styles.colorButton}
      onClick={onSelected}
      data-color={color}
      aria-label={color}
    />
  </div>
);
