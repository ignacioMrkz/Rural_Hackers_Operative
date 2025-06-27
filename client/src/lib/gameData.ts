export interface GameSection {
  id: string;
  title: string;
  description: string;
  content: string;
  completed: boolean;
}

export interface Village {
  id: string;
  name: string;
  description: string;
  details: string;
  landmark: string;
}

export const gameText = {
  title: "Beautiful Bees: Polinizadoras Rurais",
  subtitle: "Sistema de Aprendizaxe Interactivo",
  welcome: "Benvid@ ao terminal de aprendizaxe das Polinizadoras Rurais",
  loading: "Cargando sistema...",
  mainMenu: "MENÚ PRINCIPAL",
  progress: "PROGRESO",
  back: "← Volver",
  completed: "✓ COMPLETADO",
  
  sections: [
    {
      id: "intro",
      title: "🐝 Introdución ás Beautiful Bees",
      description: "Descobre que son as Polinizadoras Rurais",
      content: `Beautiful Bees: Polinizadoras Rurais é unha experiencia transformadora que une mulleres, territorios e saberes nun proceso de aprendizaxe profundo e colectivo.

Máis que unha formación, é unha proposta viva de rexeneración: persoal, profesional e comunitaria.

O programa celébrase no rural porque é na natureza onde estas ensinanzas teñen máis sentido e potencia.

Como as abellas que polinizan de flor en flor, as participantes espallan coñecementos e conexións polos territorios rurais galegos.`,
      completed: false
    },
    {
      id: "pillars",
      title: "🌿 Os Tres Pilares Biomimét(r)icos",
      description: "Explora os fundamentos do programa",
      content: `O programa baséase en tres pilares inspirados na biomimética, unha disciplina que aprende da natureza para deseñar solucións sostibles:

1. PENSAMENTO BASEADO NA NATUREZA (nature-based thinking)
   Aprender do territorio e co territorio. Comprender os seus ciclos, a súa resistencia e as súas formas de cooperación.

2. PENSAMENTO CENTRADO NO SER (being-based thinking)
   Cultivar a conciencia, o equilibrio e o propósito. Poñer no centro o benestar, a intuición e a escoita.

3. PENSAMENTO BASEADO NA CONEXIÓN (connecting-based thinking)
   Xerar redes reais. Fomentar os vínculos entre mulleres, entre xeracións, entre pobos.`,
      completed: false
    },
    {
      id: "stages",
      title: "🔄 As Tres Etapas do Programa",
      description: "Coñece o percorrido transformador",
      content: `O programa materialízase nun percorrido con tres etapas deseñadas para deixar pegada nas participantes e no contorno:

INSPIRACIÓN (Inspiration)
Fase de despertar e descubrimento. As participantes conectan cos saberes do territorio e descobren novas perspectivas.

CO-LIVING COLABORATIVO
Convivencia intensiva onde se profundizan os coñecementos e créanse vínculos duradeiros entre as participantes.

RETORNO AO TERRITORIO (Give Back)
As participantes volven aos seus territorios para aplicar e compartir o aprendido, converténdose en verdadeiras polinizadoras.

Cada etapa está conectada coas demais, creando un ciclo continuo de aprendizaxe e transformación.`,
      completed: false
    },
    {
      id: "villages",
      title: "🏘️ As Aldeas: Anceu e Fornelos",
      description: "Explora os territorios do programa",
      content: `As actividades desenvólvense en dúas aldeas galegas que se entrelazan conectadas polas mesmas abellas:

ANCEU
Aldea ubicada nun contorno natural privilexiado, onde a natureza ensina os seus segredos ás participantes.

FORNELOS DE MONTES
Territorio que representa a conexión entre tradicións ancestrais e innovación rural.

Estas dúas aldeas son máis que simples localizacións: son espazos de aprendizaxe vivos onde cada elemento do contorno contribúe á experiencia educativa.

Por iso somos tamén Polinizadoras Rurais: abellas polinizando ideas, sementando vínculos, xerando comunidade.`,
      completed: false
    }
  ] as GameSection[],

  villages: [
    {
      id: "anceu",
      name: "Anceu",
      description: "Aldea da conexión natural",
      details: "Anceu é un espazo onde a natureza se converte en mestra. Aquí as participantes aprenden dos ciclos naturais e descobren como aplicar estes coñecementos aos seus proxectos persoais e profesionais.",
      landmark: "🌲 Bosque de carballos centenarios"
    },
    {
      id: "fornelos",
      name: "Fornelos de Montes",
      description: "Territorio de tradición e innovación",
      details: "Fornelos representa a perfecta síntese entre os saberes tradicionais e as novas tecnoloxías. É aquí onde se materializan as ideas e nacen os proxectos colaborativos.",
      landmark: "🏛️ Centro de innovación rural"
    }
  ] as Village[]
};

export const beeMiniGameData = {
  questions: [
    {
      question: "Cal é o obxectivo principal das Polinizadoras Rurais?",
      options: [
        "Criar unha empresa",
        "Conectar mulleres, territorios e saberes",
        "Vender productos rurais",
        "Organizar eventos"
      ],
      correct: 1,
      explanation: "O programa busca crear conexións transformadoras entre persoas e territorios."
    },
    {
      question: "Cantos pilares biomimét(r)icos ten o programa?",
      options: ["Dous", "Tres", "Catro", "Cinco"],
      correct: 1,
      explanation: "Os tres pilares son: nature-based, being-based e connecting-based thinking."
    },
    {
      question: "Como se chaman as dúas aldeas do programa?",
      options: [
        "Santiago e Lugo",
        "Anceu e Fornelos",
        "Vigo e Pontevedra",
        "Ourense e Ferrol"
      ],
      correct: 1,
      explanation: "Anceu e Fornelos de Montes son os dous territorios principais do programa."
    }
  ]
};
