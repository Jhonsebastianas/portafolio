import connectToDatabase from "../../backend/infrastructure/lib/mongodb";
import MarketingPreferences from "../../backend/domain/models/MarketingPreferencesDocument";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.UNSUBSCRIBE_SECRET;

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, token } = req.query;

  if (!email || !token) {
    return res.status(400).json({ message: 'Missing email or token' });
  }

  try {
    // Validar token
    const decoded = jwt.verify(token, SECRET_KEY);
    if (decoded.email !== email) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    await connectToDatabase();
    const preferences = await MarketingPreferences.findOne({ userId: decoded.userId });

    if (!preferences) {
      return res.status(404).json({ message: 'Preferences not found' });
    }

    if (req.method === 'GET') {
      return res.status(200).json({
        campaigns: preferences.campaigns,
        preferences: preferences.preferences
      });
    }

    if (req.method === 'POST') {
      const { unsubscribeAll, selectedCampaigns } = req.body;

      if (unsubscribeAll) {
        preferences.preferences = {
          promotions: false,
          newsletter: false,
          courses: false
        };
        preferences.campaigns = [];
      } else {
        preferences.campaigns = preferences.campaigns.filter(
          (c) => !selectedCampaigns.includes(c)
        );
        selectedCampaigns.forEach((c) => {
          if (c === 'courses') preferences.preferences.courses = false;
          if (c === 'newsletter') preferences.preferences.newsletter = false;
        });
      }

      await preferences.save();
      return res.status(200).json({ message: 'Preferences updated' });
    }
  } catch (error) {
    return res.status(400).json({ message: 'Invalid or expired token' });
  }
}
