class Book < ActiveRecord::Base
      
  has_many :items
  
  belongs_to :user
  before_create :check_book_title
    
  has_many :photos, dependent: :destroy
  has_many :videos, dependent: :destroy
    
  def editable_by?(current_user)
    (current_user == self.user) ? true : false
  end
  
  def user_editable=(editable_status = false)
    @user_editable = editable_status
  end
  
  def user_editable
    @user_editable
  end
        
  def book_items
    @book_items ||= items.includes(:subject).map(&:subject).sort_by { |x| [x.row, x.col] }
  end
   
  private
  def check_book_title
    self.title = "untitled" if (self.title.nil? || self.title.empty?)
  end
   
end
