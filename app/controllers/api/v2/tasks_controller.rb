class Api::V2::TasksController < ApplicationController
  before_action :set_task, only: %i[ show update destroy ]


  $host = "https://5b9257d0b811.ngrok-free.app"
  # GET /tasks
  def index
    @tasks = Task.all

    render json: @tasks
  end

  # GET /tasks/1
  def show
    render json: @task
  end

  # GET /task/githubdata
  def show_with_github_data
  @tasks = Task.includes(:git_hub, arquivos_attachments: :blob).all

  render json: @tasks.map { |task|
    task.as_json(include: {
      git_hub: {
        only: [ :nome_repo, :usuario_gh, :evento_gh, :id_gh, :data, :mensagem ]
      }
    }).merge(
      arquivos_urls: task.arquivos.map { |arquivo|
        Rails.application.routes.url_helpers.rails_blob_url(arquivo, host: $host)
     s }
    )
  }
  end

  # GET task/githubdataid/1
  def show_with_github_data_by_id
    @task = Task.includes(:git_hub, arquivos_attachments: :blob).find(params[:id])

    render json: @task.as_json(include: {
      git_hub: {
        only: [ :nome_repo, :usuario_gh, :evento_gh, :id_gh, :data, :mensagem ]
      }
    }).merge(
      arquivos_urls: @task.arquivos.map do |arquivo|
        Rails.application.routes.url_helpers.rails_blob_url(arquivo, host: $host)
      end
    )
  end

  # POST /tasks
  def create
    @task = Task.new(task_params)

    if @task.save
      render json: @task, status: :created, location: api_v2_task_url(@task)
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /tasks/1
  def update
    if @task.update(task_params)
      if params[:task][:arquivos].present?
        anexar_novos_arquivos(@task, params[:task][:arquivos]) if params[:task][:arquivos].present?
      end
      render json: @task
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  def anexar_novos_arquivos(task, novos_arquivos)
    novos_arquivos = Array.wrap(novos_arquivos)

    novos_arquivos.each do |arquivo|
    unless task.arquivos.any? { |a| a.blob.filename == arquivo.original_filename && a.blob.byte_size == arquivo.size }
      task.arquivos.attach(arquivo)
    end
  end
  end

  # DELETE /tasks/1
  def destroy
    @task.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_task
      @task = Task.find(params.expect(:id))
    end

    # Only allow a list of trusted parameters through.
    def task_params
      params.expect(task: [ :titulo, :descricao, :data_criacao, :data_alteracao, :status, :arquivos_urls ])
    end
end
