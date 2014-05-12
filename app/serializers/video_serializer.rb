class VideoSerializer < ActiveModel::Serializer
  attributes :id, :title, :url, :youtube_id, :cname, :book_id, :start, :end
end
