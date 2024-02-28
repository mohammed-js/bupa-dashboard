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
import Pagination from "@mui/material/Pagination";
import MySwitch from "../../ui-component/mini-components/MySwitch";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";

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

const Database = () => {
  const [age, setAge] = useState("");
  const [endpoint, setEndpoint] = useState("documents");

  const handleChange = (event) => {
    setEndpoint(event.target.value);
  };
  const [data, setData] = useState({});
  const [page, setPage] = useState(1);
  const [forceUpdate, setForceUpdate] = useState(false);
  console.log(data);
  useEffect(() => {
    // setData({});
    axios
      .get(`${baseUrl}/${endpoint}/?page=${page}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("acc-token")}`,
        },
      })
      .then((res) => setData(res.data))
      .catch((err) => notifyError("Something went wrong!"));
  }, [endpoint, page, forceUpdate]);

  return (
    <>
      <FormControl
        sx={{ mb: "10px", minWidth: 120, borderRadius: "8px !important" }}
        size="small"
        style={{ borderRadius: "5px !important" }}
      >
        <InputLabel
          id="demo-select-small-label"
          style={{ borderRadius: "5px !important" }}
        >
          Type
        </InputLabel>
        <Select
          style={{ borderRadius: "5px !important" }}
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={endpoint}
          label="Type"
          onChange={handleChange}
        >
          <MenuItem value="documents">Documents</MenuItem>
          <MenuItem value="documents2">Documents2</MenuItem>
          <MenuItem value="documents3">Documents3</MenuItem>
        </Select>
      </FormControl>
      <Pagination
        variant="outlined"
        color="primary"
        count={Math.ceil(data.count / 6)}
        page={page}
        onChange={(event, value) => setPage(value)}
        sx={{
          mb: "10px",
        }}
      />
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 300,
          height: 40,
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
          borderRadius: "3px",
          mb: "10px",
        }}
      >
        <InputBase
          sx={{
            ml: 1,
            flex: 1,
            border: "none !important",
            outline: "none !important",
            "& :focus": {
              border: "none !important",
              outline: "none !important",
            },
          }}
          placeholder="Search by name..."
          inputProps={{ "aria-label": "search google maps" }}
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
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
                  <StyledTableCell align="left">
                    English Certificate
                  </StyledTableCell>
                  <StyledTableCell align="left">National IDs</StyledTableCell>
                  <StyledTableCell align="left">
                    Arabic (Translated) Certificate
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.results.map((user, i) => (
                  <StyledTableRow key={user.id + Math.random()}>
                    <StyledTableCell align="left">{`${user.uploaded_by.first_name} ${user.uploaded_by.last_name}`}</StyledTableCell>
                    <StyledTableCell align="left">
                      {user.uploaded_by.email}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {user.uploaded_by.phone_number}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <a href={user.certificate} target="_blank">
                        en certificate
                      </a>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {user.national_ids.map((id, i) => (
                        <a
                          href={id.image}
                          target="_blank"
                          style={{ display: "block" }}
                        >
                          ID {i + 1}
                        </a>
                      ))}
                    </StyledTableCell>

                    <StyledTableCell align="left">
                      {user.certificate_arabic ? (
                        <a href={user.certificate_arabic} target="_blank">
                          ar certificate
                        </a>
                      ) : (
                        "-"
                      )}
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
export default Database;
