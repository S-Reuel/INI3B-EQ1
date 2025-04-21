class Api::V2::PasswordController < ApplicationController
  skip_before_action :authenticate_request
  def esqueci
    usuario = Usuario.find_by_email(params[:email])
    if usuario
      UserMailer.redef_senha(usuario).deliver_now
      render json: {
        alert: "Se este usuário existe, um email de redefinição foi enviado"
      }
    else
      render json: {
        alert: "Se este usuário existe, um email de redefinição foi enviado"
      }
    end
  end

  def redefinir
    begin
      decoded_token = JWT.decode(params[:token], Rails.application.secret_key_base, true, { algorithm: "HS256" })
      usuario_id = decoded_token[0]["sub"]
      usuario = Usuario.find(usuario_id)

      if usuario.update(password: params[:password])
        render json: { alert: "Senha redefinida com sucesso!" }
      else
        render json: { error: usuario.errors.full_messages }, status: :unprocessable_entity
      end
    rescue JWT::ExpiredSignature
      render json: { alert: "Token expirado. Solicite outro." }, status: :unauthorized
    rescue JWT::DecodeError
      render json: { alert: "Token inválido." }, status: :unauthorized
    end
  end
end
