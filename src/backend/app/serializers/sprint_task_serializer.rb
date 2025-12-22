class SprintTaskSerializer < ActiveModel::Serializer
  attributes :id
  has_one :sprint
  has_one :task
end
