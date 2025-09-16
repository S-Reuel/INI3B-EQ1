class Api::V2::UsuarioEquipesController < ApplicationController
  before_action :set_usuario_equipe, only: %i[ show update destroy ]

  # GET /usuario_equipes
  def index
    @usuario_equipes = UsuarioEquipe.all

    render json: @usuario_equipes
  end

  # GET /usuario_equipes/1
  def show
    render json: @usuario_equipe
  end

  # GET /equipe_de_user/1
  def show_by_user_id
    @usuario = Usuario.find(params[:usuario_id])

    @equipe_usuario = @usuario.usuario_equipes

    @equipes = @usuario.equipes

    @equipes_com_papel = @equipes.map do |equipe|
    papel = @equipe_usuario.find { |p| p.equipe_id == equipe.id }

    {
      id: equipe.id,
      nome: equipe.nome,
      descricao: equipe.descricao,
      papel: papel&.papel,
      excluido: equipe.excluido,
      created_at: equipe.created_at,
      updated_at: equipe.updated_at
    }
  end

  render json: {
    equipes: @equipes_com_papel
  }
  end

  # GET /membros/1
  def show_members
    @equipe = Equipe.find(params[:equipe_id])

    @equipe_usuario = @equipe.usuario_equipes

    render json: @equipe_usuario
  end

  # POST /usuario_equipes
  def create
    @usuario_equipe = UsuarioEquipe.new(usuario_equipe_params)

    if @usuario_equipe.save
      render json: @usuario_equipe, status: :created, location: api_v2_usuario_equipe_url(@usuario_equipe)
    else
      render json: @usuario_equipe.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /usuario_equipes/1  >> id = id do conteudo usuario_equipes, não é nem id de usuario nem de equipe
  def update
    if @usuario_equipe.update(usuario_equipe_params)
      render json: @usuario_equipe
    else
      render json: @usuario_equipe.errors, status: :unprocessable_entity
    end
  end

  # DELETE /usuario_equipes/1
  def destroy
    @usuario_equipe.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_usuario_equipe
      @usuario_equipe = UsuarioEquipe.find(params.expect(:id))
    end

    # Only allow a list of trusted parameters through.
    def usuario_equipe_params
      params.expect(usuario_equipe: [ :usuario_id, :equipe_id, :papel ])
    end
end
