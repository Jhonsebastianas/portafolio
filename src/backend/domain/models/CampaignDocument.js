import mongoose from 'mongoose';

const CampaignSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
});

export default mongoose.models.Campaign || mongoose.model('Campaign', CampaignSchema);