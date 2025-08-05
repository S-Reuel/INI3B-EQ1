class CreateTasks < ActiveRecord::Migration[8.0]
  def change
    create_table :tasks do |t|
      t.string :titulo
      t.text :descricao
      t.datetime :data_criacao
      t.datetime :data_alteracao
      t.integer :status, default: 0
      t.string :arquivos

      t.timestamps
    end
  end
end
