class ProductsController < ApplicationController

  def index
    @products = Product.all.includes(:images)
  end

  def new
    @product = Product.new
    @product.images.build
  end

  def create
    @product = Product.new(product_params)    
    @product.images.new if params[:product][:images_attributes].nil?
    if @product.save
      flash[:success] = "出品しました。"
      redirect_to root_url
    else
      render :new
    end
  end

  private
    def product_params
      params.require(:product).permit(:name, :price, images_attributes: :url)
    end


end
