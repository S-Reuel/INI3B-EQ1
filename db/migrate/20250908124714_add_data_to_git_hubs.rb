class AddDataToGitHubs < ActiveRecord::Migration[8.0]
  def change
    add_column :git_hubs, :data, :timestamp
  end
end
