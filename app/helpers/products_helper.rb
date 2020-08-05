module ProductsHelper

  def convert_to_yen(price)
    "¥#{price.to_s(:delimited)}"
  end

  def display_error_messages(object, attribute)
    content_tag(:div, class: "error-messages", id: attribute) do
      object.errors.full_messages_for(attribute).map do |message|
      concat(content_tag(:p, message, class: "error-message"))
      end
    end  
  end

end
