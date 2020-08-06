require 'test_helper'

class ProductsControllerTest < ActionDispatch::IntegrationTest
  
  test "should get root" do
    get root_path
    assert_response :success
    assert_select "title", full_title("")
  end 

  test "should get new" do
    get new_product_path
    assert_response :success
    assert_select "title", full_title("出品")
  end
end
