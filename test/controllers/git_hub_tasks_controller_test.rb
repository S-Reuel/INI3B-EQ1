require "test_helper"

class GitHubTasksControllerTest < ActionDispatch::IntegrationTest
  setup do
    @git_hub_task = git_hub_tasks(:one)
  end

  test "should get index" do
    get git_hub_tasks_url, as: :json
    assert_response :success
  end

  test "should create git_hub_task" do
    assert_difference("GitHubTask.count") do
      post git_hub_tasks_url, params: { git_hub_task: { git_hub_id: @git_hub_task.git_hub_id, task_id: @git_hub_task.task_id } }, as: :json
    end

    assert_response :created
  end

  test "should show git_hub_task" do
    get git_hub_task_url(@git_hub_task), as: :json
    assert_response :success
  end

  test "should update git_hub_task" do
    patch git_hub_task_url(@git_hub_task), params: { git_hub_task: { git_hub_id: @git_hub_task.git_hub_id, task_id: @git_hub_task.task_id } }, as: :json
    assert_response :success
  end

  test "should destroy git_hub_task" do
    assert_difference("GitHubTask.count", -1) do
      delete git_hub_task_url(@git_hub_task), as: :json
    end

    assert_response :no_content
  end
end
