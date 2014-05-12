class Item < ActiveRecord::Base
  
  belongs_to :subject, polymorphic: true
  belongs_to :book
        
end
