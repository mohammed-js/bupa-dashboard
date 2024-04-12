import { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../utilities/general";
import { Box } from "@mui/material";
import Bar from "../../ui-component/charts/bar";
import Line from "../../ui-component/charts/line";
import CircularProgress from "@mui/material/CircularProgress";
import { notifySuccess, notifyError } from "../../utils/toastify";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
// ==============================|| SAMPLE PAGE ||============================== //
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Statistics = () => {
  const [data, setData] = useState({});
  const [page, setPage] = useState(1);
  const [forceUpdate, setForceUpdate] = useState(false);
  useEffect(() => {
    axios
      .get(`${baseUrl}/documents/statistics`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("bupa-acc-token")}`,
        },
      })
      .then((res) => setData(res.data))
      .catch((err) => notifyError("Something went wrong!"));
  }, []);

  return (
    <>
      {!data.count_all && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "300px",
          }}
        >
          <CircularProgress size="50px" />
        </Box>
      )}

      {data.count_all && (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: "20px",
              flexWrap: "wrap",
              gap: "30px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              {/* 2 cards */}
              <Box
                sx={{
                  backgroundColor: "#e3f5ff",
                  maxWidth: "230px",
                  height: "140px",
                  borderRadius: "5px",
                  display: "flex",
                  justifyContent: "space-between",
                  p: "10px",
                  // bgcolor: '#fff',
                  borderRadius: "10px",
                  fontSize: "25px",
                  lineHeight: "1.2",
                }}
              >
                <Box sx={{ color: "#0079c8" }}>
                  <Box>All Translated Certificates</Box>
                  <Box sx={{ fontWeight: "bold", mt: "15px", color: "#000" }}>
                    {data.count_all}
                  </Box>
                </Box>
                {/* <Box
                  sx={{
                    display: "flex",
                    color: "#5DA957",
                    alignSelf: "center",
                    gap: "10px",
                    fontSize: "20px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    +11.02%
                  </Box>
                  <TrendingUpIcon />
                </Box> */}
              </Box>
              <Box
                sx={{
                  backgroundColor: "#e3f5ff",
                  maxWidth: "230px",
                  height: "140px",
                  borderRadius: "5px",
                  display: "flex",
                  justifyContent: "space-between",
                  p: "10px",
                  // bgcolor: '#fff',
                  borderRadius: "10px",
                  fontSize: "25px",
                  lineHeight: "1.2",
                }}
              >
                <Box sx={{ color: "#0079c8" }}>
                  <Box>Today’s Translated Certificates</Box>
                  <Box sx={{ fontWeight: "bold", mt: "15px", color: "#000" }}>
                    {data.count_today}
                  </Box>
                </Box>
                {/* <Box
                  sx={{
                    display: "flex",
                    color: "#5DA957",
                    alignSelf: "center",
                    gap: "10px",
                    fontSize: "20px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    +11.02%
                  </Box>
                  <TrendingUpIcon />
                </Box> */}
              </Box>
            </Box>
            <Box
              sx={{
                height: "300px",
                flexGrow: "1",
                bgcolor: "#fff",
                borderRadius: "10px",
              }}
            >
              <Bar data={data.per_day} />
            </Box>
          </Box>

          <Box
            sx={{
              height: "300px",
              width: "100%",
              bgcolor: "#fff",
              borderRadius: "10px",
            }}
          >
            <Line data={data.per_month} />
          </Box>
        </>
      )}
    </>
  );
};
export default Statistics;
