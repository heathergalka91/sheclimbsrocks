import { observer } from "mobx-react-lite";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Button, Container, Dropdown, Image, Menu } from "semantic-ui-react";
import { useStore } from "../stores/store";

interface Props {}

export default observer(function NavBar({}: Props) {
  const {
    userStore: { user, logout, isLoggedIn },
  } = useStore();

  return (
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item as={NavLink} to='/' exact header>
          <img src='/assets/logo.png' alt='logo' style={{ marginRight: "10px" }}></img>
          sheclimbsrocks.com
        </Menu.Item>
        {isLoggedIn && (
          <>
            <Menu.Item position='right'>
              <Image src={user?.image || "/assets/user.png"} avatar spaced='right' />
              <Dropdown pointing='top left' text={user?.firstName}>
                <Dropdown.Menu>
                  <Dropdown.Item
                    as={Link}
                    to={`my-account`}
                    text='My Profile'
                    icon='user'
                  />
                  <Dropdown.Item onClick={logout} text='Logout' icon='power' />
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>
          </>
        )}
      </Container>
    </Menu>
  );
});
