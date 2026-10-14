export const APPS_DATA = [
  {
    id: "calculadora-prestamo",
    title: "Calculadora de Préstamos",
    shortTitle: "Préstamos & Créditos",
    description:
      "Simula tu crédito en tiempo real con cuota inicial, cuota de manejo, seguros de vida/desgravamen, tasas mensuales o anuales, tabla completa de amortización (Francés y Alemán) y exportación a CSV.",
    path: "/apps/calculadora-prestamo",
    icon: "uil-calculator-alt",
    category: "Finanzas",
    badge: "Nuevo",
    badgeColor: "success",
    featured: true,
    tags: ["Finanzas", "Amortización", "Seguros", "Cuota de Manejo", "Exportar CSV"],
    gradient: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%)",
  },
  {
    id: "qr-code",
    title: "Generador de Código QR",
    shortTitle: "Códigos QR",
    description:
      "Genera códigos QR de manera instantánea para cualquier texto, URL, correo o credenciales de conexión con previsualización en vivo y descarga en alta calidad PNG.",
    path: "/apps/qr-code",
    icon: "uil-qrcode-scan",
    category: "Utilidades",
    badge: "Popular",
    badgeColor: "primary",
    featured: true,
    tags: ["QR", "Descarga PNG", "Herramienta", "Productividad"],
    gradient: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #6366f1 100%)",
  },
  {
    id: "investigacion-operaciones",
    title: "Investigación de Operaciones",
    shortTitle: "Modelos de Optimización",
    description:
      "Solución de modelos deterministas de inventario (EOQ clásico, con producción, con faltante), modelos probabilísticos y cálculo analítico de teoría de colas.",
    path: "/investigacion-de-operaciones",
    icon: "uil-chart-line",
    category: "Optimización",
    badge: "Académico",
    badgeColor: "warning",
    featured: false,
    tags: ["EOQ", "Inventarios", "Teoría de Colas", "Matemáticas"],
    gradient: "linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)",
  },
];

export const CATEGORIES = ["Todas", "Finanzas", "Utilidades", "Optimización"];
