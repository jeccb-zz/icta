defmodule Icta.Factory do
  use ExMachina.Ecto, repo: Icta.Repo

  def user_factory do
    %Icta.User{
      uid: sequence(:email, &"uid-#{&1}"),
      name: "John Doe",
    }
  end

  def idea_factory do
    %Icta.Idea{
      title: sequence(:email, &"Title #{&1}"),
      user: build(:user)
    }
  end

  def vote_factory do
    %Icta.Vote{
      idea: build(:idea),
      user: build(:user),
      vote: true,
    }
  end
end
