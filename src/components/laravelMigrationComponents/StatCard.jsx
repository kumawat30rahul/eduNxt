const StatCard = ({ stat, period }) => {
  const getIconClass = (iconName) => {
    const iconMap = {
      "dollar-sign": "$",
      users: "👥",
      "shopping-cart": "🛒",
      "chart-line": "📈",
    };
    return iconMap[iconName] || "📊";
  };

  return (
    <div className={`stat-card ${stat.trend}`}>
      <div className="stat-icon">
        <span>{getIconClass(stat.icon)}</span>
      </div>
      <div className="stat-content">
        <h3>{stat.title}</h3>
        <p className="stat-value">{stat?.[period]?.toLocaleString()}</p>
        <span className="stat-change">{stat.change}% from last period</span>
      </div>
    </div>
  );
};

export default StatCard;
