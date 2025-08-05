require "test_helper"

class ProjetoSprintsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @projeto_sprint = projeto_sprints(:one)
  end

  test "should get index" do
    get projeto_sprints_url, as: :json
    assert_response :success
  end

  test "should create projeto_sprint" do
    assert_difference("ProjetoSprint.count") do
      post projeto_sprints_url, params: { projeto_sprint: { projeto_id: @projeto_sprint.projeto_id, sprint_id: @projeto_sprint.sprint_id } }, as: :json
    end

    assert_response :created
  end

  test "should show projeto_sprint" do
    get projeto_sprint_url(@projeto_sprint), as: :json
    assert_response :success
  end

  test "should update projeto_sprint" do
    patch projeto_sprint_url(@projeto_sprint), params: { projeto_sprint: { projeto_id: @projeto_sprint.projeto_id, sprint_id: @projeto_sprint.sprint_id } }, as: :json
    assert_response :success
  end

  test "should destroy projeto_sprint" do
    assert_difference("ProjetoSprint.count", -1) do
      delete projeto_sprint_url(@projeto_sprint), as: :json
    end

    assert_response :no_content
  end
end
