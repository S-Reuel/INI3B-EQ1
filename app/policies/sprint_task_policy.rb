class SprintTaskPolicy < ApplicationPolicy
  def create?
    gestor? || lider?
  end

  private

  def equipe
    record.sprint.projeto.equipes.first
  end
end
