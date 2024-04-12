import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Avatar } from "@mui/material";
import admin from "../../../../assets/images/bupa/admin.svg";

// ==============================|| PROFILE MENU ||============================== //

const ProfileSection = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

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
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        color="inherit"
        style={{ cursor: "initial" }}
      />
    </>
  );
};

export default ProfileSection;
