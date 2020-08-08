require 'test_helper'

class SiteLayoutTestTest < ActionDispatch::IntegrationTest
  test "layout links" do
    get root_path
    assert_template "products/index"
    assert_select "a[href=?]", root_path, count: 2
    assert_select "a[href=?]", new_product_path
    get new_product_path
    assert_template "products/new"
    assert_select "a[href=?]", root_path, count: 3
    assert_select "form[action=?]", products_path
  end
end
