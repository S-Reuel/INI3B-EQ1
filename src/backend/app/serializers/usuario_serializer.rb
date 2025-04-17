class UsuarioSerializer < ActiveModel::Serializer
  attributes :id, :nome, :email, :user_git, :excluido
end
