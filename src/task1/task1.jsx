import { useState } from "react";
import PostsList from "../components/posts/postList";
import UsersList from "../components/users/userList";
import CommonButton from "../components/commonButton/commonButton";

const TaskOne = () => {
  const [selectedTab, setSelectedTab] = useState("posts");
  return (
    <div>
      <div className="flex gap-3 pl-4">
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
        {selectedTab === "posts" && (
          <div>
            {/* Here you would render the posts component */}
            <PostsList />
          </div>
        )}
        {selectedTab === "users" && (
          <div>
            <UsersList />
            {/* Here you would render the users component */}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskOne;
