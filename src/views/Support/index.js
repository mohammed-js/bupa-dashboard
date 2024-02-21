import { Box } from "@mui/material";
import support from "../../assets/images/bupa/support.svg";

const Support = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100%",
        gap: "20px",
      }}
    >
      <Box
        component="img"
        src={support}
        sx={{ maxWidth: { xs: "200px", md: "350px" } }}
      />
      <Box
        sx={{
          fontSize: { xs: "17px", md: "25px" },
          fontWeight: "bold",
        }}
      >
        If you need any help, contact us at:
      </Box>
      <Box
        component="a"
        href="mailto:info.bupa@gmail.com"
        sx={{
          fontSize: { xs: "15px", md: "20px" },
        }}
      >
        info.bupa@gmail.com
      </Box>
    </Box>
  );
};
export default Support;
