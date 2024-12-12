import React, { useEffect, useState } from "react";
import { Box, CssBaseline, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Filters from "./components/Filters";
import ToolTable from "./components/ToolTable";
import Pagination from "./components/Pagination";
import { fetchInitialTools } from "./api/api";
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
  const [totalCount, setTotalCount] = useState(0); // Total count API'den alınacak

  const itemsPerPage = 15;

  useEffect(() => {
    const loadInitialData = async () => {
      setFetching(true);
      console.log("Fetching data for page:", currentPage);
      try {
        const { tools = [], totalCount: apiTotalCount = 0 } = await fetchInitialTools(currentPage);
    
        console.log("total count from API:", apiTotalCount);
    
        setAllTools((prevTools) => [...prevTools, ...tools]); // Önceki verilere ekleme
        setFilteredTools((prevTools) => [...prevTools, ...tools]);
        setTotalCount(apiTotalCount || 0);
      } catch (error) {
        console.error("Error fetching initial tools:", error);
        setAllTools([]);
        setFilteredTools([]);
      } finally {
        setFetching(false);
      }
    };
    
    if (!isNaN(currentPage) && currentPage > 0) {
      loadInitialData();
    } else {
      console.error("Invalid page number:", currentPage);
    }
  }, [currentPage]);
  useEffect(() => {
    const updateFilteredTools = () => {
      let data = allTools;
  
      if (severityFilter) {
        console.log("Applying severity filter:", severityFilter);
        data = data.filter((tool) => getSeverityDetails(tool.score).label === severityFilter);
      }
      if (assetTypeFilter) {
        console.log("Applying asset type filter:", assetTypeFilter);
        data = data.filter((tool) => tool.asset_type === assetTypeFilter);
      }
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        console.log("Applying search term filter:", searchTerm);
        data = data.filter(
          (tool) =>
            (tool.name && tool.name.toLowerCase().includes(term)) ||
            (tool.mini_desc && tool.mini_desc.toLowerCase().includes(term)) ||
            (tool.asset_type && tool.asset_type.toLowerCase().includes(term))
        );
      }
  
      console.log("Filtered Tools:", data);
      setFilteredTools(data);
    };
  
    updateFilteredTools();
  }, [currentPage, allTools, severityFilter, assetTypeFilter, searchTerm]);
  
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

  const totalPages = totalCount > 0 ? Math.ceil(totalCount / itemsPerPage) : 1;
  console.log("Total Pages:", totalPages); // Debug log  
  const paginatedTools = (filteredTools || []).slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
    
  );
  console.log("Paginated Tools for Current Page:", paginatedTools);

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
                textAlign: "left",
                marginLeft: "16px",
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
