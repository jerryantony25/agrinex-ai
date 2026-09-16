export const DEMO_FARM_DATA = {
  id: "default-farm-1",
  farmer_id: "default-farmer",
  name: "Green Valley Agro Farm",
  location: "Coimbatore, Tamil Nadu",
  size_hectares: 2.5,
  primary_crop: "Tomato",
  soil_type: "Loamy Soil",
  irrigation_type: "Drip Irrigation",
  water_source: "Borewell + Rain Catchment",
  notes: "Equipped with automated inline filtration and pressure gauges."
};

export const DEMO_CROPS = [
  {
    id: "crop-1",
    name: "Tomato",
    variety: "Arka Rakshak F1",
    growth_stage: "Vegetative",
    planting_date: "2026-08-18",
    health_status: "Healthy",
    area_hectares: 1.5,
    irrigation_schedule: "Every 2 Days (Drip, 45 min)",
    notes: "Good branching and node development."
  },
  {
    id: "crop-2",
    name: "Green Chilli",
    variety: "G4 Hot Pepper",
    growth_stage: "Flowering",
    planting_date: "2026-08-01",
    health_status: "Healthy",
    area_hectares: 0.75,
    irrigation_schedule: "Every 3 Days (Drip, 30 min)",
    notes: "Flower trusses opening uniformly."
  }
];

export const INITIAL_SUGGESTION_PILLS = [
  { label: "💧 Should I irrigate today?", query: "Should I irrigate my tomato field today?" },
  { label: "🌱 Check my crop health", query: "My tomato leaves are turning slightly yellow on the lower branches. What could be the cause?" },
  { label: "🧪 Analyze my soil", query: "What fertilizer information should I consider for my vegetative stage?" },
  { label: "🌦 What is the weather impact?", query: "What is today's weather forecast and how does it affect my spraying and watering?" },
  { label: "🌾 Recommend suitable crops", query: "What crops are suitable for my loamy soil in this season?" },
];
