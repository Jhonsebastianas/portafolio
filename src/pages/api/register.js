import connectToDatabase from '../../backend/infrastructure/lib/mongodb';
import User from '../../backend/domain/models/User';
import MarketingPreferences from '../../backend/domain/models/MarketingPreferencesDocument';

const updatePreferencesByCampaigns = (preferences, campaigns) => {
    preferences.promotions = true;
    if (campaigns.includes('courses')) {
        preferences.courses = true;
    }
    if (campaigns.includes('newsletter')) {
        preferences.newsletter = true;
    }
    return preferences;
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { email, campaigns } = req.body;

    console.log({"Req": req.body})

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    if (!campaigns || !Array.isArray(campaigns) || campaigns.length === 0) {
        return res.status(400).json({ message: 'At least one campaign is required' });
    }

    try {
        console.log("Vamos a conectar a mongo")
        await connectToDatabase();
        console.log("Vamos a conectar a mongo")

        const user = await User.findOne({ email });

        if (user) {
            // Usuario ya existe, actualizar las preferencias de marketing
            const marketingPreferences = await MarketingPreferences.findOne({ userId: user._id });

            if (marketingPreferences) {
                marketingPreferences.campaigns = [...new Set([...marketingPreferences.campaigns, ...campaigns])]; // Agregar nuevas campañas sin duplicados
                marketingPreferences.preferences = updatePreferencesByCampaigns(marketingPreferences.preferences, campaigns);

                await marketingPreferences.save();
            } else {
                // En caso de que no se encuentren preferencias, crear un nuevo documento
                const preferences = updatePreferencesByCampaigns({}, campaigns);
                const newMarketingPreferences = new MarketingPreferences({
                    userId: user._id,
                    preferences,
                    campaigns,
                });

                await newMarketingPreferences.save();
            }

            return res.status(200).json({ message: 'User updated successfully' });
        }

        // Crear nuevo usuario y sus preferencias
        const newUser = new User({ email });
        await newUser.save();

        const preferences = updatePreferencesByCampaigns({}, campaigns);
        const newMarketingPreferences = new MarketingPreferences({
            userId: newUser._id,
            preferences,
            campaigns,
        });

        await newMarketingPreferences.save();

        return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}