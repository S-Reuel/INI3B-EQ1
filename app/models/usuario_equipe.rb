class UsuarioEquipe < ApplicationRecord
  belongs_to :usuario
  belongs_to :equipe

  enum papel: {
    dev: "dev",
    lider: "lider",
    gestor: "gestor"
  }
end
