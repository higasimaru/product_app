require 'test_helper'
include ActionDispatch::TestProcess

class ProductTest < ActiveSupport::TestCase
  
  def setup
    @product = Product.new(name: "Example Product", price: 1000)
    image = fixture_file_upload("test/fixtures/IMG_3753.JPG", "image/IMG_3753.JPG")
    @product.images.build(url: image)
  end

  test "should be valid?" do
    assert @product.valid?
  end

  test "name should be valid" do
    @product.name = ""
    assert_not @product.valid?
  end

  test "price should be valid" do
    @product.price = ""
    assert_not @product.valid?
  end

  test "images should be valid" do
    @product.images[0].url = ""
    assert_not @product.valid?
  end

  test "name should not be too long" do
    @product.name = "a" * 41
    assert_not @product.valid?
  end

  test "price should not be less" do
    @product.price = "299"
    assert_not @product.valid?
  end

  test "price should not be too greate" do
    @product.price = 10000000
    assert_not @product.valid?
  end

  test "associated images should be saved" do
    assert_difference "Image.count", 1 do
      @product.save
    end
  end
end
