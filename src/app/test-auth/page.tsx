'use client';

import { useEffect } from 'react';
import useAuthStore from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants';

export default function TestAuthPage() {
  const { user, token, isAuthenticated, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    console.log('🔴 Logging out...');
    logout();
    console.log('✅ Logout completed, redirecting...');
    router.push(ROUTES.LOGIN);
  };

  useEffect(() => {
    console.log('Auth State:', { user, token, isAuthenticated });
  }, [user, token, isAuthenticated]);

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Test Authentication</h1>
      
      <div className="card bg-base-100 shadow-xl mb-4">
        <div className="card-body">
          <h2 className="card-title">Current Auth State</h2>
          
          <div className="space-y-2">
            <p><strong>Is Authenticated:</strong> {isAuthenticated ? '✅ Yes' : '❌ No'}</p>
            <p><strong>Has Token:</strong> {token ? '✅ Yes' : '❌ No'}</p>
            <p><strong>User:</strong> {user?.full_name || 'None'}</p>
            <p><strong>Phone:</strong> {user?.phone || 'None'}</p>
          </div>
          
          <div className="divider"></div>
          
          <div className="space-y-2">
            <h3 className="font-semibold">LocalStorage:</h3>
            <pre className="bg-base-200 p-2 rounded text-xs overflow-auto">
              {JSON.stringify({
                'auth-storage': localStorage.getItem('auth-storage')?.substring(0, 100) + '...',
                'access_token': localStorage.getItem('access_token'),
                'user': localStorage.getItem('user')?.substring(0, 50) + '...',
              }, null, 2)}
            </pre>
          </div>
          
          <div className="card-actions justify-end mt-4">
            <button 
              onClick={handleLogout} 
              className="btn btn-error"
              disabled={!isAuthenticated && !token}
            >
              🚪 Test Logout
            </button>
            <button 
              onClick={() => router.push(ROUTES.DASHBOARD)} 
              className="btn btn-primary"
            >
              📊 Go to Dashboard
            </button>
            <button 
              onClick={() => router.push(ROUTES.LOGIN)} 
              className="btn btn-secondary"
            >
              🔐 Go to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}