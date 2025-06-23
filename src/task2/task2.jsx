import { useState } from "react";
import UsersList from "../components/users/userList";
import ProductsTable from "../components/products/ProductsTable";
import CommonButton from "../components/commonButton/CommonButton";
import CommentsTable from "../components/commentsTable/CommentsTable";
import { ArrowLeftCircle } from "lucide-react";
import BackButton from "../components/backButton/BackButton";

const TaskTwo = () => {
  const [selectedTab, setSelectedTab] = useState("products");
  return (
    <div>
      <div className="flex gap-3 pl-4 items-center">
        <BackButton />
        <CommonButton
          label="Products"
          value="products"
          onClick={() => setSelectedTab("products")}
          isSelected={selectedTab}
        />
        <CommonButton
          label="Comments"
          value="comments"
          onClick={() => setSelectedTab("comments")}
          isSelected={selectedTab}
        />
      </div>
      <div>
        {selectedTab === "products" && <ProductsTable />}
        {selectedTab === "comments" && <CommentsTable />}
      </div>
    </div>
  );
};

export default TaskTwo;
