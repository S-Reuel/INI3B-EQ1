class Usuario < ApplicationRecord
  require "securerandom"
  require "jwt"

  has_secure_password

  validates :email, presence: true
  validates :nome, presence: true, uniqueness: true

  has_many :usuario_equipes
  has_many :equipes, through: :usuario_equipes

  def gerar_jwt_redef_senha
    payload = {
      sub: self.id,
      exp: 1.hour.from_now.to_i
    }
    self.password_reset_sent_at = Time.zone.now
    save!

    JWT.encode(payload, Rails.application.secret_key_base, "HS256")
  end
end
