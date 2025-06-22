import { useState } from "react";
import UsersList from "../components/users/userList";
import ProductsTable from "../components/products/productsTable";
import CommonButton from "../components/commonButton/commonButton";

const TaskTwo = () => {
  const [selectedTab, setSelectedTab] = useState("products");
  return (
    <div>
      <div className="flex gap-3 pl-4">
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
        {selectedTab === "products" && (
          <div>
            <ProductsTable />
          </div>
        )}
        {selectedTab === "comments" && (
          <div>
            <UsersList />
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskTwo;
