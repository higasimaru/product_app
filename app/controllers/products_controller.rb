class ProductsController < ApplicationController

  def index
    @products = Product.all.includes(:image)
  end


end
