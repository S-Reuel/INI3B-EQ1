class Usuario < ApplicationRecord
  require "securerandom"

  has_secure_password

  validates :email, presence: true
  validates :nome, presence: true, uniqueness: true
  validates :password, presence: true

  has_many :usuario_equipes
  has_many :equipes, through: :usuario_equipes
end
