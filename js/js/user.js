const Amplify = window['aws-amplify'], App = {};



/** Track if Amplify is configured **/
App.isAuthConfigured = true;
/** App Authentication State **/
App.isAuthenticated = false;

/** Cloud API Configuration **/
App.updateApiConfig = () => {
  Amplify.API.configure({
    'endpoints': [{
      'name': 'WFAPI',
      'endpoint': 'https://4aduywkbm1.execute-api.ap-southeast-1.amazonaws.com/prod/',
      'region': "ap-southeast-1"
    }]
  });
/*
  Amplify.Auth.configure({
	'identityPoolId': 'ap-southeast-1:c65a56a6-859c-4479-861d-3dc32bd84185',
	'region': 'ap-southeast-1',
	'userPoolId': 'ap-southeast-1_rDx2ibAU1',
	'userPoolWebClientId': '3j2idijoi4skmm1vb9t8gj71hd'    

  });
*/
  Amplify.Auth.configure({
	'identityPoolId': 'ap-southeast-1:a68749ae-5073-4c60-95d0-5e0b6e19353a',
	'region': 'ap-southeast-1',
	'userPoolId': 'ap-southeast-1_sEhARqYmN',
	'userPoolWebClientId': '4akh7iai728stsed3gdd2d24h6',
	'authenticationFlowType': 'USER_PASSWORD_AUTH'
  });
  Amplify.Analytics.configure({ disabled: true })
/*
	'userPoolId': 'ap-southeast-1_qpeqzb46r',
	'userPoolWebClientId': '794vjuvrb09k3dtfrud3f2bupb'    

*/
};

App.handleLogin = function(returnUrl) {
	// check if profile exists
	// if not complete -> profile page
    App.getProfile(function(resp) {
      console.log('GET PROFILE' );
	  console.log(resp)


	  if (resp && resp.data.is_complete === true) {
		window.location.href = returnUrl;
		// else go to homepage
		console.log('profile complete')
	  } else {
		// should be localized link

		var profileUrl = "/profile?_wp_http_referer=" + returnUrl;
		if (window.location.href && window.location.href.includes('/th/') ) {
			var profileUrl = "/th/profile?_wp_http_referer=" + returnUrl;
		}
		window.location.href = profileUrl;
	  }

	})	

}

/** Sign in with the Auth API **/
App.signIn = (u, p, createProfile =false) => {
  const username = u ? u : document.getElementById('userreg-login-email-input').value,
    	password = p ? p : document.getElementById('userreg-login-password-input').value;
  Amplify.Auth.signIn(username, password)
    .then((result) => {
      App.isAuthenticated = true;
// 		window.cartCheckout(false);
    	console.log('result: ', result);
	  if (createProfile) {
        const params = {
          email: u,
        }
        App.updateProfile(params, function(response) {

          console.log('response:');
          console.log(response);
	      if (typeof loginDidSucceed === 'function') { 
	        loginDidSucceed();
	      }


        });  		  
	  } else {
	      if (typeof loginDidSucceed === 'function') { 
	        loginDidSucceed();
	      }
		  
	  }

      console.log('You\'re signed in!')
    })
    .catch((error) => {
      if (typeof handleNotification === 'function') { 
        handleNotification(true, 'AWS', error.code);
      }	    
      console.log("fail")
      console.log(error)
    });
};

/** Sign Up a new user **/
App.signUp = (u, p) => {
  const username = u ? u : document.getElementById('userreg-login-email-input').value,
    	password = p ? p : document.getElementById('userreg-login-password-input').value;
	Amplify.Auth.signUp({ username, password })
  	.then((result) => {
    	console.log('result: ', result);
	    	
		App.signIn(u,p, true);

// 		window.cartCheckout(false);
/*
	    if (typeof loginDidSucceed === 'function') { 
	      loginDidSucceed();
	    }
*/
    	
    })
    .catch((error) => {
      if (typeof handleNotification === 'function') { 
        handleNotification(true, 'AWS', error.code);
      }	    

      console.log("fail")
      console.log(error)

    });
};

App.logout = () => {
    App.isAuthenticated = false;
	Amplify.Auth.signOut()
    .then(data => {
	    location.href = '/'
	    console.log(data)
	})
    .catch(err => console.log(err));
};

$(document).ready(function () {
  if (document.getElementById('user-logout-button')) {
	  document.getElementById('user-logout-button').onclick = App.logout;
  } else {
	  console.log('user-logout-button not found')
  }
  if (document.getElementById('user-logout-button-hamburger')) {
	  document.getElementById('user-logout-button-hamburger').onclick = App.logout;
  } else {
	  console.log('user-logout-button-hamburger not found')
  }
  
  
  
}); 

App.forgotPassword = (u, callback) => {
	const username = u ? u : document.getElementById('userreg-forgot-email-input').value

    Amplify.Auth.forgotPassword(username)
    .then(data => {
	    console.log(data)
	    callback(true,data)
	})
    .catch(err => {
	    console.log(err)
	    callback(false,err)
    });
    
};

App.submitNewPassword = (username,new_password,code,callback) => {
/*
	const username = document.getElementById('userreg-forgot-email-input').value;
	const new_password = document.getElementById('userreg-forgot-email-input').value;
	const code = document.getElementById('userreg-forgot-email-input').value;
*/


	Amplify.Auth.forgotPasswordSubmit(username, code, new_password)
    .then(data => callback(true,data))
    .catch(err => callback(false,err));
    
};

App.updateProfile = (requestBody, callback) => {
	let apiName = 'WFAPI';
	let path = 'profile'; 
	let myInit = { // OPTIONAL
		body: requestBody,
		headers: {}, // OPTIONAL
		response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
		queryStringParameters: {},
	}
	Amplify.API.post(apiName, path, myInit).then(response => {
	// Add your code here
	  console.log('S ' + JSON.stringify(response));
		callback(response,null);
	}).catch(error => {
// 	console.log('E ' + error.response)
		callback(null,error);
	
	});
}

App.getProfile = (callback) => {
	let apiName = 'WFAPI';
	let path = 'profile'; 
	let myInit = { // OPTIONAL
		headers: {}, // OPTIONAL
		response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
		queryStringParameters: {},
	}
	Amplify.API.get(apiName, path, myInit).then(response => {
	// Add your code here
	  console.log('S ' + JSON.stringify(response));
		callback(response,null);
	}).catch(error => {
// 	console.log('E ' + error.response)
		callback(null,error);
	
	});
}

App.buyTickets = (requestBody, callback) => {
	let apiName = 'WFAPI';
	let path = 'buyTickets'; 
	console.log('test2:' + JSON.stringify(requestBody));
	let myInit = { // OPTIONAL
		body: requestBody,
		headers: {}, // OPTIONAL
		response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
		queryStringParameters: {},
	}
	Amplify.API.post(apiName, path, myInit).then(response => {
  	console.log('S ' + JSON.stringify(response));
    if (response.data.error_code) {
  		callback(null, response);
    } else {
  		callback(response,null);
    }
	}).catch(error => {
		callback(null,error);
	});
}


// was buyTickets
App.buyTickets1 = (requestBody, callback) => {
	let apiName = 'WFAPI';
	let path = '/wonderfruit-platform-dev-hello'; 
	console.log('test2:' + JSON.stringify(requestBody));
	let myInit = { // OPTIONAL
		body: requestBody,
		headers: {}, // OPTIONAL
		response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
		queryStringParameters: {},
	}
	Amplify.API.post(apiName, path, myInit).then(response => {
	// Add your code here
		console.log('S ' + JSON.stringify(response));
		callback(response,null);
	}).catch(error => {
// 	console.log('E ' + error.response)
		callback(null,error);
	});
}

App.buyTickets2 = (requestBody, callback) => {
	let apiName = 'WFAPI';
	let path = '/path-4e6'; 
	console.log('test:' + JSON.stringify(requestBody));
	let myInit = { // OPTIONAL
		body: requestBody,
		headers: {}, // OPTIONAL
		response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
		queryStringParameters: {},
	}
	Amplify.API.post(apiName, path, myInit).then(response => {
	// Add your code here
		console.log('S ' + JSON.stringify(response));
		callback(response,null);
	}).catch(error => {
// 	console.log('E ' + error.response)
		callback(null,error);
	
	});
}


App.updateApiConfig();

App.checkAuthState = (successCallback, failCallback) => {
	Amplify.Auth.currentAuthenticatedUser()
    .then(user => {
	    console.log('USER HERE' + JSON.stringify(user))
		App.isAuthenticated = true;
		
		$('body').addClass('user-logged-in-body-class');
		$('body').removeClass('user-not-logged-in-body-class');


		
		if (typeof successCallback === 'function') { 
            successCallback(user);
    }
    
	})
    .catch(err => {

  		$('body').removeClass('user-logged-in-body-class');
		$('body').addClass('user-not-logged-in-body-class');


		if (typeof failCallback === 'function') { 
      failCallback();
    }
	  console.log('check auth error:' + err)
	});
}
App.checkAuthState();

    
//     Facebook Init
var s3 = null;
var appId = '178961422445518'; // Facebook app ID
var roleArn = 'arn:aws:iam::768974608727:role/wonderfruit_auth_MOBILEHUB_960019259';


window.fbAsyncInit = function() {

  // init the FB JS SDK
  FB.init({appId: appId});
  var loginFB = function() {
    FB.login(function (response) {
          console.log(response)

      if (response.authResponse) { // logged in
		 var fbToken = response.authResponse.accessToken;
         Amplify.Auth.federatedSignIn('facebook', { token:fbToken, expires_at: response.authResponse.expires}, { name: response.authResponse.userID })
        .then(credentials => {
          console.log('get aws credentials', credentials);
          App.isAuthenticated = true;

		  var fbProfileUrl = "https://graph.facebook.com/v3.3/me?fields=first_name%2Clast_name%2Cemail&access_token=" + fbToken;

		  $.ajax({url: fbProfileUrl, success: function(result){
			  console.log(result)
			  
			  
              const params = {
                email: result.email,
                firstname: result.first_name,
                lastname: result.last_name,
              }
	          App.updateProfile(params, function(response) {
  	            console.log('response:');
  	            console.log(response);
	          });  			  
			  
		  }});
		  
		  
	      if (typeof loginDidSucceed === 'function') { 
	        loginDidSucceed();
	      }
       }).catch(e => {
          console.log(e);
        });  

        console.log('You are now logged in. FB');
      } else {
        console.log('There was a problem logging you in.');
      }
    });
	  
  }
  
  App.loginFB = loginFB;

  if (document.getElementById('signup-fblogin1')) {
	  document.getElementById('signup-fblogin1').onclick = loginFB;
  } else {
	  console.log('signup-fblogin1 nnot found')
  }
  if (document.getElementById('signin-fblogin1')) {
	  document.getElementById('signin-fblogin1').onclick = loginFB;
  } else {
	  console.log('signin-fblogin1 nnot found')
  }
  document.getElementById('cart-fblogin1').onclick = loginFB;
  document.getElementById('cart-fblogin2').onclick = loginFB;

};

// Load the FB JS SDK asynchronously
(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "//connect.facebook.net/en_US/all.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));


/*
// google login
  var roleArn = 'arn:aws:iam::768974608727:role/wonderfruit_auth_MOBILEHUB_960019259';
  var googleUser = {};
  var startApp = function() {
    gapi.load('auth2', function(){
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      auth2 = gapi.auth2.init({
        client_id: '991359075488-32bjr5rr4fd8ss5dpt17jq15gde7j18n.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        // Request scopes in addition to 'profile' and 'email'
        //scope: 'additional_scope'
      });
      attachSignin(document.getElementById('cart-galogin1'));
      attachSignin(document.getElementById('cart-galogin2'));
    });
  };  
  function attachSignin(element) {
    auth2.attachClickHandler(element, {},
        function(googleUser) {
          console.log( "Signed in: " + googleUser.getBasicProfile().getName());
          var authData = googleUser.getAuthResponse();
          
          console.log( "Signed in: " + authData.id_token);
          console.log( "Signed in: " + authData.expires_at);

          console.log(JSON.stringify(googleUser));
	      Amplify.Auth.federatedSignIn('google', { token:authData.id_token, expires_at: authData.expires_at}, { })
	        .then(credentials => {
	          console.log('get aws credentials', credentials);
			  App.isAuthenticated = true;
			  window.cartCheckout(false);	          
	        }).catch(e => {
	          console.log(e);


	        });            
        }, function(error) {
          console.log(JSON.stringify(error, undefined, 2));
        });
  }  
//  startApp();
*/

