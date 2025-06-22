const ActivityItem = ({ activity }) => {
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    return `${Math.floor(diffInHours / 24)} days ago`;
  };

  return (
    <div className="activity-item">
      <div className="activity-avatar">
        <img src={activity.user.avatar} alt={activity.user.name} />
      </div>
      <div className="activity-content">
        <p>
          <strong>{activity.user.name}</strong> {activity.description}
        </p>
        <span className="activity-time">{formatTime(activity.created_at)}</span>
      </div>
    </div>
  );
};

export default ActivityItem;
