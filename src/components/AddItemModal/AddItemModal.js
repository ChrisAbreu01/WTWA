import { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
// onAddItem refers to handleAddItemSubmit, which is declared in App.js
const AddItemModal = ({ onAddItem, handleCloseModal }) => {
  // declare state for each input field
  const [nameInput, setNameInputValue] = useState();
  const [imageInput, setImageInputValue] = useState();
  const [weatherInput, setWeatherInputValue] = useState();

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

  function handleSubmit(e) {
    e.preventDefault();
    // call onAddItem with appropriate arguments
    onAddItem({
      name: nameInput,
      weather: weatherInput,
      link: imageInput,
    });
    handleCloseModal();
  }
  /* don't forget to pass appropriate props to ModalWithForm */
  return (
    <ModalWithForm
      title="New Garment"
      onClose={handleCloseModal}
      buttonText="Add garment"
      handleSubmitForm={handleSubmit}
    >
      <div className="modal_inputs">
        <div className="modal_input">
          <label>
            <div>Name</div>
            <input
              className="modal_input-field"
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
              className="modal_input-field"
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
