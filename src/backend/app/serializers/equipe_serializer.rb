class EquipeSerializer < ActiveModel::Serializer
  attributes :id, :nome, :descricao, :excluido
end
