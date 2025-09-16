class Api::V2::UsuarioTasksController < ApplicationController
  before_action :set_usuario_task, only: %i[ show update destroy ]

  # GET /usuario_tasks
  def index
    @usuario_tasks = UsuarioTask.all

    render json: @usuario_tasks.as_json(only: [ :id, :usuario_id, :task_id ])
  end

  # GET /usuario_tasks/1
  def show
    ut = UsuarioTask.find(params[:id])
    render json: ut.as_json(only: [ :id, :usuario_id, :task_id ])
  end

  # POST /usuario_tasks
  def create
    @usuario_task = UsuarioTask.new(usuario_task_params)

    if @usuario_task.save
      render json: @usuario_task, status: :created, location: api_v2_usuario_task_url(@usuario_task)
    else
      render json: @usuario_task.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /usuario_tasks/1
  def update
    if @usuario_task.update(usuario_task_params)
      render json: @usuario_task
    else
      render json: @usuario_task.errors, status: :unprocessable_entity
    end
  end

  # DELETE /usuario_tasks/1
  def destroy
    @usuario_task.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_usuario_task
      @usuario_task = UsuarioTask.find(params.expect(:id))
    end

    # Only allow a list of trusted parameters through.
    def usuario_task_params
      params.expect(usuario_task: [ :usuario_id, :task_id ])
    end
end
