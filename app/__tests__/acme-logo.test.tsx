import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import AcmeLogo from "../ui/acme-logo";

describe('<AcmeLogo />', () => {
  test('if renders AcmeLogo', () => {
    render(<AcmeLogo />);
  });

  test('if render the "Acme" label on <p> tag', async () => {
    render(<AcmeLogo />);

    const acmeLabel = screen.getAllByTestId('acme-label')[0];

    expect(acmeLabel).toBeDefined()
    expect(acmeLabel.textContent).toBe('Acme');
    expect(acmeLabel.tagName).toBe('P');
  });
});
