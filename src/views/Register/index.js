import { useEffect, useState } from "react";
// material-ui
import { Box } from "@mui/material";
import { styles } from "../../utils/mui-styles";
import CircularProgress from "@mui/material/CircularProgress";
import { uploadDocuments } from "../utilities/general";
import RegisterForm from "../../ui-component/forms/RegisterForm";
// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [certificate, setCertificate] = useState([]);
  const [idImages, setIdImages] = useState([]);
  useEffect(() => {}, []);
  return (
    <Box
      container
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box
        sx={{
          display: isLoading ? "flex" : "none",
          alignItems: "center",
          position: "absolute",
          top: "40%",
        }}
      >
        <CircularProgress size="100px" />
      </Box>
      {!isLoading && <RegisterForm />}
    </Box>
  );
};

export default Dashboard;
