import React from "react";
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Paper, Typography, useTheme } from "@mui/material";
import { getSeverityDetails } from "../utils/helpers";

function ToolTable({ tools }) {
  const theme = useTheme(); // Temayı al

  const isMobile = window.innerWidth <= 600; // Mobil kontrolü

  return (
    <Box sx={{ overflowX: "auto", margin: "0 auto", padding: "16px" }}>
      <Paper
        sx={{
          overflowX: "auto",
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          backgroundColor: theme.palette.background.paper, // Tema arka planına göre ayarla
        }}
      >
        {isMobile ? (
          // Mobil görünüm: Kart şeklinde göster
          tools.map((tool, index) => {
            const { label, color } = getSeverityDetails(tool.score);
            return (
              <Box
                key={index}
                sx={{
                  border: `1px solid ${theme.palette.divider}`, // Tema bölücü rengi
                  borderRadius: "8px",
                  padding: "16px",
                  marginBottom: "16px",
                  backgroundColor: theme.palette.background.default, // Tema varsayılan arka plan
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Name: {tool.name || "N/A"}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  Description: {tool.mini_desc || "N/A"}
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: "white",
                    backgroundColor: color,
                    fontWeight: "bold",
                    textAlign: "center",
                    borderRadius: "16px",
                    padding: "8px 12px",
                    display: "inline-block",
                    width: "fit-content",
                  }}
                >
                  {label}
                </Typography>
              </Box>
            );
          })
        ) : (
          // Masaüstü görünüm: Tablo formatında göster
          <Table sx={{ minWidth: 500, borderCollapse: "separate", borderSpacing: "0 8px" }}>
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: theme.palette.background.default, // Tema arka planına göre ayarla
                  "& th": {
                    fontWeight: "bold",
                    color: theme.palette.text.primary, // Tema metin rengi
                    textAlign: "left",
                    padding: "12px",
                  },
                }}
              >
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Severity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tools.map((tool, index) => {
                const { label, color } = getSeverityDetails(tool.score);
                return (
                  <TableRow
                    key={index}
                    sx={{
                      backgroundColor: theme.palette.background.paper, // Tema arka planına göre ayarla
                      boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.05)",
                      borderRadius: "8px",
                      "&:hover": {
                        backgroundColor: theme.palette.action.hover, // Hover etkisi temaya göre
                      },
                    }}
                  >
                    <TableCell
                      sx={{
                        padding: "12px",
                        fontWeight: "bold",
                        color: theme.palette.text.primary, // Tema metin rengi
                      }}
                    >
                      {tool.name || "N/A"}
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "12px",
                        color: theme.palette.text.secondary, // Tema ikincil metin rengi
                        fontSize: "0.95rem",
                      }}
                    >
                      {tool.mini_desc || "N/A"}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "white",
                        backgroundColor: color,
                        fontWeight: "bold",
                        textAlign: "center",
                        borderRadius: "16px",
                        padding: "8px 12px",
                        width: "fit-content",
                        margin: "auto",
                        display: "inline-block",
                      }}
                    >
                      {label}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </Paper>
    </Box>
  );
}

export default ToolTable;
