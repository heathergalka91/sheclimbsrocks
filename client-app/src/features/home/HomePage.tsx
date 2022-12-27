import { observer } from "mobx-react-lite";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Button, Container, Header, Segment, Image, Divider, Menu, Grid, Placeholder, PlaceholderParagraph, PlaceholderLine, PlaceholderHeader, PlaceholderImage, SegmentGroup } from "semantic-ui-react";
import NavBar from "../../app/layout/NavBar";
import Default from "../../app/layout/Templates/Default";
import { useStore } from "../../app/stores/store";
import LargeCalendar from "../calendar/LargeCalendar";
import FinanceApp from "../marketplace/financeApp/FinanceApp";
import LoginForm from "../users/LoginForm";
import RegisterForm from "../users/RegisterForm";

export default observer(function HomePage() {
  const { userStore, modalStore } = useStore();
  return (
      <>
              
      {userStore.isLoggedIn ? (
        <>
          <NavBar />
          <Default/>
        </>
      ) : (
        <Segment vertical textAlign="center" className='masthead'>
        <Container>
          <Header as='h1' inverted>
            <Image
              size="massive"
              src='/assets/logo.png'
              alt='logo'
              className='mainLogo'
              style={{ marginBottom: 12 }}
            />
            sheclimbsrocks.com 
          </Header>
          <Button
            onClick={() => modalStore.openModal(<LoginForm />)}
            size='huge'
            style={{ color: "#8c266c" }}
          >
            Login
          </Button>
          <Button
            onClick={() => modalStore.openModal(<RegisterForm />)}
            size='huge'
            style={{ color: "#8c266c" }}
          >
            Register
          </Button>
    </Container>
    </Segment>
      )}
</>
  );
});
