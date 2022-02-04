(function () {
  // The width and height of the captured photo. We will set the
  // width to the value defined here, but the height will be
  // calculated based on the aspect ratio of the input stream.

  var width = 631;    // We will scale the photo width to this
  var height = 473;
  // This will be computed based on the input stream

  // |streaming| indicates whether or not we're currently streaming
  // video from the camera. Obviously, we start at false.

  var streaming = false;

  // The various HTML elements we need to configure or control. These
  // will be set by the startup() function.

  var video = null;
  var canvas1 = null;
  var canvas2 = null;
  var photo1 = null;
  var photo2 = null;
  var startbutton = null;
  var temUma = false;

  function startup() {
    video = document.getElementById('video');
    canvas1 = document.getElementById('canvas1');
    canvas2 = document.getElementById('canvas2');
    photo1 = document.getElementById('photo1');
    photo2 = document.getElementById('photo2');
    startbutton = document.getElementById('startbutton');

    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      .then(function (stream) {
        video.srcObject = stream;
        video.play();
      })
      .catch(function (err) {
        console.log("An error occurred: " + err);
      });

    video.addEventListener('canplay', function (ev) {
      if (!streaming) {
        height = video.videoHeight / (video.videoWidth / width);

        // Firefox currently has a bug where the height can't be read from
        // the video, so we will make assumptions if this happens.

        if (isNaN(height)) {
          height = width / (4 / 3);
        }

        video.setAttribute('width', width);
        video.setAttribute('height', height);
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        canvas1.setAttribute('width', width);
        canvas2.setAttribute('height', height);
        streaming = true;
      }
    }, false);

    startbutton.addEventListener('click', function (ev) {
      takepicture();
      ev.preventDefault();
    }, false);

    // clearphoto();
  }

  // Fill the photo with an indication that none has been
  // captured.

  // function clearphoto() {
  //   var context = canvas.getContext('2d');
  //   context.fillStyle = "#AAA";
  //   context.fillRect(0, 0, canvas.width, canvas.height);

  //   var data = canvas.toDataURL('image/png');
  //   photo.setAttribute('src', data);
  // }

  // Capture a photo by fetching the current contents of the video
  // and drawing it into a canvas, then converting that to a PNG
  // format data URL. By drawing it on an offscreen canvas and then
  // drawing that to the screen, we can change its size and/or apply
  // other changes before drawing it.



  function takepicture() {

    if (temUma == false) {
      var context = canvas1.getContext('2d');

      canvas1.width = width;
      canvas1.height = height;
      context.drawImage(video, 0, 0, width, height);


      var data = canvas1.toDataURL('image/png');

      photo1.setAttribute('src', data);

      console.log("foto1 " + data)


      // var formData = new FormData();

      // const data64 = data.replace('data:image/png;base64,', '')
      // formData.append('image', data64)
      // formData.append('type', 'base64')

      // fetch("https://api.imgur.com/3/upload", {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': 'Client-ID f7dde74fe8db4d0',
      //     // "Token": 'Bearer ' + 'ca7ee65212e7489a81b4d1b3313b10b01cd7bfd3',
      //   },
      //   body: formData
      // })


      //   .then((resposta) => {
      //     if (resposta.status === 200) {
      //       console.log(resposta)
      //     }
      //   })



      // fetch("https://brazilsouth.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceAttributes=gender,facialhair,glasses,hair,accessories,emotion,smile&recognitionModel=recognition_04&detectionModel=detection_01&faceIdTimeToLive=86400", {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Ocp-Apim-Subscription-Key': '449e3437fdf34999bc9d6c2ecccc8c2b'
      //   },
      //   body: JSON.stringify({ url: data })
      // })

      //   .then((resposta) => {
      //     if (resposta.status === 200) {
      //       console.log(resposta)
      //     }
      //   })

      temUma = true

    } else {
      var context = canvas2.getContext('2d');

      canvas2.width = width;
      canvas2.height = height;
      context.drawImage(video, 0, 0, width, height);


      var data = canvas2.toDataURL('image/png');

      photo2.setAttribute('src', data);

      console.log("foto2 " + data)
    }



  }

  // Set up our event listener to run the startup process
  // once loading is complete.
  window.addEventListener('load', startup, false);
})();

