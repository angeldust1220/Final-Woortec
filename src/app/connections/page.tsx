'use client'

import React from 'react';
import Layout from '../components/Layout';
import FacebookLoginButton from '../components/FacebookLoginButton';

const Dashboard: React.FC = () => {
  const handleLoginSuccess = (accessToken: string) => {
    console.log('Logged in successfully with access token:', accessToken);
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold text-center my-8">Connections</h1>
      <div className="flex justify-center mt-8">
        <FacebookLoginButton onLoginSuccess={handleLoginSuccess} />
      </div>
    </Layout>
  );
};

export default Dashboard;
