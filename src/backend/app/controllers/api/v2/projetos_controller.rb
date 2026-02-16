class Api::V2::ProjetosController < ApplicationController
  before_action :set_projeto, only: %i[ show update destroy ]

  # GET /projetos
  def index
    @projetos = Projeto.where("excluido = ?", false)

    render json: @projetos
  end

  # GET /projetos/1
  def show
    @projeto = Projeto.find(params[:id])
    authorize @projeto
    if @projeto
      render json: @projeto
    else
      render json: @projeto.errors, status: :not_found
    end
  end

  # GET /projetos/ps/1
  def show_projeto_sprint_by_id # Consulta projeto pelo id e retorna o projeto com suas sprints
    data = JSON.parse(request.body.read)

    id = data["id"]
    @projeto = Projeto.includes(:sprints).find(params[:id], id)
    if @projeto
      render json: @projeto.as_json(include: {
        sprints: {
            only: [ :id, :nome, :data_inicio, :data_fim, :projeto_id, :excluido ]
        }
      })
    else
      render json: @projeto.errors, status: :not_found
    end
  end

  # POST /projetos
  def create
    authorize Projeto
    @projeto = Projeto.new(projeto_params)

    if @projeto.save
      render json: @projeto, status: :created, location: api_v2_projeto_url(@projeto)
    else
      render json: @projeto.errors, status: :unprocessable_content
    end
  end

  # PATCH/PUT /projetos/1
  def update
    authorize @projeto
    if @projeto.update(projeto_params)
      render json: @projeto
    else
      render json: @projeto.errors, status: :unprocessable_content
    end
  end

  # DELETE /projetos/1
  def destroy
    authorize @projeto
    @projeto.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_projeto
      @projeto = Projeto.find(params.expect(:id))
    end

    # Only allow a list of trusted parameters through.
    def projeto_params
      params.expect(projeto: [ :nome, :descricao, :excluido ])
    end
end
