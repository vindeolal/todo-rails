require "test_helper"

class TasksControllerTest < ActionDispatch::IntegrationTest

  test "Raises bad request with proper error" do
    post "/tasks", params: { task: { order: 1 } }
    assert_response :bad_request
    response_data = JSON.parse(response.body)
    assert_includes response_data["message"], "Name cannot be blank"
    assert_includes response_data["message"], "Description cannot be blank"
  end

  test "Create a new task" do
    create_some_tasks
    assert_response :success
  end

  test "Get all the tasks" do
    create_some_tasks
    get "/tasks"
    assert_response :success

    response_data = JSON.parse(response.body)
    assert_kind_of Array, response_data
    assert_not_empty response_data
    assert_equal 1, response_data.size
  end

  test "Get the task by id" do
    create_some_tasks
    get "/tasks/#{get_id_of_one_task}"
    assert_response :success
    response_data = JSON.parse(response.body)

    assert_equal "New Task", response_data["name"]
  end

  test "Update the task" do
    create_some_tasks
    task_id = get_id_of_one_task
    put "/tasks/#{task_id}", params: { task: { name: "Updated Task name", description: "Test description", order: 1 } }
    assert_response :success
    response_data = JSON.parse(response.body)

    assert_equal "Task updated successfully", response_data["message"]
  end

  test "Delete the task" do
    create_some_tasks
    task_id = get_id_of_one_task
    delete "/tasks/#{task_id}"
    assert_response :success
    response_data = JSON.parse(response.body)

    assert_equal "Task deleted successfully", response_data["message"]
  end


  private

  def create_some_tasks()
    post "/tasks", params: { task: { name: "New Task", description: "Test description", order: 1 } }
  end

  def get_id_of_one_task()
    get "/tasks"
    assert_response :success
    response_data = JSON.parse(response.body)

    if response_data.empty?
      raise "No tasks found in the response" 
    end
  
    response_data.first["id"]
  end
end
