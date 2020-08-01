class ProductsController < ApplicationController

  def index
    @products = Product.all.includes(:image)
  end

  def new
    @product = Product.new
    @product.images.build
  end


end
