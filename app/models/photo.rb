class Photo < ActiveRecord::Base
    
  belongs_to :user
  belongs_to :book
  
  after_create :create_item
  before_destroy :destroy_item
  before_create :check_photo_title
    
  PHOTO_URL_REGEX = /(\.gif|jpg|png|jpeg)\z/i
  
  # validates :url, format: { with: PHOTO_URL_REGEX, message: "must be an image url ending in gif, jpg, jpeg, or png" }
  
  def book_title
    book.title
  end
  
  def destroy_item
    Item.where(subject: self).first.destroy
  end
  
  def create_item
    Item.create({
      subject: self,
      name: "photo",
      book: self.book
    })
  end
  
  private
  
  def check_photo_title
    self.title = "" if (self.title.nil? || self.title.empty?)    
  end
end
