$(document).on('turbolinks:load', () => {
  //画像のプレヴューと削除ボタンを追加する
  const buildPreview = (targetIndex, blobUrl) => {
    let html = `<div class="preview-file" data-preview="${targetIndex}">
                  <img src="${blobUrl}" class="preview-image" data-preview-image="${targetIndex}">
                  <div class="remove-btn">編集</div>
                </div>`;
    return html;
  }
  //選択済みのfilefieldをプレヴューの中の追加する
  const buildPreviewFileField = (targetIndex) => {
    $(`div[data-index = "${targetIndex}"]`).appendTo('div[data-preview="' + targetIndex + '"]');
  }
  //新しいfilefieldをラベルの中に追加する
  const buildFileField = (fileIndex) => {
    let html = `<div class="file-form" data-index="${fileIndex}" id="new-file">
                  <input type="file" name="product[images_attributes][${fileIndex}][url]" id="file">
                  <input type="hidden" name="product[image_attributes][${fileIndex}][url_cache]
                    id="product_images_attributes_${fileIndex}_url_cache>
                </div>`;
    return html;
  }

  let $fileLabel = $('#file-label');
  let $fileLabelCopy = $('#file-label').clone(true);
  let defaultHTML = $('.price-fee span').text();
  let fileIndex = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  
  const selectedImages = $('.file-form').map(function() {
    return $(this).data('index');
  }).toArray();
  
  if ($('.preview-file')[0]) {
    selectedImages.forEach(function(val) {
      $(`div[data-index="${val}"]`).appendTo($(`div[data-preview="${val}"]`))
    })
    fileIndex.splice(0, selectedImages.length)
    console.log(fileIndex)
    $fileLabel.append(buildFileField(selectedImages.slice(-1)[0] + 1))

    if ($('.preview-files .preview-file').length === 5) {
      $fileLabel.appendTo('.new-file-box')
    }
  }
  
  
  

  //filefieldに画像を追加した時の処理
  $(document).on('change', '#file', function(e) {
    const targetIndex = $(this).parent().data('index');
    const file = e.target.files[0];
    const blobUrl = window.URL.createObjectURL(file);
    let $firstFileLength = $('.preview-files .preview-file').length;
    if ($firstFileLength === 4) {
      $fileLabel.appendTo('.new-file-box');
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
  //追加した画像を削除した時の処理
  $(document).on('click', '.remove-btn', function() {
    $(this).parent().remove();
    if ($('.preview-files .preview-file').length === 4) {
      if ($underFile = $('.new-preview-files .preview-file')[0]) {
        $('.preview-files').append($underFile);
      } else {
        $('#file-label').appendTo('.file-box');
      } 
    }
    if ($('.preview-file').length === 9) {
      $('.new-file-box').append($fileLabelCopy);    
    }    
  });
  //販売価格を入力した時の手数料と利益を表示する処理
  $('.product-form').on('input', '#price', function() {
    let price = $(this).val();
    let current = $('input[name="]')
    let fee = Math.floor(price / 10);
    if (price > 299 && price < 10000000) {
      $('.price-fee span').text('¥' + fee);
      $('.price-profit span').text('¥' + (price - fee))
    } else {
      $('.price-fee span, .price-profit span').text(defaultHTML)
    }
  })
});