import React, { useState } from "react";
import axios from "axios";

import image from "./assets/image 1.png";

import { Header } from "./components/Header";
import UserRegistration from "./components/RegistrationForm";
import UserList from "./components/UserList";

import styles from "./App.module.scss";

function App() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [name, setName] = useState({ value: "", isTouched: false });
  const [email, setEmail] = useState({ value: "", isTouched: false });
  const [phone, setPhone] = useState({ value: "", isTouched: false });

  const [selectedPosition, setSelectedPosition] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [positions, setPositions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const fileInputRef = React.useRef(null);

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phonePattern = /^[+]{0,1}380([0-9]{9})$/;

  const isFormValid =
    name.value.length >= 2 &&
    name.value.length <= 60 &&
    emailPattern.test(email.value) &&
    email.value.length <= 100 &&
    phonePattern.test(phone.value) &&
    phone.value.length <= 20 &&
    selectedPosition &&
    imageUpload;

  React.useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${page}&count=6`
      )
      .then((response) => {
        setUsers(response.data.users);
        console.log(response.data);
        setHasMore(response.data.total_pages !== page);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, [page]);

  React.useEffect(() => {
    axios
      .get("https://frontend-test-assignment-api.abz.agency/api/v1/positions")
      .then((response) => setPositions(response.data.positions))
      .catch((error) => console.log(error));
  }, []);

  const loadMoreUsers = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File must be less than 5MB.");
        return;
      }
      if (file.type !== "image/jpeg" && file.type !== "image/jpg") {
        alert("File must be a jpg/jpeg image.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUpload(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const fetchToken = async () => {
    try {
      const response = await axios.get(
        "https://frontend-test-assignment-api.abz.agency/api/v1/token"
      );
      return response.data.token;
    } catch (error) {
      console.error("Error fetching token:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const file = fileInputRef.current.files[0];
    if (!file) {
      alert("Please upload a photo.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name.value);
    formData.append("email", email.value);
    formData.append("phone", phone.value);
    formData.append("position_id", Number(selectedPosition));
    formData.append("photo", file);

    const token = await fetchToken();
    try {
      const response = await axios.post(
        "https://frontend-test-assignment-api.abz.agency/api/v1/users",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Token: token,
          },
        }
      );

      setUsers((prevUsers) => [response.data.user, ...prevUsers]);
      setPage(1); // Reset to first page
      setHasMore(true); // Allow loading more users again
      fetchUsers(); // Fetch users again for the first page

      setFormSubmitted(true); // Hide the form

      // Reset form fields
      setName({ value: "", isTouched: false });
      setEmail({ value: "", isTouched: false });
      setPhone({ value: "", isTouched: false });
      setSelectedPosition("");
      setImageUpload(null);
    } catch (error) {
      console.error(
        "Error submitting form:",
        error.response?.data || error.message
      );
    }
  };

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6`
      );
      setUsers(response.data.users);
      setHasMore(response.data.links.next_url !== null);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.contentImage}></div>
          <img src={image} alt="" />
          <div className={styles.contentText}>
            <div className={styles.text}>
              <h1>Test assignment for front-end developer</h1>
              <p>
                What defines a good front-end developer is one that has skilled
                knowledge of HTML, CSS, JS with a vast understanding of User
                design thinking as they'll be building web interfaces with
                accessibility in mind. They should also be excited to learn, as
                the world of Front-End Development keeps evolving.
              </p>
            </div>
            <div className={styles.button}>
              <button className="primary-button">Sign up</button>
            </div>
          </div>
        </div>
        <div className={styles.users}>
          <h1>Working with GET request</h1>
          <UserList
            users={users}
            isLoading={isLoading}
            loadMoreUsers={loadMoreUsers}
            hasMore={hasMore}
          />
        </div>
        <UserRegistration
          formSubmitted={formSubmitted}
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          phone={phone}
          setPhone={setPhone}
          selectedPosition={selectedPosition}
          setSelectedPosition={setSelectedPosition}
          positions={positions}
          handleImageUpload={handleImageUpload}
          fileInputRef={fileInputRef}
          isFormValid={isFormValid}
          handleSubmit={handleSubmit}
          emailPattern={emailPattern}
          phonePattern={phonePattern}
        />
      </div>
    </div>
  );
}

export default App;
