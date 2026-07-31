# Report Automation

## Overview

Report Automation uses AI to analyze ticket comments and generate a concise one-line summary for each ticket. The summary is automatically added to the report and shared with responsible stakeholders, reducing manual effort and improving report readability.

## AI Use Case

- Analyze ticket comments using AI.
- Generate meaningful single-line ticket summaries.
- Update reports with AI-generated insights.
- Enable stakeholders to quickly understand ticket status and resolutions.

### Example

**Comments:** Issue identified, root cause analyzed, fix implemented, and ticket closed.

**Summary:** Production issue resolved after implementing the required fix.

## Technologies Used

- Python
- Azure OpenAI / OpenAI GPT
- Pandas
- Excel/CSV Processing
- REST APIs
- Git & GitHub

## Process Flow

1. Extract ticket data and comments.
2. Preprocess and consolidate comments.
3. Send comments to AI for summarization.
4. Update report with generated summary.
5. Share final report with stakeholders.

## Project Structure

```text
report-automation/
├── data/
├── scripts/
├── config/
├── logs/
├── requirements.txt
└── README.md
