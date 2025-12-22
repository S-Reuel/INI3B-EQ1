class CreateGitHubs < ActiveRecord::Migration[8.0]
  def change
    create_table :git_hubs do |t|
      t.string :nome_repo
      t.string :usuario_gh
      t.string :evento_gh
      t.integer :id_gh
      t.date :data
      t.text :mensagem

      t.timestamps
    end
  end
end
