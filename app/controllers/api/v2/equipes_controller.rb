class Api::V2::EquipesController < ApplicationController
  before_action :set_equipe, only: %i[ show update destroy ]

  # GET /equipes
  def index
    @equipes = Equipe.where("excluido = ?", false)

    render json: @equipes
  end

  # GET /equipes/1
  def show
    if !@equipe.excluido
      render json: @equipe
    else
      render json: @equipe.errors, status: :not_found
    end
  end

  # POST /equipes
  def create
    @equipe = Equipe.new(equipe_params)

    if @equipe.save
      render json: @equipe, status: :created, location: api_v2_equipe_url(@equipe)
    else
      render json: @equipe.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /equipes/1
  def update
    if @equipe.update(equipe_params)
      render json: @equipe
    else
      render json: @equipe.errors, status: :unprocessable_entity
    end
  end

  # DELETE /equipes/1
  def destroy
    @equipe.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_equipe
      @equipe = Equipe.find(params.expect(:id))
    end

    # Only allow a list of trusted parameters through.
    def equipe_params
      params.expect(equipe: [ :nome, :descricao, :excluido ])
    end
end
