class CreateTasks < ActiveRecord::Migration[6.1]
  def change
    create_table :tasks do |t|
      t.string :name
      t.text :description
      t.integer :order
      t.boolean :isDone

      t.timestamps
    end
  end
end
