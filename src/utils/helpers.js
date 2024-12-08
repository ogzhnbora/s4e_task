export const getSeverityDetails = (score) => {
  if (score >= 9) return { label: "Critical", color: "#4c0678" }; // Purple
  if (score >= 7) return { label: "High", color: "#ad1010" }; // Red
  if (score >= 4) return { label: "Medium", color: "#eb7a34" }; // Orange
  if (score >= 0) return { label: "Low", color: "#008000" }; // Green
  return { label: "Unknown", color: "#808080" }; // Gray
};
