class User < ActiveRecord::Base
  devise :token_authenticatable, :database_authenticatable, :registerable,
    :recoverable, :rememberable, :trackable, :validatable
  
  has_many :books
  has_many :photos
  has_many :videos
  after_create :update_username

  def clear_authentication_token!
    update_attribute(:authentication_token, nil)
  end
  
  def update_username
    if username.nil? || username.empty?
      self.username = "boogie cousins"
      self.save
    elsif username.length > 12
      self.username = self.username[0...12]
      self.save
    end
  end
  
end
