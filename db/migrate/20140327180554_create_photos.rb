class CreatePhotos < ActiveRecord::Migration
  def change
    create_table :photos do |t|
      t.string :title
      t.string :url
      t.integer :user_id
      t.integer :book_id
      t.integer :sizeX, :default => 1
      t.integer :sizeY, :default => 1
      t.integer :col
      t.integer :row
      t.string :cname, :default => "photo"

      t.timestamps
    end
  end
end
