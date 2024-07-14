import React from "react";
import { Form } from "./Form";
import { FormSubmited } from "./FormSubmited";

import styles from "./RegistrationForm.module.scss";

const UserRegistration = ({ formSubmitted, ...formProps }) => {
  return formSubmitted ? (
    <FormSubmited />
  ) : (
    <div className={styles.registration__block}>
      <h1>Working with POST request</h1>
      <Form {...formProps} />
    </div>
  );
};

export default UserRegistration;
