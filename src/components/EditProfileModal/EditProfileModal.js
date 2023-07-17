import React, { useState, useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./EditProfileModal.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function EditProfileModal({ onClose, onUpdateUser }) {
  const user = useContext(CurrentUserContext);
  const [name, setName] = useState(user.name);
  const [avatar, setAvatar] = useState(user.avatar);
  const [validForm, setValidForm] = useState(true);
  const isNameValid = (name) => {
    return name.length >= 4;
  };

  const isUrlValid = (avatar) => {
    return avatar.length >= 4;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isNameValid(name) && isUrlValid(avatar)) {
      setValidForm(true);
      onUpdateUser(name, avatar);
    }
    setValidForm(false);
  };
  const modalInputValidClassName = validForm
    ? "edit_profile-modal-input"
    : "edit_profile-modal-input-invalid edit_profile-modal-input";

  return (
    <ModalWithForm
      title="Change profile data"
      buttonText="Save changes"
      onSubmit={handleSubmit}
      onClose={onClose}
      isValid={validForm}
    >
      <div className="edit_profile-modal-content">
        <div className="edit_profile-modal-namespace">
          <label className="edit_profile-modal-label">Name</label>
          <input
            className={modalInputValidClassName}
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="edit_profile-modal-namespace">
          <label className="edit_profile-modal-label">URL</label>
          <input
            className={modalInputValidClassName}
            type="url"
            placeholder="URL"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            required
          />
        </div>
      </div>
    </ModalWithForm>
  );
}

export default EditProfileModal;
