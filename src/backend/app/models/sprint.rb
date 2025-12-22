class Sprint < ApplicationRecord
  belongs_to :projeto
  has_many :sprint_tasks
  has_many :tasks, through: :sprint_tasks
end
