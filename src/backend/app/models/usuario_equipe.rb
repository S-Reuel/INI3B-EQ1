class UsuarioEquipe < ApplicationRecord
  belongs_to :usuario
  belongs_to :equipe

  # código removido para ser adaptado ao banco, adicionar depois

  # enum papel: {
  #   dev: "dev",
  #   lider: "lider",
  #   gestor: "gestor"
  # }
end
