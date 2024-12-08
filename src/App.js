import React, { useEffect, useState } from "react";
import { Box, CssBaseline, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Filters from "./components/Filters";
import ToolTable from "./components/ToolTable";
import Pagination from "./components/Pagination";
import { fetchPage } from "./api/api";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { getSeverityDetails } from "./utils/helpers";

function App() {
  const [allTools, setAllTools] = useState([]);
  const [filteredTools, setFilteredTools] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(false);
  const [severityFilter, setSeverityFilter] = useState("");
  const [assetTypeFilter, setAssetTypeFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const totalCount = 7639;
  const itemsPerPage = 15;
  const totalPages = Math.ceil(filteredTools.length / itemsPerPage);

  useEffect(() => {
    const savedSeverityFilter = localStorage.getItem("severityFilter") || "";
    const savedAssetTypeFilter = localStorage.getItem("assetTypeFilter") || "";
    const savedSearchTerm = localStorage.getItem("searchTerm") || "";

    setSeverityFilter(savedSeverityFilter);
    setAssetTypeFilter(savedAssetTypeFilter);
    setSearchTerm(savedSearchTerm);
  }, []);

  useEffect(() => {
    const loadInitialData = async () => {
      setFetching(true);
      try {
        for (let page = 1; page <= 4; page++) {
          const data = await fetchPage(page);
          setAllTools((prev) => [...prev, ...data]);
          setFilteredTools((prev) => [...prev, ...data]);
        }
        loadRemainingData(5);
      } catch (error) {
        console.error("Error loading initial data:", error);
      } finally {
        setFetching(false);
      }
    };

    const loadRemainingData = async (startingPage) => {
      let page = startingPage;

      while (page <= Math.ceil(totalCount / 100)) {
        const data = await fetchPage(page);
        if (!data.length) break;
        setAllTools((prev) => [...prev, ...data]);
        setFilteredTools((prev) => [...prev, ...data]);
        page++;
      }
    };

    loadInitialData();
  }, []);

  useEffect(() => {
    let data = allTools;

    if (severityFilter) {
      data = data.filter((tool) => getSeverityDetails(tool.score).label === severityFilter);
    }
    if (assetTypeFilter) {
      data = data.filter((tool) => tool.asset_type === assetTypeFilter);
    }
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      data = data.filter(
        (tool) =>
          (tool.name && tool.name.toLowerCase().includes(term)) ||
          (tool.mini_desc && tool.mini_desc.toLowerCase().includes(term)) ||
          (tool.asset_type && tool.asset_type.toLowerCase().includes(term))
      );
    }

    setFilteredTools(data);
  }, [severityFilter, assetTypeFilter, searchTerm, allTools]);

  const handleSeverityChange = (value) => {
    setSeverityFilter(value);
    localStorage.setItem("severityFilter", value);
  };

  const handleAssetTypeChange = (value) => {
    setAssetTypeFilter(value);
    localStorage.setItem("assetTypeFilter", value);
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    localStorage.setItem("searchTerm", value);
  };

  const paginatedTools = filteredTools.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  const theme = createTheme({
    palette: {
      mode: isDarkTheme ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box display="flex" flexDirection="column" height="100vh">
        <Header />
        <Box display="flex" flexGrow={1} overflow="hidden">
          <Sidebar isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />
          <Box flexGrow={1} padding="16px" overflow="auto">
          <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                marginBottom: "16px",
                textAlign: "left", // Sola hizalama
                marginLeft: "16px", // Sol boşluk
              }}
            >
              Free Tools
            </Typography>
            <Filters
              searchTerm={searchTerm}
              severityFilter={severityFilter}
              assetTypeFilter={assetTypeFilter}
              onSearchChange={(e) => handleSearchChange(e.target.value)}
              onSeverityChange={(e) => handleSeverityChange(e.target.value)}
              onAssetTypeChange={(e) => handleAssetTypeChange(e.target.value)}
            />
            <ToolTable tools={paginatedTools} />

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onNextPage={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              onPreviousPage={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
