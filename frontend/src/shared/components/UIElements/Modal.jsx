import React from "react";
import ReactDOM from "react-dom"; // This is a package that allows us to render our react app to the DOM.
import { CSSTransition } from "react-transition-group";


import "./Modal.css";
import Backdrop from "./Backdrop";

const ModalOverlay = (props) => {

  // This is the content that will be rendered to the DOM when the Modal component is called in another component.
  const content = (
    <div className={`modal $(props.className)`} style={props.style}>
      <header className={`modal__header ${props.headerClass}`}>
        {" "}
        {/* This is the header of the modal.*/}
        <h2>{props.header}</h2>
      </header>
      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
        }
      >
        <div className={`modal__content ${props.contentClass}`}>
          {props.children} {/* This is the content of the modal.*/}
        </div>
        <footer className={`modal__footer ${props.footerClass}`}>
          {props.footer} {/* This is the footer of the modal.*/}
        </footer>
      </form>
    </div>
  );

  return ReactDOM.createPortal(content, document.getElementById("modal-hook")); // This is the modal-hook div in index.html.
};

const Modal = (props) => {
  return (
    <>
      {props.show && <Backdrop onClick={props.onCancel} />} {/* This is a ternary operator that checks if props.show is true. If it is, then it renders the Backdrop component. */}
      <CSSTransition in={props.show} mountOnEnter unmountOnExit timeout={200} className="modal">
        <ModalOverlay {...props} /> {/* This is a spread operator that takes all the key-value pairs of the props object, and spreads them all as attributes to the ModalOverlay component. */}
      </CSSTransition>
    </>
  )
}

export default Modal