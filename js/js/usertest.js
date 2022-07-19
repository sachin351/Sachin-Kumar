// Initialize the Amazon Cognito credentials provider
AWS.config.region = 'ap-southeast-1'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'ap-southeast-1:c65a56a6-859c-4479-861d-3dc32bd84185',
});
// Function invoked by button click
function speakText() {			
    // Create synthesizeSpeech params JSON
    var speechParams = {
        OutputFormat: "mp3",
        SampleRate: "16000",
        Text: "",
        TextType: "text",
        VoiceId: "Matthew"
    };
    speechParams.Text = document.getElementById("textEntry").value;


// Create the Polly service object and presigner object
    var polly = new AWS.Polly({apiVersion: '2016-06-10'});
    var signer = new AWS.Polly.Presigner(speechParams, polly)

    // Create presigned URL of synthesized speech file
    signer.getSynthesizeSpeechUrl(speechParams, function(error, url) {
    if (error) {
	  document.getElementById('result').innerHTML = error;
    } else {
	  audioSource.src = url;  	  
	  document.getElementById('result').innerHTML = "Speech ready to play.";
    }
  });
}