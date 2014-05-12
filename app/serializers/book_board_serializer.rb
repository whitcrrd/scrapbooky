class BookBoardSerializer < ActiveModel::Serializer
  attributes :book_id, :book_title, :url, :id
end
