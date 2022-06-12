import { TestingLibraryMatchers } from "@testing-library/jest-dom/matchers";

declare global {
  namespace jest {
    interface Expect extends TestingLibraryMatchers<any, any> {}
    interface InverseAsymmetricMatchers
      extends TestingLibraryMatchers<any, any> {}
  }
}
