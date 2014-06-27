require 'test_helper'

class AnalyticsControllerTest < ActionController::TestCase
  test "should get funnels" do
    get :funnels
    assert_response :success
  end

  test "should get traffic" do
    get :traffic
    assert_response :success
  end

end
