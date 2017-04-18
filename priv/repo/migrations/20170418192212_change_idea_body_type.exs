defmodule Icta.Repo.Migrations.ChangeIdeaBodyType do
  use Ecto.Migration

  def change do
    alter table(:ideas) do
      modify :body, :text
    end
  end
end
