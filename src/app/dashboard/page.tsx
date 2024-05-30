'use client';

import React, { useState } from 'react';
import Layout from '../components/Layout';
import FacebookLoginButton from '../components/FacebookLoginButton';
import AdDisplay from '../components/AdDisplay';

const Dashboard: React.FC = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const handleLoginSuccess = (token: string) => {
    console.log('Logged in successfully with access token:', token);
    setAccessToken(token);
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold text-center my-8">Dashboard</h1>
      {!accessToken ? (
        <div className="flex justify-center mt-8">
          <FacebookLoginButton onLoginSuccess={handleLoginSuccess} />
        </div>
      ) : (
        <div>
          <AdDisplay accessToken={accessToken} />
        </div>
      )}
    </Layout>
  );
};

export default Dashboard;
