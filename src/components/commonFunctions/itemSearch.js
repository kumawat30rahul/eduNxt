export const isItemMatchingSearch = (item, searchText, columns) => {
  if (!searchText) return true;

  const lowerSearch = searchText.toLowerCase();

  return columns?.some((col) => {
    if (!col?.filterable) return false;

    const value = item?.[col?.key];

    if (typeof value === "string") {
      return value?.toLowerCase()?.includes(lowerSearch);
    }

    if (typeof value === "number") {
      return value?.toString()?.includes(lowerSearch);
    }

    return false; // Skip other types
  });
};
