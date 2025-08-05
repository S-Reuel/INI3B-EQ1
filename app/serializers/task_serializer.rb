class TaskSerializer < ActiveModel::Serializer
  attributes :id, :titulo, :descricao, :data_criacao, :data_alteracao, :status, :arquivos
end
