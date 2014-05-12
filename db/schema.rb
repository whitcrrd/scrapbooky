# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140327180728) do

  create_table "books", force: true do |t|
    t.string   "title"
    t.integer  "user_id"
    t.boolean  "empty",      default: true
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "items", force: true do |t|
    t.integer  "subject_id"
    t.string   "subject_type"
    t.string   "name"
    t.integer  "book_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "items", ["book_id"], name: "index_items_on_book_id"
  add_index "items", ["subject_id"], name: "index_items_on_subject_id"
  add_index "items", ["subject_type"], name: "index_items_on_subject_type"

  create_table "photos", force: true do |t|
    t.string   "title"
    t.string   "url"
    t.integer  "user_id"
    t.integer  "book_id"
    t.integer  "sizeX",      default: 1
    t.integer  "sizeY",      default: 1
    t.integer  "col"
    t.integer  "row"
    t.string   "cname",      default: "photo"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: true do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "authentication_token"
    t.string   "username"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true

  create_table "videos", force: true do |t|
    t.string   "title"
    t.string   "url"
    t.string   "youtube_id"
    t.string   "thumbnail"
    t.integer  "user_id"
    t.integer  "book_id"
    t.integer  "sizeX",      default: 1
    t.integer  "sizeY",      default: 1
    t.integer  "col"
    t.integer  "row"
    t.integer  "start",      default: 0
    t.integer  "end"
    t.string   "cname",      default: "video"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
