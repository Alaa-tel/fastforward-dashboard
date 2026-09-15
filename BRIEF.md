# FastForward Logistics Executive Dashboard

## Summary

FastForward Logistics is a mid-size freight and supply chain company whose operations team currently relies on multiple spreadsheets to track business performance.

The VP of Operations needs a single internal executive dashboard that can be used during leadership meetings to quickly understand how the business is performing.

The dashboard should provide a clear snapshot of shipment activity, delivery performance, regional performance, and operational exceptions.

The goal is to create a working prototype that feels like a realistic internal logistics product.

## Primary User

VP of Operations

The VP needs to quickly answer:

- How many shipments are currently moving through the network?
- Are deliveries happening on time?
- Which regions are performing well or poorly?
- Are there operational exceptions that require attention?
- Are performance trends improving or declining?

## Dashboard Content

### Executive Metrics

Display high-level KPI cards for:

- Total Shipments
- On-Time Delivery Rate
- Average Transit Time
- Open Exceptions

Each metric should show:

- Metric label
- Current value
- Trend compared with the previous period

### Shipment Volume

Include a visualization showing shipment volume over time.

The user should be able to quickly understand whether shipping activity is increasing or decreasing.

### Regional Performance

Show delivery performance across regions such as:

- Northeast
- Southeast
- Midwest
- West

Include metrics such as shipment volume and on-time delivery percentage.

### Open Exceptions

Display a list or table of active operational issues.

Example exception types:

- Delayed shipment
- Weather disruption
- Carrier issue
- Missing documentation
- Capacity constraint

Each exception should include:

- Shipment ID
- Region
- Exception type
- Severity
- Current status

## Layout

Use a clear executive dashboard hierarchy.

Suggested structure:

1. Header
2. Dashboard title and filters
3. KPI metric cards
4. Shipment volume visualization
5. Regional performance
6. Open exceptions

The most important information should appear above the fold.

## Design

The experience should feel:

- Professional
- Modern
- Clean
- Data-focused
- Easy to scan during a leadership meeting

Use strong visual hierarchy and generous spacing.

Avoid unnecessary decoration.

Use color intentionally to communicate status and performance rather than purely for decoration.

## Responsive Behavior

The dashboard should work well on standard desktop and laptop screen sizes.

Cards and content should reflow cleanly on narrower screens.

## Interactions

The dashboard should eventually include at least one interactive filter.

Preferred interaction:

- Region filter

Selecting a region should update the relevant dashboard metrics and data.

## Technology

Build the prototype using:

- Vue
- Vite
- TypeScript
- Vue Router
- Vuetify 3

Use reusable Vue components where appropriate.

## Data

Use fictional data only.

The dashboard should use a local JSON dataset containing realistic logistics metrics.

No client or Slalom information should be included.

## Nice to Haves

If time allows:

- Date range filtering
- Exception severity filtering
- Hover states for charts
- Trend indicators on metric cards
- Empty states
- Responsive mobile behavior

## Success Criteria

The prototype is successful if the VP of Operations can open the dashboard and understand the overall health of the logistics operation within a few seconds.

The final experience should demonstrate:

- Clear planning
- Component-based development
- AI-assisted iteration
- Reusable components
- Mock data
- Interactive behavior
- A polished working dashboard
## Data

Create a local mock dataset at:

src/data/metrics.json

The data should represent realistic fictional logistics performance for FastForward Logistics.

Include:
- overall shipment volume
- on-time delivery rate
- average transit time
- open exceptions
- regional performance
- shipment volume over time
- exception records

Regions should include:
- Northeast
- Southeast
- Midwest
- West

The data should support filtering the dashboard by region.

## Interactions

Add a region filter near the top of the dashboard.

The region filter should include:
- All Regions
- Northeast
- Southeast
- Midwest
- West

When a region is selected, update:
- KPI cards
- regional performance
- shipment volume
- open exceptions

The default selection should be All Regions.