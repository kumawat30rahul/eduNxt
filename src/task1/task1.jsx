import { useState } from "react";
import CommonButton from "../components/commonButton/commonButton";
import PostsList from "../components/posts/postList";
import UsersList from "../components/users/userList";

const TaskOne = () => {
  const [selectedTab, setSelectedTab] = useState("posts");
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3">
        <CommonButton
          label={"Posts"}
          value={"posts"}
          onClick={() => setSelectedTab("posts")}
          isSelected={selectedTab}
        />
        <CommonButton
          label={"Users"}
          value={"users"}
          onClick={() => setSelectedTab("users")}
          isSelected={selectedTab}
        />
      </div>
      <div>
        <span className="text-7xl font-bold">
          {selectedTab === "posts" ? "Posts" : "Users"}
        </span>
      </div>
      <div>
        {selectedTab === "posts" && <PostsList />}
        {selectedTab === "users" && <UsersList />}
      </div>
    </div>
  );
};

export default TaskOne;
