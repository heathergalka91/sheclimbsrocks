import React, { useEffect } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import LoadingComponent from "./LoadingComponent";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";
import { Route, Switch, useLocation } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import TestErrors from "../../features/errors/TestError";
import { ToastContainer } from "react-toastify";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import LoginForm from "../../features/users/LoginForm";
import ModalContainer from "../common/modals/ModalContainer";
import AdminHome from "../../features/admin/AdminHome";
import PrivateRoute from "./PrivateRoute";
import RegisterSuccess from "../../features/users/RegisterSuccess";
import ConfirmEmail from "../../features/users/ConfirmEmail";

function App() {
  const location = useLocation();
  const { userStore, commonStore } = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      userStore.getFacebokLoginStatus().then(() => commonStore.setAppLoaded());
    }
  }, [commonStore, userStore]);

  if (!commonStore.appLoaded) return <LoadingComponent content='Loading App...' />;

  return (
    <>
      <ModalContainer />
      <Switch>
        <Route
          path={"/admin/"}
          component={AdminHome}
        />
        <Route
          path={"/"}
          render={() => (
            <>
              <ToastContainer position='bottom-right' hideProgressBar />
              <Container style={{ marginTop: "7em" }}>
                <Switch>
                  <Route path='/' exact component={HomePage} />
                  <Route path='/server-error' component={ServerError} />
                  <Route path='/account/registerSuccess' component={RegisterSuccess} />
                  <Route path='/account/verifyEmail' component={ConfirmEmail} />
                  <Route component={NotFound} />
                </Switch>
              </Container>
            </>
          )}
        />
      </Switch>
    </>
  );
}

export default observer(App);
