import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

function Pagination({ currentPage, totalPages, onNextPage, onPreviousPage }) {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" marginTop="16px">
      <IconButton onClick={onPreviousPage} disabled={currentPage === 1}>
        <ArrowBack />
      </IconButton>
      <Typography variant="body2" sx={{ margin: "0 16px" }}>
        Page {currentPage} of {totalPages}
      </Typography>
      <IconButton onClick={onNextPage} disabled={currentPage === totalPages}>
        <ArrowForward />
      </IconButton>
    </Box>
  );
}

export default Pagination;
