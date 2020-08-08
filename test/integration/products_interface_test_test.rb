require 'test_helper'

class ProductsInterfaceTestTest < ActionDispatch::IntegrationTest
  
  test "products interface" do
    get new_product_path
    assert_select "input[type=?]", "file"
    assert_select "div.error-messages", count: 0
    name = "Example Product"
    price = 1000
    assert_no_difference "Product.count" do
      post products_path, params: {product: { name: name,
        price: price,
        images_attributes: [
          { url: "" }
          ] 
          } }
    end
    assert_select "div.error-messages>p", text: "画像がありません", count: 1
    url = fixture_file_upload("test/fixtures/IMG_3753.JPG", "images/IMG_3753.JPG")
    assert_difference "Product.count", 1 do
      post products_path, params: { product: { name: name,
        price: price,
        images_attributes: [
          { url: url }
        ] 
        } }
    end
    assert assigns(:product).images
    assert_redirected_to root_path
    follow_redirect!
    file = "IMG_3753.JPG"
    assert_match name, response.body
    assert_match convert_to_yen(price), response.body
    assert_match file, response.body
  end
end
