/**
 * Published results of f1-champion-predictor, transcribed from its README at the commit
 * below. These are the repository's own walk-forward, out-of-fold numbers — re-check them
 * against the README after every retrain before changing anything here.
 */
const COMMIT = '0b96948bb87e79fbde99324eb9507c16499a184a';
const REPO = 'https://github.com/AntonioLoLa/f1-champion-predictor';

export const f1Source = {
  commit: COMMIT.slice(0, 7),
  readme: `${REPO}/blob/${COMMIT}/README.md#real-results-active-model-logistic_regression-selected-of-6-candidates-by-a-one-standard-error-rule`,
  splitter: `${REPO}/blob/${COMMIT}/src/f1cp/training/splitters.py`,
  config: `${REPO}/blob/${COMMIT}/conf/models.yaml`,
  selection: `${REPO}/blob/${COMMIT}/src/f1cp/training/selection.py`,
};

/** Top-1 hit rate (%) by season phase vs. the "current leader wins" baseline. */
export const phaseResults = [
  { phase: 'early', model: 72.8, baseline: 62.9, logLoss: 0.909 },
  { phase: 'mid', model: 78.0, baseline: 70.2, logLoss: 0.56 },
  { phase: 'late', model: 86.0, baseline: 84.7, logLoss: 0.399 },
] as const;

export const pooled = { model: 79.1, baseline: 73.0, logLoss: 0.615 };

/** Mean group log-loss over 30 walk-forward folds (lower is better). */
export const modelZoo = [
  { model: 'Logistic regression', logLoss: 0.615, active: true },
  { model: 'LightGBM', logLoss: 0.707 },
  { model: 'Random forest', logLoss: 0.73 },
  { model: 'XGBoost', logLoss: 0.938 },
  { model: 'CatBoost', logLoss: 1.071 },
  { model: 'MLP', logLoss: 1.427 },
] as const;

/** One-standard-error threshold: 0.615 + SE 0.092 (rounded as published). */
export const oneSeThreshold = 0.706;

export const ablation = { all: { features: 72, logLoss: 0.615 }, top5: { features: 5, logLoss: 1.232 } };

export const dataset = {
  seasons: 77,
  races: 1171,
  results: 27438,
  drivers: 917,
  rows: 21072,
  features: 72,
};

/**
 * Walk-forward scheme from conf/models.yaml: expanding window from 1981, at least 15
 * training seasons of which the last 3 fit the calibrator, test on the next season.
 * First test season 1996, last completed 2025 → 30 folds. 2026 is in progress and only
 * ever an inference target.
 */
export const walkForward = {
  firstSeason: 1981,
  minTrain: 15,
  calibration: 3,
  firstTest: 1996,
  lastTest: 2025,
  inference: 2026,
};

export const testFunctions = 216;
