class ProjetoSerializer < ActiveModel::Serializer
  attributes :id, :nome, :descricao, :created_at, :updated_at, :excluido
end
