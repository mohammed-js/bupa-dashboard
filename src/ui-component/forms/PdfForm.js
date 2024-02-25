import React, { useEffect, useState } from "react";
import styles from "./PdfForm.module.css";
import { schema, initialValues } from "../../utils/schemas/pdfSchema.js";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { notifyError } from "../../utils/toastify.js";
import Box from "@mui/material/Box";

import { useTheme } from "@mui/material/styles";

export default function PdfForm({ missing, data, setData, setStep }) {
  const uploadedEnCertificateId = data.id;
  const address = data.data.main_info.address.replace(/,|\n/g, " - ");
  const [translatedAddress, setTranslatedAddress] = useState(address);
  const [translatedMissing, setTranslatedMissing] = useState({});
  const isDisabled = () => {
    return (
      !translatedAddress ||
      translatedMissing.plan?.some((element) => element === "") ||
      translatedMissing.diseases?.some((element) => element === "") ||
      translatedMissing.broker?.some(
        (element) =>
          // element.intermediary_name === "" || element.percentage === ""
          element.percentage === ""
      )
    );
  };
  useEffect(() => {
    const translatedDiseases = [];
    const translatedPlans = [];
    const translatedBrokers = [];
    missing.diseases?.map((disease) => translatedDiseases.push(""));
    missing.plan?.map((plan) => translatedPlans.push(""));
    missing.broker?.map((broker) =>
      // translatedBrokers.push({ intermediary_name: "", percentage: "" })
      translatedBrokers.push({ percentage: "" })
    );
    setTranslatedMissing({
      plan: translatedPlans,
      diseases: translatedDiseases,
      broker: translatedBrokers,
    });
  }, []);

  const navigate = useNavigate();

  const handleSubmit = () => {
    //* loading
    setStep(0);
    //* updated missing data
    let clonedData = { ...data.data };
    clonedData.main_info.address = translatedAddress;
    clonedData.customers.map((customer, ci) => {
      // let planIndex = missing.plan?.indexOf(customer.plans.plan_name);
      // if (planIndex !== -1 && planIndex !== undefined) {
      //   clonedData.customers[ci].plans.plan_name =
      //     translatedMissing.plan[planIndex];
      // }
      customer.plans.map((plan, pi) => {
        let planIndex = missing.plan?.indexOf(plan.plan_name);
        // undefined => if no plans in missing
        if (planIndex !== -1 && planIndex !== undefined) {
          clonedData.customers[ci].plans[pi].plan_name =
            translatedMissing.plan[planIndex];
        }
      });
      customer.underwriting_terms.map((disease, di) => {
        let diseaseIndex = missing.diseases?.indexOf(disease.name);
        // undefined => if no diseases in missing
        if (diseaseIndex !== -1 && diseaseIndex !== undefined) {
          clonedData.customers[ci].underwriting_terms[di].name =
            translatedMissing.diseases[diseaseIndex];
        }
      });
      customer.additional_information?.map((info, ii) => {
        let infoIndex = missing.broker?.findIndex(
          (singleBroker) =>
            // singleBroker.intermediary_name === info.intermediary_name ||
            // singleBroker.percentage === info.percentage
            singleBroker.percentage === info.percentage
        );
        if (infoIndex !== -1 && infoIndex !== undefined) {
          // clonedData.customers[ci].additional_information[ii] =
          //   translatedMissing.broker[infoIndex];
          clonedData.customers[ci].additional_information[ii].percentage =
            translatedMissing.broker[infoIndex].percentage;
        }
      });
    });
    setData({ data: clonedData, id: uploadedEnCertificateId });
    setStep(6);
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
    //   })
    // .catch((err) => notifyError("Something went wrong!"));
  };

  function getStyles(name, sizes, theme) {
    return {
      fontWeight:
        sizes.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  return (
    <form
      className={styles.container}
      style={{ overflow: "auto", width: "100%" }}
    >
      <div className={styles.title}>Edit Empty Fields:</div>
      {/* address */}
      <Box
        dir="rtl"
        sx={{
          width: "100%",
          bgcolor: "#5686a3",
          p: "10px",
          borderRadius: "10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontWeight: "bold",
          color: "white",
        }}
      >
        <Box>العنوان</Box>
        <Box>Address</Box>
      </Box>
      {/* en address */}
      {/* <Box className={styles.input_container_half} dir="rtl">
        <input
          disabled={true}
          value={address}
          type="string"
          className={`${styles.input} ${styles.bottom_margin}`}
          placeholder="اكتب المحتوى العربي ..."
        ></input>
      </Box> */}
      {/* ar address */}
      <Box className={styles.input_container_full} dir="rtl">
        <input
          // disabled={true}
          value={translatedAddress}
          onChange={(e) => {
            setTranslatedAddress(e.target.value);
          }}
          id="arAddress"
          type="string"
          className={`${styles.input} ${styles.bottom_margin}`}
          placeholder="اكتب المحتوى العربي ..."
        ></input>
      </Box>
      {/* plans */}
      {missing.plan?.map((plan, i) => (
        <>
          {/* plan */}
          {i === 0 && (
            <Box
              dir="rtl"
              sx={{
                width: "100%",
                bgcolor: "#5686a3",
                p: "10px",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontWeight: "bold",
                color: "white",
              }}
            >
              <Box>الخطة</Box>
              <Box>Plans</Box>
            </Box>
          )}
          {/* en plan */}
          <Box className={styles.input_container_half}>
            <input
              disabled={true}
              value={plan}
              type="string"
              className={`${styles.input} ${styles.bottom_margin}`}
              placeholder="اكتب المحتوى العربي ..."
            ></input>
          </Box>
          {/* ar plan */}
          <Box className={styles.input_container_half} dir="rtl">
            <input
              value={translatedMissing?.plan?.[i]}
              onChange={(e) => {
                const cloneTranslatedMissing = { ...translatedMissing };
                cloneTranslatedMissing.plan[i] = e.target.value;
                setTranslatedMissing(cloneTranslatedMissing);
              }}
              id="arPlan"
              type="string"
              className={`${styles.input} ${styles.bottom_margin}`}
              placeholder="اكتب المحتوى العربي ..."
            ></input>
          </Box>
        </>
      ))}
      {/* diseases */}
      {missing.diseases?.map((disease, i) => (
        <>
          {/* disease */}
          {i === 0 && (
            <Box
              dir="rtl"
              sx={{
                width: "100%",
                bgcolor: "#5686a3",
                p: "10px",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontWeight: "bold",
                color: "white",
              }}
            >
              <Box>الأمراض</Box>
              <Box>Diseases</Box>
            </Box>
          )}
          {/* en disease */}
          <Box className={styles.input_container_half}>
            <input
              disabled={true}
              value={disease}
              type="string"
              className={`${styles.input} ${styles.bottom_margin}`}
              placeholder="اكتب المحتوى العربي ..."
            ></input>
          </Box>
          {/* ar address */}
          <Box className={styles.input_container_half} dir="rtl">
            <input
              value={translatedMissing?.diseases?.[i]}
              onChange={(e) => {
                const cloneTranslatedMissing = { ...translatedMissing };
                cloneTranslatedMissing.diseases[i] = e.target.value;
                setTranslatedMissing(cloneTranslatedMissing);
              }}
              id="arDisease"
              type="string"
              className={`${styles.input} ${styles.bottom_margin}`}
              placeholder="اكتب المحتوى العربي ..."
            ></input>
          </Box>
        </>
      ))}
      {/* broker data */}
      {missing.broker?.map((broker, i) => (
        <>
          {/* disease */}
          {i === 0 && (
            <Box
              dir="rtl"
              sx={{
                width: "100%",
                bgcolor: "#5686a3",
                p: "10px",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontWeight: "bold",
                color: "white",
              }}
            >
              <Box>الوسطاء</Box>
              <Box>Brokers</Box>
            </Box>
          )}
          {/* en broker */}
          <Box className={styles.input_container_half}>
            <input
              disabled={true}
              value={broker.intermediary_name}
              type="string"
              className={`${styles.input} ${styles.bottom_margin}`}
            ></input>
          </Box>
          {/* ar broker */}
          {/* <Box className={styles.input_container_third} dir="rtl">
            <input
              value={translatedMissing?.broker?.[i].intermediary_name}
              onChange={(e) => {
                const cloneTranslatedMissing = { ...translatedMissing };
                cloneTranslatedMissing.broker[i].intermediary_name =
                  e.target.value;
                setTranslatedMissing(cloneTranslatedMissing);
              }}
              id="arBroker"
              type="string"
              className={`${styles.input} ${styles.bottom_margin}`}
              placeholder="اكتب اسم الوسط بالعربي ..."
            ></input>
          </Box> */}
          {/* broker Percentage */}
          <Box className={styles.input_container_half}>
            <input
              value={translatedMissing?.broker?.[i].percentage}
              onChange={(e) => {
                const cloneTranslatedMissing = { ...translatedMissing };
                cloneTranslatedMissing.broker[i].percentage = e.target.value;
                setTranslatedMissing(cloneTranslatedMissing);
              }}
              id="brokerPercentage"
              type="number"
              className={`${styles.input} ${styles.bottom_margin}`}
              placeholder="enter percentage ..."
            ></input>
          </Box>
        </>
      ))}

      <Box
        component="button"
        type="submit"
        disabled={isDisabled()}
        sx={{
          cursor: isDisabled() ? "not-allowed" : "pointer",
          m: "auto",
          bgcolor: "#101f33",
          p: "5px",
          borderRadius: "5px",
          color: "white",
        }}
        onClick={handleSubmit}
      >
        Convert to pdf file
      </Box>
    </form>
  );
}
