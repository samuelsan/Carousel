require 'pry'
class User < ActiveRecord::Base

  # class method
  def self.from_omniauth(auth)
    binding.pry
    User.find_or_create_by(
      provider:           auth.provider,
      uid:                auth.uid,
      name:               auth.info.name,
      oauth_token:        auth.credentials.oauth_token,
      oauth_expires_at:   Time.at(auth.credentials.expires_at)
    )
    # puts auth.age_range
  end

end
