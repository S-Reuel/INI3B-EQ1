require "test_helper"

class GitHubsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @git_hub = git_hubs(:one)
  end

  test "should get index" do
    get git_hubs_url, as: :json
    assert_response :success
  end

  test "should create git_hub" do
    assert_difference("GitHub.count") do
      post git_hubs_url, params: { git_hub: { data: @git_hub.data, evento_gh: @git_hub.evento_gh, id_gh: @git_hub.id_gh, mensagem: @git_hub.mensagem, nome_repo: @git_hub.nome_repo, usuario_gh: @git_hub.usuario_gh } }, as: :json
    end

    assert_response :created
  end

  test "should show git_hub" do
    get git_hub_url(@git_hub), as: :json
    assert_response :success
  end

  test "should update git_hub" do
    patch git_hub_url(@git_hub), params: { git_hub: { data: @git_hub.data, evento_gh: @git_hub.evento_gh, id_gh: @git_hub.id_gh, mensagem: @git_hub.mensagem, nome_repo: @git_hub.nome_repo, usuario_gh: @git_hub.usuario_gh } }, as: :json
    assert_response :success
  end

  test "should destroy git_hub" do
    assert_difference("GitHub.count", -1) do
      delete git_hub_url(@git_hub), as: :json
    end

    assert_response :no_content
  end
end
