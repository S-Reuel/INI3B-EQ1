class ProjetoSprintSerializer < ActiveModel::Serializer
  attributes :id
  belongs_to :projeto
  belongs_to :sprint
end
