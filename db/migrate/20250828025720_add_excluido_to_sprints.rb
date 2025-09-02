class AddExcluidoToSprints < ActiveRecord::Migration[8.0]
  def change
    add_column :sprints, :excluido, :boolean, default: false
  end
end
