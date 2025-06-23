import { useState } from "react";
import CommonButton from "../components/commonButton/CommonButton";
import PostsList from "../components/posts/postList";
import UsersList from "../components/users/userList";
import BackButton from "../components/backButton/BackButton";

const TaskOne = () => {
  const [selectedTab, setSelectedTab] = useState("users");
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3">
        <BackButton />
        <CommonButton
          label={"Users"}
          value={"users"}
          onClick={() => setSelectedTab("users")}
          isSelected={selectedTab}
        />
        <CommonButton
          label={"Posts"}
          value={"posts"}
          onClick={() => setSelectedTab("posts")}
          isSelected={selectedTab}
        />
      </div>
      <div>
        <span className="text-7xl font-bold">
          {selectedTab === "posts" ? "Posts" : "Users"}
        </span>
      </div>
      <div>
        {selectedTab === "users" && <UsersList />}
        {selectedTab === "posts" && <PostsList />}
      </div>
    </div>
  );
};

export default TaskOne;
