import { useEffect, useState } from "react";
// material-ui
import { Box } from "@mui/material";
import { styles } from "../../utils/mui-styles";
import CircularProgress from "@mui/material/CircularProgress";
import { uploadDocuments } from "../../views/utilities/general";
import PdfForm from "../../ui-component/forms/PdfForm";
import PdfViewer from "../../ui-component/pdf-generators/PdfViewer";
import { notifySuccess, notifyError } from "../../utils/toastify";
import IconButton from "@mui/material/IconButton";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import MainCard from "../../ui-component/cards/MainCard";
import uploadSection from "../../assets/images/bupa/upload-section.svg";
import dragSection from "../../assets/images/bupa/drag-section.svg";
import dragSection2 from "../../assets/images/bupa/drag-section2.svg";
import uploadBtn from "../../assets/images/bupa/upload-btn.svg";
import cancelBtn from "../../assets/images/bupa/cancel-btn.svg";
import continueBtn from "../../assets/images/bupa/continue-btn.svg";
import drag from "../../assets/images/bupa/drag.svg";
import idSampleSection from "../../assets/images/bupa/id-sample-section.svg";
import right from "../../assets/images/bupa/right.svg";
import back from "../../assets/images/bupa/back.png";
// ==============================|| DEFAULT DASHBOARD ||============================== //
import {
  missingsExtractor,
  replaceEnglishWithArabic,
} from "../../views/utilities/general";
const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState({}); // all data
  // gonne be overriten via editable fields
  let { missing = [], main_info = {}, customers = [] } = data?.data || {}; //check all customers, whose disease (underwriting terms) | plan | .. is included

  const [certificate, setCertificate] = useState({});
  const [idImages, setIdImages] = useState([]);

  const [step, setStep] = useState(0);
  useEffect(() => {
    setStep(1);
  }, []);

  useEffect(() => {
    if (step === 1) {
      setCertificate({});
      setIdImages([]);
    }
  }, [step]);
  // useEffect(() => {
  //   if (data.id) {
  //     setEditableTata({
  //       missingData: missing,
  //       missingDataUsers: missingsExtractor(missing, customers),
  //       address: main_info.address,
  //     });
  //   }
  // }, [data]);
  return (
    <>
      {step > 1 && (
        <IconButton
          aria-label="fingerprint"
          color="secondary"
          onClick={() => {
            setStep((prev) => --prev);
          }}
        >
          {/* <KeyboardBackspaceIcon
            sx={{ fontSize: { xs: "30px", sm: "30px" } }}
          /> */}
          <Box
            component="img"
            sx={{
              width: { xs: "20px", md: "25px" },
              position: "fixed",
              top: { xs: "14.5%", md: "12.7%" },
              left: { xs: "10%", md: "18.5%" },
              zIndex: "10000",
            }}
            // src="https://www.pngmart.com/files/22/Back-Button-PNG-Photo.png"
            src={back}
          />
        </IconButton>
      )}
      <Box
        container
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box
          sx={{
            display: step === 0 ? "flex" : "none",
            alignItems: "center",
            position: "absolute",
            top: "30%",
          }}
        >
          <CircularProgress size="50px" />
        </Box>

        {/* step 1 */}
        {step === 1 && (
          <Box
            sx={{
              ...styles.container,
              maxWidth: "400px",
              gap: "30px",
            }}
          >
            <Box component="img" src={uploadSection} sx={{ width: "100%" }} />
            <Box
              component="img"
              src={uploadBtn}
              sx={{ ...styles.btn, height: { xs: "25px", md: "45px" } }}
              onClick={() => {
                setStep(2);
              }}
            />
          </Box>
        )}
        {/* step 2 */}
        {step === 2 && (
          <Box
            sx={{
              ...styles.container,
              maxWidth: "600px",
              gap: "30px",
            }}
          >
            {certificate.name && (
              <Box
                component="img"
                src={right}
                sx={{
                  position: "absolute",
                  top: "3%",
                  right: "3%",
                  width: { xs: "20px", md: "30px" },
                }}
              />
            )}
            <Box component="img" src={dragSection} sx={{ width: "100%" }} />
            {/* buttons */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
                position: "absolute",
                bottom: { xs: "15%", md: "10%" },
                // right: "0px",
              }}
            >
              <Box
                component="img"
                src={cancelBtn}
                sx={styles.btn}
                onClick={() => {
                  setStep(1);
                }}
              />
              <Box
                component="img"
                src={continueBtn}
                sx={{
                  ...styles.btn,
                  pointerEvents: certificate.name ? "initial" : "none",
                  opacity: certificate.name ? "1" : ".4",
                }}
                onClick={() => {
                  setStep(3);
                }}
              />
            </Box>
            {/* dragable image */}
            <label htmlFor="file-input">
              <Box
                component="img"
                src={drag}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: { xs: "300px", md: "500px" },
                  transform: "translate(-50%, -50%)",
                }}
              />
              <Box
                component="input"
                onChange={(e) => {
                  setCertificate(e.target.files[0]);
                  localStorage.setItem(
                    "certificate",
                    replaceEnglishWithArabic(e.target.files[0].name)
                  );
                }}
                id="file-input"
                type="file"
                style={{ display: "none" }} // Hide the input element
                multiple
              />
            </label>
          </Box>
        )}
        {/* step 3 */}
        {step === 3 && (
          <Box
            sx={{
              ...styles.container,
              maxWidth: "500px",
              gap: "30px",
            }}
          >
            <Box component="img" src={idSampleSection} sx={{ width: "100%" }} />
            <Box
              component="img"
              src={continueBtn}
              sx={{
                ...styles.btn,
                position: "absolute",
                bottom: { xs: "7px", md: "13px" },
                width: { xs: "100px", md: "130px" },
              }}
              onClick={() => {
                setStep(4);
              }}
            />
          </Box>
        )}
        {/* step 4 */}
        {step === 4 && (
          <Box
            sx={{
              ...styles.container,
              maxWidth: "600px",
              gap: "30px",
            }}
          >
            {idImages.length > 0 && (
              <Box
                component="img"
                src={right}
                sx={{
                  position: "absolute",
                  top: "3%",
                  right: "3%",
                  width: { xs: "20px", md: "30px" },
                }}
              />
            )}
            <Box component="img" src={dragSection2} sx={{ width: "100%" }} />
            {/* buttons */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
                position: "absolute",
                bottom: { xs: "15%", md: "10%" },
                // right: "0px",
              }}
            >
              <Box
                component="img"
                src={cancelBtn}
                sx={styles.btn}
                onClick={() => {
                  setStep(1);
                  setCertificate({});
                  setIdImages([]);
                }}
              />
              <Box
                component="img"
                src={continueBtn}
                sx={{
                  ...styles.btn,
                  pointerEvents: idImages.length > 0 ? "initial" : "none",
                  opacity: idImages.length > 0 ? "1" : ".4",
                }}
                onClick={() => {
                  setStep(0);
                  uploadDocuments(certificate, idImages, setData, setStep);
                }}
              />
            </Box>
            {/* dragable image */}
            <label htmlFor="file-input">
              <Box
                component="img"
                src={drag}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: { xs: "300px", md: "500px" },
                  transform: "translate(-50%, -50%)",
                }}
              />
              <Box
                component="input"
                onChange={(e) => {
                  setIdImages(e.target.files);
                }}
                id="file-input"
                type="file"
                style={{ display: "none" }} // Hide the input element
                multiple
              />
            </label>
          </Box>
        )}
        {/* step 5 */}
        {step === 5 && (
          <Box
            sx={{
              ...styles.container,
              // maxWidth: '600px',
              width: "100%",
              gap: "30px",
            }}
          >
            <PdfForm
              // editableTata={editableTata}
              missing={missing}
              data={data}
              setData={setData}
              setStep={setStep}
            />
          </Box>
        )}
        {/* step 6 */}
        {step === 6 && (
          <Box
            sx={{
              ...styles.container,
              // maxWidth: '600px',
              width: "100%",
              gap: "30px",
            }}
          >
            <PdfViewer
              uploadedEnCertificate={certificate}
              data={data}
              setStep={setStep}
              setData={setData}
            />
          </Box>
        )}
      </Box>
    </>
  );
};

export default Dashboard;
