class UsuarioTaskSerializer < ActiveModel::Serializer
  attributes :id
  has_one :usuario
  has_one :task
end
