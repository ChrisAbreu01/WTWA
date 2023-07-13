import "./ModalWithForm.css";
const ModalWithForm = ({
  children,
  buttonText,
  title,
  onClose,
  onSubmit,
  isValid,
}) => {
  const modalButtonClassName = isValid
    ? "modal_submit"
    : "modal__submit-invalid modal_submit";
  return (
    <div className={`modal modal_type_add_item_modal`}>
      <div className="modal__content">
        <button
          className="modal_close"
          type="button"
          onClick={onClose}
        ></button>
        <h3 className="modal_title">{title}</h3>
        <form onSubmit={onSubmit} className="modal_form">
          {children}
          <button className={modalButtonClassName} type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};
export default ModalWithForm;
