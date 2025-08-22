class CreateSprintTasks < ActiveRecord::Migration[8.0]
  def change
    create_table :sprint_tasks do |t|
      t.references :sprint, null: false, foreign_key: true
      t.references :task, null: false, foreign_key: true

      t.timestamps
    end
  end
end
