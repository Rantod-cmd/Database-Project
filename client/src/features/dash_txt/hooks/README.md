# Dashboard Text Hooks

This folder contains custom React hooks for managing province disease data in the dashboard text feature. These hooks provide a clean interface for fetching, filtering, and managing epidemiological data.

## Available Hooks

### 1. `useProvinceData`
Main hook for fetching paginated province disease data from the API.

```typescript
const {
  data,
  loading,
  error,
  totalPages,
  currentPage,
  totalCount,
  refetch,
  setPage,
} = useProvinceData({
  page: 1,
  limit: 9,
  order: "count_desc",
  risk: "all",
  search: "",
  region: "",
  minCases: 0,
});
```

**Parameters:**
- `page`: Current page number (default: 1)
- `limit`: Items per page (default: 9)
- `order`: Sort order - "count_asc", "count_desc", "name_asc", "name_desc" (default: "count_desc")
- `risk`: Risk level filter - "all", "normal", "warning", "emergency" (default: "all")
- `search`: Search query for province names (default: "")
- `region`: Region filter (default: "")
- `minCases`: Minimum case count filter (default: 0)

### 2. `useProvinceCount`
Hook for getting total count and summary of all provinces.

```typescript
const {
  data,
  loading,
  error,
  totalProvinces,
  refetch,
} = useProvinceCount({
  order: "count_desc",
});
```

### 3. `useProvinceFilters`
Hook for managing filter state with automatic page reset.

```typescript
const {
  filters,
  updateFilter,
  resetFilters,
  setSearch,
  setRegion,
  setRisk,
  setMinCases,
  setOrder,
  setPage,
} = useProvinceFilters(initialFilters);
```

### 4. `useProvinceStats`
Hook for calculating statistics from province data.

```typescript
const { stats } = useProvinceStats({ data });
```

**Returns statistics:**
- `totalCases`: Total cases across all provinces
- `totalProvinces`: Number of provinces
- `averageCasesPerProvince`: Average cases per province
- `highestCasesProvince`: Province with most cases
- `lowestCasesProvince`: Province with least cases
- `emergencyProvinces`: Count of emergency level provinces
- `warningProvinces`: Count of warning level provinces
- `normalProvinces`: Count of normal level provinces
- `topDiseases`: Top 5 diseases by case count

### 5. `useRegionMapping`
Hook for mapping provinces to their regions.

```typescript
const {
  getRegion,
  getAllRegions,
  getRegionLabel,
  regionLabels,
} = useRegionMapping();
```

### 6. `useProvinceDashboard` (Recommended)
Comprehensive hook that combines all other hooks for complete dashboard functionality.

```typescript
const {
  provinceData,
  provinceCount,
  stats,
  isLoading,
  isError,
  error,
  filters,
  regionMapping,
  updateFilter,
  resetFilters,
  refetch,
  setPage,
  currentPage,
  totalPages,
  totalCount,
} = useProvinceDashboard({
  initialFilters: {
    search: "",
    region: "",
    risk: "all",
    minCases: 0,
    order: "count_desc",
  },
});
```

## Usage Examples

### Basic Usage with Individual Hooks

```typescript
import { useProvinceData, useProvinceFilters } from '../hooks';

function MyComponent() {
  const filters = useProvinceFilters();
  const { data, loading, error } = useProvinceData({
    page: filters.filters.page,
    search: filters.filters.search,
    region: filters.filters.region,
    risk: filters.filters.risk,
    minCases: filters.filters.minCases,
    order: filters.filters.order,
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {/* Your component JSX */}
    </div>
  );
}
```

### Recommended Usage with Dashboard Hook

```typescript
import { useProvinceDashboard } from '../hooks';

function ProvincialDashboard() {
  const {
    provinceData,
    stats,
    isLoading,
    isError,
    error,
    filters,
    updateFilter,
    setPage,
    currentPage,
    totalPages,
  } = useProvinceDashboard();

  const handleSearch = (value: string) => {
    updateFilter('search', value);
  };

  const handleRegionChange = (value: string) => {
    updateFilter('region', value);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error}</div>;

  return (
    <div>
      <div>Total Cases: {stats.totalCases}</div>
      <div>Total Provinces: {stats.totalProvinces}</div>
      
      {/* Filter controls */}
      <input 
        value={filters.search}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search provinces..."
      />
      
      {/* Data display */}
      {provinceData.map(province => (
        <div key={province.provinceName}>
          <h3>{province.provinceName}</h3>
          <p>Cases: {province.totalCount}</p>
        </div>
      ))}
      
      {/* Pagination */}
      <button 
        onClick={() => setPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span>Page {currentPage} of {totalPages}</span>
      <button 
        onClick={() => setPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}
```

## API Integration

These hooks integrate with the following API endpoints:

- `GET /api/dataProvince` - Get paginated province disease data
- `GET /api/dataProvince/count` - Get province count summary

The hooks automatically handle:
- API calls with proper parameters
- Loading states
- Error handling
- Pagination
- Client-side filtering for unsupported parameters

## TypeScript Support

All hooks are fully typed with TypeScript. Exported types include:

- `ProvinceData` - Province data structure
- `Disease` - Disease data structure  
- `ProvinceFilters` - Filter state interface

## Best Practices

1. Use `useProvinceDashboard` for most cases as it provides complete functionality
2. Individual hooks are useful when you need specific functionality
3. All hooks automatically handle loading and error states
4. Filters automatically reset to page 1 when changed (except explicit page changes)
5. Region mapping is handled automatically for Thai provinces
