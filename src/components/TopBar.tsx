import React, { PropsWithChildren } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";

type TopBarProps = {
  title: string;
  goBack?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

function TopBar({ title, goBack, children }: PropsWithChildren<TopBarProps>) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {goBack && (
            <IconButton
              onClick={goBack}
              size="large"
              edge="start"
              color="inherit"
              aria-label="back"
              sx={{ mr: 2 }}
            >
              <ArrowBackIosNewOutlinedIcon />
            </IconButton>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          {children}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default TopBar;
