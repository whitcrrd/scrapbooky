class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.integer :subject_id
      t.string :subject_type
      t.string :name
      t.integer :book_id

      t.timestamps
    end
    
    add_index :items, :subject_id
    add_index :items, :subject_type
    add_index :items, :book_id
  end
end
