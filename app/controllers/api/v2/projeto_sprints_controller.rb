class  Api::V2::ProjetoSprintsController < ApplicationController
  before_action :set_projeto_sprint, only: %i[ show update destroy ]

  # GET /projeto_sprints
  def index
    @projeto_sprints = ProjetoSprint.all

    render json: @projeto_sprints
  end

  # GET /projeto_sprints/1
  def show
    render json: @projeto_sprint
  end

  # GET /projeto_sprints/sprints/1
  def show_sprint_by_projeto_id
    @projeto = Projeto.find(params[:projeto_id])

    @sprints = @projeto.sprints

    render json: @projeto.as_json(include: {
      sprints: {
        only: [ :id, :nome, :data_inicio, :data_fim, :projeto_id, :excluido ]
      }
    })
  end

  # POST /projeto_sprints
  def create
    @projeto_sprint = ProjetoSprint.new(projeto_sprint_params)

    if @projeto_sprint.save
      render json: @projeto_sprint, status: :created, location: @projeto_sprint
    else
      render json: @projeto_sprint.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /projeto_sprints/1
  def update
    if @projeto_sprint.update(projeto_sprint_params)
      render json: @projeto_sprint
    else
      render json: @projeto_sprint.errors, status: :unprocessable_entity
    end
  end

  # DELETE /projeto_sprints/1
  def destroy
    @projeto_sprint.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_projeto_sprint
      @projeto_sprint = ProjetoSprint.find(params.expect(:id))
    end

    # Only allow a list of trusted parameters through.
    def projeto_sprint_params
      params.expect(projeto_sprint: [ :projeto_id, :sprint_id ])
    end
end
