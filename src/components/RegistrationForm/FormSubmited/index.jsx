import React from "react";
import submitImg from "../../../assets/success-image.png";

import styles from "./FormSubmited.module.scss";
export const FormSubmited = () => {
  return (
    <div className={styles.container}>
      <h1>User successfully registered</h1>
      <img src={submitImg} alt="" />
    </div>
  );
};
