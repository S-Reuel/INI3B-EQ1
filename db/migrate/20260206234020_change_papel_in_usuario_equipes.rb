class ChangePapelInUsuarioEquipes < ActiveRecord::Migration[8.0]
  def change
    change_column :usuario_equipes, :papel, :integer, default: 0, null: false
  end
end
