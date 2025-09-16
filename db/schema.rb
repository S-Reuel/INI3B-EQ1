# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_09_16_164847) do
  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "equipe_projetos", force: :cascade do |t|
    t.integer "equipe_id", null: false
    t.integer "projeto_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["equipe_id"], name: "index_equipe_projetos_on_equipe_id"
    t.index ["projeto_id"], name: "index_equipe_projetos_on_projeto_id"
  end

  create_table "equipes", force: :cascade do |t|
    t.string "nome"
    t.string "descricao"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "excluido", default: false
  end

  create_table "git_hubs", force: :cascade do |t|
    t.string "nome_repo"
    t.string "usuario_gh"
    t.string "evento_gh"
    t.integer "id_gh"
    t.text "mensagem"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "data"
  end

  create_table "git_hubs_tasks", id: false, force: :cascade do |t|
    t.integer "git_hub_id", null: false
    t.integer "task_id", null: false
    t.index ["git_hub_id", "task_id"], name: "index_git_hubs_tasks_on_git_hub_id_and_task_id"
    t.index ["task_id", "git_hub_id"], name: "index_git_hubs_tasks_on_task_id_and_git_hub_id"
  end

  create_table "projeto_sprints", force: :cascade do |t|
    t.integer "projeto_id", null: false
    t.integer "sprint_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["projeto_id"], name: "index_projeto_sprints_on_projeto_id"
    t.index ["sprint_id"], name: "index_projeto_sprints_on_sprint_id"
  end

  create_table "projetos", force: :cascade do |t|
    t.string "nome"
    t.text "descricao"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "excluido", default: false
  end

  create_table "sprint_tasks", force: :cascade do |t|
    t.integer "sprint_id", null: false
    t.integer "task_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["sprint_id"], name: "index_sprint_tasks_on_sprint_id"
    t.index ["task_id"], name: "index_sprint_tasks_on_task_id"
  end

  create_table "sprints", force: :cascade do |t|
    t.string "nome"
    t.datetime "data_inicio"
    t.datetime "data_fim"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "projeto_id"
    t.boolean "excluido", default: false
    t.index ["projeto_id"], name: "index_sprints_on_projeto_id"
  end

  create_table "tasks", force: :cascade do |t|
    t.string "titulo"
    t.text "descricao"
    t.integer "status", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "excluido", default: false
  end

  create_table "usuario_equipes", force: :cascade do |t|
    t.integer "usuario_id", null: false
    t.integer "equipe_id", null: false
    t.string "papel"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["equipe_id"], name: "index_usuario_equipes_on_equipe_id"
    t.index ["usuario_id"], name: "index_usuario_equipes_on_usuario_id"
  end

  create_table "usuario_tasks", force: :cascade do |t|
    t.integer "usuario_id", null: false
    t.integer "task_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["task_id"], name: "index_usuario_tasks_on_task_id"
    t.index ["usuario_id"], name: "index_usuario_tasks_on_usuario_id"
  end

  create_table "usuarios", force: :cascade do |t|
    t.string "user_git"
    t.string "email"
    t.string "nome"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "excluido", default: false, null: false
    t.string "password_digest"
    t.string "password_reset_token"
    t.datetime "password_reset_sent_at"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "equipe_projetos", "equipes"
  add_foreign_key "equipe_projetos", "projetos"
  add_foreign_key "projeto_sprints", "projetos"
  add_foreign_key "projeto_sprints", "sprints"
  add_foreign_key "sprint_tasks", "sprints"
  add_foreign_key "sprint_tasks", "tasks"
  add_foreign_key "sprints", "projetos"
  add_foreign_key "usuario_equipes", "equipes"
  add_foreign_key "usuario_equipes", "usuarios"
  add_foreign_key "usuario_tasks", "tasks"
  add_foreign_key "usuario_tasks", "usuarios"
end
