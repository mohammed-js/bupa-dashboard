import React, { useEffect, useState } from "react";
import styles from "./LoginForm.module.css";
import Switch from "@mui/material/Switch";
import { schema, initialValues } from "../../utils/schemas/registerSchema";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../views/utilities/general";
import Box from "@mui/material/Box";
import { notifySuccess, notifyError } from "../../utils/toastify";
import { useTheme } from "@mui/material/styles";
import LinearProgress from "@mui/material/LinearProgress";
import axios from "axios";
import logo from "../../assets/images/bupa/logo.svg";
import { Link } from "react-router-dom";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (values, actions) => {
    setIsLoading(true);
    axios
      .post(`${baseUrl}/users/register/`, {
        first_name: values.bupaFirstName,
        last_name: values.bupaLastName,
        email: values.bupaEmail,
        password: values.bupaPassword,
        confirm_password: values.bupaPassword,
        phone_number: values.bupaPhone,
      })
      .then((res) => {
        setIsLoading(false);
        notifySuccess("Register Successful!");
        navigate("/login");
      })
      .catch((err) => {
        setIsLoading(false);
        notifyError(err.response.data.email[0]);
      });
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: schema,
    onSubmit,
  });
  return (
    <form
      className={`${styles.container} pick`}
      onSubmit={handleSubmit}
      style={{
        overflow: "auto",
        width: "100%",
        backgroundColor: "#fff",
        position: "relative",
        top: "20px",
        margin: "20px",
        boxShadow:
          "rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px",
      }}
    >
      <Box
        component="img"
        src={logo}
        sx={{
          width: "150px",
          my: "30px",
          mx: "auto",
        }}
      />

      {isLoading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}

      {!isLoading && (
        <>
          {/* first name */}
          <div className={styles.label}>
            <span>First Name</span>
            <span className={styles.error}> *</span>
            {errors.bupaFirstName && touched.bupaFirstName && (
              <span className="error">{errors.bupaFirstName}</span>
            )}
          </div>
          <input
            // className={`${styles.input} ${styles.bottom_margin}`}
            value={values.bupaFirstName}
            onChange={handleChange}
            id="bupaFirstName"
            type="text"
            onBlur={handleBlur}
            className={
              errors.bupaFirstName && touched.bupaFirstName
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="Your First Name"
          ></input>
          {/* last name */}
          <div className={styles.label}>
            <span>Last Name</span>
            <span className={styles.error}> *</span>
            {errors.bupaLastName && touched.bupaLastName && (
              <span className="error">{errors.bupaLastName}</span>
            )}
          </div>
          <input
            // className={`${styles.input} ${styles.bottom_margin}`}
            value={values.bupaLastName}
            onChange={handleChange}
            id="bupaLastName"
            type="text"
            onBlur={handleBlur}
            className={
              errors.bupaLastName && touched.bupaLastName
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="Your Last Name"
          ></input>
          {/* email */}
          <div className={styles.label}>
            <span>Email</span>
            <span className={styles.error}> *</span>
            {errors.bupaEmail && touched.bupaEmail && (
              <span className="error">{errors.bupaEmail}</span>
            )}
          </div>
          <input
            // className={`${styles.input} ${styles.bottom_margin}`}
            value={values.bupaEmail}
            onChange={handleChange}
            id="bupaEmail"
            type="text"
            onBlur={handleBlur}
            className={
              errors.bupaEmail && touched.bupaEmail
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="Your email"
          ></input>
          {/* phone */}
          <div className={styles.label}>
            <span>Phone</span>
            <span className={styles.bupaPhone}> *</span>
            {errors.bupaPhone && touched.bupaPhone && (
              <span className="error">{errors.bupaPhone}</span>
            )}
          </div>
          <input
            // className={`${styles.input} ${styles.bottom_margin}`}
            value={values.bupaPhone}
            onChange={handleChange}
            id="bupaPhone"
            type="text"
            onBlur={handleBlur}
            className={
              errors.bupaPhone && touched.bupaPhone
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="Your email"
          ></input>

          {/* password */}
          <div className={styles.label}>
            <span>Password</span>
            <span className={styles.error}> *</span>
            {errors.bupaPassword && touched.bupaPassword && (
              <span className="error">{errors.bupaPassword}</span>
            )}
          </div>
          <input
            placeholder="Your password"
            value={values.bupaPassword}
            onChange={handleChange}
            id="bupaPassword"
            type="password"
            onBlur={handleBlur}
            className={
              errors.bupaPassword && touched.bupaPassword
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
          ></input>
          <button className={styles.brown_button}>Register</button>
          <div style={{ marginTop: "25px" }}>
            Have an account? <Link to="/login">Login</Link>
          </div>
        </>
      )}
    </form>
  );
}
