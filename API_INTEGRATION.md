# API Integration Documentation

## Overview
This document provides a comprehensive overview of all API integrations implemented in the dashboard.

## Base Configuration

### Axios Instance (`src/lib/axios.ts`)
- Base URL: `https://api.brisf.ir/
- Request Interceptor: Automatically adds Bearer token from localStorage
- Response Interceptor: Handles 401 errors and redirects to login
- FormData Helper: `createFormData()` utility for multipart/form-data uploads

```typescript
const apiClient = axios.create({
  baseURL: 'https://api.brisf.ir/',
  headers: {
    'Content-Type': 'application/json',
  },
});
```

## Services

### Account Service (`src/services/account.service.ts`)

#### 1. Get Profile
- **Endpoint**: `GET /account/me/`
- **Method**: `accountService.getProfile()`
- **Returns**: `User` object
- **Usage**: Load user profile data

```typescript
const user = await accountService.getProfile();
// Returns: { id, fullName, phone, is_active, ... }
```

#### 2. Update Profile
- **Endpoint**: `PUT /account/me/`
- **Method**: `accountService.updateProfile(data)`
- **Params**: `{ fullName: string }`
- **Returns**: `User` object
- **Note**: Phone field is readonly and cannot be changed

```typescript
await accountService.updateProfile({ fullName: 'نام جدید' });
```

### Festival Service (`src/services/festival.service.ts`)

#### 1. Get My Statistics
- **Endpoint**: `GET /festival/my-statistics/`
- **Method**: `festivalService.getMyStatistics()`
- **Returns**: `DashboardStatistics`
- **Usage**: Dashboard main page

```typescript
const stats = await festivalService.getMyStatistics();
// Returns: { registrations, works, total_content }
```

#### 2. Get My Registrations List
- **Endpoint**: `GET /festival/my-registrations-list/`
- **Method**: `festivalService.getMyRegistrations()`
- **Returns**: `FestivalRegistrationListItem[]`
- **Usage**: List all user's festival registrations

```typescript
const registrations = await festivalService.getMyRegistrations();
// Returns array with: id, registration_name, fullName, phone, province, city, etc.
```

#### 3. Get Registration Detail
- **Endpoint**: `GET /festival/my-registrations-detail/{id}/`
- **Method**: `festivalService.getRegistrationDetail(id)`
- **Returns**: `FestivalRegistrationDetail`
- **Usage**: View detailed information about a specific registration

```typescript
const detail = await festivalService.getRegistrationDetail(123);
// Returns: registration_name, fullName, phone, province, city, festival info, etc.
```

#### 4. Get Works by Festival
- **Endpoint**: `GET /festival/works/by-festival/{festival_id}/`
- **Method**: `festivalService.getWorksByFestival(festivalId)`
- **Returns**: `Work[]`
- **Usage**: List all works submitted for a specific festival registration

```typescript
const works = await festivalService.getWorksByFestival(123);
// Returns array with: id, title, description, file_url, registration_name, etc.
```

#### 5. Create Work
- **Endpoint**: `POST /festival/works/`
- **Method**: `festivalService.createWork(data)`
- **Content-Type**: `multipart/form-data`
- **Params**: `CreateWorkData`
- **Returns**: `Work`
- **Usage**: Upload a new work

```typescript
const workData = {
  festival_registration: 123,
  title: 'عنوان اثر',
  description: 'توضیحات',
  file: fileObject // File object from input
};
await festivalService.createWork(workData);
```

#### 6. Update Work
- **Endpoint**: `PUT /festival/works/{id}/`
- **Method**: `festivalService.updateWork(id, data)`
- **Content-Type**: `multipart/form-data` (when file included)
- **Params**: `UpdateWorkData`
- **Returns**: `Work`
- **Usage**: Update an existing work

```typescript
const updateData = {
  title: 'عنوان جدید',
  description: 'توضیحات جدید',
  file: fileObject // Optional - only if changing file
};
await festivalService.updateWork(456, updateData);
```

#### 7. Delete Work
- **Endpoint**: `DELETE /festival/works/{id}/`
- **Method**: `festivalService.deleteWork(id)`
- **Returns**: `void`
- **Usage**: Delete a work

```typescript
await festivalService.deleteWork(456);
```

## TypeScript Types (`src/types/api.ts`)

### User
```typescript
interface User {
  id: number;
  fullName: string;
  phone: string;
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  last_login: string;
  password: string;
  groups: number[];
  user_permissions: number[];
}
```

### DashboardStatistics
```typescript
interface DashboardStatistics {
  registrations: number;
  works: number;
  total_content: number;
}
```

### FestivalRegistrationListItem
```typescript
interface FestivalRegistrationListItem {
  id: number;
  registration_name: string;
  fullName: string;
  phone: string;
  province: { id: number; name: string };
  city: { id: number; name: string };
  festival_format: string;
  festival_topic: string;
  media_name: string;
  created_at: string;
}
```

### FestivalRegistrationDetail
```typescript
interface FestivalRegistrationDetail {
  id: number;
  registration_name: string;
  fullName: string;
  phone: string;
  province: { id: number; name: string };
  city: { id: number; name: string };
  festival_title: string;
  festival_organizer: string;
  festival_format: string;
  festival_topic: string;
  festival_description: string;
  festival_start_date: string;
  festival_end_date: string;
  festival_location: string;
  media_name: string;
  media_manager_name: string;
  media_province: { id: number; name: string };
  media_city: { id: number; name: string };
  media_phone: string;
  created_at: string;
  updated_at: string;
}
```

### Work
```typescript
interface Work {
  id: number;
  title: string;
  description: string;
  file_url: string;
  registration_name: string;
  media_name: string;
  festival_format: string;
  festival_topic: string;
  created_at: string;
  updated_at: string;
}
```

### CreateWorkData
```typescript
interface CreateWorkData {
  festival_registration: number;
  title: string;
  description: string;
  file: File;
}
```

### UpdateWorkData
```typescript
interface UpdateWorkData {
  title?: string;
  description?: string;
  file?: File;
}
```

## Page Integrations

### 1. Dashboard Main Page
**Path**: `/dashboard/page.tsx`
- **API**: `festivalService.getMyStatistics()`
- **Features**:
  - Displays 3 statistics cards
  - Auto-loads on mount
  - Loading state with skeleton

### 2. Profile Page
**Path**: `/dashboard/profile/page.tsx`
- **APIs**:
  - GET: `accountService.getProfile()`
  - PUT: `accountService.updateProfile(data)`
- **Features**:
  - View profile information
  - Edit full name (phone is readonly)
  - Form validation with react-hook-form
  - Success/error toast notifications

### 3. Festival Registrations List
**Path**: `/dashboard/festival-registration/page.tsx`
- **API**: `festivalService.getMyRegistrations()`
- **Features**:
  - List all registrations
  - Displays nested province/city objects
  - Link to detail page for each registration

### 4. Festival Registration Detail
**Path**: `/dashboard/festival-registration/[id]/page.tsx`
- **API**: `festivalService.getRegistrationDetail(id)`
- **Features**:
  - Personal information section
  - Location information
  - Festival information sidebar
  - Media information
  - Formatted dates (Persian calendar)
  - Link to works list

### 5. Works List
**Path**: `/dashboard/festival-registration/[id]/works/page.tsx`
- **APIs**:
  - GET: `festivalService.getWorksByFestival(festivalId)`
  - DELETE: `festivalService.deleteWork(id)`
- **Features**:
  - Display all works for a registration
  - Preview file (image/video/other)
  - View, Edit, Delete actions
  - Delete confirmation dialog

### 6. Submit Work
**Path**: `/dashboard/festival-registration/[id]/submit-work/page.tsx`
- **API**: `festivalService.createWork(data)`
- **Features**:
  - File upload with validation
  - File size limits (Video: 5MB, Image: 2MB)
  - File type validation
  - Image/video preview
  - Upload progress indicator
  - Form validation

### 7. Edit Work
**Path**: `/dashboard/festival-registration/[id]/works/[workId]/edit/page.tsx`
- **APIs**:
  - GET: `festivalService.getWorksByFestival(festivalId)` (to load work)
  - PUT: `festivalService.updateWork(id, data)`
- **Features**:
  - Load existing work data
  - Display current file
  - Optional file replacement
  - File validation
  - Preview for new files
  - Form pre-filled with current values

## File Upload Constraints

### Video Files
- **Max Size**: 5 MB (5 * 1024 * 1024 bytes)
- **Accepted Types**:
  - video/mp4
  - video/webm
  - video/ogg
  - video/quicktime

### Image Files
- **Max Size**: 2 MB (2 * 1024 * 1024 bytes)
- **Accepted Types**:
  - image/jpeg
  - image/png
  - image/webp
  - image/gif

## Authentication Flow

1. **Token Storage**: JWT tokens stored in localStorage
   - Key: `authToken`

2. **Request Headers**: 
   ```
   Authorization: Bearer {token}
   ```

3. **401 Handling**:
   - Automatically removes invalid token
   - Redirects to `/auth/login`
   - Shows error alert

4. **Manual Logout**:
   ```typescript
   localStorage.removeItem('authToken');
   router.push('/auth/login');
   ```

## Error Handling

### API Errors
All API calls use try-catch blocks:

```typescript
try {
  const data = await service.someMethod();
  // Success
} catch (error: any) {
  const errorMessage = 
    error?.response?.data?.message || 
    'پیام خطای پیش‌فرض';
  showToast.error(errorMessage);
}
```

### Toast Notifications
Simple alert-based toast system (temporary):

```typescript
const showToast = {
  error: (message: string) => {
    console.error(message);
    alert(message);
  },
  success: (message: string) => {
    console.log(message);
    alert(message);
  }
};
```

## Testing Checklist

### Profile
- [ ] Load profile data on mount
- [ ] Display full name and phone correctly
- [ ] Phone field is readonly
- [ ] Update profile with new name
- [ ] Show success message after update
- [ ] Handle API errors gracefully

### Dashboard
- [ ] Load statistics on mount
- [ ] Display all 3 metrics correctly
- [ ] Show loading state
- [ ] Handle empty state (0 values)

### Festival Registrations
- [ ] Load registrations list
- [ ] Display nested province/city names
- [ ] Navigate to detail page
- [ ] Handle empty list

### Registration Detail
- [ ] Load and display all information
- [ ] Format dates correctly
- [ ] Display nested objects (province/city/media)
- [ ] Navigate to works list

### Works List
- [ ] Load works for specific registration
- [ ] Display file preview correctly
- [ ] Navigate to edit page
- [ ] Delete work with confirmation
- [ ] Handle empty works list

### Submit Work
- [ ] Validate file type and size
- [ ] Show file preview
- [ ] Display upload progress
- [ ] Submit work successfully
- [ ] Navigate to works list after success
- [ ] Handle validation errors
- [ ] Handle API errors

### Edit Work
- [ ] Load existing work data
- [ ] Display current file
- [ ] Update title/description only
- [ ] Replace file with new one
- [ ] Validate new file
- [ ] Show preview for new file
- [ ] Handle API errors

## Future Improvements

1. **Upload Progress**: Implement real-time upload progress using axios `onUploadProgress`
2. **Toast System**: Replace alert-based toast with proper notification library
3. **Image Optimization**: Add image compression before upload
4. **Caching**: Implement data caching for better performance
5. **Pagination**: Add pagination for large lists
6. **Search/Filter**: Add search and filter functionality
7. **Error Recovery**: Add retry mechanism for failed requests
8. **Offline Support**: Add service worker for offline functionality

## Notes

- All dates from API are in ISO format (YYYY-MM-DDTHH:mm:ss.sssZ)
- FormData is automatically handled by axios when detecting File objects
- Content-Type header is automatically set for FormData requests
- Phone field is readonly in profile - cannot be modified through API
- All API responses follow the same structure with proper TypeScript types
