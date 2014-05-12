class CreateBooks < ActiveRecord::Migration
  def change
    create_table :books do |t|
      t.string :title
      t.integer :user_id
      t.boolean :empty, :default => true

      t.timestamps
    end
  end
end
