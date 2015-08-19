OmniAuth.config.logger = Rails.logger

OmniAuth.app_id     = ENV["facebook_app_id"]
OmniAuth.secret_key = ENV["facebook_secret_key"]

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, OmniAuth.app_id, OmniAuth.secret_key, :info_fields => 'name,email,age_range'
  # replace the above line with
  # provider :facebook, ENV['FACEBOOK_KEY'], ENV['FACEBOOK_SECRET'],
end

OmniAuth.config.on_failure = Proc.new do |env|
  OmniAuth::FailureEndpoint.new(env).redirect_to_failure
end
