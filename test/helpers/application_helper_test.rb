require "test_helper"

class ApplicationHelperTest < ActionView::TestCase

  test "full title helper" do
    base_title = "Product App"
    assert_equal full_title, base_title
    assert_equal full_title("出品"), "出品" + " | " + base_title
  end
end