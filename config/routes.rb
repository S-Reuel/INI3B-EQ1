Rails.application.routes.draw do
  namespace :api do
    namespace :v2 do
      resources :equipe_projetos
      get "projeto/projeto_de_equipe/:equipe_id", to: "equipe_projetos#show_by_equipe"
      resources :git_hubs
      resources :projetos
      get "projetos/ps/:id", to: "projetos#show_projeto_sprint_by_id" # Rota para buscar projeto  pelo 'id' e retorná-lo com suas sprints
      resources :usuario_equipes
      get "equipe/equipe_de_user/:usuario_id", to: "usuario_equipes#show_by_user_id"
      get "equipe/membros/:equipe_id", to: "usuario_equipes#show_members"
      post "auth/login", to: "authentication#login" # Rota para fazer login
      resources :usuarios
      patch "usuarios/excluir/:id", to: "usuarios#excluir" # Rota para excluir um usuário logicamente
      get "usuarios/mostra/tudo", to: "usuarios#tudo" # Rota para listar usuários incluindo excluídos
      get "usuarios/nome/:nome", to: "usuarios#show_by_nome" # Rota para buscar usuário pelo nome
      get "usuarios/email/:email", to: "usuarios#show_by_email", constraints: { email: /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}/ } # Rota para buscar usuário pelo email
      resources :equipes
      resources :sprints
      resources :dashboard
      get "dashboard/dados/:id", to: "dashboard#dados"
      post "esqueci", to: "password#esqueci"
      post "redefinir", to: "password#redefinir"
      resources :projeto_sprints
      get "projeto_sprints/sprints/:projeto_id", to: "projeto_sprints#show_sprint_by_projeto_id"
      resources :tasks
    end
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  # get "up" => "rails/health#show", as: :rails_health_check

  # get "usuarios_controller/index" => "usuarios_controller#index"
  # get "usuarios_controller/show" => "usuarios_controller#show"
  # post "usuarios_controller/new" => "usuarios_controller#new"
  # post "usuarios_controller/create" => "usuarios_controller#create"
  # post "usuarios_controller/edit" => "usuarios_controller#edit"
  # post "usuarios_controller/update" => "usuarios_controller#update"
  # post "usuarios_controller/destroy" => "usuarios_controller#destroy"
  # post "usuarios_controller/usuario_params" => "usuarios_controller#usuario_params"



  # Defines the root path route ("/")
  # root "posts#index"
end
