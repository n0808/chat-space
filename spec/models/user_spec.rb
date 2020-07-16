require 'rails_helper'
describe User do
  describe '#create' do
    it "is invalid without a name" do
     user = build(:user, name: "nil")
     user.valid?
     expect(user.errors[:name]).to include("can't be blank")
    end

    it "is invalid without a email" do
      user = build(:user, email: "nil")
      user.valid?
      expect(user.errors[:email]).to include("can't be blank")
    end

    it "is invalid without a password" do
      user = build(:user, password: "nil")
      user.valid?
      expect(user.errors[:password]).to include("can't be blank")
    end

  end
end