defmodule Icta.Repo.Migrations.ChangeDefaultStatusOfIdeaToUnderReview do
  use Ecto.Migration

  def up do
    alter table(:ideas) do
      modify :status, :string, default: "under_review", null: false
    end
  end

  def down do
    alter table(:ideas) do
      modify :status, :string, default: "new", null: false
    end
  end
end
