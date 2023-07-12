class ChangeDefaultOfIsDoneInTasks < ActiveRecord::Migration[6.1]
  def change
    change_column_default :tasks, :isDone, from: nil, to: false
  end
end
