class ProjetoPolicy < ApplicationPolicy
  def create?
    user.usuario_equipes.exists?(papel: :gestor)
  end

  def update?
    gestor?
  end

  def destroy?
    gestor?
  end

  def show?
    gestor? || lider? || dev?
  end

  private

  def equipe
    record.equipes.first
  end
end
