#include <iostream>
#include <string>
#include "FoxNativeEngine.h"

int main() {
  FoxNativeEngine engine;
  std::string line;

  std::cout << "{\"event\":\"ready\"}\n";
  std::cout.flush();

  while (std::getline(std::cin, line)) {
    if (line.empty()) continue;
    std::cout << engine.handleJsonLine(line) << "\n";
    std::cout.flush();
  }

  return 0;
}
