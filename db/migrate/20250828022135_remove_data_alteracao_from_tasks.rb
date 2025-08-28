class RemoveDataAlteracaoFromTasks < ActiveRecord::Migration[8.0]
  def change
    remove_column :tasks, :data_alteracao, :datetime
  end
end
