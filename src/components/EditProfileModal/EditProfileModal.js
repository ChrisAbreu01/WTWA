import React, { useState, useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function EditProfileModal({ onClose, onUpdateUser }) {
  const user = useContext(CurrentUserContext);
  const [name, setName] = useState(user.name);
  const [avatar, setAvatar] = useState(user.avatar);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser(name, avatar);
  };

  return (
    <ModalWithForm
      title="Change profile data"
      buttonText="Save changes"
      handleSubmitForm={handleSubmit}
      onClose={onClose}
    >
      <label className="edit-profile-modal__input-label">
        Name
        <input
          className="edit-profile-modal__input"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label className="edit-profile-modal__input-label">
        URL
        <input
          className="edit-profile-modal__input"
          type="url"
          placeholder="URL"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
