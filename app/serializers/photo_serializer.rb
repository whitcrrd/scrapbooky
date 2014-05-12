class PhotoSerializer < ActiveModel::Serializer
  attributes :id, :title, :url, :cname, :book_id
end
