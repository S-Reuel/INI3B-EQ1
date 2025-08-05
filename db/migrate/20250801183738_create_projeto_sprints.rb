class CreateProjetoSprints < ActiveRecord::Migration[8.0]
  def change
    create_table :projeto_sprints do |t|
      t.references :projeto, null: false, foreign_key: true
      t.references :sprint, null: false, foreign_key: true

      t.timestamps
    end
  end
end
