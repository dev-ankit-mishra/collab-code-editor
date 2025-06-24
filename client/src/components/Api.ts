import axios from "axios";

export const executeCode = async (sourceCode: string, language = "javascript") => {
  const response = await axios.post("http://localhost:3001/api/run", {
    language,
    code: sourceCode,
  });

  return response.data;
};

