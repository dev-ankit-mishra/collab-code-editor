import axios from "axios";

const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

export const executeCode = async (sourceCode: string) => {
  const response = await API.post("/execute", {
    language: "javascript",
    version: "1.32.3", // ✅ replace with latest version
    files: [
      {
        content: sourceCode,
      },
    ],
  });
  return response.data;
};
