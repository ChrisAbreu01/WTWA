import "./Header.css";
function Header() {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <div>
      <header className="header">
        <div className="header__logo">
          <div>
            <img src={require("../Images/logo.svg").default} alt="logo" />
          </div>
          <div>{currentDate}, Philadelphia</div>
        </div>
        <div className="header__avatar-logo">
          <div>
            <button className="header__button" type="text">
              {" "}
              + Add New Clothes
            </button>
          </div>
          <div>Name</div>
          <div>
            <img src={require("../Images/avatar.svg").default} alt="avatar" />
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
