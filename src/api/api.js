import axios from "axios";

const API_ENDPOINT = "/api/scan/list";
const API_TOKEN = "dabEb8qt3lYKz5nGfgPVgx9RxSq9DBjWLuOLkmtCToV4mQhQQcAPXX-MPuFJDB94bxbDJvFv6YpybTd6S3kLdQ";

export const fetchInitialTools = async (page) => {
  try {
    const response = await axios.post(API_ENDPOINT, {
      page,
      per_page: 10,
      token: API_TOKEN,
    });

    const tools = response.data.value?.data || [];
    const totalCount = response.data.value?.total_count || 0;

    console.log(`Page ${page} - Tools:`, tools);
    console.log(`Total Count from API: ${totalCount}`);

    return { tools, totalCount }; // Hem tools hem de totalCount döndür
  } catch (error) {
    console.error("Error fetching initial tools:", error);
    return { tools: [], totalCount: 0 }; // Hata durumunda varsayılan değerler döndür
  }
};
