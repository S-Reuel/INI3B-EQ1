class RemoveSenhaFromUsuarios < ActiveRecord::Migration[8.0]
  def change
    remove_column :usuarios, :senha, :string
  end
end
