class Product < ApplicationRecord
  has_many :images
  validates :name, presence: true, length: { maximum: 40 }
  validates :price, presence: true, numericality: { only_integer: true,
    greater_than: 299, less_than: 100000000 }
  default_scope -> { order(created_at: :desc) }
  accepts_nested_attributes_for :images
end
