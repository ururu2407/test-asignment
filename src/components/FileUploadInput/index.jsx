// FileUploadInput.js
import React, { useState, forwardRef } from "react";
import styles from "./FileUploadInput.module.scss";

const FileUploadInput = forwardRef(({ handleImageUpload }, ref) => {
  const [fileName, setFileName] = useState("Upload your photo");
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("File size must not be greater than 5MB.");
        return;
      }
      if (file.type !== "image/jpeg" && file.type !== "image/jpg") {
        setError("The photo format must be jpeg/jpg.");
        return;
      }
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        if (img.width < 70 || img.height < 70) {
          setError("Minimum size of photo is 70x70px.");
          return;
        } else {
          setFileName(file.name);
          setError("");
          handleImageUpload(event);
        }
      };
    }
  };

  return (
    <div>
      <div className={styles.uploadContainer}>
        <label htmlFor="upload" className={styles.uploadButton}>
          Upload
        </label>
        <input
          type="file"
          id="upload"
          accept=".jpg,.jpeg"
          onChange={handleChange}
          ref={ref}
          style={{ display: "none" }}
          required
        />
        <span className={styles.uploadText}>{fileName}</span>
      </div>
      {error && <div className={styles.errorText}>{error}</div>}
    </div>
  );
});

export default FileUploadInput;
