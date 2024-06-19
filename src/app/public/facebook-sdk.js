window.fbAsyncInit = function() {
  FB.init({
    appId      : process.env.NEXT_PUBLIC_FACEBOOK_APP_ID,
    secretApp  : process.env.FACEBOOK_APP_SECRET,
    cookie     : true,
    xfbml      : true,
    version    : process.env.NEXT_PUBLIC_FACEBOOK_GRAPH_API_VERSION
  });

  FB.AppEvents.logPageView();   
};

(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
