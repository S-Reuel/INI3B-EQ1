class EquipePolicy < ApplicationPolicy
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
    record
  end
end
