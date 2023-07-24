module Mutations
  class CreateTask < BaseMutation
    description "Create a new Task"

    argument :name, String, required: true
    argument :description, String, required: true
    argument :order, Integer, required: true

    field :task, Types::TaskType, null: false 

    def resolve(name:, description:, order:)
      task = Task.create!(
        name: name,
        description: description,
        order: order
      )
      { task: task }
    end
  end
end
