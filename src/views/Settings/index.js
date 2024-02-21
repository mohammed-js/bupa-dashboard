import React, { useEffect, useState } from "react";
import styles from "./Settings.module.css";
import Switch from "@mui/material/Switch";
import {
  schema1,
  initialValues1,
  schema2,
  initialValues2,
} from "../../utils/schemas/settingsSchema";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../views/utilities/general";
import Box from "@mui/material/Box";
import { notifySuccess, notifyError } from "../../utils/toastify";
import { useTheme } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import logo from "../../assets/images/bupa/logo.svg";
export default function Settings() {
  const [isLoading1, setIsLoading1] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const navigate = useNavigate();

  const onSubmit1 = async (values, actions) => {
    setIsLoading1(true);
    axios
      .patch(
        `${baseUrl}/users/update/`,
        {
          first_name: values.firstName,
          last_name: values.lastName,
          // email: values.email,
          phone_number: values.phone,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("acc-token")}`,
          },
        }
      )
      .then((res) => {
        setIsLoading1(false);
        notifySuccess("Update Successful!");
        actions.resetForm();
        // axios
        //   .patch(`${baseUrl}/auth/tokens/`, {
        //     login: values.email,
        //     password: "test-123456",
        //   })
        //   .then(() => {})
        //   .catch(() => {});
      })
      .catch((err) => {
        setIsLoading1(false);
        notifyError("Error encountered!");
      });
  };
  const onSubmit2 = async (values, actions) => {
    setIsLoading2(true);
    axios
      .patch(
        `${baseUrl}/users/change-password/`,
        {
          password: values.oldPassword,
          new_password: values.newPassword,
          confirm_password: values.confirmedNewPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("acc-token")}`,
          },
        }
      )
      .then((res) => {
        setIsLoading2(false);
        notifySuccess("Update Successful!");
        // actions.resetForm();
      })
      .catch((err) => {
        setIsLoading2(false);
        notifyError("Error encountered!");
      });
  };

  const {
    values: values1,
    errors: errors1,
    touched: touched1,
    isSubmitting: isSubmitting1,
    handleBlur: handleBlur1,
    handleChange: handleChange1,
    handleSubmit: handleSubmit1,
  } = useFormik({
    initialValues: initialValues1,
    validationSchema: schema1,
    onSubmit: onSubmit1,
  });

  const {
    values: values2,
    errors: errors2,
    touched: touched2,
    isSubmitting: isSubmitting2,
    handleBlur: handleBlur2,
    handleChange: handleChange2,
    handleSubmit: handleSubmit2,
  } = useFormik({
    initialValues: initialValues2,
    validationSchema: schema2,
    onSubmit: onSubmit2,
  });
  console.log(values2);
  console.log(errors2);
  return (
    <>
      <form
        className={styles.container}
        onSubmit={handleSubmit1}
        style={{
          marginBottom: "20px",
          overflow: "auto",
          width: "100%",
          backgroundColor: "#fff",
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
        }}
      >
        <Box
          size="40px"
          sx={{
            width: "100%",
            fontSize: "25px",
            fontWeight: "bold",
            color: "#0079c8",
            mb: "15px",
          }}
        >
          User Info
        </Box>
        {/* 1st name */}
        <Box className={styles.input_container_third}>
          <div className={styles.label}>
            <span>First name</span>
            <span className={styles.error}> *</span>
            {errors1.firstName && touched1.firstName && (
              <span className="error">{errors1.firstName}</span>
            )}
          </div>
          <input
            // className={`${styles.input} ${styles.bottom_margin}`}
            value={values1.firstName}
            onChange={handleChange1}
            id="firstName"
            type="text"
            onBlur={handleBlur1}
            className={
              errors1.firstName && touched1.firstName
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="first name"
          ></input>
        </Box>
        {/* 2nd name */}
        <Box className={styles.input_container_third}>
          <div className={styles.label}>
            <span>Last name</span>
            <span className={styles.error}> *</span>
            {errors1.lastName && touched1.lastName && (
              <span className="error">{errors1.lastName}</span>
            )}
          </div>
          <input
            // className={`${styles.input} ${styles.bottom_margin}`}
            value={values1.lastName}
            onChange={handleChange1}
            id="lastName"
            type="text"
            onBlur={handleBlur1}
            className={
              errors1.lastName && touched1.lastName
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="first name"
          ></input>
        </Box>
        {/* email */}
        {/* <Box className={styles.input_container_half}>
          <div className={styles.label}>
            <span>Email</span>
            <span className={styles.error}> *</span>
            {errors1.email && touched1.email && (
              <span className="error">{errors1.email}</span>
            )}
          </div>
          <input
            // className={`${styles.input} ${styles.bottom_margin}`}
            value={values1.email}
            onChange={handleChange1}
            id="email"
            type="text"
            onBlur={handleBlur1}
            className={
              errors1.email && touched1.email
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="email"
          ></input>
        </Box> */}
        {/* phone */}
        <Box className={styles.input_container_third}>
          <div className={styles.label}>
            <span>Phone</span>
            <span className={styles.error}> *</span>
            {errors1.phone && touched1.phone && (
              <span className="error">{errors1.phone}</span>
            )}
          </div>
          <input
            // className={`${styles.input} ${styles.bottom_margin}`}
            value={values1.phone}
            onChange={handleChange1}
            id="phone"
            type="text"
            onBlur={handleBlur1}
            className={
              errors1.phone && touched1.phone
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="phone"
          ></input>
        </Box>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <button className={styles.brown_button}>Update</button>
          {isLoading1 && <CircularProgress size="25px" sx={{}} />}
        </Box>
      </form>
      <form
        className={styles.container}
        onSubmit={handleSubmit2}
        style={{
          marginBottom: "20px",
          overflow: "auto",
          width: "100%",
          backgroundColor: "#fff",
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            fontSize: "25px",
            fontWeight: "bold",
            color: "#0079c8",
            mb: "15px",
          }}
        >
          Update Password
        </Box>

        {/* old password */}
        <Box className={styles.input_container_third}>
          <div className={styles.label}>
            <span>Old password</span>
            <span className={styles.error}> *</span>
            {errors2.oldPassword && touched2.oldPassword && (
              <span className="error">{errors2.oldPassword}</span>
            )}
          </div>
          <input
            // className={`${styles.input} ${styles.bottom_margin}`}
            value={values2.oldPassword}
            onChange={handleChange2}
            id="oldPassword"
            type="password"
            onBlur={handleBlur2}
            className={
              errors2.oldPassword && touched2.oldPassword
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="old password"
          ></input>
        </Box>
        {/* new password */}
        <Box className={styles.input_container_third}>
          <div className={styles.label}>
            <span>New password</span>
            <span className={styles.error}> *</span>
            {errors2.newPassword && touched2.newPassword && (
              <span className="error">{errors2.newPassword}</span>
            )}
          </div>
          <input
            // className={`${styles.input} ${styles.bottom_margin}`}
            value={values2.newPassword}
            onChange={handleChange2}
            id="newPassword"
            type="password"
            onBlur={handleBlur2}
            className={
              errors2.newPassword && touched2.newPassword
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="new password"
          ></input>
        </Box>
        {/* confirmed new password */}
        <Box className={styles.input_container_third}>
          <div className={styles.label}>
            <span>Confirm new password</span>
            <span className={styles.error}> *</span>
            {errors2.confirmedNewPassword && touched2.confirmedNewPassword && (
              <span className="error">{errors2.confirmedNewPassword}</span>
            )}
          </div>
          <input
            // className={`${styles.input} ${styles.bottom_margin}`}
            value={values2.confirmedNewPassword}
            onChange={handleChange2}
            id="confirmedNewPassword"
            type="password"
            onBlur={handleBlur2}
            className={
              errors2.confirmedNewPassword && touched2.confirmedNewPassword
                ? `${styles.input} ${styles.bottom_margin} input-error`
                : `${styles.input} ${styles.bottom_margin}`
            }
            placeholder="confirm new password"
          ></input>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <button className={styles.brown_button}>Update</button>
          {isLoading2 && <CircularProgress size="25px" sx={{}} />}
        </Box>
      </form>
    </>
  );
}
