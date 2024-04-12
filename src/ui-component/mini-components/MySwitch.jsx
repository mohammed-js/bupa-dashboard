import { useState } from "react";
import Switch from "@mui/material/Switch";
import { baseUrl } from "../../views/utilities/general";
import axios from "axios";
import { notifySuccess, notifyError } from "../../utils/toastify";

export default function MySwitch({ user, setForceUpdate }) {
  const [status, setStatus] = useState(user.is_active);
  const updateStatus = () => {
    axios
      .patch(
        `${baseUrl}/users/${user.id}/`,
        { is_active: !user.is_active },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("bupa-acc-token")}`,
          },
        }
      )
      .then((res) => {
        setForceUpdate((prev) => !prev);
        notifySuccess(
          `${user.first_name} ${user.last_name} status is updated successfully!`
        );
      })
      .catch((err) => {
        notifyError("Something went wrong!");
        setStatus((prev) => !prev);
      });
  };
  return (
    <Switch
      checked={status}
      onChange={() => {
        setStatus((prev) => !prev);
        updateStatus(user.id, user.is_active);
      }}
      inputProps={{ "aria-label": "controlled" }}
    />
  );
}
