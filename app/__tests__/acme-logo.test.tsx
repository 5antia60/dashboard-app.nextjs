import { describe, test } from "vitest";
import { render } from "@testing-library/react";
import AcmeLogo from "../ui/acme-logo";

describe('<AcmeLogo />', () => {
  test('if renders AcmeLogo', () => {
    render(<AcmeLogo />);
  });
});