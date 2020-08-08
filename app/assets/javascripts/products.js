$(document).on('turbolinks:load', () => {

  const buildFileField = (fileIndex, targetIndex, blobUrl) => {
    let html = `<div class="preview-file">
                  <img src="${blobUrl}" class="preview-image" data-index="${targetIndex}">
                  <div class="file-form" data-index="${fileIndex}">
                    <input id="file" type="file" name="product[images_attributes][${fileIndex}][url]">
                  </div>
                  <div class="remove-btn">編集</div>
                </div>`;
    return html;
  }

  let fileIndex = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  $('.product-form').on('change', '#file', function(e) {
    const targetIndex = $(this).parent().data('index');
    const file = e.target.files[0];
    const blobUrl = window.URL.createObjectURL(file);
    $('.preview-files').append(buildFileField(fileIndex[0], targetIndex, blobUrl));
    $('#file-message').hide();
    fileIndex.shift();
    fileIndex.push(fileIndex[fileIndex.length - 1] + 1)
  });
  $(document).on('click', '.remove-btn', function() {
    $(this).parent().remove()
  })

});