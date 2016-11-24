'use strict';

$(document).ready(() => {

    let canvas = document.getElementById('myCanvas'),
        ctx = canvas.getContext('2d');


    //let test = {id:1,name:'bob'};

    function downloadCanvas(link, canvasId, filename) {
        link.href = document.getElementById(canvasId).toDataURL();
        link.download = filename;
    };


    function sendImageData(imageData){
        $.ajax({
            url: 'http://localhost:3000/images/new',
            type: 'POST',
            data: JSON.stringify(imageData),
            success: function(){
            console.log('Image sent to Server :)');
          },error: function(){
            console.log('Failed to send Image');
          }
        });
      };




      document.getElementById('download').addEventListener('click', function() {
          console.log("clicked download");
            let dataURL = canvas.toDataURL();
          //downloadCanvas(this, 'myCanvas', 'test.png');
            console.log(dataURL);
            sendImageData(dataURL);


      }, false);

});

