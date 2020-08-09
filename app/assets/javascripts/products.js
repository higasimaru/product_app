$(document).on('turbolinks:load', () => {

  const buildPreview = (targetIndex, blobUrl) => {
    let html = `<div class="preview-file" data-preview="${targetIndex}">
                  <img src="${blobUrl}" class="preview-image" data-preview-image="${targetIndex}">
                  
                  <div class="remove-btn">編集</div>
                </div>`;
    return html;
  }

  const buildFileField = (fileIndex) => {
    let html = `<div class="file-form" data-index="${fileIndex}" id="new-file">
                  <input type="file" name="product[images_attributes][${fileIndex}][url]" id="file">
                </div>`;
    return html;
  }

  let fileIndex = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  $('.product-form').on('change', '#file', function(e) {
    const targetIndex = $(this).parent().data('index');
    const file = e.target.files[0];
    const blobUrl = window.URL.createObjectURL(file);
    $('.preview-files').append(buildPreview(targetIndex, blobUrl));
    $(`div[data-index="${targetIndex}"]`).appendTo('div[data-preview="' + targetIndex + '"]');
    $('#file-label').prepend(buildFileField(fileIndex[0]));
    $('#file-message').hide();
    fileIndex.shift();
    fileIndex.push(fileIndex.slice(-1)[0] + 1);   
  });
  $(document).on('click', '.remove-btn', function() {
    $(this).parent().remove();
  });

});