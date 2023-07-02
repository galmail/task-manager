import React, { PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Box, Toolbar, Typography, IconButton } from "@mui/material";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";

type TopBarProps = {
  title: string;
  canGoBack?: boolean;
};

function TopBar({
  title,
  canGoBack,
  children,
}: PropsWithChildren<TopBarProps>) {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {canGoBack && (
            <IconButton
              onClick={() => navigate(-1)}
              size="large"
              edge="start"
              color="inherit"
              aria-label="back"
              sx={{ mr: 2 }}
            >
              <ArrowBackIosNewOutlinedIcon />
            </IconButton>
          )}
          <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          {children}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default TopBar;
