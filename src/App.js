import { ReactComponent as PlusIcon } from "./icons/add-24px.svg";
import { ReactComponent as BellIcon } from "./icons/notifications-24px.svg";
import { ReactComponent as MessageIcon } from "./icons/chat-24px.svg";
import { ReactComponent as CaretIcon } from "./icons/expand_more-24px.svg";
import { ReactComponent as ArrowIcon } from "./icons/arrow_back-24px.svg";
import { ReactComponent as ChevronIcon } from "./icons/fireplace-24px.svg";
import { ReactComponent as SettingIcon } from "./icons/settings-24px.svg";

import { useState } from "react";
import { CSSTransition } from "react-transition-group";

function App() {
  return (
    <Navbar>
      <NavItem icon={<PlusIcon />} />
      <NavItem icon={<BellIcon />} />
      <NavItem icon={<MessageIcon />} />
      <NavItem icon={<CaretIcon />}>
        <DropdownMenu />
      </NavItem>
    </Navbar>
  );
}

function Navbar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);
  return (
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>
      {open && props.children}
    </li>
  );
}

function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(null);
  console.log(menuHeight);
  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    return (
      <a
        href="#"
        className="menu-item"
        onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
      >
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  }
  return (
    <div className="dropdown" style={{ height: menuHeight }}>
      <CSSTransition
        in={activeMenu === "main"}
        unmountOnExit
        timeout={500}
        classNames="menu-primary"
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem leftIcon={<ChevronIcon />} rightIcon={<ChevronIcon />}>
            My Profile
          </DropdownItem>
          <DropdownItem leftIcon={<SettingIcon />} goToMenu="settings">
            Setting
          </DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "settings"}
        unmountOnExit
        timeout={500}
        classNames="menu-secondary"
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem leftIcon={<ArrowIcon />} goToMenu="main" />
          <DropdownItem leftIcon={<ChevronIcon />} rightIcon={<ChevronIcon />}>
            Setttings
          </DropdownItem>
          <DropdownItem leftIcon={<ChevronIcon />} rightIcon={<ChevronIcon />}>
            Setttings
          </DropdownItem>
          <DropdownItem leftIcon={<ChevronIcon />} rightIcon={<ChevronIcon />}>
            Setttings
          </DropdownItem>
          <DropdownItem leftIcon={<ChevronIcon />} rightIcon={<ChevronIcon />}>
            Setttings
          </DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}

export default App;
