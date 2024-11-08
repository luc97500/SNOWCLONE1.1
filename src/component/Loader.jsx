import React, { useState, useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import Skeleton from '@mui/material/Skeleton';
import { styled } from "@mui/material/styles";

const CenteredOverlay = styled(Box)(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
  backgroundColor: "rgba(0, 0, 0, 0.3)",
}));

const LoadingOverlay = ({ isLoading, children }) => {
  return (
    <Box sx={{ position: "relative", width: "100%", height: "100vh" }}>
      {isLoading && (
        <CenteredOverlay>
          <CircularProgress />
        </CenteredOverlay>
      )}
      <Box>{children}</Box>
    </Box>
  );
};

export const Loading = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LoadingOverlay isLoading={loading}>
      <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Full viewport height
        width: '100vw', // Full viewport width
        zIndex: 1000,
      }}
    >
      <Box
        sx={{
          width: 300,
          display: 'flex',
          flexDirection: 'column',
          gap: 2, // Adjust gap between Skeletons
          justifyContent: 'center',
        }}
      >
        <Skeleton />
        <Skeleton animation="wave" />
        <Skeleton animation={false} />
      </Box>
    </Box>
    </LoadingOverlay>
  );
};
