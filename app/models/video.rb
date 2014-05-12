class Video < ActiveRecord::Base
    
  belongs_to :user
  belongs_to :book
  
  after_create :create_item
  before_destroy :destroy_item
  before_create :check_video_title
    
  YOUTUBE_REGEX = /(?:https?:\/\/)?(?:www\.)?youtu(?:\.be|be\.com)\/(?:watch\?v=)?([\w-]{10,})/
    
  def self.random_book_items(limit=10)
    Video.includes(:book).select("videos.*, RANDOM()").order("RANDOM()").limit(limit)
  end
  
  def destroy_item
    Item.where(subject: self).first.destroy
  end
  
  def book_title
    book.title
  end
  
  def create_item
    Item.create({
      subject: self,
      name: "video",
      book: self.book
    })
  end
  
  private
  def check_video_title
    self.title = "" if (self.title.nil? || self.title.empty?)
  end
  
end
