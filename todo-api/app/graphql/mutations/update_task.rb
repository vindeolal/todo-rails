module Mutations
  class UpdateTask < BaseMutation
    argument :id, ID, required: true
    argument :name, String, required: false
    argument :description, String, required: false
    argument :order, Integer, required: false
    argument :is_done, Boolean, required: false

    field :task, Types::TaskType, null: false 

    def resolve(id:, **attributes)
      task = Task.find(id)
      task.update!(attributes)
      { task: task }
    end
  end
end
