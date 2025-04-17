class Usuario < ApplicationRecord
  require "securerandom"

  has_secure_password

  validates :email, presence: true
  validates :nome, presence: true, uniqueness: true
  validate :password

  has_many :usuario_equipes
  has_many :equipes, through: :usuario_equipes
end
