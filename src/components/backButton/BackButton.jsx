import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(-1)}
      className="flex items-center justify-center cursor-pointer"
    >
      <ArrowLeft />
    </div>
  );
};

export default BackButton;
