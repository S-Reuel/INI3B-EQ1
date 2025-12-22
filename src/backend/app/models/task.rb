class Task < ApplicationRecord
  enum :status, { pendente: 0, concluido: 1, em_andamento: 2, atrasado: 3, cancelado: 4 }

  has_and_belongs_to_many :git_hubs, join_table: :git_hubs_tasks
  has_many :sprint_tasks
  has_many :sprints, through: :sprint_tasks
  has_many :usuario_tasks
  has_many :usuarios, through: :usuario_tasks
  has_many :task_attachments, dependent: :destroy
end
