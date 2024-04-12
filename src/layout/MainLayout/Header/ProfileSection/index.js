import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Avatar } from "@mui/material";
import admin from "../../../../assets/images/bupa/admin.svg";

// ==============================|| PROFILE MENU ||============================== //

const ProfileSection = () => {
  const theme = useTheme();
  const anchorRef = useRef(null);

  return (
    <>
      <Avatar
        src={admin}
        sx={{
          ...theme.typography.mediumAvatar,
          margin: "8px 0 8px 8px !important",
          cursor: "pointer",
        }}
        ref={anchorRef}
        color="inherit"
        style={{ cursor: "initial" }}
      />
    </>
  );
};

export default ProfileSection;
