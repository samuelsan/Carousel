class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username
      t.string :name
      t.string :email
      t.string :gender
      t.text :bio
      t.string :facebook

      t.timestamps
    end
  end
end
