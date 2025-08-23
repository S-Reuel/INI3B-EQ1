class CreateJoinTableGitHubsTasks < ActiveRecord::Migration[8.0]
  def change
    create_join_table :git_hubs, :tasks do |t|
      t.index [ :git_hub_id, :task_id ]
      t.index [ :task_id, :git_hub_id ]
    end
  end
end
