import axios from "axios";

const API_ENDPOINT = "/api/scan/list";
const API_TOKEN = "dabEb8qt3lYKz5nGfgPVgx9RxSq9DBjWLuOLkmtCToV4mQhQQcAPXX-MPuFJDB94bxbDJvFv6YpybTd6S3kLdQ";

export const fetchInitialTools = async () => {
  let allData = [];
  for (let page = 1; page <= 4; page++) {
    try {
      const response = await axios.post(API_ENDPOINT, {
        page,
        per_page: 100,
        token: API_TOKEN,
      });

      const data = response.data.value?.data || [];
      console.log(`Page ${page} - Data Length: ${data.length}`);
      console.log(`Total fetched data length: ${allData.length + data.length}`);

      if (!data.length) break; 
      allData = [...allData, ...data]; 
    } catch (error) {
      console.error("Error fetching initial tools:", error);
      break; 
    }
  }
  return allData;
};


export const fetchRemainingTools = async (startingPage = 5) => {
  let allData = [];
  let page = startingPage;

  while (true) {
    try {
      const response = await axios.post(API_ENDPOINT, {
        page,
        per_page: 100,
        token: API_TOKEN,
      });

      const data = response.data.value?.data || [];
      console.log(`Page ${page} - Data Length: ${data.length}`);
      console.log(`Total fetched data length: ${allData.length + data.length}`);

      if (!data.length) break; 
      allData = [...allData, ...data]; 
      page++; 
    } catch (error) {
      break; 
    }
  }
  return allData;
};

export const fetchPage = async (page) => {
  try {
    const response = await axios.post(API_ENDPOINT, {
      page,
      per_page: 100,
      token: API_TOKEN,
    });

    return response.data.value?.data || [];
  } catch (error) {
    console.error(`Error fetching page ${page}:`, error);
    return [];
  }
};
