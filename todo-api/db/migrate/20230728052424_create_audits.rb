class CreateAudits < ActiveRecord::Migration[6.1]
  def change
    create_table :audits do |t|
      t.string :entity_name
      t.integer :record_id
      t.string :action
      t.text :updates

      t.timestamps
    end
  end
end
