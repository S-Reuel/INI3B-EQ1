class TaskSerializer < ActiveModel::Serializer
  attributes :id, :titulo, :descricao, :created_at, :updated_at, :status, :excluido, :arquivos_urls

  def arquivos_urls
    object.task_attachments.map do |att|
      Rails.application.routes.url_helpers.rails_blob_url(
        att.arquivo,
        host: "http://localhost:3000"
      )
    end
  end
end
