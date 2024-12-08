import React from "react";
import { Box, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

function Filters({ searchTerm, severityFilter, assetTypeFilter, onSearchChange, onSeverityChange, onAssetTypeChange }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" }, 
        gap: "16px",
        marginBottom: "16px",
        alignItems: { xs: "stretch", sm: "center" }, 
      }}
    >
      {/* Search Bar */}
      <TextField
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={onSearchChange}
        sx={{
          width: { xs: "100%", sm: 400 }, 
        }}
      />

      {/* Severity Dropdown */}
      <FormControl
        sx={{
          minWidth: { xs: "100%", sm: 200 }, 
        }}
      >
        <InputLabel>Severity</InputLabel>
        <Select value={severityFilter} onChange={onSeverityChange} label="Severity">
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Low">Low</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="High">High</MenuItem>
          <MenuItem value="Critical">Critical</MenuItem>
        </Select>
      </FormControl>

      {/* Asset Type Dropdown */}
      <FormControl
        sx={{
          minWidth: { xs: "100%", sm: 200 }, 
        }}
      >
        <InputLabel>Asset Type</InputLabel>
        <Select value={assetTypeFilter} onChange={onAssetTypeChange} label="Asset Type">
          <MenuItem value="">All</MenuItem>
          <MenuItem value="domain">domain</MenuItem>
          <MenuItem value="ipv4">ipv4</MenuItem>
          <MenuItem value="email">email</MenuItem>
          <MenuItem value="url">url</MenuItem>
          <MenuItem value="request">request</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default Filters;
