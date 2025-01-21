import type { UserConfig } from "@commitlint/types";
import { RuleConfigSeverity } from "@commitlint/types";

// Example
// feat(ui): adds a movie card component for the landing page

// This commit introduces a new card component to the landing page.
// It is designed to be reusable and follows the design system guidelines.
// It includes hover and active states for better user interaction.

// Signed-off-by: Imelda Hope <imelda.hope@ihope.dev>

const Configuration: UserConfig = {
  extends: ["@commitlint/config-conventional"],
  parserPreset: "conventional-changelog-atom",
  formatter: "@commitlint/format",
  rules: {
    "type-enum": [
      RuleConfigSeverity.Error,
      "always",
      [
        "build",
        "chore", //small small tasks
        "ci", // continuous integration
        "docs",
        "feat",
        "fix",
        "refactor",
        "revert",
        "style",
        "test",
        "perf", // improving performance
      ],
    ],
    "subject-case": [2, "always", "sentence-case"],
    "header-max-length": [2, "always", 72],
    "subject-min-length": [2, "always", 10],
    "body-max-line-length": [2, "always", 100],
    "scope-enum": [2, "always", ["core", "ui", "api", "docs"]],
    "scope-case": [2, "always", "lower-case"],
    "type-case": [2, "always", "lower-case"],
    "signed-off-by": [2, "always", "Signed-off-by:"],
  },
};

export default Configuration;
