#pragma once

#include <string>
#include <vector>

class FoxNativeEngine {
public:
  FoxNativeEngine();
  ~FoxNativeEngine();

  std::string handleJsonLine(const std::string& input);

private:
  bool initialized = false;
  std::vector<std::string> lastCommands;
};
