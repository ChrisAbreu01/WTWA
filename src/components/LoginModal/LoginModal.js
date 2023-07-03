import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "LoginModal.css";

function LoginModal({ isOpen, onClose, onLogin, toRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validForm, setValidForm] = useState(false);

  useEffect(() => {
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/gim.test(email);

    setValidForm((email, password) => {
      return (
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/gim.test(email) &&
        password.length >= 4
      );
    });
  }, [email, password]);

  function handleSubmit(e) {
    e.preventDefault();
    onLogin({ email, password });
  }

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Log In"
      buttonText="Log In"
      isValid={validForm}
    >
      <label className="login__label">Email</label>
      <input
        className="login__input"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        minLength={1}
        maxLength={30}
      />
      <label className="login__label">Password</label>
      <input
        className="login__input"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        minLength={8}
        maxLength={40}
      />
      <p className="login_or__register" onClick={toRegister}>
        or Register
      </p>
    </ModalWithForm>
  );
}

export default LoginModal;
