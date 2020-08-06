class Product < ApplicationRecord
  attr_accessor :url
  has_many :images
  validates_associated :images
  validates :images, presence: true
  validates :name, presence: true, length: { maximum: 40 }
  validates :price, numericality: { only_integer: true,
    greater_than: 299, less_than: 10000000 }
  validate :has_images?
  default_scope -> { order(created_at: :desc) }
  accepts_nested_attributes_for :images

  def has_images?
    errors.add(:"images.file", "がありません") if url.blank?
  end

  
end
