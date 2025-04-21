require "test_helper"

class UserMailerTest < ActionMailer::TestCase
  test "redef_senha" do
    mail = UserMailer.redef_senha
    assert_equal "Redef senha", mail.subject
    assert_equal [ "to@example.org" ], mail.to
    assert_equal [ "from@example.com" ], mail.from
    assert_match "Hi", mail.body.encoded
  end
end
