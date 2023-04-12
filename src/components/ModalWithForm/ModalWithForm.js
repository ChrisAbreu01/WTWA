import "./ModalWithForm.css";
const ModalWithForm = ({
  children,
  buttonText,
  title,
  onClose,
  handleSubmitForm,
  name,
}) => {
  return (
    <div className={`modal modal_type_${name}`}>
      <div className="modal__content">
        <button
          className="modal_close"
          type="button"
          onClick={onClose}
        ></button>
        <h3 className="modal_title">{title}</h3>
        <form>{children}</form>
        <button
          className="modal_submit"
          type="submit"
          onClick={handleSubmitForm}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};
export default ModalWithForm;
