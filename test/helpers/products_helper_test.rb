require "test_helper.rb"

class ProductsHelperTest < ActionView::TestCase

  test "convert to yen" do
    assert_equal "¥1,000", convert_to_yen(1000)
  end

end

