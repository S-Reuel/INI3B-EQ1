class AddExcluidoToProjetos < ActiveRecord::Migration[8.0]
  def change
    add_column :projetos, :excluido, :boolean, default: false
  end
end
