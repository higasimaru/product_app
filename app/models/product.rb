class Product < ApplicationRecord
  has_many :images
  validates :name, presence: true, length: { maximum: 40 }
  validates :price, presence: true, length: { maximum: 11 }
  default_scope -> { order(created_at: :desc) }
end
