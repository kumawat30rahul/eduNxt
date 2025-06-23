# DataTable Component

The `DataTable` component is a reusable, customizable table for displaying tabular data with features like sorting, pagination, column visibility, and search highlighting.

## Usage

Import and use the component in your page:

```jsx
import DataTable from "./components/dataTable/dataTable";

const columns = [
  { label: "ID", key: "id", sortable: true, visible: true },
  { label: "Name", key: "name", sortable: true, visible: true },
  // ...other columns
];

const rows = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  // ...other rows
];

<DataTable
  dataGridColumn={columns}
  dataGridRow={rows}
  loading={false}
  pagination={true}
  searchedText={"Alice"}
/>;
```

## Props

- **dataGridColumn**: `Array` — Column definitions (label, key, sortable, visible, etc.)
- **dataGridRow**: `Array` — Data rows to display.
- **loading**: `Boolean` — Show loading state.
- **pagination**: `Boolean` — Enable/disable pagination.
- **error**: `String` — Error message to display.
- **searchedText**: `String` — Text to highlight in table cells.

## Features

- Sorting by column (if `sortable: true`)
- Pagination (if `pagination: true`)
- Column visibility toggle (if implemented)
- Search text highlighting
- Custom cell rendering via `renderCell` in column definition
