import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";

function RegisterModal({ isOpen, onClose, onRegister, toLogin }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validForm, setValidForm] = useState(false);

  useEffect(() => {
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/gim.test(email);

    setValidForm((email, password, name) => {
      return (
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/gim.test(email) &&
        password.length >= 4 &&
        name.length > 0
      );
    });
  }, [email, password, name]);

  function handleSubmit(e) {
    e.preventDefault();
    onRegister({ name, avatar, email, password });
  }

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Sign Up"
      buttonText="Next"
      isValid={validForm}
    >
      <div className="register__modal_namespace">
        <label className="register__modal-label">Email</label>
        <input
          className="register__modal-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
      </div>
      <div className="register__modal_namespace">
        <label className="register__modal-label">Password</label>
        <input
          className="register__modal-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
      </div>
      <div className="register__modal_namespace">
        <label className="register__modal-label">Name</label>
        <input
          className="register__modal-input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
      </div>
      <div className="register__modal_namespace">
        <label className="register__modal-label">Avatar URL</label>
        <input
          className="register__modal-input"
          type="url"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          placeholder="Avatar URL"
        />
      </div>
      <p className="register_modal-log-in" onClick={toLogin}>
        or Log in
      </p>
    </ModalWithForm>
  );
}

export default RegisterModal;
