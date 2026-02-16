class UsuarioEquipe < ApplicationRecord
  belongs_to :usuario
  belongs_to :equipe

  enum :papel, {
    dev: 0,
    lider: 1,
    gestor: 2
  }
end
