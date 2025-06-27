import axios from "axios";

const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});



export const executeCode = async ({label,version}:{
    label: string
    version: string
  },sourceCode: string) => {
  const response = await API.post("/execute", {
    language: label.toLowerCase(),
    version: version, 
    files: [
      {
        content: sourceCode,
      },
    ],
  });
  return response.data;
};
