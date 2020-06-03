# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

##messagesテーブル

|Colum|Type|Options|
|-----|----|-------|
|body|text|
|image|string|
|group_id|integer|null:false, foreign_key: true|
|user_id|integer|null:false, foreign_key: true|

##Association
- belongs_to :group
- belongs_to :user


##usersテーブル

|Colum|Type|Options|
|-----|----|-------|
|name|string|null: false|
|email|string|null: false|
|password|string|null: false|

###Association
- has_many :users_groups
- has_many :messages
- has_many :groups, through: :users_groups


##groupsテーブル

|Colum|Type|Options|
|-----|----|-------|
|name|string|null: false|

###Association
- has_many :user_groups
- has_many :messages
- has_many :users, through: :users_groups

##users_groupsテーブル

|Colum|Type|Options|
|-----|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

###Association
- belongs_to :group
- belongs_to :user