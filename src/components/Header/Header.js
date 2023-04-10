import "./Header.css";
import logoImage from "../../images/logo.svg";
import avatarImage from "../../images/avatar.svg";
function Header({ onCreateModal, place }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <div>
      <header className="header">
        <div className="header__logo">
          <div>
            <img src={logoImage} alt="logo" className="header_logo-image" />
          </div>
          <div>
            {currentDate}, {place}
          </div>
        </div>
        <div className="header__avatar-logo">
          <div>
            <button
              className="header__button"
              type="button"
              onClick={onCreateModal}
            >
              + Add New Clothes
            </button>
          </div>
          <div className="header_name">Terrence Tegegne</div>
          <div className="header_avatar">
            <img src={avatarImage} alt="avatar" />
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
