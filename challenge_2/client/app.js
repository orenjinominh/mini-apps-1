$('form').on('submit', function(e){
  e.preventDefault();

  let file = document.getElementById('file').files[0];
  let formData = new FormData();
  formData.append('file', file);

  $.ajax({
    url: '/upload',
    type: 'POST',
    processData: false,
    contentType: false, 
    data: formData,
    success: (data) => {
      console.log('upload successful!');
      $('#output').append(data);
    },
    error: (error) => {
      console.log('error:', error);
    }
  });

  if ($('#output').children.length > 1) {
    $("#export").on('click', function() {
      let dataUri = 'data:text/html,' + encodeURIComponent(document.getElementById('output').textContent);
      this.href = dataUri;
    });
  };

});






