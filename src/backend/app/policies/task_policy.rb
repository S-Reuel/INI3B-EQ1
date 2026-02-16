class TaskPolicy < ApplicationPolicy
  def create?
    user.usuario_equipes.exists?(papel: [ :gestor, :lider ])
  end

  def update?
    if sprint.nil?
      return true if gestor_global? || lider_global?
      return task_do_usuario?
    end

    return true if gestor? || lider?

    dev? && task_do_usuario?
  end

  def destroy?
    if sprint.nil?
      return gestor_global? || lider_global?
    end

    gestor? || lider?
  end

  def show?
    true
  end

  private

  def sprint
    record.sprints.first
  end

  def equipe
    sprint.projeto.equipes.first
  end

  def task_do_usuario?
    record.usuario_tasks.exists?(usuario: user)
  end

  def gestor_global?
    user.usuario_equipes.exists?(papel: :gestor)
  end

  def lider_global?
    user.usuario_equipes.exists?(papel: :lider)
  end
end
