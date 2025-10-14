import { apiClient } from "@/lib/api";
import { AxiosProgressEvent } from "axios";

/**
 * Festival API Service
 * All API endpoints are placeholders - to be implemented later
 */

// Types
export interface FestivalRegistrationData {
  full_name: string;
  father_name: string;
  national_id: string;
  gender: "male" | "female";
  education: string;
  phone_number: string;
  virtual_number?: string;
  province_id: number;
  city_id: number;
  media_name: string;
  festival_format: string;
  festival_topic: string;
  special_section?: string;
}

export interface FestivalRegistration {
  id: number;
  festival_name: string;
  status: "pending" | "approved" | "rejected";
  registered_at: string;
  works_count: number;
  can_submit_work: boolean;
}

export interface FestivalRegistrationDetails extends FestivalRegistration {
  full_name: string;
  father_name: string;
  national_id: string;
  gender: "male" | "female";
  education: string;
  phone_number: string;
  virtual_number?: string;
  province: string;
  city: string;
  media_name: string;
  festival_format: string;
  festival_topic: string;
  special_section?: string;
  rejection_reason?: string;
}

export interface Work {
  id: number;
  title: string;
  description: string;
  file_url: string;
  file_type: "video" | "image";
  file_size: number;
  status: "pending" | "approved" | "rejected";
  submitted_at: string;
  rejection_reason?: string;
}

export interface WorkSubmissionData {
  registration_id: string;
  title: string;
  description: string;
  file: File;
}

// API Functions

/**
 * Get all festival registrations for the current user
 * TODO: Replace with actual API endpoint
 * Endpoint: GET /api/festival/registrations/
 */
export async function getFestivalRegistrations(): Promise<FestivalRegistration[]> {
  // const response = await apiClient.get("/api/festival/registrations/");
  // return response.data;
  throw new Error("API endpoint not implemented yet");
}

/**
 * Register for a new festival
 * TODO: Replace with actual API endpoint
 * Endpoint: POST /api/festival/register/
 */
export async function registerForFestival(
  data: FestivalRegistrationData
): Promise<FestivalRegistration> {
  // const response = await apiClient.post("/api/festival/register/", data);
  // return response.data;
  throw new Error("API endpoint not implemented yet");
}

/**
 * Get details of a specific festival registration
 * TODO: Replace with actual API endpoint
 * Endpoint: GET /api/festival/registrations/:id/
 */
export async function getFestivalRegistrationDetails(
  registrationId: string
): Promise<FestivalRegistrationDetails> {
  // const response = await apiClient.get(`/api/festival/registrations/${registrationId}/`);
  // return response.data;
  throw new Error("API endpoint not implemented yet");
}

/**
 * Submit a work for a festival registration
 * TODO: Replace with actual API endpoint
 * Endpoint: POST /api/festival/works/submit/
 * 
 * @param formData - FormData containing registration_id, title, description, and file
 * @param onUploadProgress - Optional callback for upload progress
 */
export async function submitWork(
  formData: FormData,
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
): Promise<Work> {
  // const response = await apiClient.post("/api/festival/works/submit/", formData, {
  //   headers: {
  //     "Content-Type": "multipart/form-data",
  //   },
  //   onUploadProgress,
  // });
  // return response.data;
  throw new Error("API endpoint not implemented yet");
}

/**
 * Get all works for a specific festival registration
 * TODO: Replace with actual API endpoint
 * Endpoint: GET /api/festival/registrations/:id/works/
 */
export async function getRegistrationWorks(registrationId: string): Promise<Work[]> {
  // const response = await apiClient.get(`/api/festival/registrations/${registrationId}/works/`);
  // return response.data;
  throw new Error("API endpoint not implemented yet");
}

/**
 * Delete a submitted work
 * TODO: Replace with actual API endpoint
 * Endpoint: DELETE /api/festival/works/:id/
 */
export async function deleteWork(workId: number): Promise<void> {
  // await apiClient.delete(`/api/festival/works/${workId}/`);
  throw new Error("API endpoint not implemented yet");
}

/**
 * Update festival registration
 * TODO: Replace with actual API endpoint
 * Endpoint: PUT /api/festival/registrations/:id/
 */
export async function updateFestivalRegistration(
  registrationId: string,
  data: Partial<FestivalRegistrationData>
): Promise<FestivalRegistrationDetails> {
  // const response = await apiClient.put(`/api/festival/registrations/${registrationId}/`, data);
  // return response.data;
  throw new Error("API endpoint not implemented yet");
}

/**
 * Cancel/Delete festival registration
 * TODO: Replace with actual API endpoint
 * Endpoint: DELETE /api/festival/registrations/:id/
 */
export async function cancelFestivalRegistration(registrationId: string): Promise<void> {
  // await apiClient.delete(`/api/festival/registrations/${registrationId}/`);
  throw new Error("API endpoint not implemented yet");
}

export const festivalApi = {
  getFestivalRegistrations,
  registerForFestival,
  getFestivalRegistrationDetails,
  submitWork,
  getRegistrationWorks,
  deleteWork,
  updateFestivalRegistration,
  cancelFestivalRegistration,
};

export default festivalApi;
