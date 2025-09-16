class UsuarioTask < ApplicationRecord
  belongs_to :usuario
  belongs_to :task
end
