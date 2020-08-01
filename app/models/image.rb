class Image < ApplicationRecord
  belongs_to :product
  validates :url, presence: true
  mount_uploader :url, ImageUploader
end
