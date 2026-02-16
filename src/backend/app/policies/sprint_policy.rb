class SprintPolicy < ApplicationPolicy
  def create?
    user.usuario_equipes.exists?(papel: [ :gestor, :lider ])
  end

  def update?
    gestor? || lider?
  end

  def destroy?
    gestor? || lider?
  end

  def show?
    gestor? || lider? || dev?
  end

  private

  def equipe
    record.projeto.equipes.first
  end
end
