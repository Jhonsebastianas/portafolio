import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'dev-secret-key'; // Usa variable de entorno en producción

/**
 * Firma un token con los datos proporcionados
 * @param {Object} payload - Datos a incluir en el token (ej: { userId, email })
 * @param {String} expiresIn - Tiempo de expiración (ej: '7d', '15m')
 */
export const signToken = (payload, expiresIn = '7d') => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
};

/**
 * Verifica un token y devuelve los datos decodificados
 * @param {String} token
 * @returns {Object|null} Payload decodificado o null si no es válido
 */
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
};
