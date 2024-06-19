import { useEffect, useState } from 'react';

declare global {
  interface Window {
    fbAsyncInit: () => void;
    FB: any;
  }
}

const FacebookLoginButton = ({ onLoginSuccess }: { onLoginSuccess: (accessToken: string) => void }) => {
  const [isSdkLoaded, setIsSdkLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    window.fbAsyncInit = () => {
      console.log('Initializing Facebook SDK...');
      window.FB.init({
        appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID!,
        cookie: true,
        xfbml: true,
        version: process.env.NEXT_PUBLIC_FACEBOOK_GRAPH_API_VERSION!,
      });

      console.log('Facebook SDK initialized.');
      setIsSdkLoaded(true);
    };

    const loadFbSdk = () => {
      if (document.getElementById('facebook-jssdk')) return;

      const script = document.createElement('script');
      script.id = 'facebook-jssdk';
      script.src = 'https://connect.facebook.net/en_US/sdk.js';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      script.onload = () => {
        console.log('Facebook SDK script loaded.');
        if (window.FB) {
          window.fbAsyncInit();
        }
      };

      script.onerror = () => {
        console.error('Failed to load the Facebook SDK script.');
      };
    };

    if (!window.FB) {
      console.log('Loading Facebook SDK...');
      loadFbSdk();
    } else {
      console.log('Facebook SDK already loaded.');
      setIsSdkLoaded(true);
    }
  }, []);

  const handleLogin = () => {
    if (!isSdkLoaded) {
      console.error('Facebook SDK not loaded yet.');
      return;
    }

    window.FB.login((response: any) => {
      if (response.authResponse) {
        console.log('Access Token:', response.authResponse.accessToken);
        onLoginSuccess(response.authResponse.accessToken);
        setErrorMessage(''); // Clear any previous error messages
      } else {
        console.error('User cancelled login or did not fully authorize.');
        setErrorMessage('Login was cancelled or not fully authorized. Please try again.');
      }
    }, { scope: 'public_profile,ads_management,ads_read,read_insights,email,pages_show_list,pages_read_engagement' });
  };

  return (
    <div>
      <button onClick={handleLogin} disabled={!isSdkLoaded}>
        {isSdkLoaded ? 'Connect your Facebook' : 'Loading...'}
      </button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default FacebookLoginButton;
