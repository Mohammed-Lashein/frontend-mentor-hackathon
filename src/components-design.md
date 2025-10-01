# Components design thoughts

Here I share my thoughts about the components design. 

### `UnitsList` component
In the `UnitsDropdown` component, on clicking the `TriggerButton` the `UnitsList` is hidden, and I noticed that by doing so, re-opening the component causes the state to be reset to the initial values. 

Since at this stage, we are just focusing on the markup so this state reset issue won't be a problem. And later when we introduce redux (state management library), the state will get moved to the store, so unmounting the `UnitsList` on clicking the `TriggerButton` won't reset the state.  

