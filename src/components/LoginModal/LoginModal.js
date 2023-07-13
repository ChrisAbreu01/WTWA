import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

function LoginModal({ isOpen, onClose, onLogin, toRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validForm, setValidForm] = useState(true);

  // useEffect(() => {
  //   /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/gim.test(email);

  //   setValidForm((email, password) => {
  //     return (
  //       /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/gim.test(email) &&
  //       password.length >= 4
  //     );
  //   });
  // }, [email, password]);

  const isEmailValid = (email) => {
    return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/gim.test(email);
  };

  const isPasswordValid = (password) => {
    return password.length >= 4;
  };

  function handleSubmit(e) {
    if (isEmailValid(email) && isPasswordValid(password)) {
      setValidForm(true);
      e.preventDefault();
      onLogin({ email, password });
      onClose();
    }
    setValidForm(false);
  }
  function onEmailChange(e) {
    setEmail(e.target.value);
  }
  const modalInputValidClassName = validForm
    ? "login__input"
    : "login__input-invalid login__input";
  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Log In"
      buttonText="Log In"
      isValid={validForm}
    >
      <div className="login__modal-namespace">
        <label className="login__label">Email</label>
        <input
          className={modalInputValidClassName}
          type="text"
          value={email}
          onChange={onEmailChange}
          placeholder="Email"
          required
          minLength={1}
          maxLength={30}
        />
      </div>
      <div className="login__modal-namespace">
        <label className="login__label">Password</label>
        <input
          className={modalInputValidClassName}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          minLength={2}
          maxLength={40}
        />
      </div>
      <p className="login__register" onClick={toRegister}>
        or Register
      </p>
    </ModalWithForm>
  );
}

export default LoginModal;
