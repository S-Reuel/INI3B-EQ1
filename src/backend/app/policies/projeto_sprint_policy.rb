class ProjetoSprintPolicy < ApplicationPolicy
  def create?
    gestor? || lider?
  end

  private

  def equipe
    record.projeto.equipes.first
  end
end
