cmake_minimum_required(VERSION 3.22)
project(FoxStudioNative LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

add_executable(FoxStudioNative
  src/main.cpp
  src/FoxNativeEngine.cpp
)

target_include_directories(FoxStudioNative PRIVATE src)

target_compile_definitions(FoxStudioNative PRIVATE FOX_STUDIO_NATIVE=1)
