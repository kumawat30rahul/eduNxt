import { useState } from "react";
import {
  Download,
  FileText,
  Database,
  Check,
  AlertCircle,
  X,
} from "lucide-react";
import CommonButton from "../commonButton/commonButton";

const ExportButton = ({ rows, columns }) => {
  const [openFileNameModal, setOpenFileNameModal] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportStatus, setExportStatus] = useState(null); // 'success' | 'error' | null
  const [fileName, setFileName] = useState("");
  const [type, setSelectType] = useState("csv");

  const getIcon = () => {
    switch (type) {
      case "csv":
        return <FileText className="w-4 h-4" />;
      case "json":
        return <Database className="w-4 h-4" />;
      default:
        return <Download className="w-4 h-4" />;
    }
  };

  const exportFunction = (blob, finalFileName) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = finalFileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExport = async (customFileName) => {
    setIsExporting(true);
    setExportStatus(null);
    setOpenFileNameModal(false);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const finalFileName = customFileName || `data.${type}`;
      if (type === "csv") {
        const csvContent = rows
          .map((row) => columns.map((col) => row[col.key] || "").join(","))
          .join("\n");
        const blob = new Blob([csvContent], { type: "text/csv" });
        exportFunction(blob, finalFileName);
      } else if (type === "json") {
        const jsonData = JSON.stringify(rows, null, 2);
        const blob = new Blob([jsonData], { type: "application/json" });
        exportFunction(blob, finalFileName);
      } else {
        throw new Error("Unsupported export type");
      }

      setExportStatus("success");
      setTimeout(() => setExportStatus(null), 2000);
    } catch (error) {
      setExportStatus("error");
      setTimeout(() => setExportStatus(null), 3000);
    } finally {
      setIsExporting(false);
    }
  };

  const handleSave = () => {
    const customFileName = fileName.trim() || `data.${type}`;
    const finalFileName = customFileName.endsWith(`.${type}`)
      ? customFileName
      : `${customFileName}.${type}`;

    setFileName("");
    handleExport(finalFileName);
  };

  return (
    <>
      {/* Modal Backdrop */}
      {openFileNameModal && (
        <div className="fixed inset-0 backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-auto transform transition-all flex flex-col gap-4 p-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-2 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Export File
              </h3>
              <X
                className="w-8 h-8 text-red-500 cursor-pointer hover:text-gray-500 rounded-full bg-gray-200/20 hover:bg-gray-200 p-1"
                onClick={() => setOpenFileNameModal(false)}
              />
            </div>
            <div className="flex gap-2">
              <CommonButton
                lable="CSV"
                value="csv"
                onClick={() => setSelectType("csv")}
                isSelected={type}
                className="text-black hover:text-white"
              >
                CSV
              </CommonButton>
              <CommonButton
                lable="JSON"
                value="json"
                onClick={() => setSelectType("json")}
                isSelected={type}
                className="text-black hover:text-white"
              >
                JSON
              </CommonButton>
            </div>

            {/* Modal Body */}
            <div className="">
              <div className="">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    File Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={fileName}
                      onChange={(e) => setFileName(e.target.value)}
                      placeholder={`my-export.${type}`}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 placeholder-gray-400"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          handleSave();
                        }
                      }}
                      autoFocus
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <span className="text-sm text-gray-400">.{type}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Leave empty to use default name
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 bg-gray-50 rounded-b-xl">
              <CommonButton
                onClick={() => setOpenFileNameModal(false)}
                className="flex-1 px-4 py-2.5 text-black bg-red-400 border border-gray-300 rounded-lg hover:bg-red-600 transition-colors font-medium"
              >
                Cancel
              </CommonButton>
              <CommonButton
                onClick={handleSave}
                className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
              >
                {getIcon()}
                Export
              </CommonButton>
            </div>
          </div>
        </div>
      )}

      {/* Export Button */}
      <div>
        <CommonButton
          onClick={() => setOpenFileNameModal(true)}
          disabled={isExporting}
        >
          Export
        </CommonButton>
      </div>
    </>
  );
};

export default ExportButton;
