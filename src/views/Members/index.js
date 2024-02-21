import { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../utilities/general";
import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { notifySuccess, notifyError } from "../../utils/toastify";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import MySwitch from "../../ui-component/mini-components/MySwitch";

// ==============================|| SAMPLE PAGE ||============================== //
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    // backgroundColor: theme.palette.common.black,
    backgroundColor: "#0079c8",
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

const Members = () => {
  const [data, setData] = useState({});
  const [page, setPage] = useState(1);
  const [forceUpdate, setForceUpdate] = useState(false);
  console.log(data);
  useEffect(() => {
    axios
      .get(`${baseUrl}/users/?page=${page}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("acc-token")}`,
        },
      })
      .then((res) => setData(res.data))
      .catch((err) => notifyError("Something went wrong!"));
  }, [page, forceUpdate]);

  return (
    <>
      {!data?.results && (
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
      {data?.results && (
        <>
          <Pagination
            variant="outlined"
            color="primary"
            count={Math.ceil(data.count / 6)}
            page={page}
            onChange={(event, value) => setPage(value)}
            sx={{ mb: "10px" }}
          />
          <TableContainer
            component={Paper}
            sx={{
              borderRadius: "7px !important",
              boxShadow:
                "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px !important",
            }}
          >
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="left">Name</StyledTableCell>
                  <StyledTableCell align="left">Email</StyledTableCell>
                  <StyledTableCell align="left">Phone Number</StyledTableCell>
                  <StyledTableCell align="left">Active Status</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.results.map((user) => (
                  <StyledTableRow key={user.id}>
                    <StyledTableCell align="left">{`${user.first_name} ${user.last_name}`}</StyledTableCell>
                    <StyledTableCell align="left">{user.email}</StyledTableCell>
                    <StyledTableCell align="left">
                      {user.phone_number}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <MySwitch user={user} setForceUpdate={setForceUpdate} />
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  );
};
export default Members;
