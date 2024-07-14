import React from "react";

import styles from "./card.module.scss";
export const Card = ({ name, email, phone, position, photo }) => {
  return (
    <div className={styles.card}>
      <div className={styles.card__content}>
        <div className={styles.card__content__info}>
          <img src={photo} alt="" />
          <div className={styles.ellipsis}>{name}</div>
        </div>
        <div className={styles.card__content__text}>
          <div className={styles.ellipsis}>{position}</div>
          <div className={styles.ellipsis}>{email}</div>
          <div className={styles.ellipsis}>{phone}</div>
        </div>
      </div>
    </div>
  );
};
