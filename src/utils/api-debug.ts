/**
 * API Debugging utilities
 */

import axios, { AxiosResponse, AxiosError } from 'axios';

/**
 * Make a direct API call to test endpoints
 * @param url The API URL to test
 * @param method HTTP method
 * @param data Request body data
 * @returns Response data or error details
 */
export async function testApiEndpoint(
  url: string, 
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  data?: any
) {
  try {
    console.log(`📡 Testing API: ${method} ${url}`, data);
    
    const response = await axios({
      url,
      method,
      data,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('✅ API test successful:', {
      status: response.status,
      headers: response.headers,
      data: response.data
    });
    
    return {
      success: true,
      data: response.data,
      status: response.status
    };
  } catch (error) {
    const axiosError = error as AxiosError;
    
    console.error('❌ API test failed:', {
      status: axiosError.response?.status,
      data: axiosError.response?.data,
      headers: axiosError.response?.headers,
      config: axiosError.config
    });
    
    return {
      success: false,
      status: axiosError.response?.status,
      data: axiosError.response?.data,
      message: axiosError.message
    };
  }
}

/**
 * Log the shape of data for debugging
 * Useful for understanding API request/response structures
 */
export function logDataShape(label: string, data: any) {
  // Create a shape-only representation
  const getShape = (obj: any): any => {
    if (obj === null) return 'null';
    if (obj === undefined) return 'undefined';
    if (Array.isArray(obj)) {
      return obj.length ? 
        [`Array(${obj.length}): ${typeof obj[0]} ${getShape(obj[0])}`] : 
        'Empty Array';
    }
    if (typeof obj === 'object') {
      const shape: Record<string, any> = {};
      Object.keys(obj).forEach(key => {
        shape[key] = `${typeof obj[key]}${obj[key] !== null && typeof obj[key] === 'object' ? ' ' + getShape(obj[key]) : ''}`;
      });
      return shape;
    }
    return typeof obj;
  };
  
  console.log(`🔍 ${label} Shape:`, getShape(data));
  console.log(`📦 ${label} Original:`, data);
}