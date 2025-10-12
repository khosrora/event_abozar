'use client';

import { useState } from 'react';
import { apiClient } from '@/lib/api';

export default function ApiTester() {
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testRegisterApi = async () => {
    setLoading(true);
    setResult(null);
    setError(null);
    
    try {
      // Test data matching the exact format specified in the API docs
      const testData = {
        full_name: "Test User",
        phone: "09123456789",
        password: "testpassword123"
      };
      
      console.log('Testing register API with data:', testData);
      
      // Send direct API request to the registration endpoint
      const response = await apiClient.post('/account/register/', testData);
      
      setResult(response);
      console.log('Register API response:', response);
    } catch (err: any) {
      setError({
        message: err.message || 'Unknown error',
        details: err.response?.data || {},
        status: err.response?.status
      });
      console.error('Register API error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">API Tester</h1>
      
      <button 
        onClick={testRegisterApi}
        className="btn btn-primary mb-6"
        disabled={loading}
      >
        {loading ? 'Testing...' : 'Test Register API'}
      </button>
      
      {result && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-green-600 mb-2">Success:</h2>
          <pre className="bg-green-50 p-4 rounded overflow-auto max-h-60">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
      
      {error && (
        <div>
          <h2 className="text-lg font-semibold text-red-600 mb-2">Error:</h2>
          <p className="font-medium mb-1">Status: {error.status}</p>
          <p className="font-medium mb-1">Message: {error.message}</p>
          <pre className="bg-red-50 p-4 rounded overflow-auto max-h-60">
            {JSON.stringify(error.details, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}