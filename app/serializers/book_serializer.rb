class BookSerializer < ActiveModel::Serializer
  attributes :id, :title, :book_items, :user_editable, :user_id
end
