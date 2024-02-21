import React, { useEffect, useState } from "react";
import styles from "./PdfForm.module.css";
import { schema, initialValues } from "../../utils/schemas/pdfSchema.js";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";

import { useTheme } from "@mui/material/styles";

export default function PdfForm({ editableTata, data, setData, setStep }) {
  // const address = data.data.main_info.address; // data: not needed
  console.log(editableTata);
  const navigate = useNavigate();

  const onSubmit = async (values, actions) => {
    setStep(0);
    // send transaction to sohaila
    // axios
    //   .post(
    //     `${baseUrl}/documents`,
    //     {
    //       certificate: certificate,
    //       national_ids: idImages
    //     },
    //     {
    //       headers: {
    //         'Content-Type': 'multipart/form-data',
    //         Authorization: `Bearer ${localStorage.getItem('acc-token')}`
    //       }
    //     }
    //   )
    //   .then((res) => {
    //     setStep(5);
    //     //   setData(res?.data);
    //     //   setLoading(false);
    //   });
    setStep(6);
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

  function getStyles(name, sizes, theme) {
    return {
      fontWeight:
        sizes.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  const handleSelectChange = (event) => {
    const {
      target: { value },
    } = event;
    setFieldValue(
      "sizes",
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <form
      className={styles.container}
      onSubmit={handleSubmit}
      style={{ overflow: "auto", width: "100%" }}
    >
      <div className={styles.title}>Edit Empty Fields </div>
      <Box
        dir="rtl"
        sx={{
          width: "100%",
          bgcolor: "#b3ffe5",
          p: "10px",
          borderRadius: "10px",
        }}
      >
        العنوان
      </Box>
      {/* en address */}
      <Box className={styles.input_container_full}>
        <div className={styles.label}>
          <span>English address</span>
        </div>
        <input
          disabled={true}
          value={editableTata.address}
          onChange={handleChange}
          id="enAddress"
          type="string"
          onBlur={handleBlur}
          className={`${styles.input} ${styles.bottom_margin}`}
          placeholder="Your last name"
        ></input>
      </Box>
      {/* ar address */}
      <Box className={styles.input_container_full} dir="rtl">
        <div className={styles.label}>
          <span>العنوان العربي</span>
          <span className={styles.error}> *</span>
          {errors.arAddress && touched.arAddress && (
            <span className="error">{errors.arAddress}</span>
          )}
        </div>
        <input
          // disabled={true}
          value={values.arAddress}
          onChange={handleChange}
          id="arAddress"
          type="string"
          onBlur={handleBlur}
          className={
            errors.arAddress && touched.arAddress
              ? `${styles.input} ${styles.bottom_margin} input-error`
              : `${styles.input} ${styles.bottom_margin}`
          }
          placeholder="اكتب العنوان بالتفصيل ..."
        ></input>
      </Box>
      {/* per customer */}
      {editableTata.missingData.map((customer, index) => (
        <>
          <Box
            dir="rtl"
            sx={{
              width: "100%",
              bgcolor: "#e3f5ff",
              p: "10px",
              borderRadius: "10px",
            }}
          >
            {customer.customerName}
          </Box>
          {customer.planName && (
            <Box sx={{ width: "100%" }}>----------plan------------</Box>
          )}
          {/* enPlan*/}
          <Box className={styles.input_container_half}>
            {/* <div className={styles.label}>
              <span>English Plan</span>
            </div> */}
            <input
              disabled={true}
              value={customer.planName}
              onChange={handleChange}
              id="enAddress"
              type="string"
              onBlur={handleBlur}
              className={`${styles.input} ${styles.bottom_margin}`}
              placeholder="Your last name"
            ></input>
          </Box>
          {/* arPlan */}
          <Box className={styles.input_container_half} dir="rtl">
            {/* <div className={styles.label}>
              <span>العنوان العربي</span>
              <span className={styles.error}> *</span>
              {errors.arAddress && touched.arAddress && (
                <span className="error">{errors.arAddress}</span>
              )}
            </div> */}
            <input
              // disabled={true}
              value={values.arAddress}
              onChange={handleChange}
              id="arAddress"
              type="string"
              onBlur={handleBlur}
              className={
                errors.arAddress && touched.arAddress
                  ? `${styles.input} ${styles.bottom_margin} input-error`
                  : `${styles.input} ${styles.bottom_margin}`
              }
              placeholder="اكتب العنوان بالتفصيل ..."
            ></input>
          </Box>
          {customer.diseaseNames.length > 0 && (
            <Box sx={{ width: "100%" }}>----------diseases------------</Box>
          )}

          {customer.diseaseNames.map((disease) => (
            <>
              {/* enDisease*/}
              <Box className={styles.input_container_half}>
                {/* <div className={styles.label}>
                  <span>English disease</span>
                </div> */}
                <input
                  disabled={true}
                  value={disease}
                  onChange={handleChange}
                  id="enAddress"
                  type="string"
                  onBlur={handleBlur}
                  className={`${styles.input} ${styles.bottom_margin}`}
                  placeholder="Your last name"
                ></input>
              </Box>
              {/* arDisease */}
              <Box className={styles.input_container_half} dir="rtl">
                {/* <div className={styles.label}>
                  <span>العنوان العربي</span>
                  <span className={styles.error}> *</span>
                  {errors.arAddress && touched.arAddress && (
                    <span className="error">{errors.arAddress}</span>
                  )}
                </div> */}
                <input
                  // disabled={true}
                  value={values.arAddress}
                  onChange={handleChange}
                  id="arAddress"
                  type="string"
                  onBlur={handleBlur}
                  className={
                    errors.arAddress && touched.arAddress
                      ? `${styles.input} ${styles.bottom_margin} input-error`
                      : `${styles.input} ${styles.bottom_margin}`
                  }
                  placeholder="اكتب العنوان بالتفصيل ..."
                ></input>
              </Box>
            </>
          ))}
        </>
      ))}
      <button className={styles.brown_button} type="submit">
        Convert to pdf file
      </button>
    </form>
  );
}
