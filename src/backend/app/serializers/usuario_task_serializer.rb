class UsuarioTaskSerializer < ActiveModel::Serializer
  attributes :id
  belongs_to :usuario, serializer: UsuarioSerializer
  belongs_to :task, serializer: TaskSerializer
end
