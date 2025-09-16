require "rails_helper"

RSpec.describe UsuarioTasksController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/usuario_tasks").to route_to("usuario_tasks#index")
    end

    it "routes to #show" do
      expect(get: "/usuario_tasks/1").to route_to("usuario_tasks#show", id: "1")
    end


    it "routes to #create" do
      expect(post: "/usuario_tasks").to route_to("usuario_tasks#create")
    end

    it "routes to #update via PUT" do
      expect(put: "/usuario_tasks/1").to route_to("usuario_tasks#update", id: "1")
    end

    it "routes to #update via PATCH" do
      expect(patch: "/usuario_tasks/1").to route_to("usuario_tasks#update", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/usuario_tasks/1").to route_to("usuario_tasks#destroy", id: "1")
    end
  end
end
