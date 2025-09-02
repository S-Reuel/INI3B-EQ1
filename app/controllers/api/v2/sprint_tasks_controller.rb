class Api::V2::SprintTasksController < ApplicationController
  before_action :set_sprint_task, only: %i[ show update destroy ]

  # GET /sprint_tasks
  def index
    @sprint_tasks = SprintTask.all

    render json: @sprint_tasks
  end

  # GET /sprint_tasks/1
  def show
    render json: @sprint_task
  end

  # GET sprint/task/1
  def show_with_tasks_by_id
    @sprint = Sprint.find(params[:sprint_id])
      @tasks = @sprint.tasks
      render json: @sprint.as_json(include: {
        tasks: {
          only: [ :id, :titulo, :descricao, :created_at, :updated_at, :status, :arquivos, :excluido ]
        }
      })
  end


  # POST /sprint_tasks
  def create
    @sprint_task = SprintTask.new(sprint_task_params)

    if @sprint_task.save
      render json: @sprint_task, status: :created, location: api_v2_sprint_task_url(@sprint_task)
    else
      render json: @sprint_task.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /sprint_tasks/1
  def update
    if @sprint_task.update(sprint_task_params)
      render json: @sprint_task
    else
      render json: @sprint_task.errors, status: :unprocessable_entity
    end
  end

  # DELETE /sprint_tasks/1
  def destroy
    @sprint_task.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_sprint_task
      @sprint_task = SprintTask.find(params.expect(:id))
    end

    # Only allow a list of trusted parameters through.
    def sprint_task_params
      params.expect(sprint_task: [ :sprint_id, :task_id ])
    end
end
