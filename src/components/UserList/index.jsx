import React from "react";
import { Card } from "../Card";
import Skeleton from "../Card/Skeleton";
import styles from "./UserList.module.scss";

const UserList = ({ users, isLoading, loadMoreUsers, hasMore }) => {
  return (
    <>
      <div className={styles.usersList}>
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : users
              .sort(
                (a, b) => b.registration_timestamp - a.registration_timestamp
              )
              .map((user) => (
                <Card
                  key={user.id}
                  name={user.name}
                  email={user.email}
                  phone={user.phone}
                  position={user.position}
                  photo={user.photo}
                />
              ))}
      </div>
      <div className={styles.button}>
        {hasMore && (
          <button onClick={loadMoreUsers} className="primary-button">
            Show more
          </button>
        )}
      </div>
    </>
  );
};

export default UserList;
