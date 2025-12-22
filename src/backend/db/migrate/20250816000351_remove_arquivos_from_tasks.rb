class RemoveArquivosFromTasks < ActiveRecord::Migration[8.0]
  def change
    remove_column :tasks, :arquivos, :string
  end
end
