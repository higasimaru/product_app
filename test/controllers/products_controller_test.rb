require 'test_helper'

class ProductsControllerTest < ActionDispatch::IntegrationTest
  
  test "should get root" do
    get root_path
    assert_response :success
    assert_select "title", text: full_title("")
  end 

  test "should get new" do
    get new_product_path
    assert_response :success
    assert_select "title", text: full_title("出品")
    get products_path 
    assert_response :success
    assert_select "title", text: full_title("出品")
  end
end
