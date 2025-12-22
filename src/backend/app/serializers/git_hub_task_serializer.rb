class GitHubTaskSerializer < ActiveModel::Serializer
  attributes :id
  has_one :git_hub
  has_one :task
end
