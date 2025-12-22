class TaskAttachment < ApplicationRecord
  belongs_to :task
  belongs_to :usuario

  has_one_attached :arquivo
end
