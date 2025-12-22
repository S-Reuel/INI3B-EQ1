class RemoveDataCriacaoFromProjetos < ActiveRecord::Migration[8.0]
  def change
    remove_column :projetos, :data_criacao, :date
  end
end
