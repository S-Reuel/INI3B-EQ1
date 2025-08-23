class Task < ApplicationRecord
  enum :status, { pendente: 0, concluido: 1, em_andamento: 2, atrasado: 3, cancelado: 4 }

  has_and_belongs_to_many :git_hub
  has_many :sprint_tasks
  has_many :sprints, through: :sprint_tasks
  has_many_attached :arquivos
end
