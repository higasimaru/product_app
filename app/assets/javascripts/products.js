$(document).on('turbolinks:load', () => {

  const buildPreview = (targetIndex, blobUrl) => {
    let html = `<div class="preview-file" data-preview="${targetIndex}">
                  <img src="${blobUrl}" class="preview-image" data-preview-image="${targetIndex}">
                  
                  <div class="remove-btn">編集</div>
                </div>`;
    return html;
  }

  const buildPreviewFileField = (targetIndex) => {
    $(`div[data-index = "${targetIndex}"]`).appendTo('div[data-preview="' + targetIndex + '"]')
  }

  const buildFileField = (fileIndex) => {
    let html = `<div class="file-form" data-index="${fileIndex}" id="new-file">
                  <input type="file" name="product[images_attributes][${fileIndex}][url]" id="file">
                </div>`;
    return html;
  }

  let $fileLabelCopy = $('#file-label').clone(true)
  let fileIndex = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  $('.product-form').on('change', '#file', function(e) {
    const targetIndex = $(this).parent().data('index');
    const file = e.target.files[0];
    const blobUrl = window.URL.createObjectURL(file);
    let $firstFileLength = $('.preview-files .preview-file').length
    let $fileLabel = $('#file-label')
    if ($firstFileLength === 4) {
      $fileLabel.appendTo('.new-file-box')
    } else if ($('.preview-file').length === 9) {
      $fileLabel.remove();
    }
    if ( $firstFileLength < 5) {
      $('.preview-files').append(buildPreview(targetIndex, blobUrl));
      buildPreviewFileField(targetIndex);
    } else if ($firstFileLength >= 5) {
      $('.new-preview-files').append(buildPreview(targetIndex, blobUrl));
      buildPreviewFileField(targetIndex);     
    } 
    $fileLabel.prepend(buildFileField(fileIndex[0]));
    $('#file-message').hide();
    fileIndex.shift();
    fileIndex.push(fileIndex.slice(-1)[0] + 1); 
  });
  $(document).on('click', '.remove-btn', function() {
    $(this).parent().remove();
    if ($('.preview-files .preview-file').length === 4) {
      if ($underFile = $('.new-preview-files .preview-file')[0]) {
        $('.preview-files').append($underFile);
      } else {
        $('#file-label').appendTo('.file-box')
      }  
    }
    if ($('.preview-file').length === 9) {
      $('.new-file-box').append($fileLabelCopy)
      $('#file-message').hide();
    }    
  });
});