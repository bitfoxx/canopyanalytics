Rails.application.routes.draw do

  get 'analytics/funnels'

  get 'analytics/traffic'

  get 'analytics/events'

  get 'analytics/test'

  root to: "analytics#traffic"

  end