class EquipeProjetoSerializer < ActiveModel::Serializer
  attributes :id
  belongs_to :equipe
  belongs_to :projeto
end
