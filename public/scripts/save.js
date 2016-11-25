'use strict';

$(document).ready(() => {

    let canvas = document.getElementById('myCanvas'),
        ctx = canvas.getContext('2d');



    function downloadCanvas(link, canvasId, filename) {
        link.href = document.getElementById(canvasId).toDataURL();
        link.download = filename;
    };


    function sendImageData(imageData){
        $.ajax({
            url: 'http://localhost:3000/images/new',
            type: 'POST',
            data: {'imagedata64':imageData},
            processdata:false,
            success: function(){
            console.log('Image sent to Server :)');
          },error: function(){
            console.log('Failed to send Image');
          }
        });
      };

    function getBase64Canvas() {
        const dataURL = canvas.toDataURL("image/png");
        return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
        //return dataURL;
      }




      document.getElementById('download').addEventListener('click', function() {
          console.log("clicked download");

            //downloadCanvas(this, 'myCanvas', 'test.png');
            sendImageData(getBase64Canvas());


      }, false);

});







