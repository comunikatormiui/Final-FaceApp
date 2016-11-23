'use strict'
$(document).ready(() => {
  $('#inputone').on('change', () => {
    const file1 = $('input#inputone').get(0).files[0]

    $('img#one').imgAreaSelect({remove: true})
    $('img#two').attr('changed', false)
    showImage(file1, "one")
  })

  $('#inputtwo').on('change', () => {
    const file2 = $('input#inputtwo').get(0).files[0]

    $('img#two').imgAreaSelect({remove: true})
    $('img#one').attr('changed', false)
    showImage(file2, "two")
  })

  $('#create').on('click', (event) => {
    const c = document.getElementById("myCanvas");
    const ctx = c.getContext("2d");

    const img1 = new Image();

    img1.src = $('img#one').attr('src')

    c.setAttribute('width', img1.width)
    c.setAttribute('height', img1.height)

    const one = $('img#one').imgAreaSelect({ instance: true })
    const select1 = one.getSelection()

    const two = $('img#two').imgAreaSelect({ instance: true })
    const select2 = two.getSelection()

    ctx.drawImage(img1, 0, 0, img1.width, img1.height);

    const img2 = new Image();
    const ratio2 = $('img#two').width() / $('img#two').attr('size')
    img2.onload = function () {
        roundedImage(ctx, select1.x1, select1.y1, select1.width, select1.height, select1.width/2);
        ctx.clip();
        ctx.drawImage(img2, select2.x1 / ratio2, select2.y1 / ratio2, select2.width / ratio2, select2.height / ratio2, select1.x1, select1.y1, select1.width, select1.height);
    }
    img2.src = $('img#two').attr('src');
  })
})

const setImgSize = (imgSrc, id) => {
    const newImg = new Image();

    newImg.onload = function() {
      const width = newImg.width;
      $(`img#${id}`).attr('size', width)
    }

    newImg.src = imgSrc;
}

const roundedImage = (ctx, x, y, width, height, radius) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
}

const showImage = (file, id) => {
  var img = document.createElement("img");
  img.setAttribute('id', id)
  img.setAttribute('changed', true)
  img.classList.add("obj");
  img.classList.add("img-thumbnail")
  img.file = file;
  $(`img#${id}`).replaceWith(img);

  var reader = new FileReader();
  reader.onload = ((aImg) => {
    return (e) => {
      aImg.src = e.target.result;
    };
  })(img);
  reader.onloadend = processFile;
  reader.readAsDataURL(file);
}

const processFile = (event) => {
  var content = event.target.result;
  sendFileToCloudVision(content.replace('data:image/jpeg;base64,', ''));
}

const sendFileToCloudVision = (content) => {
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
  }).done(setImgSize($('img#one').attr('src'), 'one'), setImgSize($('img#two').attr('src'), 'two'), showFaces);
}

const showFaces = (data) => {
  const contents = JSON.stringify(data, null, 4);

  const ratio1 = $('img#one').width() / $('img#one').attr('size')
  const ratio2 = $('img#two').width() / $('img#two').attr('size')
  if (data.responses[0].faceAnnotations) {
    const face = data.responses[0].faceAnnotations[0].boundingPoly.vertices

    if ($('img#one').attr('changed') === "true") {
      $('img#one').imgAreaSelect({
        x1: face[0].x * ratio1,
        y1: face[0].y * ratio1,
        x2: face[2].x * ratio1,
        y2: face[2].y * ratio1,
        persistent: true,
        handles: "corners"
      })
    }

    if ($('img#two').attr('changed') === "true") {
      $('img#two').imgAreaSelect({
        x1: face[0].x * ratio2,
        y1: face[0].y * ratio2,
        x2: face[2].x * ratio2,
        y2: face[2].y * ratio2,
        persistent: true,
        handles: "corners"
      })
    }
  } else {
    if ($('img#one').attr('changed') === "true") {
      $('img#one').imgAreaSelect({
        x1: 0,
        y1: 0,
        x2: 100,
        y2: 100,
        persistent: true,
        handles: "corners"})
    }

    if ($('img#two').attr('changed') === "true") {
      $('img#two').imgAreaSelect({
        x1: 0,
        y1: 0,
        x2: 100,
        y2: 100,
        persistent: true,
        handles: "corners"})
    }
  }
}
