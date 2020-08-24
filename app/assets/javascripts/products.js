$(document).on('turbolinks:load', () => {
  //画像のプレヴューと削除ボタンを追加する
  const buildPreview = (targetIndex, blobUrl) => {
    let html = `<div class="preview-file" data-preview="${targetIndex}">
                  <img src="${blobUrl}" class="preview-image" data-preview-image="${targetIndex}">
                  <div class="edit-btn">編集</div>
                </div>`;
    return html;
  };
  //選択済みのfilefieldをプレヴューの中に追加する
  const buildPreviewFileField = (targetIndex) => {
    $(`div[data-index = "${targetIndex}"]`).appendTo('div[data-preview="' + targetIndex + '"]');
  };
  //編集用のモーダルを追加する
  const buildPreviewModal = (targetIndex, blobUrl) => {
    let html = `<div class="preview-modal-wrapper" data-modal="${targetIndex}">
                  <div class="preview-modal">
                    <div class="preview-nav">
                      <p>写真を切り取る</p>
                      <div class="remove-btn">
                        <i class="fas fa-trash-alt"></i>
                        <span>削除する</span>
                      </div>
                    </div>
                    <div class="modal-image-box">
                      <div class="modal-image-frame">
                        <img data-modal-image="${targetIndex}" src="${blobUrl}" class="modal-image">
                      </div>
                      <div class="modal-slide">
                        <i class="fas fa-camera small-camera"></i>
                        <input type="range">
                        <i class="fas fa-camera large-camera"></i>
                      </div>
                    </div>
                    <div class="submit-btns">
                      <input type="button" class="modal-btn" value="キャンセル">
                      <input type="button" class="modal-btn decision-btn" value="完了">
                    </div>
                  </div>
                </div>`;
    return html
  }
  //新しいfilefieldをラベルの中に追加する
  const buildFileField = (fileIndex) => {
    let html = `<div class="file-form" data-index="${fileIndex}" id="new-file">
                  <input type="file" name="product[images_attributes][${fileIndex}][url]" id="file">
                  <input type="hidden" name="product[image_attributes][${fileIndex}][url_cache]
                    id="product_images_attributes_${fileIndex}_url_cache>
                </div>`;
    return html;
  };

  let $fileLabel = $('#file-label');
  let defaultHTML = $('.price-fee span').text();
  let fileIndex = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  //バリデーションにより返されたfilefieldのindex番号を配列化する処理
  const selectedImages = $('.file-form').map(function() {
    return $(this).data('index');
  }).toArray();
  //選択済みのfilefieldがある場合に、各プレヴューの中に移動し新規filefieldを作成する処理
  if ($('.preview-file')[0]) {
    selectedImages.forEach(function(val) {
      $(`div[data-index="${val}"]`).appendTo($(`div[data-preview="${val}"]`));
    })
    fileIndex.splice(0, selectedImages.length);
    $fileLabel.append(buildFileField(selectedImages.slice(-1)[0] + 1));
    $('#file-message').hide();
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
      $fileLabel.hide();
    }
    if ( $firstFileLength < 5) {
      $('.preview-files').append(buildPreview(targetIndex, blobUrl));
      buildPreviewFileField(targetIndex);
    } else if ($firstFileLength >= 5) {
      $('.new-preview-files').append(buildPreview(targetIndex, blobUrl));
      buildPreviewFileField(targetIndex);     
    } 
    $('.preview-modal-container').append(buildPreviewModal(targetIndex, blobUrl));
    $fileLabel.prepend(buildFileField(fileIndex[0]));
    $('#file-message').hide();
    fileIndex.shift();
    fileIndex.push(fileIndex.slice(-1)[0] + 1); 
  });
  //編集ボタン押下時にモーダルを表示する処理
  $(document).on('click', '.edit-btn', function() {
    let modalIndex = $(this).parent().data('preview');
    $(`div[data-modal="${modalIndex}"]`).fadeIn(300);
  });
  //追加した画像を削除した時の処理
  $(document).on('click', '.remove-btn', function() {
    let removeIndex = $(this).parents('.preview-modal-wrapper').data('modal')
    $(this).parents('.preview-modal-wrapper').remove();
    $(`div[data-preview="${removeIndex}"]`).remove();
    if ($('.preview-files .preview-file').length === 4) {
      if ($underFile = $('.new-preview-files .preview-file')[0]) {
        $('.preview-files').append($underFile);
      } else {
        $fileLabel.appendTo('.file-box');
      } 
    }
    if ($('.preview-file').length === 9) {
      $fileLabel.show();
      $('#file-message').hide();   
    }    
  });
  //販売価格を入力した時の手数料と利益を表示する処理
  $('.product-form').on('input', '#price', function() {
    let price = $(this).val();
    let fee = Math.floor(price / 10);
    if (price > 299 && price < 10000000) {
      $('.price-fee span').text('¥' + fee);
      $('.price-profit span').text('¥' + (price - fee))
    } else {
      $('.price-fee span, .price-profit span').text(defaultHTML)
    }
  });
});