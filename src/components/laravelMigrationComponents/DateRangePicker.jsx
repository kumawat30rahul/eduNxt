const DateRangePicker = ({ value, onChange }) => {
  return (
    <div className="date-range-picker">
      <select name="period" id="period" value={value} onChange={onChange}>
        <option value="week">Last 7 days</option>
        <option value="month">Last 30 days</option>
        <option value="quarter">Last 90 days</option>
      </select>
    </div>
  );
};

export default DateRangePicker;
