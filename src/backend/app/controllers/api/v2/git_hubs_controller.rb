class Api::V2::GitHubsController < ApplicationController
  skip_before_action :authenticate_request, only: [ :receive ]
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
      render json: @git_hub.errors, status: :unprocessable_content
    end
  end

  # POST /git_hubs/receive
  def receive
    payload = request.body.read
    data = JSON.parse(payload)

    repo_name = data["repository"]["name"]
    user_name = data["pusher"]["name"] rescue data["sender"]["login"]
    event_type = request.headers["X-GitHub-Event"]

    commit_data = data["head_commit"] || data["commits"]&.last
    if commit_data
      message = commit_data["message"]
      commit_id = commit_data["id"]
      timestamp = commit_data["timestamp"]

      git_hub = GitHub.create!(
        nome_repo: repo_name,
        usuario_gh: user_name,
        evento_gh: event_type,
        id_gh: commit_id,
        mensagem: message,
        data: timestamp
      )

      # Captura todas as tasks (#task:id) da mensagem
      task_ids = message.scan(/#task:\s*(\d+)/).flatten.map(&:to_i)
      task_ids.each do |task_id|
        if (task = Task.find_by(id: task_id))
          git_hub.tasks << task unless git_hub.tasks.include?(task)
        end
      end
    end

    render json: { status: "ok" }, status: :created
  rescue => e
    render json: { error: e.message }, status: :unprocessable_content
  end

  # PATCH/PUT /git_hubs/1
  def update
    if @git_hub.update(git_hub_params)
      render json: @git_hub
    else
      render json: @git_hub.errors, status: :unprocessable_content
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
      params.expect(git_hub: [ :nome_repo, :usuario_gh, :evento_gh, :id_gh, :mensagem, :data ])
    end
end
