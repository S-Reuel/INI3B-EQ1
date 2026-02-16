class Api::V2::SprintsController < ApplicationController
  before_action :set_sprint, only: %i[ show update destroy ]

  # GET /sprints
  def index
    @sprints = Sprint.where("excluido = ?", false)

    render json: @sprints
  end

  # GET /sprints/1
  def show
    @sprint = Sprint.find(params[:id])
    if @sprint
      render json: @sprint
    else
      render json: @sprint.errors, status: :not_found
    end
  end

  # POST /sprints
  def create
    authorize Sprint
    @sprint = Sprint.new(sprint_params)

    if @sprint.save
      render json: @sprint, status: :created, location: api_v2_sprint_url(@sprint)
    else
      render json: @sprint.errors, status: :unprocessable_content
    end
  end

  # PATCH/PUT /sprints/1
  def update
    authorize @sprint
    if @sprint.update(sprint_params)
      render json: @sprint
    else
      render json: @sprint.errors, status: :unprocessable_content
    end
  end

  # DELETE /sprints/1
  def destroy
    @sprint = Sprint.find(params[:id])

    if @sprint.destroy!
      render json: @sprint, status: :no_content
    else
      render json: @sprint.errors, status: :not_found
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_sprint
      @sprint = Sprint.find(params.expect(:id))
    end

    # Only allow a list of trusted parameters through.
    def sprint_params
      params.expect(sprint: [ :nome, :data_inicio, :data_fim, :projeto_id, :excluido ])
    end
end
