class AddExcluidoToEquipe < ActiveRecord::Migration[8.0]
  def change
    add_column :equipes, :excluido, :boolean, default: false
  end
end
