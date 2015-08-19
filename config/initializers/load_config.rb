# APP_CONFIG = YAML.load_file("#{RAILS_ROOT}/config/config.yml")[RAILS_ENV]
APP_CONFIG = YAML.load_file("#{Rails.root}/config/application.yml").symbolize_keys

