'use strict';

$(document).ready(() => {

    var canvas = document.getElementById('myCanvas'),
        ctx = canvas.getContext('2d');

    function downloadCanvas(link, canvasId, filename) {
        link.href = document.getElementById(canvasId).toDataURL();
        link.download = filename;
    }

    document.getElementById('download').addEventListener('click', function() {
        downloadCanvas(this, 'myCanvas', 'test.png');
    }, false);







  });