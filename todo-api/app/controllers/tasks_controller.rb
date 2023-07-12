class TasksController < ApplicationController

  # GET /tasts
  def index
    @tasks = Task.all
    render json: @tasks
  end

  # POST /tasts
  def create
    @task = Task.new(task_params)
    if @task.save
      render json: @task
    else
      render error: { error: "Unable to create task"}, status: 400
    end
  end

  # GET /tasks/:id
  def show
    @task = Task.find(params[:id])
    render json: @task
  end

  # PUT /tasks/:id
  def update
    @task = Task.find(params[:id])
    if @task
      @task.update(task_params)
      render json: {message: "Task updated successfully"}, status: 200
    else
      render error: { error: "Unable to update task"}, status: 400
    end
  end

  # DELETE /tasks/:id
  def destroy
    @task = Task.find(params[:id])
    if @task
      @task.destroy
      render json: {message: "Task deleted successfully"}, status: 200
    else
      render error: { error: "Unable to update task"}, status: 400
    end
  end


  private

  def task_params
    params.require(:task).permit(:name, :description, :order, :isDone)
  end

end
