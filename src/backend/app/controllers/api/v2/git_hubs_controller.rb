class Api::V2::GitHubsController < ApplicationController
  before_action :set_git_hub, only: %i[ show update destroy ]

  # GET /git_hubs
  def index
    @git_hubs = GitHub.all

    render json: @git_hubs
  end

  # GET /git_hubs/1
  def show
    render json: @git_hub
  end

  # POST /git_hubs
  def create
    @git_hub = GitHub.new(git_hub_params)

    if @git_hub.save
      render json: @git_hub, status: :created, location: @git_hub
    else
      render json: @git_hub.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /git_hubs/1
  def update
    if @git_hub.update(git_hub_params)
      render json: @git_hub
    else
      render json: @git_hub.errors, status: :unprocessable_entity
    end
  end

  # DELETE /git_hubs/1
  def destroy
    @git_hub.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_git_hub
      @git_hub = GitHub.find(params.expect(:id))
    end

    # Only allow a list of trusted parameters through.
    def git_hub_params
      params.expect(git_hub: [ :nome_repo, :usuario_gh, :evento_gh, :id_gh, :data, :mensagem ])
    end
end
