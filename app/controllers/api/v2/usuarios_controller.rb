class Api::V2::UsuariosController < ApplicationController
  skip_before_action :authenticate_request, only: [ :create ]
  before_action :set_usuario, only: %i[ show update destroy ]

  # GET /usuarios
  def index
    @usuarios = Usuario.where("excluido = ?", false)

    render json: @usuarios
  end

  def tudo
    @usuarios = Usuario.all

    render json: @usuarios
  end

  # GET /usuarios/1
  def show
    @usuario = Usuario.find(params[:id])
    if @usuario
      render json: @usuario
    else
      render json: @usuario.errors, status: :not_found
    end
  end

  # GET /usuarios/nome/nome
  def show_by_nome
    @usuario = Usuario.find_by(nome: params[:nome])
    if @usuario
      render json: @usuario
    end
  end

  # GET /usuarios/email/email
  def show_by_email
    @usuario = Usuario.find_by(email: params[:email])
    if @usuario
      render json: @usuario
    end
  end

  # POST /usuarios
  def create
    @usuario = Usuario.new(usuario_params)

    if @usuario.save
      render json: @usuario, status: :created, location: api_v2_usuario_url(@usuario)
    else
      render json: @usuario.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /usuarios/1
  def update
    if @usuario.update(usuario_params)
      if params[:usuario][:avatar].present?
        @usuario.avatar.attach(params[:usuario][:avatar])
      end
      render json: @usuario
    else
      render json: @usuario.errors, status: :unprocessable_entity
    end
  end

  # Exclusão física
  # DELETE /usuarios/1
  def destroy
    @usuario = Usuario.find(params[:id])

    if @usuario.destroy!
      render json: @usuario, status: :no_content
    else
      render json: @usuario.errors, status: :not_found
    end
  end

  # Exclusão lógica
  # PATCH /usuarios/excluir/1
  def excluir
    @usuario = Usuario.find(params[:id])

    if @usuario.update(excluido: true)
      render json: { alert: "Usuário excluído com sucesso!" }
    else
      render json: { error: @usuario.errors, status: :not_found }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_usuario
      @usuario = Usuario.find(params.expect(:id))
    end

    # Only allow a list of trusted parameters through.
    def usuario_params
      params.expect(usuario: [ :nome, :password, :email, :user_git, :excluido, :avatar ])
    end
end
