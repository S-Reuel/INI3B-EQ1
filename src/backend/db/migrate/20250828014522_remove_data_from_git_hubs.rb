class RemoveDataFromGitHubs < ActiveRecord::Migration[8.0]
  def change
    remove_column :git_hubs, :data, :date
  end
end
