'use strict'
$(document).ready(() => {
  $('.btn-primary').on('click', (event) => {
    event.preventDefault()

    const source1 = $('input#one').val()
    const source2 = $('input#two').val()

    if (source1) {
      $('img#one').replaceWith( `<img src='${source1}' id="one"/>`)
    } else {
      const file1 = $('input#inputone').get(0).files[0]
      if (file1) {
        $('div.imgareaselect-outer').remove()
        $('section').next().remove()
        showImage(file1, "one")
      }
    }

    if (source2) {
      $('img#two').replaceWith(`<img src='${source2}' id="two"/>`)
    } else {
      const file2 = $('input#inputtwo').get(0).files[0]
      if (file2) {
        $('div.imgareaselect-outer').remove()
        $('section').next().remove()
        showImage(file2, "two")
      }
    }
  })
})

const showImage = (file, id) => {
  var img = document.createElement("img");
  img.setAttribute('id', id)
  img.classList.add("obj");
  img.file = file;
  $(`img#${id}`).replaceWith(img); // Assuming that "preview" is the div output where the content will be displayed.

  var reader = new FileReader();
  reader.onload = ((aImg) => {
    return (e) => {
      aImg.src = e.target.result;
      aImg.onload = (() => {
        aImg.width = (aImg.width * 0.5)
      })
    };
  })(img);
  reader.onloadend = processFile;
  reader.readAsDataURL(file);
}

function processFile (event) {
  var content = event.target.result;
  sendFileToCloudVision(content.replace('data:image/jpeg;base64,', ''));
}

function sendFileToCloudVision (content) {
  var request = {
    requests: [{
      image: {
        content: content
      },
      features: [{
        type: "FACE_DETECTION",
        maxResults: 1
      }]
    }]
  };

  $.post({
    url: 'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyClSChTezpZHiUSsJ2arxZfz8EMMK-n0Pg',
    data: JSON.stringify(request),
    contentType: 'application/json'
  }).fail(function (jqXHR, textStatus, errorThrown) {
    $('#results').text('ERRORS: ' + textStatus + ' ' + errorThrown);
  }).done(showFaces);
}

function showFaces (data) {
  const contents = JSON.stringify(data, null, 4);
  const face = data.responses[0].faceAnnotations[0].boundingPoly.vertices
  const faceParameters = {
    x1: face[0].x * 0.5,
    y1: face[0].y * 0.5,
    x2: face[2].x * 0.5,
    y2: face[2].y * 0.5,
    persistent: true,
    handles: "corners"
  }
  
  if ($('input#inputone').get(0).files[0]) {
    $('img#one').imgAreaSelect(faceParameters)
  }

  if ($('input#inputtwo').get(0).files[0]) {
    $('img#two').imgAreaSelect(faceParameters)
  }
}
