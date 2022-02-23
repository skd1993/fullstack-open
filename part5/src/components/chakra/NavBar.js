import React from 'react';
import NavBarContainer from './NavbarContainer';
import Logo from './Logo';
import MenuLinks from './MenuLinks';
import MenuToggle from './MenuToggle';

const NavBar = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <NavBarContainer {...props}>
      <Logo
        w='100px'
        color={['gray.200', 'gray.200', 'gray.200', 'gray.200']}
      />
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} user={props.user} />
    </NavBarContainer>
  );
};

export default NavBar;
