class UsuarioSerializer < ActiveModel::Serializer
  attributes :id, :nome, :email, :user_git, :excluido, :password_reset_sent_at, :avatar_url

  def avatar_url
    return unless object.avatar.attached?

    Rails.application.routes.url_helpers.rails_blob_url(object.avatar, host: "https://a3fbeaf14c95.ngrok-free.app")
  end
end
