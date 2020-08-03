module ProductsHelper

  def convert_to_yen(price)
    "¥#{price.to_s(:delimited)}"
  end

end
