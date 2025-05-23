class GitHubSerializer < ActiveModel::Serializer
  attributes :id, :nome_repo, :usuario_gh, :evento_gh, :id_gh, :data, :mensagem
end
