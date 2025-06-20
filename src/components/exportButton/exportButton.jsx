import { useState } from "react";
import { Download, FileText, Database, Check, AlertCircle } from "lucide-react";

const ExportButton = ({ type, rows, columns }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportStatus, setExportStatus] = useState(null); // 'success' | 'error' | null

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

  const getButtonStyle = () => {
    if (exportStatus === "success") {
      return "bg-green-500 hover:bg-green-600 border-green-500";
    }
    if (exportStatus === "error") {
      return "bg-red-500 hover:bg-red-600 border-red-500";
    }
    return "bg-blue-500 hover:bg-blue-600 border-blue-500";
  };

  const handleExport = async () => {
    setIsExporting(true);
    setExportStatus(null);

    try {
      // Add a small delay to show loading state
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (type === "csv") {
        // Logic to export data as CSV
        const csvContent = rows
          .map((row) => columns.map((col) => row[col.key] || "").join(","))
          .join("\n");
        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "data.csv";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else if (type === "json") {
        // Logic to export data as JSON
        const jsonData = JSON.stringify(rows, null, 2);
        const blob = new Blob([jsonData], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "data.json";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else {
        throw new Error("Unsupported export type");
      }

      setExportStatus("success");
      setTimeout(() => setExportStatus(null), 2000);
    } catch (error) {
      console.error("Export failed:", error);
      setExportStatus("error");
      setTimeout(() => setExportStatus(null), 3000);
    } finally {
      setIsExporting(false);
    }
  };

  const getButtonContent = () => {
    if (isExporting) {
      return (
        <>
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          <span>Exporting...</span>
        </>
      );
    }

    if (exportStatus === "success") {
      return (
        <>
          <Check className="w-4 h-4" />
          <span>Exported!</span>
        </>
      );
    }

    if (exportStatus === "error") {
      return (
        <>
          <AlertCircle className="w-4 h-4" />
          <span>Export Failed</span>
        </>
      );
    }

    return (
      <>
        {getIcon()}
        <span>Export as {type.toUpperCase()}</span>
      </>
    );
  };

  return (
    <div>
      <button
        onClick={handleExport}
        disabled={isExporting}
        className={`
          flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-white 
          border transition-all duration-200 shadow-sm hover:shadow-md
          focus:outline-none focus:ring-2 focus:ring-opacity-20
          disabled:opacity-70 disabled:cursor-not-allowed
          ${getButtonStyle()}
          ${type === "csv" ? "focus:ring-green-500" : "focus:ring-blue-500"}
        `}
      >
        {getButtonContent()}
      </button>

      {exportStatus && (
        <div
          className={`mt-2 text-xs flex items-center gap-1 ${
            exportStatus === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {exportStatus === "success" ? (
            <>
              <Check className="w-3 h-3" />
              <span>File downloaded successfully</span>
            </>
          ) : (
            <>
              <AlertCircle className="w-3 h-3" />
              <span>Export failed. Please try again.</span>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ExportButton;
