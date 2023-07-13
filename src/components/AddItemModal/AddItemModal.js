import { useEffect, useState } from "react";
import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";
// onAddItem refers to handleAddItemSubmit, which is declared in App.js
const AddItemModal = ({ onAddItem, handleCloseModal }) => {
  // declare state for each input field
  const [nameInput, setNameInputValue] = useState("");
  const [imageInput, setImageInputValue] = useState("");
  const [weatherInput, setWeatherInputValue] = useState("");
  const [validForm, setValidForm] = useState(true);
  const user = useContext(CurrentUserContext);
  // use a useEffect hook to reset the input field state to empty strings when
  // the modal is opened

  useEffect(() => {
    function handleFormReset() {
      setNameInputValue("");
      setImageInputValue("");
      setWeatherInputValue("");
    }
    handleFormReset();
  }, []);

  // create onChange handlers corresponding to each state variable
  const handleNameChange = (event) => {
    setNameInputValue(event.target.value);
  };
  const handleImageChange = (event) => {
    setImageInputValue(event.target.value);
  };
  const handleWeatherChange = (event) => {
    setWeatherInputValue(event.target.value);
  };
  const isNameValid = (nameInput) => {
    return nameInput.length >= 4;
  };

  const isUrlValid = (imageInput) => {
    return imageInput.length >= 4;
  };

  function handleSubmit(e) {
    // call onAddItem with appropriate arguments
    if (isNameValid(nameInput) && isUrlValid(imageInput)) {
      setValidForm(true);
      e.preventDefault();
      onAddItem({
        name: nameInput,
        weather: weatherInput,
        link: imageInput,
        likes: [],
        owner: user._id,
      });
    }
    setValidForm(false);
  }
  const modalInputValidClassName = validForm
    ? "modal_input-field"
    : "modal_input-field-invalid modal_input-field";
  /* don't forget to pass appropriate props to ModalWithForm */
  return (
    <ModalWithForm
      title="New Garment"
      onClose={handleCloseModal}
      buttonText="Add garment"
      onSubmit={handleSubmit}
      isValid={validForm}
    >
      <div className="modal_inputs">
        <div className="modal_input">
          <label>
            <div>Name</div>
            <input
              className={modalInputValidClassName}
              value={nameInput}
              onChange={handleNameChange}
              placeholder="Name"
              type="text"
              name="name"
              minLength="1"
              maxLength="30"
            />
          </label>
        </div>
        <div className="modal_input modal_input-link">
          <label>
            <div>Image</div>
            <input
              className={modalInputValidClassName}
              value={imageInput}
              onChange={handleImageChange}
              placeholder="Image URL"
              type="url"
              name="link"
              minLength="1"
            />
          </label>
        </div>
      </div>
      <p className="modal_weather-subtitle">Select the weather type:</p>
      <div>
        <div className="modal_weather-option">
          <input
            type="radio"
            value="hot"
            name="weather"
            onChange={handleWeatherChange}
          />
          <label>Hot</label>
        </div>
        <div className="modal_weather-option">
          <input
            type="radio"
            value="warm"
            name="weather"
            onChange={handleWeatherChange}
          />
          <label>Warm</label>
        </div>
        <div className="modal_weather-option-last">
          <input
            type="radio"
            value="cold"
            name="weather"
            onChange={handleWeatherChange}
          />
          <label>Cold</label>
        </div>
      </div>
    </ModalWithForm>
  );
};

export default AddItemModal;
