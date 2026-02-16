class Api::V2::TasksController < ApplicationController
  before_action :set_task, only: %i[ show update destroy ]


  $host = "http://localhost:3000"
  # GET /tasks
  def index
    @tasks = Task.where("excluido = ?", false)

    render json: @tasks
  end

  # GET /tasks/1
  def show
    render json: @task
  end

  # GET /task/githubdata
  def show_with_github_data
  @tasks = Task.includes(
    :git_hubs,
    task_attachments: { arquivo_attachment: :blob }
  )

  render json: @tasks.map { |task|
    task.as_json(include: {
      git_hubs: {
        only: [ :nome_repo, :usuario_gh, :evento_gh, :id_gh, :data, :mensagem ]
      }
    }).merge(
      arquivos: task.task_attachments.map { |att|
        {
          id: att.id,
          nome: att.arquivo.filename.to_s,
          url: Rails.application.routes.url_helpers.rails_blob_url(
            att.arquivo,
            host: $host
          ),
          enviado_por: att.usuario.nome,
          enviado_em: att.created_at
        }
      }
    )
  }
  end


# GET task/githubdataid/1
def show_with_github_data_by_id
  @task = Task.includes(
    :git_hubs,
    task_attachments: [ :usuario, arquivo_attachment: :blob ]
  ).find(params[:id])

  render json: @task.as_json(
    include: {
      git_hubs: {
        only: [ :nome_repo, :usuario_gh, :evento_gh, :id_gh, :data, :mensagem ]
      }
    }
  ).merge(
    arquivos: @task.task_attachments.map do |att|
      {
        id: att.id,
        nome: att.arquivo.filename.to_s,
        url: Rails.application.routes.url_helpers.rails_blob_url(
          att.arquivo,
          host: $host
        ),
        enviado_por: att.usuario&.nome,
        enviado_em: att.created_at
      }
    end
  )
end


  # POST /tasks
  def create
    authorize Task
    @task = Task.new(task_params)

    if @task.save
      render json: @task, status: :created, location: api_v2_task_url(@task)
    else
      render json: @task.errors, status: :unprocessable_content
    end
  end

  # PATCH/PUT /tasks/1
  def update
    authorize @task
    if @task.update(task_params)
      if params[:task][:arquivos].present?
        anexar_novos_arquivos(@task, params[:task][:arquivos]) if params[:task][:arquivos].present?
      end
      render json: @task
    else
      render json: @task.errors, status: :unprocessable_content
    end
  end

  def anexar_novos_arquivos(task, novos_arquivos)
  novos_arquivos = Array.wrap(novos_arquivos)

  novos_arquivos.each do |arquivo|
    TaskAttachment.create!(
      task: task,
      usuario: current_user,
      arquivo: arquivo
    )
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
      params.expect(task: [ :titulo, :descricao, :data_criacao, :data_alteracao, :status, :arquivos_urls, :excluido ])
    end
end
