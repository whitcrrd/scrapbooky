class CreateVideos < ActiveRecord::Migration
  def change
    create_table :videos do |t|
      t.string :title
      t.string :url
      t.string :youtube_id
      t.string :thumbnail
      t.integer :user_id
      t.integer :book_id
      t.integer :sizeX, :default => 1
      t.integer :sizeY, :default => 1
      t.integer :col
      t.integer :row
      t.integer :start, :default => 0
      t.integer :end
      t.string :cname, :default => "video"

      t.timestamps
    end
  end
end
