class ApplicationController < ActionController::API
  include JsonWebToken

  before_action :authenticate_request

  attr_reader :current_user

  private

  def authenticate_request
    header = request.headers["Authorization"]
    token  = header.split(" ").last if header

    begin
      decoded = jwt_decode(token)
      @current_user = Usuario.find(decoded[:id])
    rescue ActiveRecord::RecordNotFound, JWT::DecodeError
      render json: { error: "Não autorizado" }, status: :unauthorized
    end
  end
end
