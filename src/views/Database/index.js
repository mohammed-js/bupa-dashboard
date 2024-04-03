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
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { arNumToEnNum } from "../utilities/general";
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
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  outline: "none",
  border: "none",
  borderRadius: "5px",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
};
const Database = () => {
  const [data, setData] = useState({});
  const [currentItem, setCurrentItem] = useState({});
  // const [type, setType] = useState("add");
  const [endpoint, setEndpoint] = useState("plan");
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  // const [idQuery, setIdQuery] = useState("");
  const searchKey = endpoint !== "broker" ? "search" : "name";
  const queryBuilder = `?${page ? `page=${page}` : ""}${
    searchQuery ? `&${searchKey}=${searchQuery}` : ""
  }`;
  const handleChange = (event) => {
    setData({});
    setEndpoint(event.target.value);
    setSearchQuery("");
  };
  const [forceUpdate, setForceUpdate] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = (item) => {
    setOpen(true);
    item?.name && setCurrentItem(item);
  };
  const handleClose = () => {
    setOpen(false);
    setCurrentItem({});
  };
  useEffect(() => {
    // setData({});
    axios
      .get(`${baseUrl}/translator/${endpoint}/${queryBuilder}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("acc-token")}`,
        },
      })
      .then((res) => setData(res.data))
      .catch((err) => notifyError("Something went wrong!"));
  }, [endpoint, page, forceUpdate]);
  const update = (event) => {
    event.preventDefault();
    const form = event.target;
    setOpen(false);
    setData({});
    // -----
    const en_name = form?.elements["en_name"]?.value;
    const ar_name = form?.elements["ar_name"]?.value;
    const regulator_id = form?.elements["regulator_id"]?.value;
    const percentage = form?.elements["percentage"]?.value;
    // -----
    let body;
    let method;
    let path;
    if (currentItem?.name) {
      method = "patch";
      path = `${baseUrl}/translator/${endpoint}/${currentItem.id}`;
    } else {
      method = "post";
      path = `${baseUrl}/translator/${endpoint}/`;
    }
    if (endpoint !== "broker") {
      body = {
        name: en_name,
        translate: ar_name,
      };
    } else {
      body = {
        name: en_name,
        regulator_id: +regulator_id,
        percentage: percentage + "%",
      };
    }

    axios[method](path, body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("acc-token")}`,
      },
    })
      .then((res) => {
        setForceUpdate((prev) => !prev);
        setCurrentItem({});
      })
      .catch((err) => {
        notifyError("Something went wrong!");
        setForceUpdate((prev) => !prev);
        setCurrentItem({});
      });
  };
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form" sx={style} onSubmit={update}>
          <Box
            sx={{ textAlign: "center", fontWeight: "bold", fontSize: "20px" }}
          >
            {currentItem?.name ? "Update" : "Add"} {endpoint}
          </Box>
          <TextField
            label="English Name"
            id="en_name"
            defaultValue={currentItem?.name ? currentItem.name : ""}
            size="small"
            required
          />
          {endpoint !== "broker" && (
            <TextField
              label="Arabic Name"
              id="ar_name"
              defaultValue={currentItem?.translate ? currentItem.translate : ""}
              size="small"
              required
            />
          )}
          {endpoint === "broker" && (
            <>
              <TextField
                label="Regulator ID"
                id="regulator_id"
                defaultValue={
                  currentItem?.regulator_id ? currentItem.regulator_id : ""
                }
                size="small"
                required
              />
              <TextField
                label="Percentage"
                id="percentage"
                defaultValue={
                  currentItem?.percentage
                    ? currentItem.percentage.replace(/%/g, "")
                    : ""
                }
                onInput={(e) => {
                  const input = e.target;
                  // Regular expression to allow only numerical characters
                  var regex = /^[0-9]*$/;

                  // Get the input value
                  var value = input.value;

                  // Check if the value matches the regex
                  if (!regex.test(value)) {
                    // If not, remove non-numerical characters
                    input.value = value.replace(/\D/g, "");
                  }
                }}
                size="number"
                type="string"
                required
              />
            </>
          )}
          <Button
            type="submit"
            variant="contained"
            color={currentItem?.name ? "primary" : "success"}
            sx={{ color: "#fff" }}
          >
            {currentItem?.name ? "Update" : "Add"}
          </Button>
        </Box>
      </Modal>
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
          <MenuItem value="plan">Plans</MenuItem>
          <MenuItem value="currency">Currency</MenuItem>
          <MenuItem value="disease">Disease</MenuItem>
          <MenuItem value="broker">Broker</MenuItem>
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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
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
            onChange={(e) => {
              setSearchQuery(e.target.value);

              if (e.target.value === "") {
                setForceUpdate((prev) => !prev);
              }
            }}
            value={searchQuery}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon
              onClick={() => {
                setForceUpdate((prev) => !prev);
              }}
            />
          </IconButton>
        </Paper>
        <IconButton color="primary" aria-label="add to shopping cart">
          <AddCircleIcon
            color="success"
            sx={{ fontSize: 30 }}
            onClick={() => {
              handleOpen();
            }}
          />
        </IconButton>
      </Box>
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
                  <StyledTableCell align="left">En</StyledTableCell>
                  {endpoint !== "broker" && (
                    <StyledTableCell align="left">Ar</StyledTableCell>
                  )}
                  {endpoint === "broker" && (
                    <>
                      <StyledTableCell align="left">
                        Regulator ID
                      </StyledTableCell>
                      <StyledTableCell align="left">Percentage</StyledTableCell>
                    </>
                  )}
                  <StyledTableCell align="left">Created At</StyledTableCell>
                  <StyledTableCell align="left">Updated At</StyledTableCell>
                  <StyledTableCell align="right">Edit</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.results.map((item, i) => (
                  <StyledTableRow key={item.id + Math.random()}>
                    <StyledTableCell align="left">{item.name} </StyledTableCell>
                    {endpoint !== "broker" && (
                      <StyledTableCell align="left">
                        {item.translate}
                      </StyledTableCell>
                    )}
                    {endpoint === "broker" && (
                      <>
                        <StyledTableCell align="left">
                          {item.regulator_id}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {item.percentage ? item.percentage : "-"}
                        </StyledTableCell>
                      </>
                    )}
                    <StyledTableCell align="left">
                      {new Date(item.created_at).toLocaleString()}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {new Date(item.updated_at).toLocaleString()}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <IconButton
                        color="primary"
                        aria-label="add to shopping cart"
                      >
                        <EditIcon
                          onClick={() => {
                            handleOpen(item);
                          }}
                        />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      {Array.isArray(data?.results) && data?.results.length == 0 && (
        <Box
          sx={{
            height: "300px",
            fontSize: "30px",
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
            borderRadius: "3px",
            backgroundColor: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          No Data Found
        </Box>
      )}
    </>
  );
};
export default Database;
