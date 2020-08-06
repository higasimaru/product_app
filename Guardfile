guard :minitest, spring: "bin/rails test", all_on_start: false do
  watch(%r{^test/(.*)/?(.*)_test\.rb$})
  watch("test/test_helper.rb") { "test" }
  watch("config/routes.rb") { integration_tests }
  watch(%r{^app/models/(.*?)\.rb$}) do |matches|
    "test/models/#{matches[1]}_test.rb" 
  end
  watch(%r{^app/controllers/(.*?)\.rb$}) do |matches|
    resource_tests(matches[1])
  end
  watch(%r{^app/views/([^/]*?/.*\.html\.erb$)}) do |matches|
    ["test/controllers/#{matches[1]}_controller_test.rb"] +
    integration_tests(matches[1])
  end
  watch(%r{^app/helpers/(.*?)_helper\.rb$}) do |matches|
    integration_tests(matches[1])
  end

  def integration_tests(resouce = :all)
    if resouce == :all
      Dir["test/integration/*"] else
      Dir["test/integration/#{resouce}_*.rb"]
    end
  end

  def controller_test(resouce)
    "test/controllers/#{resource}_controller_test.rb"
  end

  def resouce_tests(resouce)
    integration_tests(resouce) << controller_test(resouce)
  end
  

end


