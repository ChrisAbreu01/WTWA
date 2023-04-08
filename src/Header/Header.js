import "./Header.css";
function Header({ onCreateModal }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <div>
      <header className="header">
        <div className="header__logo">
          <div>
            <img
              src={require("../images/logo.svg").default}
              alt="logo"
              className="header_logo-image"
            />
          </div>
          <div>{currentDate}, Philadelphia</div>
        </div>
        <div className="header__avatar-logo">
          <div>
            <button
              className="header__button"
              type="button"
              onClick={onCreateModal}
            >
              {" "}
              + Add New Clothes
            </button>
          </div>
          <div className="header_name">Terrence Tegegne</div>
          <div className="header_avatar">
            <img src={require("../images/avatar.svg").default} alt="avatar" />
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
