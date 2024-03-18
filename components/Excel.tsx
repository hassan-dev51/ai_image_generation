"use client";
import React, { useState } from "react";
import * as XLSX from "xlsx";

interface ExcelData {
  id: number;
  name: string;
  // Add more fields as needed based on your Excel structure
}

const ExcelToJsonConverter = () => {
  const [jsonData, setJsonData] = useState<ExcelData[] | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const dataJson = XLSX.utils.sheet_to_json<ExcelData>(worksheet);
      setJsonData(dataJson);
    };

    if (file) {
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      {jsonData && <pre>{JSON.stringify(jsonData, null, 2)}</pre>}
    </div>
  );
};

export default ExcelToJsonConverter;
