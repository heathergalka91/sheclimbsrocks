import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Header, Label } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";
import * as Yup from "yup";
import ValidationErrors from "../errors/ValidationErrors";
interface Props {}

export default observer(function RegisterForm({}: Props) {
  const { userStore } = useStore();
  return (
    <Formik
      initialValues={{ firstName: "", lastName: "", email: "", password: "", error: null }}
      onSubmit={(values, { setErrors }) =>
        userStore
          .register(values)
          .catch((error) => setErrors({error}))
      }
      validationSchema={Yup.object({
        firstName: Yup.string().required(),
        lastName: Yup.string().required(),
        email: Yup.string().required().email(),
        password: Yup.string().required(),
      })}
    >
      {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
        <Form className='ui form error' onSubmit={handleSubmit} autoComplete='off'>
          <Header as='h2' content='Sign up to uclimb.com' className="popupheader" textAlign='center' />
          <MyTextInput name='firstName' placeholder='FirstName' />
          <MyTextInput name='lastName' placeholder='LastName' />
          <MyTextInput name='email' placeholder='Email' />
          <MyTextInput name='password' placeholder='Password' type='password' />
          <ErrorMessage
            name='error'
            render={() => (
             <ValidationErrors errors={errors.error} />
            )}
          />
          <Button disabled={!isValid || !dirty || isSubmitting} loading={isSubmitting} positive content='Register' type='submit' fluid />
        </Form>
      )}
    </Formik>
  );
});
