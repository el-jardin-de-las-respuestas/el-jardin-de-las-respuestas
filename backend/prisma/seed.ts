import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Roles
  const roles = [
    { id: 1, name: 'user' },
    { id: 2, name: 'professional' },
    { id: 3, name: 'admin' }
  ];

  for (const role of roles) {
    await prisma.role.upsert({
      where: { id: role.id },
      update: {},
      create: {
        id: role.id,
        name: role.name,
      },
    });
  }

  console.log('✅ Roles agregados');

  if (!process.env.ADMIN_PASSWORD) {
    throw new Error("ADMIN_PASSWORD is not defined in .env");
  }
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

  const user = await prisma.user.upsert({
    where: { email: 'admin@test.com' },
    update: {},
    create: {
      username: 'Admin',
      email: 'admin@test.com',
      password: hashedPassword,
      birthdate: new Date('2000-01-01'),
      roleId: 3,
    },
  });

  console.log('✅ Usuario admin creado');

  // Foros
  const forums = [
    { title: 'Experiencias con anticonceptivos', description: 'Comparte tus experiencias', userId: user.id },
    { title: 'Apoyo emocional', description: 'Espacio de apoyo', userId: user.id },
    { title: 'Dudas sobre el ciclo menstrual', description: 'Preguntas y respuestas', userId: user.id },
    { title: 'Consultas médicas generales', description: 'Consultas generales', userId: user.id },
    { title: 'Derechos y legislación', description: 'Información sobre derechos', userId: user.id },
  ];

  for (const forum of forums) {
    await prisma.forum.upsert({
      where: { id: forums.indexOf(forum) + 1 },
      update: {},
      create: {
        id: forums.indexOf(forum) + 1,
        ...forum,
      },
    });
  }

  console.log('✅ Foros seeded');

  // Biblioteca ESI
  const libraryArticles = [
    {
      id: 1,
      title: "Cambios en la Pubertad: Lo que Necesitas Saber🌸",
      description: "Una guía completa sobre los cambios físicos y emocionales durante la pubertad, explicados de manera clara y sin tabúes.",
      icon: "🌸",
      content: JSON.stringify([
        {
          "tipo": "intro",
          "texto": "La pubertad es una etapa natural del desarrollo humano donde tu cuerpo experimenta cambios significativos. Es completamente normal tener preguntas, dudas o incluso sentirte confundidx. Esta guía está aquí para acompañarte en este proceso."
        },
        {
          "tipo": "texto",
          "titulo": "¿Qué es la Pubertad?",
          "contenido": [
            "La pubertad es el proceso de desarrollo físico y emocional que transforma tu cuerpo de niñx a adultx.",
            "Generalmente comienza entre los 8 y 13 años en personas asignadas como mujeres al nacer, y entre los 9 y 14 años en personas asignadas como hombres al nacer.",
            "Cada persona se desarrolla a su propio ritmo. No hay un tiempo 'correcto' o 'incorrecto' para comenzar la pubertad."
          ]
        },
        {
          "tipo": "lista",
          "titulo": "Cambios Físicos Comunes",
          "items": [
            "Crecimiento de vello en axilas, pubis y otras áreas del cuerpo",
            "Aumento en la estatura y cambios en la forma del cuerpo",
            "Desarrollo de características sexuales secundarias",
            "Cambios en la piel, como aparición de acné",
            "Cambios en el olor corporal",
            "Inicio de la menstruación o producción de esperma"
          ]
        },
        {
          "tipo": "texto",
          "titulo": "Cambios Emocionales",
          "contenido": [
            "Los cambios no son solo físicos. Las hormonas también afectan tus emociones y la forma en que pensás.",
            "Podés experimentar cambios de humor más frecuentes, sentirte más sensible o tener emociones más intensas.",
            "Estos cambios emocionales son completamente normales. Hablá con personas de confianza sobre cómo te sentís: no estás solx en este proceso."
          ]
        },
        {
          "tipo": "lista",
          "titulo": "Cuidados Durante la Pubertad",
          "items": [
            "Mantén una higiene personal diaria, incluyendo ducha regular",
            "Usa desodorante para controlar el olor corporal",
            "Si menstrúas, aprende sobre productos de higiene menstrual",
            "Come alimentos nutritivos y mantenete hidratadx",
            "Hacé ejercicio regularmente",
            "Dormí lo suficiente (8-10 horas por noche)",
            "Buscá apoyo emocional cuando lo necesites"
          ]
        },
        {
          "tipo": "numerada",
          "titulo": "✨ Puntos Clave para Recordar",
          "items": [
            "La pubertad es un proceso natural que ocurre a diferentes edades para cada persona",
            "Los cambios físicos y emocionales son normales y esperados",
            "No hay dos personas que experimenten la pubertad de la misma manera",
            "Cuidar tu higiene y salud es importante durante esta etapa",
            "Siempre podés hablar con personas de confianza sobre tus dudas"
          ]
        },
        {
          "tipo": "recursos",
          "titulo": "Recursos Adicionales",
          "items": [
            "Consultá con un profesional de la salud si tenés preguntas específicas",
            "Hablá con tu familia o personas de confianza sobre tus cambios",
            "Usá nuestro chat con ginecólogas para dudas confidenciales"
          ]
        }
      ])
    },
    {
      id: 2,
      title: "¿Qué es el Consentimiento y Por Qué es Importante?🤝",
      description: "Aprende sobre los límites personales, cómo expresarlos y cómo respetar los de los demás en todas las relaciones.",
      icon: "🤝",
      content: JSON.stringify([
        {
          "tipo": "intro",
          "texto": "El consentimiento es una forma de respeto. Significa acordar algo de manera libre, consciente y entusiasta entre todas las personas involucradas."
        },
        {
          "tipo": "texto",
          "titulo": "¿Qué Significa Dar Consentimiento?",
          "contenido": [
            "Dar consentimiento significa decir 'sí' de manera clara y sin presiones.",
            "Debe ser una decisión libre, sin manipulación, miedo o culpa.",
            "El consentimiento puede retirarse en cualquier momento. Si alguien cambia de idea, se debe respetar."
          ]
        },
        {
          "tipo": "lista",
          "titulo": "Formas de Consentimiento",
          "items": [
            "Verbal: decir 'sí', 'quiero', 'me gusta' o expresiones similares.",
            "No verbal: lenguaje corporal positivo, contacto visual, relajación.",
            "Nunca es consentimiento: silencio, miedo, estar bajo efectos de alcohol o drogas, o sentirse obligado/a."
          ]
        },
        {
          "tipo": "numerada",
          "titulo": "Claves del Consentimiento",
          "items": [
            "Debe ser claro y explícito.",
            "Debe ser libre de presiones o manipulación.",
            "Debe poder retirarse en cualquier momento.",
            "Debe ser informado (entender a qué se está accediendo)."
          ]
        }
      ])
    },
    {
      id: 3,
      title: "Identidad de Género y Orientación Sexual🌈",
      description: "Explora la diversidad de identidades y orientaciones, y aprende a comprender y respetar la tuya y la de los demás.",
      icon: "🌈",
      content: JSON.stringify([
        {
          "tipo": "intro",
          "texto": "La identidad y la orientación sexual son parte de quiénes somos. Comprenderlas nos ayuda a vivir con autenticidad y respeto hacia lxs demás."
        },
        {
          "tipo": "texto",
          "titulo": "Identidad de Género",
          "contenido": [
            "La identidad de género es cómo una persona se siente y se reconoce: mujer, hombre, ambos, ninguno, u otra identidad.",
            "Puede o no coincidir con el sexo asignado al nacer.",
            "Cada persona tiene derecho a vivir según su identidad de género."
          ]
        },
        {
          "tipo": "texto",
          "titulo": "Orientación Sexual",
          "contenido": [
            "La orientación sexual se refiere a hacia quién te sentís atraídx emocional, afectiva o sexualmente.",
            "Existen muchas orientaciones: heterosexual, homosexual, bisexual, asexual, pansexual, entre otras.",
            "Todas son válidas y merecen respeto."
          ]
        },
        {
          "tipo": "recursos",
          "titulo": "Recursos y Apoyo",
          "items": [
            "Organizaciones LGBTIQ+ locales",
            "Líneas de ayuda y acompañamiento psicológico",
            "Charlas de diversidad en escuelas y espacios comunitarios"
          ]
        }
      ])
    },
    {
      id: 4,
      title: "Relaciones Saludables: Señales de Alerta💕",
      description: "Identifica los signos de una relación saludable versus una tóxica. Tu bienestar emocional es fundamental.",
      icon: "💕",
      content: JSON.stringify([
        {
          "tipo": "intro",
          "texto": "Las relaciones deben hacernos sentir bien, seguras y valoradas. Aprender a reconocer señales de alerta puede protegerte."
        },
        {
          "tipo": "lista",
          "titulo": "Características de una Relación Saludable",
          "items": [
            "Comunicación abierta y honesta",
            "Respeto mutuo",
            "Apoyo y confianza",
            "Espacio personal y autonomía",
            "Resolución de conflictos sin violencia"
          ]
        },
        {
          "tipo": "lista",
          "titulo": "Señales de Alerta",
          "items": [
            "Control o celos excesivos",
            "Aislamiento de tus amistades o familia",
            "Descalificaciones o burlas",
            "Amenazas o manipulación emocional",
            "Violencia física o sexual"
          ]
        },
        {
          "tipo": "recursos",
          "titulo": "Dónde Buscar Ayuda",
          "items": [
            "Línea 144: atención a víctimas de violencia de género",
            "Espacios de orientación psicológica gratuita",
            "Consejerías escolares o comunitarias"
          ]
        }
      ])
    },
    {
      id: 5,
      title: "Métodos Anticonceptivos: Guía Completa🩺",
      description: "Información detallada sobre los diferentes métodos anticonceptivos, su eficacia y cómo acceder a ellos.",
      icon: "🩺",
      content: JSON.stringify([
        {
          "tipo": "intro",
          "texto": "Los métodos anticonceptivos ayudan a prevenir embarazos no deseados y, en algunos casos, también protegen de infecciones de transmisión sexual (ITS)."
        },
        {
          "tipo": "lista",
          "titulo": "Tipos de Métodos Anticonceptivos",
          "items": [
            "Preservativo (masculino y femenino)",
            "Pastillas anticonceptivas",
            "DIU (dispositivo intrauterino)",
            "Implantes hormonales",
            "Inyecciones anticonceptivas",
            "Métodos naturales (menos efectivos)"
          ]
        },
        {
          "tipo": "texto",
          "titulo": "Importancia del Preservativo",
          "contenido": [
            "Es el único método que previene tanto embarazos como ITS.",
            "Debe usarse correctamente desde el inicio de la relación sexual.",
            "Está disponible gratuitamente en centros de salud y escuelas."
          ]
        },
        {
          "tipo": "recursos",
          "titulo": "Dónde Obtener Métodos Anticonceptivos",
          "items": [
            "Centros de salud pública",
            "Hospitales y consultorios",
            "Programas de educación sexual integral"
          ]
        }
      ])
    },
    {
      id: 6,
      title: "Tus Derechos Sexuales y Reproductivos⚖️",
      description: "Conoce tus derechos legales en materia de salud sexual y reproductiva, y cómo ejercerlos.",
      icon: "⚖",
      content: JSON.stringify([
        {
          "tipo": "intro",
          "texto": "Los derechos sexuales y reproductivos garantizan que todas las personas puedan decidir sobre su cuerpo, su salud y su vida reproductiva sin coerción ni violencia."
        },
        {
          "tipo": "lista",
          "titulo": "Derechos Fundamentales",
          "items": [
            "Decidir sobre tener o no tener relaciones sexuales",
            "Acceder a educación sexual integral",
            "Usar o no métodos anticonceptivos",
            "Recibir atención médica sin discriminación",
            "Vivir libre de violencia sexual"
          ]
        },
        {
          "tipo": "numerada",
          "titulo": "Cómo Ejercer Tus Derechos",
          "items": [
            "Infórmate sobre las leyes de tu país.",
            "Asiste a centros de salud o espacios educativos para recibir asesoramiento.",
            "Denuncia situaciones de vulneración de derechos.",
            "Participa en actividades de educación sexual comunitaria."
          ]
        }
      ])
    }
  ];

  for (const article of libraryArticles) {
    await prisma.library.upsert({
      where: { id: article.id },
      update: article,
      create: article,
    });
  }

  console.log('✅ Biblioteca ESI seeded');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });