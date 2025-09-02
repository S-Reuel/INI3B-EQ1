class RemoveDataCriacaoFromTasks < ActiveRecord::Migration[8.0]
  def change
    remove_column :tasks, :data_criacao, :datetime
  end
end
