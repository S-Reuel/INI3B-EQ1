class GitHub < ApplicationRecord
  has_and_belongs_to_many :tasks, join_table: :git_hubs_tasks
end
