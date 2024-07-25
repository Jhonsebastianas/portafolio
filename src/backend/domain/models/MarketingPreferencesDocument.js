import mongoose from 'mongoose';

const MarketingPreferencesSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    preferences: {
        promotions: {
            type: Boolean,
            default: false, // Por defecto, el usuario no recibe promociones
        },
        courses: {
            type: Boolean,
            default: false, // Por defecto, el usuario no recibe información sobre cursos
        },
        newsletter: {
            type: Boolean,
            default: false, // Por defecto, el usuario no recibe información sobre boletín
        },
    },
    campaigns: {
        type: [String], // Array de campañas a las que el usuario está suscrito
        required: true,
    },
});

export default mongoose.models.MarketingPreferences || mongoose.model('MarketingPreferences', MarketingPreferencesSchema);
