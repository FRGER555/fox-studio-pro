#include "FoxNativeEngine.h"

#include <sstream>
#include <string>

FoxNativeEngine::FoxNativeEngine() {
  initialized = true;
}

FoxNativeEngine::~FoxNativeEngine() = default;

std::string FoxNativeEngine::handleJsonLine(const std::string& input) {
  std::ostringstream out;
  out << "{\"ok\":true,\"received\":\"" << input << "\"}";
  return out.str();
}
