import React from "react";
import { TextField, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import FileUploadInput from "../../FileUploadInput";
import styles from "./Form.module.scss";

export const Form = ({
  name,
  setName,
  email,
  setEmail,
  phone,
  setPhone,
  selectedPosition,
  setSelectedPosition,
  positions,
  handleImageUpload,
  fileInputRef,
  isFormValid,
  handleSubmit,
  emailPattern,
  phonePattern,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        type="text"
        value={name.value}
        onChange={(e) => setName({ ...name, value: e.target.value })}
        label="Name"
        maxLength={60}
        required
        fullWidth
        onBlur={() => setName({ ...name, isTouched: true })}
        error={
          name.isTouched && (name.value.length < 2 || name.value.length > 60)
        }
        helperText={
          name.isTouched && (name.value.length < 2 || name.value.length > 60)
            ? "Username should contain 2-60 characters"
            : ""
        }
      />
      <TextField
        type="text"
        value={email.value}
        onChange={(e) => setEmail({ ...email, value: e.target.value })}
        label="Email"
        maxLength={100}
        required
        fullWidth
        onBlur={() => setEmail({ ...email, isTouched: true })}
        error={email.isTouched && !emailPattern.test(email.value)}
        helperText={
          email.isTouched && !emailPattern.test(email.value)
            ? "User email must be a valid email according to RFC2822"
            : ""
        }
      />
      <TextField
        type="text"
        value={phone.value}
        onChange={(e) => setPhone({ ...phone, value: e.target.value })}
        label="Phone"
        maxLength={20}
        required
        fullWidth
        onBlur={() => setPhone({ ...phone, isTouched: true })}
        error={phone.isTouched && !phonePattern.test(phone.value)}
        helperText={
          phone.isTouched && !phonePattern.test(phone.value)
            ? "User phone number must start with code of Ukraine +380"
            : ""
        }
      />
      <div className={styles.position}>
        <p>Select your position</p>
        <RadioGroup
          aria-label="position"
          name="position"
          value={selectedPosition}
          onChange={(e) => setSelectedPosition(e.target.value)}
          required
          sx={{ gap: "7px" }}
        >
          {positions.map((position) => (
            <FormControlLabel
              key={position.id}
              value={position.id}
              control={<Radio />}
              label={position.name}
              sx={{ height: "26px" }}
            />
          ))}
        </RadioGroup>
      </div>
      <FileUploadInput
        ref={fileInputRef}
        handleImageUpload={handleImageUpload}
      />
      <div className={styles.button}>
        <button
          disabled={!isFormValid}
          className="primary-button"
          type="submit"
        >
          Sign up
        </button>
      </div>
    </form>
  );
};
