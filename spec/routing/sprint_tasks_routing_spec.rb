require "rails_helper"

RSpec.describe SprintTasksController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/sprint_tasks").to route_to("sprint_tasks#index")
    end

    it "routes to #show" do
      expect(get: "/sprint_tasks/1").to route_to("sprint_tasks#show", id: "1")
    end


    it "routes to #create" do
      expect(post: "/sprint_tasks").to route_to("sprint_tasks#create")
    end

    it "routes to #update via PUT" do
      expect(put: "/sprint_tasks/1").to route_to("sprint_tasks#update", id: "1")
    end

    it "routes to #update via PATCH" do
      expect(patch: "/sprint_tasks/1").to route_to("sprint_tasks#update", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/sprint_tasks/1").to route_to("sprint_tasks#destroy", id: "1")
    end
  end
end
