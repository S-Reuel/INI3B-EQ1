class EquipeProjetoPolicy < ApplicationPolicy
  def create?
    gestor?
  end

  private

  def equipe
    record.equipe
  end
end
