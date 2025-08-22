class TaskSerializer < ActiveModel::Serializer
  attributes :id, :titulo, :descricao, :created_at, :updated_at, :status, :arquivos_urls

  def arquivos_urls
    return [] unless object.arquivos.attached?

    object.arquivos.map do |arquivo| # Necessário porque podem ter vários arquivos, aí faz o map
    Rails.application.routes.url_helpers.rails_blob_url(arquivo, host: "https://7ffe81650e47.ngrok-free.app")
    end
  end
end
