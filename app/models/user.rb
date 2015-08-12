require 'pry'
class User < ActiveRecord::Base

  # class method
  def self.from_omniauth(auth)
    binding.pry
    User.find_or_create_by(
      provider:           auth.provider,
      uid:                auth.uid,
      name:               auth.info.name,
      oauth_token:        auth.credentials.token,
      oauth_expires_at:   Time.at(auth.credentials.expires_at),
      email:              auth.info.email,
      age:                auth.extra.raw_info.age_range.min.last,
      profile_photo_url:  auth.info.image
    )
  end

end


# add_column :users,  :email,             :text
# add_column :users,  :age,               :integer
# add_column :users,  :profile_photo_url, :text