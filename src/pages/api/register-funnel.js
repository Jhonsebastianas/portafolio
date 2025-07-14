import connectToDatabase from '../../backend/infrastructure/lib/mongodb';
import User from '../../backend/domain/models/User';
import MarketingPreferences from '../../backend/domain/models/MarketingPreferencesDocument';
import { sendEmailByTemplate, VARIABLES } from '../../backend/infrastructure/services/email'; // opcional
import { signToken } from 'src/backend/infrastructure/services/jwt';


export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, nombre, telefono, campaign } = req.body;

  if (!email || !campaign) {
    return res.status(400).json({ message: 'Email and campaign are required' });
  }

  try {
    await connectToDatabase();

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ email, name: nombre || '', phone: telefono || '' });
      await user.save();
    } else {
      let updated = false;
      if (nombre && !user.name) {
        user.name = nombre;
        updated = true;
      }
      if (telefono && !user.phone) {
        user.phone = telefono;
        updated = true;
      }
      if (updated) await user.save();
    }

    let marketingPreferences = await MarketingPreferences.findOne({ userId: user._id });

    if (marketingPreferences) {
      if (!marketingPreferences.campaigns.includes(campaign)) {
        marketingPreferences.campaigns.push(campaign);
      }

      marketingPreferences.preferences.funnels = true;
      await marketingPreferences.save();
    } else {
      const newMarketingPreferences = new MarketingPreferences({
        userId: user._id,
        preferences: { funnels: true },
        campaigns: [campaign],
      });
      await newMarketingPreferences.save();
    }

    // 🔁 Enviar correo si es un funnel específico
    if (campaign === '7-habitos-para-estudiar-y-trabajar-ebook') {
      const token = signToken({ email: user.email, userId: user._id });
      await sendEmailByTemplate({
        template: '7-habitos-para-estudiar-y-trabajar-ebook-template', // archivo en /public/plantillas/funnel-productividad.html
        subject: 'Tu ebook está aquí - ¡Empieza hoy!',
        to: email,
        parameters: {
          nombre: nombre || 'estudiante trabajador',
          enlace: 'https://drive.google.com/drive/folders/11CSs4nitUtsO5oI9JoTB7B2FKArEMC-L?usp=share_link',
          remitente: "Sebastian Agudelo",
          UNSUBSCRIBE_LINK: `${VARIABLES.APP_URL_FRONT}/unsubscribe?email=${user.email}&token=${token}`,
        }
      });
    }

    return res.status(201).json({ message: 'Funnel registrado exitosamente' });
  } catch (error) {
    console.error("Error al registrar funnel:", error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
