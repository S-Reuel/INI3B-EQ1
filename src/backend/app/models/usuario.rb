class Usuario < ApplicationRecord
  attr_readonly :password
  require "securerandom"
  require "jwt"


  has_one_attached :avatar

  has_secure_password

  validates :email, presence: true, uniqueness: true
  validates :nome, presence: true, uniqueness: true

  has_many :usuario_equipes
  has_many :equipes, through: :usuario_equipes

  has_many :usuario_tasks
  has_many :tasks, through: :usuario_tasks

  def papel_na_equipe(equipe)
    usuario_equipes.find_by(equipe: equipe)&.papel
  end

  def gerar_jwt_redef_senha
    payload = {
      sub: self.id,
      exp: 1.hour.from_now.to_i
    }
    self.password_reset_sent_at = Time.zone.now
    save!

    JWT.encode(payload, Rails.application.secret_key_base, "HS256")
  end

  def avatar_url
    avatar.attached? ? Rails.application.routes.url_helpers.url_for(avatar) : nil
  end
end
