
### Config Behavior
When a homeowner starts the estimator, the app uses the config that is active at that time.
The config stays the same for that session.
New visitors always get the latest config.
This prevents people who are already filling out the form from being affected by price or question changes.
Questions On/Off
Dale can enable or disable questions from the config.
Disabled questions are hidden from the homeowner.
Disabled questions are also ignored by the calculator.
For example, if the Stories question is disabled, the stories multiplier is not used.
Price Calculation

## The estimate is calculated using the following steps:

Check that the roof area is within the allowed minimum and maximum.
Calculate material cost:
Roof Area × Material Rate
Add the waste factor.
Calculate tear-off cost:
Roof Area × Tear-Off Rate
Add material and tear-off costs.
Apply the roof pitch multiplier.
Apply the stories multiplier if the question is enabled.
Add the flat permit fee.
Calculate the estimate range using the configured spread.
Base Estimate × (1 - Spread) = Low Estimate
Base Estimate × (1 + Spread) = High Estimate

All final estimates are rounded to whole dollars.

## Seed Data

The old seed leads may contain different prices or values. This is expected. The application uses the pricing formula defined in the current configuration rather than trying to reproduce historical estimates.

Some old leads also contain fields such as chimney_count and gutter_replace that are not part of the current configuration. These fields are kept as historical data and are not used to create new questions.

## Features Not Included

The following were intentionally not implemented because they were listed as stretch goals:

- CSV export
- Webhooks
- Creating completely new question types
- Advanced authentication


## Questions for Dale

Before taking the application further, I would clarify:

- Which questions are required and which are optional?
- Should config changes affect users who are already filling out the form?
- Who should be allowed to change pricing?
- What is the final pricing formula?
- How long should lead data be stored?

  
## Improvements

With another week of development, I would add:

- Automated tests for the calculator and edge cases.
- Tests for disabled questions.
- Config version history.
- Lead search and CSV export.
- Better authentication, authorization, and logging for production use.
