class AddExcluidoToTasks < ActiveRecord::Migration[8.0]
  def change
    add_column :tasks, :excluido, :boolean, default: false
  end
end
