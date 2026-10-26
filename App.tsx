import React, { useState, useMemo, useEffect } from 'react';
import {
  Sparkles,
  BookOpen,
  Feather,
  BookmarkCheck,
  Users,
  Layers,
  Search,
  Languages,
  Eye,
  EyeOff,
  Volume2,
  CheckCircle2,
  HelpCircle,
  Award,
  BookMarked,
  GraduationCap,
  X,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  ArrowRightLeft,
  RotateCcw,
  Check,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  Lightbulb,
  XCircle,
  BookA,
} from 'lucide-react';

/* ==========================================================================
   1. UTILITIES & SPEECH
   ========================================================================== */
export const speakSpanish = (text: string, rate: number = 0.9) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  try {
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[/\\#*«»—_]/g, ' ').trim();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'es-ES';
    utterance.rate = rate;
    const voices = window.speechSynthesis.getVoices();
    const esVoice = voices.find(v => v.lang.startsWith('es') || v.lang === 'es-ES');
    if (esVoice) utterance.voice = esVoice;
    window.speechSynthesis.speak(utterance);
  } catch (e) {
    console.error('Speech error:', e);
  }
};

/* ==========================================================================
   2. TYPES & INTERFACES
   ========================================================================== */
export interface ExampleItem {
  id: string;
  es: string;
  arm: string;
  explanation?: { es: string; arm: string };
}

export interface TheorySection {
  id: string;
  titleEs: string;
  titleArm: string;
  badge?: string;
  definition: { es: string; arm: string };
  details?: { es: string; arm: string }[];
  examples: ExampleItem[];
  forExam?: { es: string; arm: string };
  difference?: {
    title: { es: string; arm: string };
    items: { es: string; arm: string }[];
    explanation?: { es: string; arm: string };
  };
  subsections?: {
    titleEs: string;
    titleArm: string;
    contentEs: string;
    contentArm: string;
    items?: { es: string; arm: string; sub?: string }[];
  }[];
}

export interface TestQuestion {
  id: number;
  questionEs: string;
  questionArm: string;
  options: { key: 'A' | 'B' | 'C' | 'D'; textEs: string; textArm?: string }[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanationEs?: string;
  explanationArm?: string;
}

export interface IdentifyExercise {
  id: number;
  sentenceEs: string;
  sentenceArm?: string;
  answerEs: string;
  answerArm: string;
  note?: string;
}

export interface TrueFalseExercise {
  id: number;
  statementEs: string;
  statementArm: string;
  isTrue: boolean;
  explanationEs?: string;
  explanationArm?: string;
}

export interface ReadingText {
  id: string;
  titleEs: string;
  titleArm: string;
  contentEs: string;
  contentArm: string;
  questions: {
    id: number;
    questionEs: string;
    questionArm: string;
    answerEs: string;
    answerArm: string;
  }[];
}

export interface FillBlankExercise {
  id: number;
  sentenceEs: string;
  sentenceArm?: string;
  missingWord: string;
}

export interface VocabularyWord {
  id: string;
  es: string;
  arm: string;
  exampleEs?: string;
  exampleArm?: string;
}

export interface GrammarExpression {
  id: string;
  formula: string;
  explanationEs: string;
  explanationArm: string;
  exampleEs: string;
  exampleArm: string;
}

export interface ExamReviewPoint {
  termEs: string;
  termArm: string;
  defEs: string;
  defArm: string;
}

export interface ModuleData {
  id: string;
  number: string;
  titleEs: string;
  titleArm: string;
  subtitleEs: string;
  subtitleArm: string;
  iconName: string;
  color: string;
  introEs: string;
  introArm: string;
  theory: TheorySection[];
  questionsTheory?: { id: number; qEs: string; qArm: string; aEs?: string; aArm?: string }[];
  testQuestions: TestQuestion[];
  identifyExercises?: IdentifyExercise[];
  trueFalseExercises?: TrueFalseExercise[];
  readingTexts?: ReadingText[];
  fillBlankExercises?: {
    wordsPool: string[];
    items: FillBlankExercise[];
  };
  vocabulary?: VocabularyWord[];
  grammarExpressions?: GrammarExpression[];
  practiceGrammar?: {
    id: number;
    promptEs: string;
    targetWord: string;
    armMeaning: string;
  }[];
  reviewPoints: ExamReviewPoint[];
}

/* ==========================================================================
   3. DATA: ALL 6 STUDY MODULES
   ========================================================================== */
export const module1Data: ModuleData = {
  id: 'figuras-1',
  number: '1',
  titleEs: 'Las Figuras Literarias (I)',
  titleArm: 'Գեղարվեստական արտահայտչամիջոցներ (I)',
  subtitleEs: 'Polisíndeton, Enumeración, Pleonasmo y Metáfora',
  subtitleArm: 'Պոլիսինդետոն, Թվարկում, Պլեոնազմ (ավելորդաբանություն) և Փոխաբերություն',
  iconName: 'Sparkles',
  color: 'indigo',
  introEs: 'Lengua Castellana y Literatura — 1.º de ESO (7-րդ դասարան). Քննությանը պատրաստվելու համար անհրաժեշտ է իմանալ 4 թեմա՝ Polisíndeton, Enumeración, Pleonasmo և Metáfora։',
  introArm: 'Իսպաներեն լեզու և գրականություն — 1.º de ESO (7-րդ դասարան)։ Սկզբում՝ տեսություն իսպաներեն և հայերեն, այնուհետև՝ քննական հարցեր, թեստեր և վարժություններ։',
  theory: [
    {
      id: 'polisindeton',
      titleEs: '1. POLISÍNDETON',
      titleArm: '1. POLISÍNDETON — Շաղկապների կրկնություն',
      badge: 'Figuras de repetición',
      definition: {
        es: 'El polisíndeton es una figura literaria que consiste en repetir conjunciones como «y», «ni» u «o» para dar más fuerza, intensidad o ritmo a una frase.',
        arm: 'Polisíndeton-ը գեղարվեստական արտահայտչամիջոց է, որի ժամանակ շաղկապները մի քանի անգամ կրկնվում են՝ խոսքն ավելի արտահայտիչ, ուժեղ կամ ռիթմիկ դարձնելու համար։',
      },
      examples: [
        {
          id: 'p1',
          es: 'Y corre y salta y juega y canta.',
          arm: 'Եվ վազում է, և ցատկում է, և խաղում է, և երգում է։',
          explanation: { es: 'Repetición intencionada de la conjunción «y».', arm: '«Y» (և) շաղկապի դիտավորյալ կրկնություն։' },
        },
        {
          id: 'p2',
          es: 'Ni come ni bebe ni duerme.',
          arm: 'Ո՛չ ուտում է, ո՛չ խմում է, ո՛չ քնում է։',
          explanation: { es: 'Repetición de la conjunción negativa «ni».', arm: '«Ni» (ո՛չ) ժխտական շաղկապի կրկնություն։' },
        },
        {
          id: 'p3',
          es: 'Había árboles y flores y pájaros y mariposas.',
          arm: 'Կային ծառեր, և ծաղիկներ, և թռչուններ, և թիթեռներ։',
          explanation: { es: 'Conjunción «y» repetida entre cada elemento.', arm: '«Y» շաղկապը կրկնվում է յուրաքանչյուր բառի միջև։' },
        },
      ],
      forExam: {
        es: 'Si una conjunción se repite intencionadamente varias veces, puede tratarse de un polisíndeton.',
        arm: 'Եթե շաղկապը մի քանի անգամ դիտավորյալ կրկնվում է, հնարավոր է՝ դա polisíndeton է։',
      },
    },
    {
      id: 'enumeracion',
      titleEs: '2. ENUMERACIÓN',
      titleArm: '2. ENUMERACIÓN — Թվարկում',
      badge: 'Figuras de acumulación',
      definition: {
        es: 'La enumeración es una figura literaria que consiste en mencionar sucesivamente varios elementos, acciones, cualidades o ideas.',
        arm: 'Թվարկումը մի քանի առարկաների, գործողությունների, հատկանիշների կամ գաղափարների հաջորդական ներկայացումն է։',
      },
      examples: [
        { id: 'e1', es: 'En mi mochila tengo libros, cuadernos, lápices y bolígrafos.', arm: 'Իմ պայուսակում կան գրքեր, տետրեր, մատիտներ և գրիչներ։' },
        { id: 'e2', es: 'María es inteligente, amable, simpática y trabajadora.', arm: 'Մարիան խելացի, բարի, հաճելի և աշխատասեր է։' },
        { id: 'e3', es: 'En el parque había niños, padres, perros y bicicletas.', arm: 'Այգում կային երեխաներ, ծնողներ, շներ և հեծանիվներ։' },
      ],
      forExam: {
        es: 'Si aparecen varios elementos mencionados uno detrás de otro, hay una enumeración.',
        arm: 'Եթե նախադասության մեջ իրար հետևից թվարկվում են մի քանի տարրեր, դա enumeración է։',
      },
      difference: {
        title: { es: 'Diferencia importante entre Enumeración y Polisíndeton', arm: 'Կարևոր տարբերություն Թվարկման և Շաղկապների կրկնության միջև' },
        items: [
          { es: 'Enumeración: Hay libros, mesas, sillas y ventanas.', arm: 'Թվարկում. Կան գրքեր, սեղաններ, աթոռներ և պատուհաններ (սովորական թվարկում, միայն մեկ շաղկապ վերջում)։' },
          { es: 'Polisíndeton: Hay libros y mesas y sillas y ventanas.', arm: 'Շաղկապների կրկնություն. Կան գրքեր և սեղաններ և աթոռներ և պատուհաններ (շաղկապը կրկնվում է ամեն տեղ)։' },
        ],
        explanation: {
          es: 'Առաջինում պարզապես թվարկում է, երկրորդում շաղկապը կրկնվում է։ Երկրորդ նախադասությունն ունի և՛ թվարկում, և՛ polisíndeton։',
          arm: 'Առաջինում պարզապես թվարկում է, երկրորդում շաղկապը կրկնվում է։ Երկրորդ նախադասությունն ունի և՛ թվարկում, և՛ polisíndeton։',
        },
      },
    },
    {
      id: 'pleonasmo',
      titleEs: '3. PLEONASMO',
      titleArm: '3. PLEONASMO — Ավելորդաբանություն',
      badge: 'Figuras de énfasis',
      definition: {
        es: 'El pleonasmo consiste en utilizar palabras que no son necesarias para comprender el significado de una frase, pero que pueden servir para reforzar o enfatizar una idea.',
        arm: 'Ավելորդաբանությունը այնպիսի բառերի օգտագործումն է, որոնք նախադասության իմաստը հասկանալու համար պարտադիր չեն, սակայն կարող են ուժեղացնել կամ ընդգծել ասելիքը։',
      },
      examples: [
        { id: 'pl1', es: 'Lo vi con mis propios ojos.', arm: 'Ես դա տեսա իմ սեփական աչքերով։' },
        { id: 'pl2', es: 'Sube arriba.', arm: 'Բարձրացի՛ր վերև։' },
        { id: 'pl3', es: 'Baja abajo.', arm: 'Իջի՛ր ներքև։' },
        { id: 'pl4', es: 'Sal afuera.', arm: 'Դո՛ւրս արի դուրս։' },
      ],
      forExam: {
        es: 'Si una expresión contiene palabras que repiten información ya incluida en su significado, puede haber un pleonasmo.',
        arm: 'Եթե բառերից մեկը կրկնում է արդեն արտահայտված իմաստը, դա կարող է լինել pleonasmo։',
      },
      details: [
        {
          es: 'Atención: Algunos ejemplos, como «sube arriba», pueden considerarse redundancias innecesarias en el lenguaje cotidiano. En literatura, el pleonasmo se utiliza con intención expresiva.',
          arm: 'Ուշադրություն. Առօրյա խոսքում որոշ օրինակներ («sube arriba») համարվում են ավելորդ կրկնություններ։ Գրականության մեջ pleonasmo-ն օգտագործվում է հատուկ արտահայտչական նպատակով։',
        },
      ],
    },
    {
      id: 'metafora',
      titleEs: '4. METÁFORA',
      titleArm: '4. METÁFORA — Փոխաբերություն',
      badge: 'Figuras de significado',
      definition: {
        es: 'La metáfora es una figura literaria que consiste en identificar un elemento real con otro figurado porque existe alguna semejanza entre ellos.',
        arm: 'Փոխաբերությունը գեղարվեստական արտահայտչամիջոց է, որի դեպքում իրական առարկան, մարդը կամ երևույթը ներկայացվում է մեկ այլ պատկերով՝ նրանց միջև եղած նմանության հիման վրա։',
      },
      examples: [
        { id: 'm1', es: 'Tus ojos son dos estrellas.', arm: 'Քո աչքերը երկու աստղեր են։' },
        { id: 'm2', es: 'Su cabello es oro.', arm: 'Նրա մազերը ոսկի են։' },
        { id: 'm3', es: 'El tiempo es oro.', arm: 'Ժամանակը ոսկի է։' },
        { id: 'm4', es: 'Sus dientes son perlas.', arm: 'Նրա ատամները մարգարիտներ են։' },
      ],
      subsections: [
        {
          titleEs: 'Las tres formas de la metáfora',
          titleArm: 'Փոխաբերության երեք ձևերը (A = elemento real / B = elemento figurado)',
          contentEs: 'A = elemento real (իրական տարր), B = elemento figurado (փոխաբերական տարր)',
          contentArm: 'A = իրական տարր, B = փոխաբերական տարր',
          items: [
            { es: '1. A es B: «Tus ojos son estrellas». (A = tus ojos, B = estrellas).', arm: '1. A es B. «Քո աչքերը աստղեր են» (A = քո աչքերը, B = աստղեր)։ Այս դեպքում նախադասության մեջ առկա են և՛ իրական, և՛ փոխաբերական տարրերը։' },
            { es: '2. B de A: «El oro de tu cabello». (B = oro, A = cabello).', arm: '2. B de A. «Քո մազերի ոսկին» (B = ոսկի, A = մազեր)։ Փոխաբերական և իրական տարրերը կապվում են «de» նախդիրով։' },
            { es: '3. Solo B: «Dos estrellas iluminaban su rostro». (B = estrellas, A = ojos implícito).', arm: '3. Solo B. «Երկու աստղեր լուսավորում էին նրա դեմքը» (B = աստղեր, A = աչքեր)։ Նշվում է միայն փոխաբերական պատկերը։ Իրական իմաստը պետք է հասկանալ համատեքստից։' },
          ],
        },
      ],
      difference: {
        title: { es: 'Diferencia entre Metáfora y Comparación', arm: 'Տարբերությունը փոխաբերության և համեմատության միջև' },
        items: [
          { es: 'Metáfora: Tus ojos son estrellas.', arm: 'Փոխաբերություն. Քո աչքերը աստղեր են։' },
          { es: 'Comparación: Tus ojos brillan como estrellas.', arm: 'Համեմատություն. Քո աչքերը փայլում են աստղերի պես։' },
        ],
        explanation: {
          es: 'Regla: En la comparación explícita suele aparecer «como». En la metáfora se identifica directamente un elemento con otro.',
          arm: 'Կանոն. Համեմատության մեջ սովորաբար հանդիպում է «como» (ինչպես, պես) բառը։ Փոխաբերության մեջ մի տարրը ուղղակիորեն նույնացվում է մյուսի հետ։',
        },
      },
    },
  ],
  questionsTheory: [
    { id: 1, qEs: '¿Qué es el polisíndeton?', qArm: 'Ի՞նչ է polisíndeton-ը։', aEs: 'Es una figura literaria que consiste en repetir conjunciones para dar más fuerza o ritmo.', aArm: 'Գեղարվեստական արտահայտչամիջոց է, որտեղ շաղկապները կրկնվում են խոսքին ուժ կամ ռիթմ հաղորդելու համար։' },
    { id: 2, qEs: '¿Qué palabras se repiten en el polisíndeton?', qArm: 'Ի՞նչ բառեր են կրկնվում polisíndeton-ի դեպքում։', aEs: 'Conjunciones como «y», «ni» u «o».', aArm: 'Շաղկապներ, ինչպիսիք են «y», «ni» կամ «o»։' },
    { id: 3, qEs: '¿Para qué se utiliza el polisíndeton?', qArm: 'Ինչի՞ համար է օգտագործվում polisíndeton-ը։', aEs: 'Para dar mayor intensidad, fuerza expresiva o ritmo a la frase.', aArm: 'Նախադասությանն ավելի մեծ ինտենսիվություն, արտահայտչական ուժ կամ ռիթմ տալու համար։' },
    { id: 4, qEs: '¿Qué es una enumeración?', qArm: 'Ի՞նչ է թվարկումը։', aEs: 'Es la mención sucesiva de varios elementos, acciones o cualidades.', aArm: 'Մի քանի տարրերի, գործողությունների կամ հատկանիշների հաջորդական թվարկումն է։' },
    { id: 5, qEs: '¿Cuál es la diferencia entre enumeración y polisíndeton?', qArm: 'Ո՞րն է տարբերությունը թվարկման և շաղկապների կրկնության միջև։', aEs: 'En la enumeración se mencionan elementos sucesivamente; en el polisíndeton se repiten conjunciones entre ellos.', aArm: 'Թվարկման մեջ տարրերը հաջորդաբար նշվում են, իսկ պոլիսինդետոնում նրանց միջև կրկնվում են շաղկապները։' },
    { id: 6, qEs: '¿Qué es un pleonasmo?', qArm: 'Ի՞նչ է ավելորդաբանությունը։', aEs: 'Consiste en utilizar palabras redundantes que no son estrictamente necesarias pero enfatizan la idea.', aArm: 'Իմաստով ավելորդ բառերի օգտագործումն է, որոնք ընդգծում կամ ուժեղացնում են միտքը։' },
    { id: 7, qEs: '¿Para qué se utiliza el pleonasmo?', qArm: 'Ինչի՞ համար է օգտագործվում ավելորդաբանությունը։', aEs: 'Para reforzar o dar más énfasis expresivo a una idea.', aArm: 'Միտքն ավելի շեշտելու և ուժեղացնելու համար։' },
    { id: 8, qEs: '¿Qué es una metáfora?', qArm: 'Ի՞նչ է փոխաբերությունը։', aEs: 'Es identificar un elemento real con otro figurado por su semejanza.', aArm: 'Իրական տարրի նույնացումն է փոխաբերական տարրի հետ՝ նրանց նմանության հիման վրա։' },
    { id: 9, qEs: '¿Qué representan A y B en una metáfora?', qArm: 'Ի՞նչ են նշանակում A-ն և B-ն փոխաբերության մեջ։', aEs: 'A representa el elemento real y B el elemento figurado.', aArm: 'A-ն իրական տարրն է, իսկ B-ն՝ փոխաբերական տարրը։' },
    { id: 10, qEs: '¿Cuál es la diferencia entre metáfora y comparación?', qArm: 'Ո՞րն է տարբերությունը փոխաբերության և համեմատության միջև։', aEs: 'La comparación usa nexos como «como»; la metáfora identifica los elementos directamente.', aArm: 'Համեմատությունը գործածում է «como» (ինչպես), իսկ փոխաբերությունն ուղղակիորեն նույնացնում է։' },
  ],
  testQuestions: [
    {
      id: 1,
      questionEs: '1. ¿Qué figura literaria consiste en repetir conjunciones?',
      questionArm: 'Ո՞ր արտահայտչամիջոցն է ենթադրում շաղկապների կրկնություն։',
      options: [
        { key: 'A', textEs: 'Metáfora', textArm: 'Փոխաբերություն' },
        { key: 'B', textEs: 'Polisíndeton', textArm: 'Պոլիսինդետոն' },
        { key: 'C', textEs: 'Pleonasmo', textArm: 'Պլեոնազմ' },
        { key: 'D', textEs: 'Enumeración', textArm: 'Թվարկում' },
      ],
      correctAnswer: 'B',
      explanationEs: 'El polisíndeton consiste en repetir conjunciones como «y», «ni» u «o».',
      explanationArm: 'Polisíndeton-ը շաղկապների կրկնությունն է («y», «ni», «o»)։',
    },
    {
      id: 2,
      questionEs: '2. ¿Qué figura aparece en «Y canta y baila y ríe»?',
      questionArm: 'Ի՞նչ արտահայտչամիջոց կա նախադասության մեջ։',
      options: [
        { key: 'A', textEs: 'Enumeración', textArm: 'Թվարկում' },
        { key: 'B', textEs: 'Metáfora', textArm: 'Փոխաբերություն' },
        { key: 'C', textEs: 'Polisíndeton', textArm: 'Պոլիսինդետոն' },
        { key: 'D', textEs: 'Pleonasmo', textArm: 'Պլեոնազմ' },
      ],
      correctAnswer: 'C',
    },
    {
      id: 3,
      questionEs: '3. ¿Qué es una enumeración?',
      questionArm: 'Ի՞նչ է թվարկումը։',
      options: [
        { key: 'A', textEs: 'Repetir conjunciones.' },
        { key: 'B', textEs: 'Identificar dos elementos por semejanza.' },
        { key: 'C', textEs: 'Mencionar varios elementos sucesivamente.' },
        { key: 'D', textEs: 'Añadir palabras redundantes.' },
      ],
      correctAnswer: 'C',
    },
    {
      id: 4,
      questionEs: '4. ¿Qué figura destaca en «Compré pan, leche, queso y huevos»?',
      questionArm: 'Ո՞ր արտահայտչամիջոցն է առանձնանում։',
      options: [
        { key: 'A', textEs: 'Enumeración' },
        { key: 'B', textEs: 'Pleonasmo' },
        { key: 'C', textEs: 'Metáfora' },
        { key: 'D', textEs: 'Polisíndeton' },
      ],
      correctAnswer: 'A',
    },
    {
      id: 5,
      questionEs: '5. ¿Qué es un pleonasmo?',
      questionArm: 'Ի՞նչ է ավելորդաբանությունը։',
      options: [
        { key: 'A', textEs: 'Una comparación con «como».' },
        { key: 'B', textEs: 'Una lista de elementos.' },
        { key: 'C', textEs: 'Una repetición de conjunciones.' },
        { key: 'D', textEs: 'El uso de palabras redundantes.' },
      ],
      correctAnswer: 'D',
    },
    {
      id: 6,
      questionEs: '6. ¿Qué figura aparece en «Lo vi con mis propios ojos»?',
      questionArm: 'Ի՞նչ արտահայտչամիջոց կա նախադասության մեջ։',
      options: [
        { key: 'A', textEs: 'Metáfora' },
        { key: 'B', textEs: 'Pleonasmo' },
        { key: 'C', textEs: 'Enumeración' },
        { key: 'D', textEs: 'Polisíndeton' },
      ],
      correctAnswer: 'B',
    },
    {
      id: 7,
      questionEs: '7. ¿Cuál de estas frases contiene una metáfora?',
      questionArm: 'Ո՞ր նախադասությունն է պարունակում փոխաբերություն։',
      options: [
        { key: 'A', textEs: 'Tengo libros y cuadernos.' },
        { key: 'B', textEs: 'Y corre y salta.' },
        { key: 'C', textEs: 'Sus ojos son estrellas.' },
        { key: 'D', textEs: 'Lo vi con mis ojos.' },
      ],
      correctAnswer: 'C',
    },
    {
      id: 8,
      questionEs: '8. En «Tus dientes son perlas», ¿cuál es el elemento real?',
      questionArm: '«Tus dientes son perlas» նախադասության մեջ ո՞րն է իրական տարրը։',
      options: [
        { key: 'A', textEs: 'Tus dientes' },
        { key: 'B', textEs: 'Perlas' },
        { key: 'C', textEs: 'Son' },
        { key: 'D', textEs: 'Ninguno' },
      ],
      correctAnswer: 'A',
    },
    {
      id: 9,
      questionEs: '9. En «Su cabello es oro», ¿cuál es el elemento figurado?',
      questionArm: 'Ո՞րն է փոխաբերական տարրը։',
      options: [
        { key: 'A', textEs: 'Su' },
        { key: 'B', textEs: 'Cabello' },
        { key: 'C', textEs: 'Es' },
        { key: 'D', textEs: 'Oro' },
      ],
      correctAnswer: 'D',
    },
    {
      id: 10,
      questionEs: '10. ¿Qué figura aparece en «Ni come ni bebe ni duerme»?',
      questionArm: 'Ո՞ր արտահայտչամիջոցն է ներկայացված։',
      options: [
        { key: 'A', textEs: 'Comparación' },
        { key: 'B', textEs: 'Polisíndeton' },
        { key: 'C', textEs: 'Metáfora' },
        { key: 'D', textEs: 'Pleonasmo' },
      ],
      correctAnswer: 'B',
    },
    {
      id: 11,
      questionEs: '11. ¿Cuál es un ejemplo de pleonasmo?',
      questionArm: 'Ո՞րն է ավելորդաբանության օրինակ։',
      options: [
        { key: 'A', textEs: 'Sube arriba.' },
        { key: 'B', textEs: 'El sol es una moneda de oro.' },
        { key: 'C', textEs: 'Tengo perros, gatos y pájaros.' },
        { key: 'D', textEs: 'Y llora y grita y corre.' },
      ],
      correctAnswer: 'A',
    },
    {
      id: 12,
      questionEs: '12. ¿Qué figura aparece en «El tiempo es oro»?',
      questionArm: 'Ի՞նչ արտահայտչամիջոց կա։',
      options: [
        { key: 'A', textEs: 'Pleonasmo' },
        { key: 'B', textEs: 'Polisíndeton' },
        { key: 'C', textEs: 'Metáfora' },
        { key: 'D', textEs: 'Enumeración' },
      ],
      correctAnswer: 'C',
    },
    {
      id: 13,
      questionEs: '13. ¿Cuál es una comparación y no una metáfora directa?',
      questionArm: 'Ո՞րն է համեմատություն, ոչ թե ուղիղ փոխաբերություն։',
      options: [
        { key: 'A', textEs: 'Tus ojos son estrellas.' },
        { key: 'B', textEs: 'Tu sonrisa es el sol.' },
        { key: 'C', textEs: 'El oro de tu cabello.' },
        { key: 'D', textEs: 'Corres como el viento.' },
      ],
      correctAnswer: 'D',
    },
    {
      id: 14,
      questionEs: '14. ¿Qué figura destaca en «Era amable, alegre, inteligente y generosa»?',
      questionArm: 'Ի՞նչ արտահայտչամիջոց է։',
      options: [
        { key: 'A', textEs: 'Pleonasmo' },
        { key: 'B', textEs: 'Enumeración' },
        { key: 'C', textEs: 'Polisíndeton' },
        { key: 'D', textEs: 'Metáfora' },
      ],
      correctAnswer: 'B',
    },
    {
      id: 15,
      questionEs: '15. En una metáfora, ¿qué representa la letra B?',
      questionArm: 'Փոխաբերության մեջ ի՞նչ է նշանակում B-ն։',
      options: [
        { key: 'A', textEs: 'El elemento real.' },
        { key: 'B', textEs: 'El verbo.' },
        { key: 'C', textEs: 'El elemento figurado.' },
        { key: 'D', textEs: 'La conjunción.' },
      ],
      correctAnswer: 'C',
    },
    {
      id: 16,
      questionEs: '16. ¿Qué frase contiene polisíndeton?',
      questionArm: 'Ո՞ր նախադասության մեջ կա շաղկապների կրկնություն։',
      options: [
        { key: 'A', textEs: 'Había flores y árboles y pájaros.' },
        { key: 'B', textEs: 'Había flores, árboles y pájaros.' },
        { key: 'C', textEs: 'Las flores eran hermosas.' },
        { key: 'D', textEs: 'Las flores brillaban como estrellas.' },
      ],
      correctAnswer: 'A',
    },
    {
      id: 17,
      questionEs: '17. ¿Qué figura se reconoce por palabras que pueden resultar redundantes?',
      questionArm: 'Ո՞ր արտահայտչամիջոցում են հանդիպում իմաստով ավելորդ բառեր։',
      options: [
        { key: 'A', textEs: 'Enumeración' },
        { key: 'B', textEs: 'Metáfora' },
        { key: 'C', textEs: 'Polisíndeton' },
        { key: 'D', textEs: 'Pleonasmo' },
      ],
      correctAnswer: 'D',
    },
    {
      id: 18,
      questionEs: '18. ¿Qué figura aparece en «Las perlas de su boca» si hablamos de los dientes?',
      questionArm: 'Եթե խոսքը ատամների մասին է, ի՞նչ արտահայտչամիջոց է։',
      options: [
        { key: 'A', textEs: 'Enumeración' },
        { key: 'B', textEs: 'Metáfora' },
        { key: 'C', textEs: 'Polisíndeton' },
        { key: 'D', textEs: 'Pleonasmo' },
      ],
      correctAnswer: 'B',
    },
    {
      id: 19,
      questionEs: '19. ¿Qué dos figuras pueden aparecer juntas en «Y ríe y llora y canta»?',
      questionArm: 'Ո՞ր երկու արտահայտչամիջոցները կարող են միասին հանդիպել։',
      options: [
        { key: 'A', textEs: 'Metáfora y comparación' },
        { key: 'B', textEs: 'Pleonasmo y metáfora' },
        { key: 'C', textEs: 'Polisíndeton y enumeración' },
        { key: 'D', textEs: 'Pleonasmo y comparación' },
      ],
      correctAnswer: 'C',
    },
    {
      id: 20,
      questionEs: '20. ¿Por qué «El oro de tu cabello» es una metáfora?',
      questionArm: 'Ինչո՞ւ է այս արտահայտությունը փոխաբերություն։',
      options: [
        { key: 'A', textEs: 'Porque identifica el cabello con el oro por semejanza.' },
        { key: 'B', textEs: 'Porque repite una conjunción.' },
        { key: 'C', textEs: 'Porque enumera cuatro objetos.' },
        { key: 'D', textEs: 'Porque contiene palabras redundantes.' },
      ],
      correctAnswer: 'A',
    },
  ],
  identifyExercises: [
    { id: 1, sentenceEs: 'Y llueve y truena y sopla el viento.', sentenceArm: 'Եվ անձրևում է, և որոտում է, և քամին փչում է։', answerEs: 'Polisíndeton', answerArm: 'Պոլիսինդետոն (շաղկապների կրկնություն)' },
    { id: 2, sentenceEs: 'Su sonrisa es un sol.', sentenceArm: 'Նրա ժպիտը արև է։', answerEs: 'Metáfora', answerArm: 'Փոխաբերություն' },
    { id: 3, sentenceEs: 'Lo escuché con mis propios oídos.', sentenceArm: 'Ես դա լսեցի իմ սեփական ականջներով։', answerEs: 'Pleonasmo', answerArm: 'Պլեոնազմ (ավելորդաբանություն)' },
    { id: 4, sentenceEs: 'Tengo lápices, libros, cuadernos y reglas.', sentenceArm: 'Ունեմ մատիտներ, գրքեր, տետրեր և քանոններ։', answerEs: 'Enumeración', answerArm: 'Թվարկում' },
    { id: 5, sentenceEs: 'Tus manos son hielo.', sentenceArm: 'Քո ձեռքերը սառույց են։', answerEs: 'Metáfora', answerArm: 'Փոխաբերություն' },
    { id: 6, sentenceEs: 'Ni habla ni escucha ni responde.', sentenceArm: 'Ո՛չ խոսում է, ո՛չ լսում է, ո՛չ պատասխանում է։', answerEs: 'Polisíndeton', answerArm: 'Պոլիսինդետոն' },
    { id: 7, sentenceEs: 'Sube arriba rápidamente.', sentenceArm: 'Բարձրացի՛ր վերև արագորեն։', answerEs: 'Pleonasmo', answerArm: 'Պլեոնազմ' },
    { id: 8, sentenceEs: 'Había rosas, margaritas, tulipanes y violetas.', sentenceArm: 'Կային վարդեր, մարգարիտածաղիկներ, կակաչներ և մանուշակներ։', answerEs: 'Enumeración', answerArm: 'Թվարկում' },
    { id: 9, sentenceEs: 'Sus eyes son dos luceros.', sentenceArm: 'Նրա աչքերը երկու լուսատուներ են։', answerEs: 'Metáfora', answerArm: 'Փոխաբերություն' },
    { id: 10, sentenceEs: 'Y camina y corre y salta.', sentenceArm: 'Եվ քայլում է, և վազում է, և ցատկում է։', answerEs: 'Polisíndeton', answerArm: 'Պոլիսինդետոն' },
    { id: 11, sentenceEs: 'Lo escribí de mi puño y letra.', sentenceArm: 'Ես դա գրեցի իմ ձեռագրով (անձամբ)։', answerEs: 'Pleonasmo', answerArm: 'Պլեոնազմ' },
    { id: 12, sentenceEs: 'Su voz es música para mis oídos.', sentenceArm: 'Նրա ձայնը երաժշտություն է իմ ականջների համար։', answerEs: 'Metáfora', answerArm: 'Փոխաբերություն' },
    { id: 13, sentenceEs: 'En el jardín hay árboles, flores y mariposas.', sentenceArm: 'Այգում կան ծառեր, ծաղիկներ և թիթեռներ։', answerEs: 'Enumeración', answerArm: 'Թվարկում' },
    { id: 14, sentenceEs: 'Y el mar y el viento y la lluvia lo acompañaban.', sentenceArm: 'Եվ ծովը, և քամին, և անձրևը ուղեկցում էին նրան։', answerEs: 'Polisíndeton y enumeración', answerArm: 'Պոլիսինդետոն և թվարկում' },
    { id: 15, sentenceEs: 'Bajó abajo para buscar sus zapatos.', sentenceArm: 'Նա իջավ ներքև՝ իր կոշիկները փնտրելու համար։', answerEs: 'Pleonasmo', answerArm: 'Պլեոնազմ' },
  ],
  trueFalseExercises: [
    { id: 1, statementEs: 'El polisíndeton consiste en repetir conjunciones.', statementArm: 'Polisíndeton-ը կայանում է շաղկապների կրկնության մեջ։', isTrue: true },
    { id: 2, statementEs: 'La enumeración siempre tiene que repetir la conjunción «y».', statementArm: 'Թվարկումը պարտադիր պետք է կրկնի «y» շաղկապը։', isTrue: false },
    { id: 3, statementEs: 'En el pleonasmo se utilizan palabras redundantes.', statementArm: 'Pleonasmo-ում օգտագործվում են իմաստով ավելորդ բառեր։', isTrue: true },
    { id: 4, statementEs: 'La metáfora identifica dos elementos por semejanza.', statementArm: 'Փոխաբերությունը նույնացնում է երկու տարր՝ նմանության հիման վրա։', isTrue: true },
    { id: 5, statementEs: '«Tus ojos son estrellas» es una enumeración.', statementArm: '«Tus ojos son estrellas»-ը թվարկում է։', isTrue: false },
    { id: 6, statementEs: '«Y salta y corre y juega» contiene polisíndeton.', statementArm: '«Y salta y corre y juega» նախադասությունը պարունակում է polisíndeton։', isTrue: true },
    { id: 7, statementEs: '«Lo vi con mis propios ojos» es un pleonasmo.', statementArm: '«Lo vi con mis propios ojos»-ը pleonasmo է։', isTrue: true },
    { id: 8, statementEs: 'En una metáfora, A representa el elemento real.', statementArm: 'Փոխաբերության մեջ A-ն ներկայացնում է իրական տարրը։', isTrue: true },
    { id: 9, statementEs: '«Corre como el viento» es una comparación.', statementArm: '«Corre como el viento»-ը համեմատություն է։', isTrue: true },
    { id: 10, statementEs: 'Una enumeración y un polisíndeton pueden aparecer juntos.', statementArm: 'Թվարկումը և պոլիսինդետոնը կարող են հանդիպել միասին։', isTrue: true },
  ],
  readingTexts: [
    {
      id: 't1',
      titleEs: 'Texto 1',
      titleArm: 'Տեքստ 1',
      contentEs: '«En el bosque había árboles, flores, mariposas y pájaros».',
      contentArm: '«Անտառում կային ծառեր, ծաղիկներ, թիթեռներ և թռչուններ»։',
      questions: [
        { id: 1, questionEs: '¿Qué figura literaria aparece?', questionArm: 'Ի՞նչ արտահայտչամիջոց կա։', answerEs: 'Aparece una enumeración.', answerArm: 'Հանդիպում է enumeración (թվարկում)։' },
        { id: 2, questionEs: '¿Qué elementos se mencionan?', questionArm: 'Ի՞նչ տարրեր են նշվում։', answerEs: 'Se mencionan árboles, flores, mariposas y pájaros.', answerArm: 'Նշվում են ծառեր, ծաղիկներ, թիթեռներ և թռչուններ։' },
        { id: 3, questionEs: '¿Por qué es una enumeración?', questionArm: 'Ինչո՞ւ է սա թվարկում։', answerEs: 'Porque se presentan varios elementos sucesivamente.', answerArm: 'Քանի որ մի քանի տարրեր հաջորդաբար են ներկայացվում։' },
      ],
    },
    {
      id: 't2',
      titleEs: 'Texto 2',
      titleArm: 'Տեքստ 2',
      contentEs: '«Y el niño corría y saltaba y gritaba de alegría».',
      contentArm: '«Եվ տղան վազում էր, և ցատկում էր, և ուրախությունից գոռում էր»։',
      questions: [
        { id: 1, questionEs: '¿Qué figura literaria aparece?', questionArm: 'Ի՞նչ արտահայտչամիջոց կա։', answerEs: 'Aparece un polisíndeton.', answerArm: 'Հանդիպում է polisíndeton (շաղկապների կրկնություն)։' },
        { id: 2, questionEs: '¿Qué palabra se repite?', questionArm: 'Ի՞նչ բառ է կրկնվում։', answerEs: 'Se repite la conjunción «y».', answerArm: 'Կրկնվում է «y» (և) շաղկապը։' },
        { id: 3, questionEs: '¿Qué efecto produce esta repetición?', questionArm: 'Ի՞նչ ազդեցություն է թողնում այս կրկնությունը։', answerEs: 'La repetición da ritmo e intensidad a la frase.', answerArm: 'Կրկնությունը նախադասությանը հաղորդում է ռիթմ և արտահայտչական ուժ։' },
      ],
    },
    {
      id: 't3',
      titleEs: 'Texto 3',
      titleArm: 'Տեքստ 3',
      contentEs: '«Lucía tiene dos estrellas en el rostro que iluminan su sonrisa».',
      contentArm: '«Լուսիան դեմքին երկու աստղ ունի, որոնք լուսավորում են նրա ժպիտը»։',
      questions: [
        { id: 1, questionEs: '¿Qué figura literaria aparece si las estrellas representan sus ojos?', questionArm: 'Ի՞նչ արտահայտչամիջոց կա, եթե աստղերը խորհրդանշում են նրա աչքերը։', answerEs: 'Aparece una metáfora.', answerArm: 'Հանդիպում է metáfora (փոխաբերություն)։' },
        { id: 2, questionEs: '¿Cuál es el elemento real?', questionArm: 'Ո՞րն է իրական տարրը։', answerEs: 'El elemento real son los ojos.', answerArm: 'Իրական տարրը աչքերն են։' },
        { id: 3, questionEs: '¿Cuál es el elemento figurado?', questionArm: 'Ո՞րն է փոխաբերական տարրը։', answerEs: 'El elemento figurado son las estrellas.', answerArm: 'Փոխաբերական տարրը աստղերն են։' },
        { id: 4, questionEs: '¿Por qué es una metáfora?', questionArm: 'Ինչո՞ւ է փոխաբերություն։', answerEs: 'Porque se identifican los ojos con las estrellas por su brillo.', answerArm: 'Որովհետև աչքերը նույնացվում են աստղերի հետ՝ իրենց փայլի պատճառով։' },
      ],
    },
    {
      id: 't4',
      titleEs: 'Texto 4',
      titleArm: 'Տեքստ 4',
      contentEs: '«Pedro dijo: Lo he visto con mis propios ojos».',
      contentArm: '«Պեդրոն ասաց. Ես դա տեսա իմ սեփական աչքերով»։',
      questions: [
        { id: 1, questionEs: '¿Qué figura literaria aparece?', questionArm: 'Ի՞նչ արտահայտչամիջոց կա։', answerEs: 'Aparece un pleonasmo.', answerArm: 'Հանդիպում է pleonasmo (ավելորդաբանություն)։' },
        { id: 2, questionEs: '¿Qué expresión resulta redundante?', questionArm: 'Ո՞ր արտահայտությունն է իմաստով ավելորդ։', answerEs: 'La expresión «con mis propios ojos».', answerArm: '«Con mis propios ojos» (իմ սեփական աչքերով) արտահայտությունը։' },
        { id: 3, questionEs: '¿Para qué se utiliza?', questionArm: 'Ինչի՞ համար է այն օգտագործվում։', answerEs: 'Se utiliza para enfatizar que Pedro lo vio personalmente.', answerArm: 'Օգտագործվում է ընդգծելու համար, որ Պեդրոն անձամբ է դա տեսել։' },
      ],
    },
  ],
  reviewPoints: [
    { termEs: 'Polisíndeton', termArm: 'Պոլիսինդետոն', defEs: 'Repetición de conjunciones («y», «ni», «o»). Da ritmo e intensidad.', defArm: 'Շաղկապների կրկնություն («y», «ni», «o»)։ Հաղորդում է ռիթմ և ուժ։' },
    { termEs: 'Enumeración', termArm: 'Թվարկում', defEs: 'Sucesión de elementos, acciones o cualidades uno detrás de otro.', defArm: 'Տարրերի, գործողությունների կամ հատկանիշների հաջորդական թվարկում։' },
    { termEs: 'Pleonasmo', termArm: 'Ավելորդաբանություն (պլեոնազմ)', defEs: 'Palabras redundantes para enfatizar («lo vi con mis propios ojos», «sube arriba»).', defArm: 'Ավելորդ բառեր՝ միտքը շեշտելու և ուժեղացնելու համար («տեսա իմ աչքերով», «ելիր վերև»)։' },
    { termEs: 'Metáfora', termArm: 'Փոխաբերություն', defEs: 'Identificación de dos elementos por semejanza (A es B, B de A, Solo B).', defArm: 'Երկու տարրերի փոխաբերական նույնացում՝ նմանության հիման վրա (A es B, B de A, Solo B)։' },
  ],
};

export const module2Data: ModuleData = {
  id: 'figuras-2',
  number: '2',
  titleEs: '3.1. Las Figuras Literarias (II)',
  titleArm: '3.1. Գեղարվեստական արտահայտչամիջոցներ (II)',
  subtitleEs: 'Nivel fónico y morfosintáctico (7 figuras clave)',
  subtitleArm: 'Հնչյունային և քերականական մակարդակ (7 կարևոր թեմաներ)',
  iconName: 'Feather',
  color: 'violet',
  introEs: 'Lengua Castellana y Literatura — 1.º de ESO (7-րդ դասարան). Այս էջում ներկայացված են 7 կարևոր թեմաներ՝ Aliteración, Onomatopeya, Paronomasia, Epanadiplosis, Hipérbaton, Anáfora և Asíndeton։',
  introArm: 'Հնչյունային մակարդակ (Nivel fónico)՝ Aliteración, Onomatopeya, Paronomasia, Epanadiplosis։ Շարահյուսական մակարդակ (Nivel morfosintáctico)՝ Hipérbaton, Anáfora, Asíndeton։',
  theory: [
    {
      id: 'aliteracion',
      titleEs: '1. ALITERACIÓN',
      titleArm: '1. ALITERACIÓN — Հնչյունների կրկնություն',
      badge: 'Nivel fónico',
      definition: {
        es: 'La aliteración es una figura literaria que consiste en repetir uno o varios sonidos iguales o parecidos en palabras cercanas para crear un efecto sonoro.',
        arm: 'Ալիտերացիան գեղարվեստական արտահայտչամիջոց է, որի դեպքում իրար մոտ գտնվող բառերում կրկնվում են նույն կամ նման հնչյունները՝ ստեղծելով հատուկ հնչողություն։',
      },
      examples: [
        { id: 'al1', es: 'Mi mamá me mima.', arm: 'Իմ մայրիկը ինձ փաղաքշում է։', explanation: { es: 'Se repite el sonido «m».', arm: 'Կրկնվում է «m» հնչյունը։' } },
        { id: 'al2', es: 'Tres tristes tigres tragan trigo.', arm: 'Երեք տխուր վագր ցորեն են կուլ տալիս։', explanation: { es: 'Se repiten los sonidos «tr» y «t».', arm: 'Կրկնվում են «tr» և «t» հնչյունները։' } },
        { id: 'al3', es: 'Susana susurra suavemente.', arm: 'Սուսանան մեղմ շշնջում է։', explanation: { es: 'Se repite el sonido «s».', arm: 'Կրկնվում է «s» հնչյունը։' } },
      ],
      forExam: {
        es: 'La aliteración consiste en repetir sonidos, no necesariamente palabras completas.',
        arm: 'Ալիտերացիայի ժամանակ կրկնվում են հնչյունները, ոչ թե պարտադիր ամբողջական բառերը։',
      },
    },
    {
      id: 'onomatopeya',
      titleEs: '2. ONOMATOPEYA',
      titleArm: '2. ONOMATOPEYA — Ձայնընդօրինակում',
      badge: 'Nivel fónico',
      definition: {
        es: 'La onomatopeya consiste en utilizar palabras que imitan sonidos reales de animales, personas, objetos o fenómenos naturales.',
        arm: 'Ձայնընդօրինակումը այնպիսի բառերի օգտագործումն է, որոնք նմանակում են կենդանիների, մարդկանց, առարկաների կամ բնության ձայները։',
      },
      examples: [
        { id: 'on1', es: 'El perro hace «guau, guau».', arm: 'Շունը հաչում է՝ «հաֆ-հաֆ»։' },
        { id: 'on2', es: 'El reloj hace «tic-tac».', arm: 'Ժամացույցը ձայն է հանում՝ «տիկ-տակ»։' },
        { id: 'on3', es: 'El gato hace «miau».', arm: 'Կատուն մլավում է՝ «մյաու»։' },
        { id: 'on4', es: '¡Pum! Se cerró la puerta.', arm: '«Բո՛ւմ»։ Դուռը փակվեց։' },
      ],
      forExam: {
        es: 'Si una palabra imita un sonido real, es una onomatopeya.',
        arm: 'Եթե բառը նմանակում է իրական ձայն, դա ձայնընդօրինակում է։',
      },
    },
    {
      id: 'paronomasia',
      titleEs: '3. PARONOMASIA',
      titleArm: '3. PARONOMASIA — Հնչյունային նմանությամբ բառախաղ',
      badge: 'Nivel fónico',
      definition: {
        es: 'La paronomasia consiste en colocar cerca palabras que tienen sonidos parecidos, pero significados diferentes.',
        arm: 'Պարանոմազիան գեղարվեստական արտահայտչամիջոց է, որի դեպքում իրար մոտ օգտագործվում են նման հնչողությամբ, բայց տարբեր իմաստ ունեցող բառեր։',
      },
      examples: [
        {
          id: 'pa1',
          es: 'No es lo mismo actitud que aptitud.',
          arm: '«Actitud»՝ վերաբերմունք, և «aptitud»՝ ընդունակություն, տարբեր բառեր են։',
          explanation: { es: 'Actitud y aptitud tienen sonidos parecidos, pero significados diferentes.', arm: 'Actitud և aptitud բառերն ունեն նման հնչողություն, բայց տարբեր իմաստներ։' },
        },
        {
          id: 'pa2',
          es: 'El hombre tiene hambre.',
          arm: 'Տղամարդը քաղցած է։',
          explanation: { es: 'Hombre y hambre son palabras parecidas en su sonido.', arm: 'Hombre (տղամարդ) և hambre (քաղց) բառերը նման են հնչում։' },
        },
        {
          id: 'pa3',
          es: 'Compró un mapa y una tapa.',
          arm: 'Նա գնեց քարտեզ և կափարիչ։',
          explanation: { es: 'Mapa y tapa tienen sonidos parecidos.', arm: 'Mapa և tapa բառերն ունեն նման հնչողություն։' },
        },
      ],
      forExam: {
        es: 'Paronomasia = palabras parecidas en sonido, pero diferentes en significado.',
        arm: 'Պարանոմազիա = նման հնչողությամբ, բայց տարբեր իմաստներով բառեր։',
      },
      difference: {
        title: { es: 'Diferencia importante entre Aliteración y Paronomasia', arm: 'Կարևոր տարբերություն' },
        items: [
          { es: 'Aliteración: se repiten sonidos (ej. Susana susurra suavemente).', arm: 'Ալիտերացիա → կրկնվում են հնչյունները։' },
          { es: 'Paronomasia: se utilizan palabras distintas que suenan parecido (ej. hombre / hambre).', arm: 'Պարանոմազիա → օգտագործվում են տարբեր բառեր, որոնք հնչում են նման։' },
        ],
      },
    },
    {
      id: 'epanadiplosis',
      titleEs: '4. EPANADIPLOSIS',
      titleArm: '4. EPANADIPLOSIS — Բառի կրկնություն տողի սկզբում և վերջում',
      badge: 'Nivel fónico / morfosintáctico',
      definition: {
        es: 'La epanadiplosis consiste en repetir la misma palabra al principio y al final de un verso o enunciado.',
        arm: 'Էպանադիպլոզիսը գեղարվեստական արտահայտչամիջոց է, որի դեպքում նույն բառը կրկնվում է միևնույն բանաստեղծական տողի կամ արտահայտության սկզբում և վերջում։',
      },
      examples: [
        { id: 'ep1', es: 'Verde que te quiero verde.', arm: 'Կանաչ, ինչպես եմ քեզ սիրում, կանաչ։', explanation: { es: 'La palabra «verde» aparece al principio y al final.', arm: '«Verde» բառը հանդիպում է տողի սկզբում և վերջում։' } },
        { id: 'ep2', es: 'Sueño con un hermoso sueño.', arm: 'Երազում եմ մի գեղեցիկ երազ։', explanation: { es: 'Se repite «sueño» al principio y al final.', arm: 'Կրկնվում է «sueño»-ն սկզբում և վերջում։' } },
        { id: 'ep3', es: 'Amor, todo lo que necesito es amor.', arm: 'Սեր, այն ամենը, ինչ ինձ պետք է, սերն է։', explanation: { es: 'La palabra «amor» aparece al principio y al final.', arm: '«Amor» բառը սկզբում և վերջում է։' } },
      ],
      forExam: {
        es: 'La misma palabra aparece al principio y al final del mismo verso o enunciado.',
        arm: 'Նույն բառը կրկնվում է նույն տողի կամ արտահայտության սկզբում և վերջում։',
      },
    },
    {
      id: 'hiperbaton',
      titleEs: '5. HIPÉRBATON',
      titleArm: '5. HIPÉRBATON — Շրջադասություն',
      badge: 'Nivel morfosintáctico',
      definition: {
        es: 'El hipérbaton consiste en alterar el orden habitual de las palabras en una oración para conseguir un efecto expresivo.',
        arm: 'Շրջադասությունը գեղարվեստական արտահայտչամիջոց է, որի դեպքում նախադասության բառերի սովորական հերթականությունը փոխվում է՝ խոսքին հատուկ արտահայտչականություն հաղորդելու համար։',
      },
      examples: [
        { id: 'hi1', es: 'Orden habitual: La noche era hermosa. → Hipérbaton: Hermosa era la noche.', arm: 'Սովորական շարադասություն. La noche era hermosa. → Շրջադասություն. Hermosa era la noche (Գեղեցիկ էր գիշերը)։' },
        { id: 'hi2', es: 'Orden habitual: Estoy enamorado de tu sonrisa. → Hipérbaton: De tu sonrisa enamorado estoy.', arm: 'Սովորական. Estoy enamorado de tu sonrisa. → Շրջադասություն. De tu sonrisa enamorado estoy։' },
        { id: 'hi3', es: 'Orden habitual: Las estrellas brillaban en el cielo. → Hipérbaton: En el cielo brillaban las estrellas.', arm: 'Սովորական. Las estrellas brillaban en el cielo. → Շրջադասություն. En el cielo brillaban las estrellas։' },
      ],
      forExam: {
        es: 'En el hipérbaton se modifica el orden habitual de las palabras con intención expresiva.',
        arm: 'Շրջադասության ժամանակ բառերի սովորական հերթականությունը փոխվում է գեղարվեստական նպատակով։',
      },
    },
    {
      id: 'anafora',
      titleEs: '6. ANÁFORA',
      titleArm: '6. ANÁFORA — Անաֆորա',
      badge: 'Nivel morfosintáctico',
      definition: {
        es: 'La anáfora consiste en repetir una o varias palabras al comienzo de dos o más versos o frases consecutivas.',
        arm: 'Անաֆորան գեղարվեստական արտահայտչամիջոց է, որի դեպքում նույն բառը կամ բառախումբը կրկնվում է երկու կամ ավելի հաջորդական տողերի կամ արտահայտությունների սկզբում։',
      },
      examples: [
        { id: 'an1', es: 'Quiero aprender. / Quiero viajar. / Quiero descubrir el mundo.', arm: 'Ուզում եմ սովորել։ / Ուզում եմ ճանապարհորդել։ / Ուզում եմ բացահայտել աշխարհը։ (Կրկնվում է «Quiero»-ն)' },
        { id: 'an2', es: 'Cada día estudio. / Cada día aprendo. / Cada día mejoro.', arm: 'Ամեն օր սովորում եմ։ / Ամեն օր նոր բան եմ յուրացնում։ / Ամեն օր կատարելագործվում եմ։ (Կրկնվում է «Cada día»-ն)' },
      ],
      forExam: {
        es: 'Si la misma palabra aparece al comienzo de varios versos o frases consecutivas, es una anáfora.',
        arm: 'Եթե նույն բառը կրկնվում է մի քանի հաջորդական տողերի սկզբում, դա անաֆորա է։',
      },
      difference: {
        title: { es: 'Diferencia entre Anáfora y Epanadiplosis', arm: 'Տարբերությունը անաֆորայի և էպանադիպլոզիսի միջև' },
        items: [
          { es: 'Anáfora: Quiero cantar. / Quiero bailar. / Quiero jugar. (al principio de versos consecutivos)', arm: 'Անաֆորա. Կրկնությունը կատարվում է հաջորդական տողերի սկզբում։' },
          { es: 'Epanadiplosis: Verde que te quiero verde. (al principio y al final del MISMO verso)', arm: 'Էպանադիպլոզիս. Նույն բառը կրկնվում է մեկ տողի սկզբում և վերջում։' },
        ],
      },
    },
    {
      id: 'asindeton',
      titleEs: '7. ASÍNDETON',
      titleArm: '7. ASÍNDETON — Անշաղկապություն',
      badge: 'Nivel morfosintáctico',
      definition: {
        es: 'El asíndeton consiste en eliminar conjunciones entre palabras o frases, especialmente en enumeraciones, para dar rapidez, fuerza o dinamismo.',
        arm: 'Ասինդետոնը գեղարվեստական արտահայտչամիջոց է, որի դեպքում բառերի կամ նախադասությունների միջև շաղկապները բաց են թողնվում՝ խոսքն ավելի արագ, ուժեղ կամ դինամիկ դարձնելու համար։',
      },
      examples: [
        { id: 'as1', es: 'Corre, salta, juega, ríe.', arm: 'Վազում է, ցատկում է, խաղում է, ծիծաղում է։' },
        { id: 'as2', es: 'Llegué, vi, vencí.', arm: 'Եկա, տեսա, հաղթեցի (Veni, vidi, vici)։' },
        { id: 'as3', es: 'El niño gritaba, lloraba, corría, saltaba.', arm: 'Երեխան գոռում էր, լաց էր լինում, վազում էր, ցատկում էր։' },
      ],
      forExam: {
        es: 'En el asíndeton se omiten las conjunciones.',
        arm: 'Ասինդետոնի ժամանակ շաղկապները բաց են թողնվում։',
      },
      difference: {
        title: { es: 'Diferencia entre Asíndeton y Polisíndeton', arm: 'Տարբերությունը ասինդետոնի և պոլիսինդետոնի միջև' },
        items: [
          { es: 'Asíndeton: Corre, salta, juega, ríe. (Sin conjunciones)', arm: 'Ասինդետոն. Շաղկապներ չկան (ստորակետներ են)։' },
          { es: 'Polisíndeton: Y corre y salta y juega y ríe. (Repetición de conjunciones)', arm: 'Պոլիսինդետոն. Շաղկապները մի քանի անգամ կրկնվում են։' },
        ],
      },
    },
  ],
  questionsTheory: [
    { id: 1, qEs: '¿Qué es la aliteración?', qArm: 'Ի՞նչ է ալիտերացիան։', aEs: 'Repetición de sonidos iguales o semejantes en palabras cercanas.', aArm: 'Նույն կամ նման հնչյունների կրկնություն իրար մոտ բառերում։' },
    { id: 2, qEs: '¿Qué se repite en una aliteración?', qArm: 'Ի՞նչ է կրկնվում ալիտերացիայի ժամանակ։', aEs: 'Sonidos (fonemas), no necesariamente palabras enteras.', aArm: 'Հնչյուններ, ոչ պարտադիր ամբողջ բառեր։' },
    { id: 3, qEs: '¿Qué es una onomatopeya?', qArm: 'Ի՞նչ է ձայնընդօրինակումը։', aEs: 'Palabras que imitan sonidos reales de seres, objetos o naturaleza.', aArm: 'Բառեր, որոնք նմանակում են իրական ձայներ։' },
    { id: 4, qEs: '¿Qué sonidos pueden representarse mediante onomatopeyas?', qArm: 'Ի՞նչ ձայներ կարող են արտահայտվել ձայնընդօրինակմամբ։', aEs: 'Sonidos de animales («guau»), relojes («tic-tac»), golpes («pum»), etc.', aArm: 'Կենդանիների («հաֆ»), ժամացույցի («տիկ-տակ»), հարվածի ձայներ («բում») և այլն։' },
    { id: 5, qEs: '¿Qué es la paronomasia?', qArm: 'Ի՞նչ է պարանոմազիան։', aEs: 'Colocar cerca palabras de sonido semejante pero significado diferente.', aArm: 'Նման հնչողությամբ, բայց տարբեր իմաստ ունեցող բառերի կողք-կողքի դնելը։' },
    { id: 6, qEs: '¿Cuál es la diferencia entre aliteración y paronomasia?', qArm: 'Ո՞րն է ալիտերացիայի և պարանոմազիայի տարբերությունը։', aEs: 'Aliteración repite sonidos; paronomasia usa palabras distintas con sonidos parecidos.', aArm: 'Ալիտերացիան հնչյուններ է կրկնում, իսկ պարանոմազիան՝ տարբեր բառեր, որոնք նման են հնչում։' },
    { id: 7, qEs: '¿Qué es la epanadiplosis?', qArm: 'Ի՞նչ է էպանադիպլոզիսը։', aEs: 'Repetición de la misma palabra al principio y al final de un verso.', aArm: 'Նույն բառի կրկնությունն է տողի սկզբում և վերջում։' },
    { id: 8, qEs: '¿Dónde aparece la palabra repetida en una epanadiplosis?', qArm: 'Որտե՞ղ է կրկնվում բառը էպանադիպլոզիսի դեպքում։', aEs: 'Al principio y al final del mismo verso.', aArm: 'Միևնույն տողի սկզբում և վերջում։' },
    { id: 9, qEs: '¿Qué es el hipérbaton?', qArm: 'Ի՞նչ է շրջադասությունը։', aEs: 'Alteración del orden habitual de las palabras en una oración.', aArm: 'Նախադասության բառերի սովորական հերթականության փոփոխությունը։' },
    { id: 10, qEs: '¿Qué cambia en una oración con hipérbaton?', qArm: 'Ի՞նչն է փոխվում շրջադասության դեպքում։', aEs: 'El orden sintáctico habitual con intención expresiva.', aArm: 'Բառերի սովորական քերականական դասավորությունը։' },
    { id: 11, qEs: '¿Qué es la anáfora?', qArm: 'Ի՞նչ է անաֆորան։', aEs: 'Repetición de palabras al comienzo de versos o frases consecutivas.', aArm: 'Բառերի կրկնությունն է հաջորդական տողերի սկզբում։' },
    { id: 12, qEs: '¿Cuál es la diferencia entre anáfora y epanadiplosis?', qArm: 'Ո՞րն է անաֆորայի և էպանադիպլոզիսի տարբերությունը։', aEs: 'La anáfora repite al inicio de varios versos; la epanadiplosis al inicio y fin del mismo verso.', aArm: 'Անաֆորան կրկնվում է տարբեր տողերի սկզբում, իսկ էպանադիպլոզիսը՝ նույն տողի սկզբում և վերջում։' },
    { id: 13, qEs: '¿Qué es el asíndeton?', qArm: 'Ի՞նչ է ասինդետոնը։', aEs: 'Omisión o eliminación de conjunciones para dar rapidez.', aArm: 'Շաղկապների բացթողումը՝ խոսքին արագություն հաղորդելու համար։' },
    { id: 14, qEs: '¿Cuál es la diferencia entre asíndeton y polisíndeton?', qArm: 'Ո՞րն է ասինդետոնի և պոլիսինդետոնի տարբերությունը։', aEs: 'Asíndeton elimina conjunciones; polisíndeton las repite intencionadamente.', aArm: 'Ասինդետոնը բաց է թողնում շաղկապները, իսկ պոլիսինդետոնը՝ կրկնում դրանք։' },
  ],
  testQuestions: [
    { id: 1, questionEs: '1. ¿Qué figura literaria consiste en repetir sonidos semejantes?', questionArm: 'Ո՞ր արտահայտչամիջոցն է հիմնված նման հնչյունների կրկնության վրա։', options: [{ key: 'A', textEs: 'Hipérbaton' }, { key: 'B', textEs: 'Aliteración' }, { key: 'C', textEs: 'Asíndeton' }, { key: 'D', textEs: 'Anáfora' }], correctAnswer: 'B' },
    { id: 2, questionEs: '2. ¿Qué figura aparece en «Mi mamá me mima»?', questionArm: 'Ի՞նչ արտահայտչամիջոց կա նախադասության մեջ։', options: [{ key: 'A', textEs: 'Onomatopeya' }, { key: 'B', textEs: 'Paronomasia' }, { key: 'C', textEs: 'Aliteración' }, { key: 'D', textEs: 'Hipérbaton' }], correctAnswer: 'C' },
    { id: 3, questionEs: '3. ¿Qué es una onomatopeya?', questionArm: 'Ի՞նչ է ձայնընդօրինակումը։', options: [{ key: 'A', textEs: 'Repetición al principio de varios versos.' }, { key: 'B', textEs: 'Alteración del orden de las palabras.' }, { key: 'C', textEs: 'Eliminación de conjunciones.' }, { key: 'D', textEs: 'Imitación de sonidos reales.' }], correctAnswer: 'D' },
    { id: 4, questionEs: '4. ¿Cuál de estos ejemplos contiene una onomatopeya?', questionArm: 'Ո՞րն է ձայնընդօրինակման օրինակ։', options: [{ key: 'A', textEs: 'El reloj hace tic-tac.' }, { key: 'B', textEs: 'La luna es plata.' }, { key: 'C', textEs: 'María canta y baila.' }, { key: 'D', textEs: 'Hermosa es la noche.' }], correctAnswer: 'A' },
    { id: 5, questionEs: '5. ¿Qué figura utiliza palabras de sonidos parecidos y significados diferentes?', questionArm: 'Ո՞ր արտահայտչամիջոցում են օգտագործվում նման հնչողությամբ, բայց տարբեր իմաստներով բառեր։', options: [{ key: 'A', textEs: 'Anáfora' }, { key: 'B', textEs: 'Paronomasia' }, { key: 'C', textEs: 'Asíndeton' }, { key: 'D', textEs: 'Epanadiplosis' }], correctAnswer: 'B' },
    { id: 6, questionEs: '6. ¿Qué figura aparece en «El hombre tiene hambre»?', questionArm: 'Ի՞նչ արտահայտչամիջոց կա նախադասության մեջ։', options: [{ key: 'A', textEs: 'Hipérbaton' }, { key: 'B', textEs: 'Asíndeton' }, { key: 'C', textEs: 'Paronomasia' }, { key: 'D', textEs: 'Anáfora' }], correctAnswer: 'C' },
    { id: 7, questionEs: '7. ¿Qué es la epanadiplosis?', questionArm: 'Ի՞նչ է էպանադիպլոզիսը։', options: [{ key: 'A', textEs: 'Repetir una palabra al principio y al final de un verso.' }, { key: 'B', textEs: 'Eliminar las conjunciones.' }, { key: 'C', textEs: 'Repetir sonidos parecidos.' }, { key: 'D', textEs: 'Cambiar el orden de las palabras.' }], correctAnswer: 'A' },
    { id: 8, questionEs: '8. ¿Qué figura aparece en «Verde que te quiero verde»?', questionArm: 'Ի՞նչ արտահայտչամիջոց է։', options: [{ key: 'A', textEs: 'Anáfora' }, { key: 'B', textEs: 'Onomatopeya' }, { key: 'C', textEs: 'Asíndeton' }, { key: 'D', textEs: 'Epanadiplosis' }], correctAnswer: 'D' },
    { id: 9, questionEs: '9. ¿Qué figura altera el orden habitual de las palabras?', questionArm: 'Ո՞ր արտահայտչամիջոցն է փոխում բառերի սովորական հերթականությունը։', options: [{ key: 'A', textEs: 'Aliteración' }, { key: 'B', textEs: 'Hipérbaton' }, { key: 'C', textEs: 'Paronomasia' }, { key: 'D', textEs: 'Asíndeton' }], correctAnswer: 'B' },
    { id: 10, questionEs: '10. ¿Cuál de estas expresiones presenta hipérbaton?', questionArm: 'Ո՞ր արտահայտությունն է պարունակում շրջադասություն։', options: [{ key: 'A', textEs: 'El perro ladra.' }, { key: 'B', textEs: 'Compré pan, queso y leche.' }, { key: 'C', textEs: 'De tu sonrisa enamorado estoy.' }, { key: 'D', textEs: 'Quiero cantar, quiero bailar.' }], correctAnswer: 'C' },
    { id: 11, questionEs: '11. ¿Qué es la anáfora?', questionArm: 'Ի՞նչ է անաֆորան։', options: [{ key: 'A', textEs: 'Repetición al principio de versos o frases consecutivas.' }, { key: 'B', textEs: 'Imitación de sonidos.' }, { key: 'C', textEs: 'Comparación entre dos elementos.' }, { key: 'D', textEs: 'Eliminación de conjunciones.' }], correctAnswer: 'A' },
    { id: 12, questionEs: '12. ¿Qué figura aparece en «Quiero reír. Quiero cantar. Quiero soñar»?', questionArm: 'Ո՞ր արտահայտչամիջոցն է ներկայացված։', options: [{ key: 'A', textEs: 'Hipérbaton' }, { key: 'B', textEs: 'Paronomasia' }, { key: 'C', textEs: 'Asíndeton' }, { key: 'D', textEs: 'Anáfora' }], correctAnswer: 'D' },
    { id: 13, questionEs: '13. ¿Qué figura consiste en omitir conjunciones?', questionArm: 'Ո՞ր արտահայտչամիջոցում են բաց թողնվում շաղկապները։', options: [{ key: 'A', textEs: 'Epanadiplosis' }, { key: 'B', textEs: 'Asíndeton' }, { key: 'C', textEs: 'Aliteración' }, { key: 'D', textEs: 'Onomatopeya' }], correctAnswer: 'B' },
    { id: 14, questionEs: '14. ¿Qué figura destaca en «Corre, salta, juega, ríe»?', questionArm: 'Ի՞նչ արտահայտչամիջոց է առանձնանում։', options: [{ key: 'A', textEs: 'Paronomasia' }, { key: 'B', textEs: 'Hipérbaton' }, { key: 'C', textEs: 'Asíndeton' }, { key: 'D', textEs: 'Onomatopeya' }], correctAnswer: 'C' },
    { id: 15, questionEs: '15. ¿Cuál es la diferencia entre asíndeton y polisíndeton?', questionArm: 'Ո՞րն է ասինդետոնի և պոլիսինդետոնի տարբերությունը։', options: [{ key: 'A', textEs: 'El asíndeton elimina conjunciones y el polisíndeton las repite.' }, { key: 'B', textEs: 'Los dos repiten sonidos.' }, { key: 'C', textEs: 'Los dos imitan sonidos.' }, { key: 'D', textEs: 'El asíndeton repite palabras al final.' }], correctAnswer: 'A' },
    { id: 16, questionEs: '16. ¿Qué figura aparece en «Susana susurra suavemente»?', questionArm: 'Ի՞նչ արտահայտչամիջոց կա։', options: [{ key: 'A', textEs: 'Anáfora' }, { key: 'B', textEs: 'Epanadiplosis' }, { key: 'C', textEs: 'Hipérbaton' }, { key: 'D', textEs: 'Aliteración' }], correctAnswer: 'D' },
    { id: 17, questionEs: '17. ¿Cuál de estos ejemplos contiene paronomasia?', questionArm: 'Ո՞ր օրինակում կա պարանոմազիա։', options: [{ key: 'A', textEs: 'Y corre y salta.' }, { key: 'B', textEs: 'Actitud y aptitud.' }, { key: 'C', textEs: '¡Guau, guau!' }, { key: 'D', textEs: 'Verde que te quiero verde.' }], correctAnswer: 'B' },
    { id: 18, questionEs: '18. ¿Qué figura destaca en «Hermosa era la mañana»?', questionArm: 'Ի՞նչ արտահայտչամիջոց է ներկայացված։', options: [{ key: 'A', textEs: 'Onomatopeya' }, { key: 'B', textEs: 'Asíndeton' }, { key: 'C', textEs: 'Hipérbaton' }, { key: 'D', textEs: 'Aliteración' }], correctAnswer: 'C' },
    { id: 19, questionEs: '19. ¿Cuál es una epanadiplosis?', questionArm: 'Ո՞րն է էպանադիպլոզիսի օրինակ։', options: [{ key: 'A', textEs: 'Amor, todo lo que necesito es amor.' }, { key: 'B', textEs: 'Quiero vivir. Quiero soñar.' }, { key: 'C', textEs: 'El gato hace miau.' }, { key: 'D', textEs: 'Corre, salta, juega.' }], correctAnswer: 'A' },
    { id: 20, questionEs: '20. ¿Qué figura aparece en «Llegué, vi, vencí»?', questionArm: 'Ի՞նչ արտահայտչամիջոց կա։', options: [{ key: 'A', textEs: 'Paronomasia' }, { key: 'B', textEs: 'Anáfora' }, { key: 'C', textEs: 'Hipérbaton' }, { key: 'D', textEs: 'Asíndeton' }], correctAnswer: 'D' },
  ],
  identifyExercises: [
    { id: 1, sentenceEs: 'Tres tristes tigres tragan trigo.', sentenceArm: 'Երեք տխուր վագր ցորեն են կուլ տալիս։', answerEs: 'Aliteración', answerArm: 'Ալիտերացիա' },
    { id: 2, sentenceEs: 'El perro hace guau, guau.', sentenceArm: 'Շունը հաչում է՝ հաֆ-հաֆ։', answerEs: 'Onomatopeya', answerArm: 'Ձայնընդօրինակում' },
    { id: 3, sentenceEs: 'No confundas actitud con aptitud.', sentenceArm: 'Մի շփոթիր վերաբերմունքը ընդունակության հետ։', answerEs: 'Paronomasia', answerArm: 'Պարանոմազիա' },
    { id: 4, sentenceEs: 'Verde que te quiero verde.', sentenceArm: 'Կանաչ, ինչպես եմ քեզ սիրում, կանաչ։', answerEs: 'Epanadiplosis', answerArm: 'Էպանադիպլոզիս' },
    { id: 5, sentenceEs: 'De tu mirada enamorado estoy.', sentenceArm: 'Քո հայացքին սիրահարված եմ ես։', answerEs: 'Hipérbaton', answerArm: 'Շրջադասություն' },
    { id: 6, sentenceEs: 'Cada mañana estudio. Cada mañana aprendo.', sentenceArm: 'Ամեն առավոտ սովորում եմ։ Ամեն առավոտ նոր բան յուրացնում։', answerEs: 'Anáfora', answerArm: 'Անաֆորա' },
    { id: 7, sentenceEs: 'Corre, salta, juega, ríe.', sentenceArm: 'Վազում է, ցատկում, խաղում, ծիծաղում։', answerEs: 'Asíndeton', answerArm: 'Ասինդետոն' },
    { id: 8, sentenceEs: 'Mi mamá me mima.', sentenceArm: 'Իմ մայրիկը ինձ փաղաքշում է։', answerEs: 'Aliteración', answerArm: 'Ալիտերացիա' },
    { id: 9, sentenceEs: 'El reloj hace tic-tac.', sentenceArm: 'Ժամացույցը տիկ-տակ է անում։', answerEs: 'Onomatopeya', answerArm: 'Ձայնընդօրինակում' },
    { id: 10, sentenceEs: 'Sueño con un hermoso sueño.', sentenceArm: 'Երազում եմ մի գեղեցիկ երազ։', answerEs: 'Epanadiplosis', answerArm: 'Էպանադիպլոզիս' },
    { id: 11, sentenceEs: 'Hermosa era aquella tarde.', sentenceArm: 'Գեղեցիկ էր այդ կեսօրը։', answerEs: 'Hipérbaton', answerArm: 'Շրջադասություն' },
    { id: 12, sentenceEs: 'Quiero aprender. Quiero crecer. Quiero mejorar.', sentenceArm: 'Ուզում եմ սովորել։ Ուզում եմ աճել։ Ուզում եմ կատարելագործվել։', answerEs: 'Anáfora', answerArm: 'Անաֆորա' },
    { id: 13, sentenceEs: 'Llegué, miré, sonreí.', sentenceArm: 'Եկա, նայեցի, ժպտացի։', answerEs: 'Asíndeton', answerArm: 'Ասինդետոն' },
    { id: 14, sentenceEs: 'El hombre tiene hambre.', sentenceArm: 'Տղամարդը քաղցած է։', answerEs: 'Paronomasia', answerArm: 'Պարանոմազիա' },
    { id: 15, sentenceEs: 'Susana susurra suavemente.', sentenceArm: 'Սուսանան մեղմ շշնջում է։', answerEs: 'Aliteración', answerArm: 'Ալիտերացիա' },
    { id: 16, sentenceEs: '¡Pum! Se cayó el libro.', sentenceArm: '«Բում»։ Գիրքն ընկավ։', answerEs: 'Onomatopeya', answerArm: 'Ձայնընդօրինակում' },
    { id: 17, sentenceEs: 'Amor, siempre recordaré nuestro amor.', sentenceArm: 'Սեր, միշտ կհիշեմ մեր սերը։', answerEs: 'Epanadiplosis', answerArm: 'Էպանադիպլոզիս' },
    { id: 18, sentenceEs: 'De oro son sus cabellos.', sentenceArm: 'Ոսկուց են նրա մազերը։', answerEs: 'Hipérbaton', answerArm: 'Շրջադասություն' },
    { id: 19, sentenceEs: 'Hoy quiero cantar. Hoy quiero bailar.', sentenceArm: 'Այսօր ուզում եմ երգել։ Այսօր ուզում եմ պարել։', answerEs: 'Anáfora', answerArm: 'Անաֆորա' },
    { id: 20, sentenceEs: 'Respira, piensa, decide, actúa.', sentenceArm: 'Շնչի՛ր, մտածի՛ր, որոշի՛ր, գործի՛ր։', answerEs: 'Asíndeton', answerArm: 'Ասինդետոն' },
  ],
  trueFalseExercises: [
    { id: 1, statementEs: 'La aliteración consiste en repetir sonidos parecidos.', statementArm: 'Ալիտերացիան նման հնչյունների կրկնությունն է։', isTrue: true },
    { id: 2, statementEs: 'La onomatopeya consiste en cambiar el orden de las palabras.', statementArm: 'Ձայնընդօրինակումը բառերի կարգը փոխելն է։', isTrue: false },
    { id: 3, statementEs: 'La paronomasia utiliza palabras con sonidos parecidos y significados distintos.', statementArm: 'Պարանոմազիան օգտագործում է նման հնչողությամբ և տարբեր իմաստով բառեր։', isTrue: true },
    { id: 4, statementEs: 'La epanadiplosis repite una palabra al principio y al final de un verso.', statementArm: 'Էպանադիպլոզիսը կրկնում է բառը տողի սկզբում և վերջում։', isTrue: true },
    { id: 5, statementEs: 'El hipérbaton consiste en eliminar todas las vocales.', statementArm: 'Շրջադասությունը բոլոր ձայնավորները վերացնելն է։', isTrue: false },
    { id: 6, statementEs: 'La anáfora repite palabras al comienzo de varios versos.', statementArm: 'Անաֆորան կրկնում է բառերը մի քանի տողերի սկզբում։', isTrue: true },
    { id: 7, statementEs: 'El asíndeton consiste en repetir muchas conjunciones.', statementArm: 'Ասինդետոնը շատ շաղկապներ կրկնելն է։', isTrue: false },
    { id: 8, statementEs: '«Miau» puede ser una onomatopeya.', statementArm: '«Miau»-ն կարող է լինել ձայնընդօրինակում։', isTrue: true },
    { id: 9, statementEs: '«Verde que te quiero verde» contiene epanadiplosis.', statementArm: '«Verde que te quiero verde»-ն պարունակում է էպանադիպլոզիս։', isTrue: true },
    { id: 10, statementEs: '«Mi mamá me mima» contiene aliteración.', statementArm: '«Mi mamá me mima»-ն պարունակում է ալիտերացիա։', isTrue: true },
    { id: 11, statementEs: '«Quiero cantar. Quiero bailar» contiene anáfora.', statementArm: '«Quiero cantar. Quiero bailar»-ը պարունակում է անաֆորա։', isTrue: true },
    { id: 12, statementEs: '«Corre, salta, juega» contiene asíndeton.', statementArm: '«Corre, salta, juega»-ն պարունակում է ասինդետոն։', isTrue: true },
    { id: 13, statementEs: 'El polisíndeton y el asíndeton significan lo mismo.', statementArm: 'Պոլիսինդետոնը և ասինդետոնը նույն բանն են նշանակում։', isTrue: false },
    { id: 14, statementEs: 'En «Hermosa era la noche» se utiliza un orden expresivo de las palabras.', statementArm: '«Hermosa era la noche»-ում օգտագործվում է բառերի արտահայտչական կարգ։', isTrue: true },
    { id: 15, statementEs: '«Actitud» y «aptitud» pueden utilizarse como ejemplo de paronomasia.', statementArm: '«Actitud» և «aptitud» բառերը կարող են օգտագործվել որպես պարանոմազիայի օրինակ։', isTrue: true },
  ],
  readingTexts: [
    {
      id: 'ex1',
      titleEs: 'Ejercicio 1 — Aliteración',
      titleArm: 'Վարժություն 1 — Ալիտերացիա',
      contentEs: '«Tres tristes tigres tragan trigo».',
      contentArm: '«Երեք տխուր վագր ցորեն են կուլ տալիս»։',
      questions: [
        { id: 1, questionEs: '¿Qué figura literaria aparece?', questionArm: 'Ի՞նչ արտահայտչամիջոց կա։', answerEs: 'Aparece una aliteración.', answerArm: 'Հանդիպում է aliteración (ալիտերացիա)։' },
        { id: 2, questionEs: '¿Qué sonidos se repiten?', questionArm: 'Ի՞նչ հնչյուններ են կրկնվում։', answerEs: 'Se repiten los sonidos «tr» y «t».', answerArm: 'Կրկնվում են «tr» և «t» հնչյունները։' },
        { id: 3, questionEs: '¿Por qué es una aliteración?', questionArm: 'Ինչո՞ւ է ալիտերացիա։', answerEs: 'Porque se repiten sonidos semejantes en palabras cercanas.', answerArm: 'Քանի որ նման հնչյուններ են կրկնվում իրար մոտ գտնվող բառերում։' },
      ],
    },
    {
      id: 'ex2',
      titleEs: 'Ejercicio 2 — Onomatopeya',
      titleArm: 'Վարժություն 2 — Ձայնընդօրինակում',
      contentEs: '«El reloj hacía tic-tac durante toda la noche».',
      contentArm: '«Ժամացույցը ամբողջ գիշեր տիկ-տակ էր անում»։',
      questions: [
        { id: 1, questionEs: '¿Qué figura literaria aparece?', questionArm: 'Ի՞նչ արտահայտչամիջոց կա։', answerEs: 'Aparece una onomatopeya.', answerArm: 'Հանդիպում է onomatopeya (ձայնընդօրինակում)։' },
        { id: 2, questionEs: '¿Qué sonido se imita?', questionArm: 'Ի՞նչ ձայն է նմանակվում։', answerEs: 'Se imita el sonido de un reloj.', answerArm: 'Նմանակվում է ժամացույցի ձայնը։' },
        { id: 3, questionEs: '¿Qué palabra representa ese sonido?', questionArm: 'Ո՞ր բառն է ներկայացնում այդ ձայնը։', answerEs: 'La palabra es «tic-tac».', answerArm: 'Բառը «tic-tac»-ն է։' },
      ],
    },
    {
      id: 'ex3',
      titleEs: 'Ejercicio 3 — Paronomasia',
      titleArm: 'Վարժություն 3 — Պարանոմազիա',
      contentEs: '«No confundas actitud con aptitud».',
      contentArm: '«Մի՛ շփոթիր վերաբերմունքը (actitud) ընդունակության (aptitud) հետ»։',
      questions: [
        { id: 1, questionEs: '¿Qué figura literaria aparece?', questionArm: 'Ի՞նչ արտահայտչամիջոց կա։', answerEs: 'Aparece una paronomasia.', answerArm: 'Հանդիպում է paronomasia (պարանոմազիա)։' },
        { id: 2, questionEs: '¿Qué palabras tienen sonidos parecidos?', questionArm: 'Ո՞ր բառերն ունեն նման հնչողություն։', answerEs: 'Las palabras son «actitud» y «aptitud».', answerArm: '«Actitud» և «aptitud» բառերը։' },
        { id: 3, questionEs: '¿Tienen el mismo significado?', questionArm: 'Նրանք նո՞ւյն իմաստն ունեն։', answerEs: 'No, tienen significados diferentes.', answerArm: 'Ոչ, նրանք ունեն տարբեր իմաստներ։' },
      ],
    },
    {
      id: 'ex4',
      titleEs: 'Ejercicio 4 — Epanadiplosis',
      titleArm: 'Վարժություն 4 — Էպանադիպլոզիս',
      contentEs: '«Verde que te quiero verde».',
      contentArm: '«Կանաչ, ինչպես եմ քեզ սիրում, կանաչ»։',
      questions: [
        { id: 1, questionEs: '¿Qué figura literaria aparece?', questionArm: 'Ի՞նչ արտահայտչամիջոց կա։', answerEs: 'Aparece una epanadiplosis.', answerArm: 'Հանդիպում է epanadiplosis։' },
        { id: 2, questionEs: '¿Qué palabra se repite?', questionArm: 'Ի՞նչ բառ է կրկնվում։', answerEs: 'Se repite la palabra «verde».', answerArm: 'Կրկնվում է «verde» բառը։' },
        { id: 3, questionEs: '¿Dónde aparece esa palabra?', questionArm: 'Որտե՞ղ է հանդիպում այդ բառը։', answerEs: 'Al principio y al final del verso.', answerArm: 'Տողի սկզբում և վերջում։' },
      ],
    },
    {
      id: 'ex5',
      titleEs: 'Ejercicio 5 — Hipérbaton',
      titleArm: 'Վարժություն 5 — Շրջադասություն',
      contentEs: '«De tu sonrisa enamorado estoy».',
      contentArm: '«Քո ժպիտին սիրահարված եմ ես»։',
      questions: [
        { id: 1, questionEs: '¿Qué figura literaria aparece?', questionArm: 'Ի՞նչ արտահայտչամիջոց կա։', answerEs: 'Aparece un hipérbaton.', answerArm: 'Հանդիպում է hipérbaton (շրջադասություն)։' },
        { id: 2, questionEs: '¿Cuál es el orden habitual de la frase?', questionArm: 'Ո՞րն է նախադասության սովորական շարադասությունը։', answerEs: 'El orden habitual es «Estoy enamorado de tu sonrisa».', answerArm: 'Սովորական շարադասությունն է. «Estoy enamorado de tu sonrisa»։' },
        { id: 3, questionEs: '¿Qué se ha cambiado?', questionArm: 'Ի՞նչն է փոխվել։', answerEs: 'Se ha cambiado el orden de las palabras.', answerArm: 'Փոխվել է բառերի կարգը։' },
      ],
    },
    {
      id: 'ex6',
      titleEs: 'Ejercicio 6 — Anáfora',
      titleArm: 'Վարժություն 6 — Անաֆորա',
      contentEs: '«Sueño con viajar. / Sueño con aprender. / Sueño con descubrir el mundo».',
      contentArm: '«Երազում եմ ճանապարհորդել։ / Երազում եմ սովորել։ / Երազում եմ բացահայտել աշխարհը»։',
      questions: [
        { id: 1, questionEs: '¿Qué figura literaria aparece?', questionArm: 'Ի՞նչ արտահայտչամիջոց կա։', answerEs: 'Aparece una anáfora.', answerArm: 'Հանդիպում է anáfora (անաֆորա)։' },
        { id: 2, questionEs: '¿Qué palabras se repiten?', questionArm: 'Ի՞նչ բառեր են կրկնվում։', answerEs: 'Se repiten las palabras «Sueño con».', answerArm: 'Կրկնվում են «Sueño con» բառերը։' },
        { id: 3, questionEs: '¿Dónde se repiten esas palabras?', questionArm: 'Որտե՞ղ են կրկնվում այդ բառերը։', answerEs: 'Al principio de los tres versos.', answerArm: 'Երեք տողերի սկզբում։' },
      ],
    },
    {
      id: 'ex7',
      titleEs: 'Ejercicio 7 — Asíndeton',
      titleArm: 'Վարժություն 7 — Ասինդետոն',
      contentEs: '«Corre, salta, juega, ríe».',
      contentArm: '«Վազում է, ցատկում, խաղում, ծիծաղում»։',
      questions: [
        { id: 1, questionEs: '¿Qué figura literaria aparece?', questionArm: 'Ի՞նչ արտահայտչամիջոց կա։', answerEs: 'Aparece un asíndeton.', answerArm: 'Հանդիպում է asíndeton (անշաղկապություն)։' },
        { id: 2, questionEs: '¿Se utilizan conjunciones?', questionArm: 'Օգտագործվա՞ծ են շաղկապներ։', answerEs: 'No se utilizan conjunciones.', answerArm: 'Ոչ, շաղկապներ չեն օգտագործվել։' },
        { id: 3, questionEs: '¿Qué efecto produce el asíndeton?', questionArm: 'Ի՞նչ ազդեցություն է թողնում ասինդետոնը։', answerEs: 'Produce una sensación de rapidez y dinamismo.', answerArm: 'Հաղորդում է արագության և դինամիկության զգացողություն։' },
      ],
    },
  ],
  reviewPoints: [
    { termEs: 'Aliteración', termArm: 'Ալիտերացիա', defEs: 'Repetición de sonidos iguales o semejantes.', defArm: 'Նույն կամ նման հնչյունների կրկնություն։' },
    { termEs: 'Onomatopeya', termArm: 'Ձայնընդօրինակում', defEs: 'Imitación de sonidos reales mediante palabras.', defArm: 'Իրական ձայների նմանակում բառերի միջոցով։' },
    { termEs: 'Paronomasia', termArm: 'Պարանոմազիա', defEs: 'Uso de palabras con sonidos parecidos y significados diferentes.', defArm: 'Նման հնչողությամբ, բայց տարբեր իմաստներով բառերի օգտագործում։' },
    { termEs: 'Epanadiplosis', termArm: 'Էպանադիպլոզիս', defEs: 'Repetición de una palabra al principio y al final de un verso.', defArm: 'Նույն բառի կրկնություն տողի սկզբում և վերջում։' },
    { termEs: 'Hipérbaton', termArm: 'Շրջադասություն', defEs: 'Alteración del orden habitual de las palabras.', defArm: 'Բառերի սովորական հերթականության փոփոխություն։' },
    { termEs: 'Anáfora', termArm: 'Անաֆորա', defEs: 'Repetición de palabras al principio de varios versos consecutivos.', defArm: 'Բառերի կրկնություն հաջորդական տողերի սկզբում։' },
    { termEs: 'Asíndeton', termArm: 'Ասինդետոն', defEs: 'Eliminación de conjunciones entre palabras o frases.', defArm: 'Բառերի կամ արտահայտությունների միջև շաղկապների բացթողում։' },
  ],
};

export const module3Data: ModuleData = {
  id: 'lenguaje-literario',
  number: '3',
  titleEs: 'El Lenguaje Literario',
  titleArm: 'Գրական լեզուն',
  subtitleEs: 'Prosa, Verso, Estrofa, Métrica y Rima',
  subtitleArm: 'Արձակ, Բանաստեղծական տող, Տուն, Ռիթմ և Հանգ',
  iconName: 'BookOpen',
  color: 'emerald',
  introEs: 'Lengua Castellana y Literatura — 1.º de ESO (7-րդ դասարան). Այս թեման կարևոր է 7-րդ դասարանի իսպաներենի քննության համար։ Աշակերտը պետք է կարողանա բացատրել՝ ինչ է գրական լեզուն, ինչով է տարբերվում առօրյա լեզվից, և ինչ տարբերություն կա prosa և verso հասկացությունների միջև։',
  introArm: 'Գրական լեզուն բառերի օգտագործման հատուկ ձև է, որի միջոցով հեղինակը գեղարվեստական կերպով արտահայտում է մտքեր, զգացմունքներ և հույզեր։',
  theory: [
    {
      id: 'que-es',
      titleEs: '1. ¿QUÉ ES EL LENGUAJE LITERARIO?',
      titleArm: '1. Ի՞ՆՉ Է ԳՐԱԿԱՆ ԼԵԶՈՒՆ',
      badge: 'Definición fundamental',
      definition: {
        es: 'El lenguaje literario es una forma especial de utilizar las palabras para expresar ideas, sentimientos y emociones de manera artística y estética. Su objetivo no es solamente comunicar información, sino también crear belleza, despertar emociones y captar la atención del lector.',
        arm: 'Գրական լեզուն բառերի օգտագործման հատուկ ձև է, որի միջոցով հեղինակը գեղարվեստական կերպով արտահայտում է մտքեր, զգացմունքներ և հույզեր։',
      },
      difference: {
        title: { es: 'Ejemplo comparativo: Lenguaje cotidiano vs Lenguaje literario', arm: 'Համեմատական օրինակ. Առօրյա լեզու ընդդեմ Գրական լեզվի' },
        items: [
          { es: 'Lenguaje cotidiano: «El sol está brillando». (Informa de un hecho).', arm: 'Առօրյա լեզու. «Արևը փայլում է» (Պարզապես տեղեկություն է հաղորդում)։' },
          { es: 'Lenguaje literario: «El sol es una moneda de oro en el cielo». (Utiliza metáfora).', arm: 'Գրական լեզու. «Արևը երկնքում ոսկե մետաղադրամ է» (Փոխաբերություն)։' },
        ],
      },
      examples: [],
    },
    {
      id: 'caracteristicas',
      titleEs: '2. CARACTERÍSTICAS DEL LENGUAJE LITERARIO',
      titleArm: '2. ԳՐԱԿԱՆ ԼԵԶՎԻ ՀԱՏԿԱՆԻՇՆԵՐԸ',
      badge: '5 rasgos clave',
      definition: {
        es: 'El lenguaje literario da importancia tanto al mensaje como a la forma de expresarlo.',
        arm: 'Գրական լեզվում կարևոր է ոչ միայն այն, թե ինչ է ասվում, այլև այն, թե ինչպես է դա արտահայտվում։',
      },
      details: [
        { es: '1. Finalidad estética: busca crear belleza mediante las palabras.', arm: '1. Գեղագիտական նպատակ. բառերի միջոցով գեղեցկություն ստեղծել։' },
        { es: '2. Expresividad: transmite sentimientos y emociones.', arm: '2. Արտահայտչականություն. փոխանցել զգացմունքներ և հույզեր։' },
        { es: '3. Figuras literarias: utiliza recursos como metáforas, comparaciones o repeticiones.', arm: '3. Գեղարվեստական արտահայտչամիջոցներ. օգտագործել փոխաբերություններ, համեմատություններ և կրկնություններ։' },
        { es: '4. Originalidad: presenta ideas de una forma creativa.', arm: '4. Ինքնատիպություն. մտքերը ներկայացնել ստեղծագործական ձևով։' },
        { es: '5. Ritmo y musicalidad: en algunos textos utiliza sonidos, repeticiones o rimas.', arm: '5. Ռիթմ և երաժշտականություն. օգտագործել հնչյունների կրկնություն և հանգեր։' },
      ],
      examples: [],
    },
    {
      id: 'el-verso',
      titleEs: '3. EL VERSO',
      titleArm: '3. EL VERSO — ԲԱՆԱՍՏԵՂԾԱԿԱՆ ՏՈՂ',
      badge: 'Lírica',
      definition: {
        es: 'El verso es cada una de las líneas que forman un poema escrito en verso. Puede tener un ritmo y una medida determinados, y en muchos casos presenta rima.',
        arm: 'Verso-ն բանաստեղծության առանձին տողն է։ Այն կարող է ունենալ որոշակի ռիթմ և վանկային կառուցվածք, իսկ շատ դեպքերում՝ նաև հանգ։',
      },
      examples: [
        {
          id: 'v1',
          es: 'La luna brilla en el mar, / las estrellas van a bailar, / el viento empieza a cantar, / y la noche quiere soñar.',
          arm: 'Լուսինը փայլում է ծովում, / աստղերը սկսում են պարել, / քամին սկսում է երգել, / իսկ գիշերը ցանկանում է երազել։',
          explanation: { es: 'Este poema tiene cuatro versos. Las palabras finales «mar», «bailar», «cantar» y «soñar» presentan rima.', arm: 'Չորս տող, հանգավորված վերջավորություններով։' },
        },
      ],
      subsections: [
        {
          titleEs: 'Conceptos importantes',
          titleArm: 'Կարևոր հասկացություններ',
          contentEs: 'El verso, la estrofa, la rima y el ritmo.',
          contentArm: 'Բանաստեղծական տող, տուն, հանգ և ռիթմ։',
          items: [
            { es: 'El verso: Cada línea de un poema.', arm: 'Verso: Բանաստեղծության յուրաքանչյուր տողը։' },
            { es: 'La estrofa: Conjunto de versos agrupados.', arm: 'Estrofa: Բանաստեղծական տուն (խմբավորված տողեր)։' },
            { es: 'La rima: Repetición de sonidos al final de dos o más versos, a partir de la última vocal acentuada.', arm: 'Rima: Հնչյունների համընկնում տողերի վերջում։' },
            { es: 'El ritmo: Musicalidad producida por la distribución de los sonidos, acentos y pausas.', arm: 'Ritmo: Երաժշտականություն՝ ստեղծված շեշտերի և դադարների դասավորությամբ։' },
          ],
        },
      ],
    },
    {
      id: 'la-prosa',
      titleEs: '4. LA PROSA',
      titleArm: '4. LA PROSA — ԱՐՁԱԿ',
      badge: 'Narrativa',
      definition: {
        es: 'La prosa es una forma de expresión que organiza las palabras en oraciones y párrafos, sin la estructura habitual del verso. Es la forma más común de escribir cuentos, novelas y muchos otros textos.',
        arm: 'Արձակը խոսքի կամ գրավոր արտահայտման ձև է, որտեղ բառերը կազմավորում են նախադասություններ և պարբերություններ՝ առանց բանաստեղծական տողերի սովորական կառուցվածքի։',
      },
      examples: [
        { id: 'pr1', es: 'Carlos se despertó temprano. Miró por la ventana y vio que el sol iluminaba las calles de su ciudad. Estaba muy contento porque aquel día iba a visitar a sus abuelos.', arm: 'Կառլոսը վաղ արթնացավ։ Նա նայեց պատուհանից և տեսավ, որ արևը լուսավորում էր քաղաքի փողոցները։' },
      ],
      forExam: {
        es: 'La prosa suele organizarse en párrafos y no necesita rima ni una medida regular.',
        arm: 'Արձակը սովորաբար կազմվում է պարբերություններից և չի պահանջում հանգ կամ կանոնավոր չափ։',
      },
    },
  ],
  questionsTheory: [
    { id: 1, qEs: '¿Qué es el lenguaje literario?', qArm: 'Ի՞նչ է գրական լեզուն։', aEs: 'Una manera artística y estética de usar las palabras para transmitir emociones y belleza.', aArm: 'Բառերի գեղարվեստական օգտագործում՝ մտքեր և հույզեր փոխանցելու համար։' },
    { id: 2, qEs: '¿Cuál es el objetivo principal del lenguaje literario?', qArm: 'Ո՞րն է գրական լեզվի հիմնական նպատակը։', aEs: 'Crear belleza mediante las palabras y despertar emociones en el lector.', aArm: 'Ստեղծել գեղեցկություն և արթնացնել զգացմունքներ։' },
    { id: 3, qEs: '¿En qué se diferencia el lenguaje literario del lenguaje cotidiano?', qArm: 'Ինչո՞վ է գրական լեզուն տարբերվում առօրյա լեզվից։', aEs: 'El cotidiano busca informar; el literario busca crear belleza y valor estético.', aArm: 'Առօրյա լեզուն տեղեկացնում է, իսկ գրական լեզուն՝ գեղագիտական արժեք ստեղծում։' },
    { id: 4, qEs: '¿Qué son las obras literarias?', qArm: 'Ի՞նչ են գրական ստեղծագործությունները։', aEs: 'Creaciones artísticas realizadas mediante el lenguaje.', aArm: 'Լեզվի միջոցով ստեղծված արվեստի գործեր։' },
    { id: 5, qEs: '¿Qué es un verso?', qArm: 'Ի՞նչ է բանաստեղծական տողը։', aEs: 'Cada una de las líneas que forman un poema escrito en verso.', aArm: 'Բանաստեղծության առանձին տողը։' },
    { id: 6, qEs: '¿Qué es una estrofa?', qArm: 'Ի՞նչ է բանաստեղծական տունը։', aEs: 'Conjunto de versos agrupados.', aArm: 'Միասին խմբավորված տողերի ամբողջությունը։' },
    { id: 7, qEs: '¿Qué es la rima?', qArm: 'Ի՞նչ է հանգը։', aEs: 'Repetición de sonidos al final de dos o más versos a partir de la última vocal acentuada.', aArm: 'Հնչյունների կրկնությունը տողերի վերջում՝ վերջին շեշտված ձայնավորից սկսած։' },
    { id: 8, qEs: '¿Qué es la prosa?', qArm: 'Ի՞նչ է արձակը։', aEs: 'Forma de expresión organizada en oraciones y párrafos sin estructura métrica.', aArm: 'Նախադասություններով և պարբերություններով կազմված խոսքի ձև։' },
  ],
  testQuestions: [
    { id: 1, questionEs: '1. ¿Qué es el lenguaje literario?', questionArm: 'Ի՞նչ է գրական լեզուն։', options: [{ key: 'A', textEs: 'Una forma de escribir solamente noticias.' }, { key: 'B', textEs: 'Una manera artística y expresiva de utilizar el lenguaje.' }, { key: 'C', textEs: 'Un lenguaje utilizado solamente en conversaciones.' }, { key: 'D', textEs: 'Una lista de reglas ortográficas.' }], correctAnswer: 'B' },
    { id: 2, questionEs: '2. ¿Cuál es uno de los objetivos del lenguaje literario?', questionArm: 'Ո՞րն է գրական լեզվի նպատակներից մեկը։', options: [{ key: 'A', textEs: 'Evitar las emociones.' }, { key: 'B', textEs: 'Eliminar todas las descripciones.' }, { key: 'C', textEs: 'Utilizar únicamente palabras científicas.' }, { key: 'D', textEs: 'Crear belleza y transmitir emociones.' }], correctAnswer: 'D' },
    { id: 3, questionEs: '3. ¿Cuál de estas frases utiliza lenguaje literario?', questionArm: 'Ո՞ր նախադասության մեջ է օգտագործվում գրական լեզու։', options: [{ key: 'A', textEs: 'Tus ojos son dos estrellas.' }, { key: 'B', textEs: 'Tengo doce años.' }, { key: 'C', textEs: 'La clase empieza a las nueve.' }, { key: 'D', textEs: 'Mi mochila es azul.' }], correctAnswer: 'A' },
    { id: 4, questionEs: '4. ¿Qué es un verso?', questionArm: 'Ի՞նչ է բանաստեղծական տողը։', options: [{ key: 'A', textEs: 'Un párrafo de una novela.' }, { key: 'B', textEs: 'Cada línea de un poema escrito en verso.' }, { key: 'C', textEs: 'El título de un cuento.' }, { key: 'D', textEs: 'Un diálogo entre personajes.' }], correctAnswer: 'B' },
    { id: 5, questionEs: '5. ¿Qué es una estrofa?', questionArm: 'Ի՞նչ է բանաստեղծական տունը։', options: [{ key: 'A', textEs: 'El nombre del poeta.' }, { key: 'B', textEs: 'La última palabra de un poema.' }, { key: 'C', textEs: 'Una frase de una novela.' }, { key: 'D', textEs: 'Un conjunto de versos agrupados.' }], correctAnswer: 'D' },
    { id: 6, questionEs: '6. ¿Qué es la rima?', questionArm: 'Ի՞նչ է հանգը։', options: [{ key: 'A', textEs: 'La repetición de sonidos al final de varios versos.' }, { key: 'B', textEs: 'El número de personajes.' }, { key: 'C', textEs: 'La descripción de un lugar.' }, { key: 'D', textEs: 'El título de un libro.' }], correctAnswer: 'A' },
    { id: 7, questionEs: '7. ¿Qué es la prosa?', questionArm: 'Ի՞նչ է արձակը։', options: [{ key: 'A', textEs: 'Una repetición de sonidos.' }, { key: 'B', textEs: 'Una forma de escribir solo poemas con rima.' }, { key: 'C', textEs: 'Una figura literaria.' }, { key: 'D', textEs: 'Una forma de expresión organizada normalmente en oraciones y párrafos.' }], correctAnswer: 'D' },
    { id: 8, questionEs: '8. ¿Qué obras suelen escribirse en prosa?', questionArm: 'Ի՞նչ ստեղծագործություններ են սովորաբար գրվում արձակով։', options: [{ key: 'A', textEs: 'Cuentos y novelas.' }, { key: 'B', textEs: 'Solamente canciones.' }, { key: 'C', textEs: 'Solamente poemas con rima.' }, { key: 'D', textEs: 'Únicamente trabalenguas.' }], correctAnswer: 'A' },
  ],
  identifyExercises: [
    { id: 1, sentenceEs: 'El niño abrió la ventana. Miró el cielo y sonrió porque hacía un día maravilloso.', answerEs: 'Prosa', answerArm: 'Արձակ (Prosa)' },
    { id: 2, sentenceEs: 'La luna brilla en el mar, / las estrellas van a bailar.', answerEs: 'Verso', answerArm: 'Բանաստեղծական տողեր (Verso)' },
    { id: 3, sentenceEs: 'Ana vive en Madrid con su familia. Todos los días va al colegio y después juega con sus amigos.', answerEs: 'Prosa', answerArm: 'Արձակ (Prosa)' },
    { id: 4, sentenceEs: 'El viento quiere cantar, / las hojas empiezan a bailar.', answerEs: 'Verso', answerArm: 'Բանաստեղծական տողեր (Verso)' },
  ],
  trueFalseExercises: [
    { id: 1, statementEs: 'El lenguaje literario puede expresar emociones.', statementArm: 'Գրական լեզուն կարող է արտահայտել հույզեր։', isTrue: true },
    { id: 2, statementEs: 'Las obras literarias son creaciones artísticas.', statementArm: 'Գրական ստեղծագործությունները արվեստի գործեր են։', isTrue: true },
    { id: 3, statementEs: 'El lenguaje literario solo se utiliza para informar.', statementArm: 'Գրական լեզուն օգտագործվում է միայն տեղեկացնելու համար։', isTrue: false },
    { id: 4, statementEs: 'El verso es cada línea de un poema escrito en verso.', statementArm: 'Բանաստեղծական տողը պոեմի յուրաքանչյուր գիծն է։', isTrue: true },
    { id: 5, statementEs: 'Todos los poemas tienen rima.', statementArm: 'Բոլոր բանաստեղծություններն ունեն հանգ։', isTrue: false },
    { id: 6, statementEs: 'La prosa suele organizarse en párrafos.', statementArm: 'Արձակը սովորաբար կազմվում է պարբերություններից։', isTrue: true },
  ],
  readingTexts: [
    {
      id: 'rl1',
      titleEs: 'Texto 1 — Una mañana especial',
      titleArm: 'Տեքստ 1 — Հատուկ առավոտ',
      contentEs: 'Lucas se despertó temprano. El sol entraba por la ventana y los pájaros cantaban en el jardín. El niño estaba muy contento porque iba a pasar el día con sus abuelos.\n\nSu madre preparó el desayuno y Lucas se sentó a la mesa. Después de comer, salió de casa con una gran sonrisa.',
      contentArm: 'Լուկասը վաղ արթնացավ։ Արևի լույսը ներս էր թափանցում պատուհանից, իսկ թռչունները երգում էին այգում։ Տղան շատ ուրախ էր, որովհետև այդ օրը անցկացնելու էր իր տատիկի և պապիկի հետ։',
      questions: [
        { id: 1, questionEs: '¿El texto está escrito en prosa o en verso?', questionArm: 'Տեքստը գրվա՞ծ է արձակով, թե՞ բանաստեղծական տողերով։', answerEs: 'Está escrito en prosa.', answerArm: 'Գրված է արձակով (en prosa)։' },
        { id: 2, questionEs: '¿Cómo se sentía Lucas?', questionArm: 'Ինչպե՞ս էր իրեն զգում Լուկասը։', answerEs: 'Lucas estaba muy contento.', answerArm: 'Լուկասը շատ ուրախ էր։' },
      ],
    },
    {
      id: 'rl2',
      titleEs: 'Texto 2 — El cielo de primavera',
      titleArm: 'Տեքստ 2 — Գարնանային երկինք',
      contentEs: 'La primavera ha llegado,\ntodo el campo está dorado.\nLas flores quieren bailar,\ny los pájaros cantar.',
      contentArm: 'Գարունը եկել է,\nամբողջ դաշտը ոսկեգույն է։\nԾաղիկները ցանկանում են պարել,\nիսկ թռչունները՝ երգել։',
      questions: [
        { id: 1, questionEs: '¿El texto está escrito en prosa o en verso?', questionArm: 'Տեքստը գրվա՞ծ է արձակով, թե՞ չափածո։', answerEs: 'Está escrito en verso.', answerArm: 'Գրված է չափածո տողերով (en verso)։' },
        { id: 2, questionEs: '¿Qué palabras riman?', questionArm: 'Ո՞ր բառերն են հանգավորվում։', answerEs: 'Riman «llegado–dorado» y «bailar–cantar».', answerArm: 'Հանգավորվում են «llegado–dorado» և «bailar–cantar» բառերը։' },
      ],
    },
  ],
  fillBlankExercises: {
    wordsPool: ['literario', 'estética', 'emociones', 'prosa', 'verso', 'estrofa', 'rima', 'ritmo', 'párrafos', 'metáforas'],
    items: [
      { id: 1, sentenceEs: 'El lenguaje ________ utiliza las palabras de manera artística.', missingWord: 'literario' },
      { id: 2, sentenceEs: 'La finalidad ________ busca crear belleza.', missingWord: 'estética' },
      { id: 3, sentenceEs: 'La ________ organiza normalmente el texto en oraciones y párrafos.', missingWord: 'prosa' },
      { id: 4, sentenceEs: 'Cada línea de un poema escrito en verso se llama ________.', missingWord: 'verso' },
      { id: 5, sentenceEs: 'Un conjunto de versos forma una ________.', missingWord: 'estrofa' },
    ],
  },
  reviewPoints: [
    { termEs: 'Lenguaje literario', termArm: 'Գրական լեզու', defEs: 'Forma artística de utilizar las palabras para transmitir ideas y emociones.', defArm: 'Բառերի գեղարվեստական օգտագործումն է՝ մտքեր և հույզեր փոխանցելու համար։' },
    { termEs: 'Prosa', termArm: 'Արձակ', defEs: 'Forma de expresión organizada normalmente en oraciones y párrafos.', defArm: 'Արտահայտման ձև է, որը սովորաբար կազմված է նախադասություններից և պարբերություններից։' },
    { termEs: 'Verso', termArm: 'Բանաստեղծական տող', defEs: 'Cada una de las líneas de un poema escrito en verso.', defArm: 'Բանաստեղծական ձևով գրված ստեղծագործության յուրաքանչյուր տողն է։' },
    { termEs: 'Estrofa', termArm: 'Բանաստեղծական տուն', defEs: 'Conjunto de versos agrupados.', defArm: 'Միասին խմբավորված բանաստեղծական տողերի ամբողջությունն է։' },
    { termEs: 'Rima', termArm: 'Հանգ', defEs: 'Repetición de sonidos al final de dos o más versos, desde la última vocal acentuada.', defArm: 'Երկու կամ ավելի տողերի վերջում հնչյունների համընկնումն է։' },
  ],
};

export const module4Data: ModuleData = {
  id: 'cuento-culta',
  number: '4',
  titleEs: 'El Cuento y la Literatura Culta',
  titleArm: 'Պատմվածքը և Հեղինակային գրականությունը',
  subtitleEs: 'Narración breve, autoría escrita, vocabulario y gramática',
  subtitleArm: 'Կարճ պատմություն, գրավոր հեղինակություն, բառապաշար և քերականություն',
  iconName: 'BookmarkCheck',
  color: 'amber',
  introEs: 'Lengua Castellana y Literatura — 1.º de ESO (7-րդ դասարան). Այս էջում կան երկու հիմնական թեմաներ՝ El cuento և La literatura culta։ Վերևում նաև կան բառեր ու օգտակար քերականական արտահայտություններ։',
  introArm: 'Սկզբում ներկայացված է կարևոր տեսությունը իսպաներեն և հայերեն, այնուհետև՝ քննական հարցեր, վարժություններ, բառարան և ընթերցանություն։',
  theory: [
    {
      id: 'el-cuento',
      titleEs: '1. EL CUENTO',
      titleArm: '1. EL CUENTO — ՊԱՏՄՎԱԾՔ / ՀԵՔԻԱԹ',
      badge: 'Género narrativo',
      definition: {
        es: 'El cuento es una narración breve, generalmente ficticia, escrita en prosa, que suele tener pocos personajes y un argumento sencillo.',
        arm: 'Պատմվածքը կարճ պատմողական ստեղծագործություն է, որը սովորաբար հորինված է և գրված է արձակով։ Այն հիմնականում ունի քիչ հերոսներ և պարզ սյուժե։',
      },
      details: [
        { es: '1. Es breve: El cuento es normalmente más corto que una novela.', arm: '1. Կարճ է. Սովորաբար ավելի կարճ է, քան վեպը։' },
        { es: '2. Está escrito en prosa: Normalmente se organiza en oraciones y párrafos.', arm: '2. Գրված է արձակով։' },
        { es: '3. Tiene pocos personajes: Generalmente aparecen pocos personajes.', arm: '3. Քիչ հերոսներ ունի։' },
        { es: '4. Tiene un argumento sencillo: La historia suele centrarse en un conflicto principal.', arm: '4. Պարզ սյուժե ունի։' },
      ],
      examples: [
        {
          id: 'cp1',
          es: 'Ejemplo: «El perro perdido».\nUn día, Pablo encontró un perro pequeño cerca de su colegio. El animal estaba solo y parecía tener miedo.\nPablo decidió ayudarlo. Preguntó a varias personas si conocían al dueño, pero nadie lo conocía.\nFinalmente, vio un cartel con la fotografía del perro y llamó al número que aparecía allí. Poco después, el dueño llegó y recuperó a su mascota.\nPablo se sintió feliz porque había hecho algo bueno.',
          arm: 'Օրինակ. «Կորած շունը»\nՄի օր Պաբլոն իր դպրոցի մոտ գտավ փոքրիկ շուն։ Կենդանին մենակ էր և վախեցած։ Պաբլոն օգնեց և գտավ նրա տիրոջը։',
        },
      ],
      subsections: [
        {
          titleEs: 'Estructura del Cuento',
          titleArm: 'Պատմվածքի կառուցվածքը',
          contentEs: 'Planteamiento, nudo y desenlace.',
          contentArm: 'Սկիզբ, զարգացում և հանգուցալուծում։',
          items: [
            { es: '1. Planteamiento: Se presentan los personajes, el lugar y la situación inicial.', arm: '1. Սկիզբ (Planteamiento). Ներկայացվում են հերոսները, վայրը և սկզբնական իրավիճակը։' },
            { es: '2. Nudo: Aparece un problema o conflicto y se desarrollan los acontecimientos.', arm: '2. Իրադարձությունների զարգացում (Nudo). Առաջանում է խնդիր կամ հակամարտություն։' },
            { es: '3. Desenlace: Se resuelve el conflicto o termina la historia.', arm: '3. Հանգուցալուծում (Desenlace). Խնդիրը լուծվում է կամ պատմությունն ավարտվում է։' },
          ],
        },
      ],
    },
    {
      id: 'literatura-culta',
      titleEs: '2. LA LITERATURA CULTA',
      titleArm: '2. LA LITERATURA CULTA — ՀԵՂԻՆԱԿԱՅԻՆ ԳՐԱԿԱՆՈՒԹՅՈՒՆ',
      badge: 'Tradición escrita',
      definition: {
        es: 'La literatura culta es aquella que suele tener un autor conocido y cuya creación se realiza de forma elaborada y consciente. Tradicionalmente, sus obras se conservan por escrito.',
        arm: 'Հեղինակային գրականությունը այն գրականությունն է, որի հեղինակը սովորաբար հայտնի է, իսկ ստեղծագործությունը մշակված և մտածված աշխատանքի արդյունք է։',
      },
      details: [
        { es: '1. Tiene un autor conocido (ej. Don Quijote de la Mancha — Miguel de Cervantes).', arm: '1. Ունի հայտնի հեղինակ (օրինակ՝ «Դոն Կիխոտ» — Միգել դե Սերվանտես)։' },
        { es: '2. Se transmite principalmente por escrito (manuscritos, libros impresos, digital).', arm: '2. Հիմնականում փոխանցվում է գրավոր ձևով (ձեռագրեր, տպագիր գրքեր)։' },
        { es: '3. Utiliza un lenguaje elaborado.', arm: '3. Օգտագործում է մշակված լեզու և գեղարվեստական հնարքներ։' },
      ],
      examples: [
        { id: 'lc1', es: 'Don Quijote de la Mancha — Miguel de Cervantes.', arm: '«Դոն Կիխոտ» — Միգել դե Սերվանտես' },
        { id: 'lc2', es: 'Platero y yo — Juan Ramón Jiménez.', arm: '«Պլատերոն և ես» — Խուան Ռամոն Խիմենես' },
        { id: 'lc3', es: 'La casa de Bernarda Alba — Federico García Lorca.', arm: '«Բեռնարդա Ալբայի տունը» — Ֆեդերիկո Գարսիա Լորկա' },
      ],
    },
  ],
  vocabulary: [
    { id: 'v1', es: 'Recuperar', arm: 'Վերականգնել, հետ ստանալ' },
    { id: 'v2', es: 'Comprender', arm: 'Հասկանալ' },
    { id: 'v3', es: 'Haber / Hay', arm: 'Լինել / կա, կան' },
    { id: 'v4', es: 'El protagonista', arm: 'Գլխավոր հերոս' },
    { id: 'v5', es: 'Distraer', arm: 'Շեղել ուշադրությունը' },
    { id: 'v6', es: 'Un favor', arm: 'Լավություն, օգնություն' },
    { id: 'v7', es: 'El argumento', arm: 'Սյուժե' },
    { id: 'v8', es: 'El autor', arm: 'Հեղինակ' },
    { id: 'v9', es: 'El manuscrito', arm: 'Ձեռագիր' },
    { id: 'v10', es: 'La imprenta', arm: 'Տպագրական տեխնոլոգիա' },
    { id: 'v11', es: 'Difundir', arm: 'Տարածել' },
    { id: 'v12', es: 'Dar consejos', arm: 'Խորհուրդներ տալ' },
  ],
  grammarExpressions: [
    {
      id: 'ge1',
      formula: 'Espero que + subjuntivo',
      explanationEs: 'Después de «espero que» se utiliza normalmente el presente de subjuntivo cuando hablamos de algo que esperamos que ocurra.',
      explanationArm: '«Espero que» (հուսով եմ, որ)-ից հետո գործածվում է ըղձական եղանակ (subjuntivo)։',
      exampleEs: 'Espero que juguemos bien y que ganemos.',
      exampleArm: 'Հուսով եմ՝ լավ կխաղանք և կհաղթենք։',
    },
    {
      id: 'ge2',
      formula: 'Lo mejor es + infinitivo',
      explanationEs: 'Se utiliza para expresar una recomendación general con verbo en infinitivo.',
      explanationArm: 'Ընդհանուր խորհրդի համար անորոշ դերբայով (infinitivo)։',
      exampleEs: 'Lo mejor es hablar directamente con ella.',
      exampleArm: 'Ամենալավը նրա հետ անմիջապես խոսելն է։',
    },
    {
      id: 'ge3',
      formula: 'Es mejor que + subjuntivo',
      explanationEs: 'Se utiliza para dar un consejo dirigido a una persona específica.',
      explanationArm: 'Կոնկրետ անձին ուղղված խորհուրդ տալու համար (subjuntivo)։',
      exampleEs: 'Es mejor que hables con ella.',
      exampleArm: 'Ավելի լավ է, որ դու խոսես նրա հետ։',
    },
    {
      id: 'ge4',
      formula: 'Yo que tú + condicional',
      explanationEs: 'Estructura condicional para ponerse en el lugar de otra persona y aconsejarla.',
      explanationArm: '«Ես քո փոխարեն...» պայմանական եղանակ (condicional)։',
      exampleEs: 'Yo que tú, hablaría con ella.',
      exampleArm: 'Ես քո փոխարեն կխոսեի նրա հետ։',
    },
  ],
  practiceGrammar: [
    { id: 1, promptEs: 'Espero que nosotros __________ (ganar) el partido.', targetWord: 'ganemos', armMeaning: 'Հուսով եմ՝ կհաղթենք (ganemos - subjuntivo)' },
    { id: 2, promptEs: 'Es mejor que tú __________ (hablar) con ella.', targetWord: 'hables', armMeaning: 'Ավելի լավ է խոսես (hables - subjuntivo)' },
    { id: 3, promptEs: 'Lo mejor es __________ (estudiar) antes del examen.', targetWord: 'estudiar', armMeaning: 'Ամենալավը սովորելն է (estudiar - infinitivo)' },
    { id: 4, promptEs: 'Yo que tú, __________ (descansar) un poco.', targetWord: 'descansaría', armMeaning: 'Ես քո փոխարեն կհանգստանայի (descansaría - condicional)' },
  ],
  testQuestions: [
    { id: 1, questionEs: '1. ¿Qué es un cuento?', questionArm: 'Ի՞նչ է պատմվածքը։', options: [{ key: 'A', textEs: 'Un texto científico muy largo.' }, { key: 'B', textEs: 'Una narración breve, generalmente ficticia, escrita en prosa.' }, { key: 'C', textEs: 'Una lista de palabras.' }, { key: 'D', textEs: 'Un texto que siempre está escrito en verso.' }], correctAnswer: 'B' },
    { id: 2, questionEs: '2. ¿Cuáles son las partes habituales de un cuento?', questionArm: 'Որո՞նք են պատմվածքի հիմնական մասերը։', options: [{ key: 'A', textEs: 'Prólogo, título y portada.' }, { key: 'B', textEs: 'Introducción, índice y bibliografía.' }, { key: 'C', textEs: 'Verso, rima y estrofa.' }, { key: 'D', textEs: 'Planteamiento, nudo y desenlace.' }], correctAnswer: 'D' },
    { id: 3, questionEs: '3. ¿Qué es la literatura culta?', questionArm: 'Ի՞նչ է հեղինակային գրականությունը։', options: [{ key: 'A', textEs: 'Una literatura que nunca se escribe.' }, { key: 'B', textEs: 'Una literatura que solo utiliza palabras sencillas.' }, { key: 'C', textEs: 'Una literatura sin obras ni autores.' }, { key: 'D', textEs: 'Una literatura elaborada, generalmente de autor conocido.' }], correctAnswer: 'D' },
    { id: 4, questionEs: '4. ¿Quién escribió Don Quijote de la Mancha?', questionArm: 'Ո՞վ է գրել «Դոն Կիխոտը»։', options: [{ key: 'A', textEs: 'Federico García Lorca.' }, { key: 'B', textEs: 'Juan Ramón Jiménez.' }, { key: 'C', textEs: 'Pablo Neruda.' }, { key: 'D', textEs: 'Miguel de Cervantes.' }], correctAnswer: 'D' },
  ],
  readingTexts: [
    {
      id: 'rc1',
      titleEs: 'El secreto de Daniel',
      titleArm: 'Դանիելի գաղտնիքը',
      contentEs: 'Daniel era un niño de doce años que vivía en un pequeño pueblo cerca de Madrid. Le encantaba leer cuentos de aventuras y soñaba con descubrir lugares misteriosos.\n\nUna tarde, mientras paseaba por el jardín de su abuelo, encontró una caja de madera debajo de un árbol. La caja estaba cerrada y tenía una pequeña llave.\n\nDaniel abrió la caja y descubrió un mapa antiguo. En el mapa aparecía un camino que llegaba hasta una casa abandonada.\n\nAl día siguiente, Daniel decidió investigar. Caminó siguiendo las indicaciones y finalmente encontró la casa.\n\nDentro había una biblioteca llena de libros antiguos. Daniel comprendió que aquel lugar no escondía un tesoro de oro, sino algo mucho más valioso: el conocimiento.',
      contentArm: 'Դանիելը տասներկու տարեկան տղա էր, որն ապրում էր Մադրիդի մոտ գտնվող փոքրիկ գյուղում։ Նա շատ էր սիրում արկածային պատմվածքներ կարդալ։ Նա գտավ հին քարտեզ, որը տանում էր դեպի հին գրքերով լի գրադարան։ Դանիելը հասկացավ, որ իրական գանձը գիտելիքն է։',
      questions: [
        { id: 1, questionEs: '¿Cuántos años tenía Daniel?', questionArm: 'Քանի՞ տարեկան էր Դանիելը։', answerEs: 'Daniel tenía doce años.', answerArm: 'Դանիելը 12 տարեկան էր։' },
        { id: 2, questionEs: '¿Cuál era el verdadero tesoro?', questionArm: 'Ո՞րն էր իրական գանձը։', answerEs: 'El verdadero tesoro era el conocimiento.', answerArm: 'Իրական գանձը գիտելիքն էր։' },
      ],
    },
  ],
  reviewPoints: [
    { termEs: 'Cuento', termArm: 'Պատմվածք', defEs: 'Narración breve, generalmente ficticia, escrita en prosa, con pocos personajes y argumento sencillo.', defArm: 'Կարճ, հորինված, արձակ պատմություն՝ քիչ հերոսներով և պարզ սյուժեով։' },
    { termEs: 'Literatura culta', termArm: 'Հեղինակային գրականություն', defEs: 'Literatura elaborada que suele tener un autor conocido y se transmite principalmente por escrito.', defArm: 'Մշակված գրականություն, որն ունի հայտնի հեղինակ և փոխանցվում է գրավոր։' },
    { termEs: 'Partes del cuento', termArm: 'Պատմվածքի մասերը', defEs: 'Planteamiento (inicio), nudo (conflicto) y desenlace (final).', defArm: 'Սկիզբ (Planteamiento), կոնֆլիկտ (Nudo) և հանգուցալուծում (Desenlace)։' },
  ],
};

export const module5Data: ModuleData = {
  id: 'literatura-popular',
  number: '5',
  titleEs: 'La Literatura Popular',
  titleArm: 'Ժողովրդական գրականություն',
  subtitleEs: 'Romance, Leyenda, Mito y Cuento Popular',
  subtitleArm: 'Ռոմանս, Ավանդազրույց, Առասպել և Ժողովրդական հեքիաթ',
  iconName: 'Users',
  color: 'rose',
  introEs: 'Lengua Castellana y Literatura — 1.º de ESO (7-րդ դասարան). Այս թեման կարևոր է Իսպանիայի 7-րդ դասարանի քննության համար։ Աշակերտը պետք է իմանա ժողովրդական գրականության առանձնահատկությունները և տարբերակի դրա հիմնական տեսակները։',
  introArm: 'Ժողովրդական գրականությունը ժողովրդի մշակութային ավանդույթներին պատկանող գրական ստեղծագործությունների ամբողջությունն է, որոնք փոխանցվում են սերնդեսերունդ՝ հատկապես բանավոր ձևով։',
  theory: [
    {
      id: 'popular-def',
      titleEs: '1. LA LITERATURA POPULAR',
      titleArm: '1. ԺՈՂՈՎՐԴԱԿԱՆ ԳՐԱԿԱՆՈՒԹՅՈՒՆ',
      badge: 'Tradición oral',
      definition: {
        es: 'La literatura popular es el conjunto de obras literarias que pertenecen a la tradición de un pueblo y que se transmiten de generación en generación, especialmente de forma oral. Muchas de estas obras son anónimas porque no se conoce o no se recuerda quién las creó.',
        arm: 'Ժողովրդական գրականությունը ժողովրդի մշակութային ավանդույթներին պատկանող գրական ստեղծագործությունների ամբողջությունն է, որոնք փոխանցվում են սերնդեսերունդ՝ հատկապես բանավոր ձևով։',
      },
      details: [
        { es: '1. Es tradicional y suele ser anónima.', arm: '1. Ավանդական է և սովորաբար անանուն։' },
        { es: '2. Se transmite oralmente de generación en generación.', arm: '2. Փոխանցվում է բանավոր։' },
        { es: '3. Puede tener diferentes versiones.', arm: '3. Կարող է ունենալ տարբեր տարբերակներ։' },
      ],
      examples: [
        { id: 'lp1', es: 'Lenguaje coloquial: ¡Anda, ven aquí!', arm: 'Խոսակցական լեզու. Դե՛, արի այստեղ։' },
        { id: 'lp2', es: 'Repeticiones: Corre, corre, que viene el lobo.', arm: 'Կրկնություններ. Վազի՛ր, վազի՛ր, գայլը գալիս է։' },
      ],
    },
    {
      id: 'romance',
      titleEs: '2. EL ROMANCE',
      titleArm: '2. EL ROMANCE — ՌՈՄԱՆՍ',
      badge: 'Poesía popular narrativa',
      definition: {
        es: 'El romance es una composición poética de extensión variable, formada tradicionalmente por versos octosílabos, con rima asonante en los versos pares y sin rima en los impares. Suele narrar historias, acontecimientos o aventuras.',
        arm: 'Ռոմանսը պատմողական բանաստեղծական ստեղծագործություն է, որը սովորաբար կազմված է ութվանկանի (octosílabos) տողերից։ Զույգ տողերն ունեն ասոնանսային հանգ, իսկ կենտ տողերը չեն հանգավորվում։',
      },
      details: [
        { es: '1. Versos octosílabos (8 sílabas métricas).', arm: '1. Ութվանկանի տողեր (8 չափական վանկ)։' },
        { es: '2. Rima asonante en versos pares.', arm: '2. Ասոնանսային հանգ զույգ տողերում։' },
        { es: '3. Versos impares sueltos (sin rima).', arm: '3. Անհանգ կենտ տողեր։' },
      ],
      examples: [
        {
          id: 'rom1',
          es: 'Por el camino del monte, (8 -)\nva caminando un soldado, (8 a)\nmientras el viento le canta, (8 -)\nuna canción del pasado. (8 a)',
          arm: 'Լեռան ճանապարհով,\nքայլում է մի զինվոր,\nմինչ քամին նրա համար\nերգում է անցյալի երգը։',
        },
      ],
      forExam: {
        es: 'Romance = versos octosílabos + rima asonante en los versos pares + versos impares sin rima.',
        arm: 'Ռոմանս = ութվանկանի տողեր + ասոնանսային հանգ զույգ տողերում + անհանգ կենտ տողեր։',
      },
    },
    {
      id: 'leyenda',
      titleEs: '3. LA LEYENDA',
      titleArm: '3. LA LEYENDA — ԱՎԱՆԴԱԶՐՈՒՅՑ',
      badge: 'Narración mixta',
      definition: {
        es: 'La leyenda es un relato tradicional que se basa en personajes, lugares o acontecimientos reales o históricos, pero incorpora elementos fantásticos o sobrenaturales.',
        arm: 'Ավանդազրույցը ավանդական պատմություն է, որը հիմնվում է իրական կամ պատմական մարդկանց, վայրերի կամ դեպքերի վրա, սակայն ներառում է նաև երևակայական կամ գերբնական տարրեր։',
      },
      examples: [
        {
          id: 'ley1',
          es: 'La leyenda del castillo: En un antiguo castillo vivía un caballero. Se decía que en noches de luna llena se escuchaban sus pasos por los pasillos, aunque había muerto hacía siglos.',
          arm: 'Ամրոցի ավանդազրույցը. Հին ամրոցում ասպետ էր ապրում։ Ասում էին, որ լիալուսնի գիշերներին նրա քայլերն էին լսվում միջանցքներում։',
        },
      ],
    },
    {
      id: 'mito',
      titleEs: '4. EL MITO',
      titleArm: '4. EL MITO — ԱՌԱՍՊԵԼ',
      badge: 'Relato sagrado / origen',
      definition: {
        es: 'El mito es un relato tradicional que suele estar protagonizado por dioses, héroes o seres sobrenaturales y que intenta explicar el origen del mundo, de los fenómenos naturales o de aspectos de la vida humana.',
        arm: 'Առասպելը ավանդական պատմություն է, որի հերոսները աստվածներ կամ գերբնական էակներ են, և որը բացատրում է երևույթների ծագումը։',
      },
      examples: [
        {
          id: 'mit1',
          es: 'El mito de Deméter y Perséfone: Explica el origen de las estaciones del año mediante divinidades de la mitología griega.',
          arm: 'Դեմետրայի և Պերսեփոնեի առասպելը. Բացատրում է տարվա եղանակների ծագումը աստվածների միջոցով։',
        },
      ],
    },
  ],
  questionsTheory: [
    { id: 1, qEs: '¿Qué es un romance?', qArm: 'Ի՞նչ է ռոմանսը։', aEs: 'Composición poética narrativa con versos octosílabos y rima asonante en los pares.', aArm: '8-վանկանի տողերով պատմողական չափածո՝ զույգ տողերի ասոնանսային հանգով։' },
    { id: 2, qEs: '¿Qué es una leyenda?', qArm: 'Ի՞նչ է ավանդազրույցը։', aEs: 'Relato que mezcla base real o histórica con elementos fantásticos.', aArm: 'Պատմություն, որը միավորում է իրական հիմքը երևակայական տարրերի հետ։' },
    { id: 3, qEs: '¿Qué es un mito?', qArm: 'Ի՞նչ է առասպելը։', aEs: 'Relato tradicional con dioses o héroes que explica orígenes del mundo o fenómenos.', aArm: 'Ավանդական պատմություն աստվածներով, որը բացատրում է երևույթների ծագումը։' },
  ],
  testQuestions: [
    { id: 1, questionEs: '1. ¿Qué es la literatura popular?', questionArm: 'Ի՞նչ է ժողովրդական գրականությունը։', options: [{ key: 'A', textEs: 'Una literatura exclusivamente científica.' }, { key: 'B', textEs: 'Una literatura que solo se escribe en latín.' }, { key: 'C', textEs: 'Un conjunto de obras tradicionales transmitidas de generación en generación.' }, { key: 'D', textEs: 'Una literatura que solo aparece en periódicos.' }], correctAnswer: 'C' },
    { id: 2, questionEs: '2. ¿Cuántas sílabas métricas tienen normalmente los versos de un romance?', questionArm: 'Քանի՞ վանկ ունի ռոմանսի տողը։', options: [{ key: 'A', textEs: 'Cinco.' }, { key: 'B', textEs: 'Ocho.' }, { key: 'C', textEs: 'Doce.' }, { key: 'D', textEs: 'Diez.' }], correctAnswer: 'B' },
    { id: 3, questionEs: '3. ¿Qué tipo de rima presentan los versos pares de un romance tradicional?', questionArm: 'Ի՞նչ հանգ ունեն զույգ տողերը։', options: [{ key: 'A', textEs: 'Rima asonante.' }, { key: 'B', textEs: 'Ninguna rima.' }, { key: 'C', textEs: 'Siempre rima consonante.' }, { key: 'D', textEs: 'Una rima diferente en cada verso.' }], correctAnswer: 'A' },
    { id: 4, questionEs: '4. ¿Qué es una leyenda?', questionArm: 'Ի՞նչ է ավանդազրույցը։', options: [{ key: 'A', textEs: 'Una explicación matemática.' }, { key: 'B', textEs: 'Una lista de objetos.' }, { key: 'C', textEs: 'Una noticia deportiva.' }, { key: 'D', textEs: 'Un relato tradicional que combina elementos reales o históricos con elementos fantásticos.' }], correctAnswer: 'D' },
  ],
  identifyExercises: [
    { id: 1, sentenceEs: 'Un dios creó las montañas para proteger a los seres humanos.', answerEs: 'Mito', answerArm: 'Առասպել (Mito)' },
    { id: 2, sentenceEs: 'En un antiguo castillo, los habitantes aseguran que aparece un caballero misterioso todas las noches.', answerEs: 'Leyenda', answerArm: 'Ավանդազրույց (Leyenda)' },
    { id: 3, sentenceEs: 'Había una vez una niña que encontró una llave mágica y abrió una puerta secreta.', answerEs: 'Cuento popular', answerArm: 'Ժողովրդական հեքիաթ (Cuento popular)' },
    { id: 4, sentenceEs: 'Una composición narrativa formada por versos octosílabos, con rima asonante en los versos pares.', answerEs: 'Romance', answerArm: 'Ռոմանս (Romance)' },
  ],
  trueFalseExercises: [
    { id: 1, statementEs: 'La literatura popular suele transmitirse de generación en generación.', statementArm: 'Ժողովրդական գրականությունը փոխանցվում է սերնդեսերունդ։', isTrue: true },
    { id: 2, statementEs: 'Los romances tradicionales suelen tener versos octosílabos.', statementArm: 'Ռոմանսները սովորաբար ունեն 8-վանկանի տողեր։', isTrue: true },
    { id: 3, statementEs: 'Las leyendas pueden contener elementos fantásticos.', statementArm: 'Ավանդազրույցները կարող են պարունակել երևակայական տարրեր։', isTrue: true },
    { id: 4, statementEs: 'Los mitos pueden estar protagonizados por dioses.', statementArm: 'Առասպելների հերոսները կարող են աստվածներ լինել։', isTrue: true },
  ],
  readingTexts: [
    {
      id: 'rp1',
      titleEs: 'Texto 1 — La leyenda del lago misterioso',
      titleArm: 'Տեքստ 1 — Խորհրդավոր լճի ավանդազրույցը',
      contentEs: 'Hace muchos años, cerca de un pequeño pueblo, existía un lago rodeado de montañas. Los habitantes decían que, durante las noches de luna llena, una misteriosa mujer vestida de blanco aparecía junto al agua.\n\nSegún la leyenda, aquella mujer había vivido en el pueblo muchos siglos atrás. Un día desapareció sin dejar ninguna explicación.\n\nDesde entonces, algunas personas aseguraban escuchar una canción triste cerca del lago.',
      contentArm: 'Շատ տարիներ առաջ մի փոքրիկ գյուղի մոտ կար լեռներով շրջապատված լիճ։ Բնակիչներն ասում էին, որ լիալուսնի գիշերներին ջրի մոտ հայտնվում էր սպիտակ հագուստով խորհրդավոր մի կին։',
      questions: [
        { id: 1, questionEs: '¿Cuándo aparecía la mujer misteriosa?', questionArm: 'Ե՞րբ էր հայտնվում կինը։', answerEs: 'Aparecía durante las noches de luna llena.', answerArm: 'Հայտնվում էր լիալուսնի գիշերներին։' },
        { id: 2, questionEs: '¿Qué tipo de narración es?', questionArm: 'Ի՞նչ տեսակի պատմություն է։', answerEs: 'Es una leyenda.', answerArm: 'Ավանդազրույց է (leyenda)։' },
      ],
    },
  ],
  reviewPoints: [
    { termEs: 'Literatura popular', termArm: 'Ժողովրդական գրականություն', defEs: 'Obras tradicionales de un pueblo, generalmente anónimas y transmitidas de generación en generación de forma oral.', defArm: 'Ժողովրդի ավանդական ստեղծագործություններ, որոնք անանուն են և փոխանցվում են բանավոր։' },
    { termEs: 'Romance', termArm: 'Ռոմանս', defEs: 'Composición poética narrativa, normalmente de versos octosílabos, rima asonante en los pares y versos impares sueltos.', defArm: '8-վանկանի տողերով չափածո, զույգ տողերի ասոնանսային հանգով։' },
    { termEs: 'Leyenda', termArm: 'Ավանդազրույց', defEs: 'Relato tradicional que mezcla elementos reales o históricos con elementos fantásticos.', defArm: 'Պատմություն իրական հիմքով և գերբնական տարրերով։' },
    { termEs: 'Mito', termArm: 'Առասպել', defEs: 'Relato tradicional protagonizado por dioses o seres sobrenaturales que explica orígenes o fenómenos.', defArm: 'Ավանդական պատմություն աստվածներով, որը բացատրում է երևույթների ծագումը։' },
  ],
};

export const module6Data: ModuleData = {
  id: 'comunicacion-gramatica',
  number: '6',
  titleEs: 'Funciones, Modalidades y Categorías Gramaticales',
  titleArm: 'Լեզվի գործառույթներ, Նախադասության տեսակներ և Խոսքի մասեր',
  subtitleEs: 'La comunicación, las 6 funciones, tipos de oraciones y clases de palabras',
  subtitleArm: 'Հաղորդակցություն, 6 գործառույթներ, նախադասության տեսակներ և խոսքի մասեր',
  iconName: 'Layers',
  color: 'cyan',
  introEs: 'Lengua Castellana y Literatura — 1.º de ESO (7-րդ դասարան). Այս էջում աշակերտը պետք է սովորի երեք հիմնական թեմա՝ Las funciones del lenguaje, Las modalidades oracionales և Las categorías gramaticales։',
  introArm: 'Հաղորդակցության տարրերը, լեզվի 6 գործառույթները, նախադասության ձևերը ըստ խոսողի մտադրության և խոսքի փոփոխական ու անփոփոխ մասերը։',
  theory: [
    {
      id: 'comunicacion',
      titleEs: '1. LA COMUNICACIÓN',
      titleArm: '1. LA COMUNICACIÓN — ՀԱՂՈՐԴԱԿՑՈՒԹՅՈՒՆ',
      badge: 'Bases de la lengua',
      definition: {
        es: 'La comunicación es el proceso de transmitir e intercambiar información, ideas, pensamientos o sentimientos entre dos o más personas.',
        arm: 'Հաղորդակցությունը երկու կամ ավելի մարդկանց միջև տեղեկությունների, մտքերի, գաղափարների կամ զգացմունքների փոխանցման և փոխանակման գործընթացն է։',
      },
      details: [
        { es: '• Emisor: Quien transmite el mensaje (հաղորդող, խոսող)։', arm: '• Emisor — Հաղորդող, խոսող' },
        { es: '• Receptor: Quien recibe e interpreta el mensaje (ստացող, լսող)։', arm: '• Receptor — Ստացող, լսող' },
        { es: '• Mensaje: La información que se transmite (հաղորդագրություն)։', arm: '• Mensaje — Հաղորդագրություն' },
        { es: '• Código: Sistema de signos utilizado (լեզուն, օր.՝ español)։', arm: '• Código — Կոդ, նշանային համակարգ' },
        { es: '• Canal: Medio físico por el que viaja el mensaje (կապուղի)։', arm: '• Canal — Կապուղի (օդ, հեռախոս, թուղթ)' },
        { es: '• Contexto: Situación en la que se produce la comunicación (իրավիճակ)։', arm: '• Contexto — Հաղորդակցման իրավիճակ' },
      ],
      examples: [
        { id: 'com_ex', es: 'María envía a Pedro un mensaje por teléfono: «Llego a las ocho».', arm: 'Մարիան Պեդրոյին հաղորդագրություն է ուղարկում հեռախոսով՝ «Ես կհասնեմ ժամը ութին»։' },
      ],
    },
    {
      id: 'funciones',
      titleEs: '2. LAS FUNCIONES DEL LENGUAJE',
      titleArm: '2. LAS FUNCIONES DEL LENGUAJE — ԼԵԶՎԻ ԳՈՐԾԱՌՈՒՅԹՆԵՐԸ',
      badge: '6 funciones',
      definition: {
        es: 'Las funciones del lenguaje son las distintas intenciones o finalidades que tiene el hablante al comunicarse.',
        arm: 'Լեզվի գործառույթները ցույց են տալիս, թե ինչ նպատակով է խոսողը հաղորդակցվում։',
      },
      details: [
        { es: '1. Función referencial o representativa: Transmitir información objetiva. Ej: «Madrid es la capital de España».', arm: '1. Տեղեկատվական գործառույթ (Referencial). Փաստերի մասին տեղեկություն։' },
        { es: '2. Función expresiva o emotiva: Expresar sentimientos o emociones. Ej: «¡Estoy muy feliz!».', arm: '2. Զգացմունքային գործառույթ (Expresiva / Emotiva). Խոսողի հույզերը։' },
        { es: '3. Función apelativa o conativa: Influir en el receptor o dar orden. Ej: «Cierra la puerta, por favor».', arm: '3. Ազդեցության / հրամայական գործառույթ (Apelativa). Լսողի վրա ազդել։' },
        { es: '4. Función fática: Iniciar o mantener el contacto. Ej: «Hola, ¿me escuchas?».', arm: '4. Կապի հաստատման գործառույթ (Fática). Կապը ստուգել։' },
        { es: '5. Función metalingüística: Hablar del propio lenguaje. Ej: «"Casa" es un sustantivo femenino».', arm: '5. Մետալեզվական գործառույթ (Metalingüística). Բացատրել լեզուն։' },
        { es: '6. Función poética o estética: Atraer atención sobre la forma del mensaje y su belleza. Ej: «Tus ojos son estrellas».', arm: '6. Գեղարվեստական / Բանաստեղծական գործառույթ (Poética). Գեղեցկություն և արվեստ։' },
      ],
      examples: [],
    },
    {
      id: 'modalidades',
      titleEs: '3. LAS MODALIDADES ORACIONALES',
      titleArm: '3. ՆԱԽԱԴԱՍՈՒԹՅԱՆ ՏԵՍԱԿՆԵՐՆ ԸՍՏ ՄՏԱԴՐՈՒԹՅԱՆ',
      badge: 'Tipos de oración',
      definition: {
        es: 'La modalidad oracional refleja la actitud o intención del emisor ante lo que dice.',
        arm: 'Նախադասության տեսակն ըստ խոսողի մտադրության։',
      },
      details: [
        { es: '1. Enunciativas (afirmativas / negativas): «Hoy hace frío» / «No tengo hambre».', arm: '1. Պատմողական (Enunciativas)։' },
        { es: '2. Interrogativas: «¿Qué hora es?».', arm: '2. Հարցական (Interrogativas)։' },
        { es: '3. Exclamativas: «¡Qué sorpresa!».', arm: '3. Բացականչական (Exclamativas)։' },
        { es: '4. Exhortativas o imperativas: «Haz los deberes».', arm: '4. Հրամայական (Imperativas)։' },
        { es: '5. Desiderativas: «¡Ojalá apruebe el examen!».', arm: '5. Ըղձական (Desiderativas)։' },
        { es: '6. Dubitativas: «Tal vez llueva».', arm: '6. Կասկածական (Dubitativas)։' },
      ],
      examples: [],
    },
    {
      id: 'categorias',
      titleEs: '4. LAS CATEGORÍAS GRAMATICALES',
      titleArm: '4. ԽՈՍՔԻ ՄԱՍԵՐԸ',
      badge: '9 clases de palabras',
      definition: {
        es: 'Las palabras se clasifican en variables (sustantivo, adjetivo, determinante, pronombre, verbo) e invariables (adverbio, preposición, conjunción, interjección).',
        arm: 'Բառերը բաժանվում են փոփոխական և անփոփոխ խոսքի մասերի։',
      },
      details: [
        { es: 'Variables: Sustantivo, Adjetivo, Determinante, Pronombre, Verbo.', arm: 'Փոփոխական. Գոյական, Ածական, Որոշիչ, Դերանուն, Բայ։' },
        { es: 'Invariables: Adverbio, Preposición, Conjunción, Interjección.', arm: 'Անփոփոխ. Մակբայ, Նախդիր/Կապ, Շաղկապ, Ձայնարկություն։' },
      ],
      examples: [],
    },
  ],
  testQuestions: [
    { id: 1, questionEs: '1. ¿Quién transmite el mensaje en un acto de comunicación?', questionArm: 'Ո՞վ է հաղորդում հաղորդագրությունը։', options: [{ key: 'A', textEs: 'El receptor' }, { key: 'B', textEs: 'El canal' }, { key: 'C', textEs: 'El emisor' }, { key: 'D', textEs: 'El contexto' }], correctAnswer: 'C' },
    { id: 2, questionEs: '2. ¿Qué función del lenguaje se centra en transmitir datos objetivos?', questionArm: 'Ո՞ր գործառույթն է կենտրոնացած օբյեկտիվ տվյալների վրա։', options: [{ key: 'A', textEs: 'Expresiva' }, { key: 'B', textEs: 'Referencial o representativa' }, { key: 'C', textEs: 'Fática' }, { key: 'D', textEs: 'Poética' }], correctAnswer: 'B' },
    { id: 3, questionEs: '3. En «¡Ojalá haga sol mañana!», ¿qué modalidad oracional aparece?', questionArm: 'Ի՞նչ նախադասության տեսակ է «¡Ojalá haga sol mañana!»։', options: [{ key: 'A', textEs: 'Desiderativa' }, { key: 'B', textEs: 'Dubitativa' }, { key: 'C', textEs: 'Interrogativa' }, { key: 'D', textEs: 'Enunciativa' }], correctAnswer: 'A' },
    { id: 4, questionEs: '4. ¿Cuál de estas palabras es una preposición?', questionArm: 'Այս բառերից ո՞րն է նախդիր (preposición)։', options: [{ key: 'A', textEs: 'Rápido' }, { key: 'B', textEs: 'Desde' }, { key: 'C', textEs: 'Pero' }, { key: 'D', textEs: 'Nosotros' }], correctAnswer: 'B' },
  ],
  reviewPoints: [
    { termEs: '6 Elementos de la comunicación', termArm: 'Հաղորդակցության 6 տարրերը', defEs: 'Emisor, receptor, mensaje, código, canal y contexto.', defArm: 'Հաղորդող, ստացող, հաղորդագրություն, կոդ, կապուղի և համատեքստ։' },
    { termEs: 'Funciones del lenguaje', termArm: 'Լեզվի գործառույթները', defEs: 'Referencial, Expresiva, Apelativa, Fática, Metalingüística, Poética.', defArm: 'Տեղեկատվական, զգացմունքային, ազդեցության, կապի հաստատման, մետալեզվական, գեղարվեստական։' },
  ],
};

export const allModules: ModuleData[] = [
  module1Data,
  module2Data,
  module3Data,
  module4Data,
  module5Data,
  module6Data,
];

/* ==========================================================================
   4. COMPONENTS (INLINE & SELF-CONTAINED)
   ========================================================================== */

interface BilingualCardProps {
  esText: string;
  armText?: string;
  titleEs?: string;
  titleArm?: string;
  badge?: string;
  noteEs?: string;
  noteArm?: string;
  globalMode?: 'click' | 'show_all' | 'hide_all';
  className?: string;
  variant?: 'card' | 'inline';
}

export const BilingualCard: React.FC<BilingualCardProps> = ({
  esText,
  armText,
  titleEs,
  titleArm,
  badge,
  noteEs,
  noteArm,
  globalMode = 'click',
  className = '',
  variant = 'card',
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(globalMode === 'show_all');

  useEffect(() => {
    if (globalMode === 'show_all') setIsOpen(true);
    else if (globalMode === 'hide_all') setIsOpen(false);
  }, [globalMode]);

  const toggle = () => {
    if (armText) setIsOpen(prev => !prev);
  };

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    speakSpanish(esText);
  };

  if (variant === 'inline') {
    return (
      <div
        onClick={toggle}
        className={`group cursor-pointer transition-all duration-200 rounded-xl p-3.5 my-2 border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/40 ${
          isOpen ? 'bg-amber-50/60 border-amber-300 shadow-xs' : 'bg-white'
        } ${className}`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 group-hover:text-indigo-950 text-base md:text-lg lg:text-xl leading-relaxed">
                {esText}
              </span>
              <button
                type="button"
                onClick={handleSpeak}
                title="Լսել իսպաներեն արտասանությունը"
                className="p-1.5 rounded-full text-slate-400 hover:text-indigo-600 hover:bg-indigo-100 transition-colors shrink-0"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            {armText && !isOpen && (
              <span className="text-xs text-indigo-600 font-semibold inline-flex items-center gap-1 mt-1 font-armenian">
                <span>👆 Սեղմեք հայերեն թարգմանության համար</span>
              </span>
            )}
          </div>
          {armText && (
            <div className="text-slate-400 pt-0.5">
              {isOpen ? <ChevronUp className="w-5 h-5 text-amber-700" /> : <ChevronDown className="w-5 h-5" />}
            </div>
          )}
        </div>

        {isOpen && armText && (
          <div className="mt-3 pt-3 border-t border-amber-200/80 animate-fadeIn">
            <div className="flex items-start gap-2">
              <span className="inline-block px-2 py-0.5 text-xs font-black tracking-wider uppercase bg-amber-200 text-amber-900 rounded shrink-0 mt-0.5">
                ARM
              </span>
              <p className="text-slate-800 text-base md:text-lg font-medium leading-relaxed font-armenian">
                {armText}
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      onClick={toggle}
      className={`group relative transition-all duration-200 rounded-2xl border cursor-pointer select-text ${
        isOpen
          ? 'bg-gradient-to-br from-white via-amber-50/40 to-amber-50/70 border-amber-300 shadow-sm'
          : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-md'
      } p-5 md:p-6 ${className}`}
    >
      {(titleEs || badge) && (
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2.5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            {badge && (
              <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-indigo-100 text-indigo-800">
                {badge}
              </span>
            )}
            {titleEs && (
              <h4 className="font-extrabold text-slate-900 text-lg md:text-xl">
                {titleEs}
              </h4>
            )}
          </div>
          {titleArm && isOpen && (
            <span className="text-xs md:text-sm font-semibold text-amber-900 font-armenian bg-amber-100 px-2.5 py-1 rounded">
              {titleArm}
            </span>
          )}
        </div>
      )}

      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-start gap-2.5">
            <p className="text-slate-950 font-bold text-lg md:text-xl lg:text-[22px] leading-relaxed tracking-tight">
              {esText}
            </p>
            <button
              type="button"
              onClick={handleSpeak}
              title="Լսել իսպաներեն արտասանությունը"
              className="mt-1 p-2 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors shrink-0"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>

          {noteEs && <p className="mt-1.5 text-sm text-slate-500 italic">{noteEs}</p>}

          {armText && !isOpen && (
            <div className="mt-3 flex items-center gap-1.5 text-xs md:text-sm text-indigo-600 font-semibold font-armenian">
              <Languages className="w-4 h-4" />
              <span>👆 Սեղմիր իսպաներենի վրա՝ հայերեն թարգմանությունը բացելու համար</span>
            </div>
          )}
        </div>

        {armText && (
          <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 group-hover:bg-indigo-100 text-slate-500 group-hover:text-indigo-600 transition-colors">
            {isOpen ? <ChevronUp className="w-5 h-5 text-amber-700" /> : <ChevronDown className="w-5 h-5" />}
          </div>
        )}
      </div>

      {isOpen && armText && (
        <div className="mt-4 pt-3.5 border-t border-amber-200/80 animate-fadeIn">
          <div className="flex items-start gap-2.5 bg-amber-500/10 p-4 rounded-xl border border-amber-200/60">
            <span className="px-2.5 py-1 text-xs font-black tracking-wider uppercase bg-amber-500 text-white rounded shrink-0 mt-0.5">
              ՀԱՅԵՐԵՆ
            </span>
            <div className="flex-1">
              <p className="text-slate-900 text-base md:text-lg lg:text-xl font-medium leading-relaxed font-armenian">
                {armText}
              </p>
              {noteArm && <p className="mt-1.5 text-sm text-amber-900 font-armenian italic">{noteArm}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const TheorySectionView: React.FC<{ sections: TheorySection[]; globalMode: 'click' | 'show_all' | 'hide_all' }> = ({
  sections,
  globalMode,
}) => {
  return (
    <div className="space-y-8">
      {sections.map(sec => (
        <article key={sec.id} className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 md:p-7">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 mb-1">
                {sec.badge && (
                  <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                    {sec.badge}
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => speakSpanish(sec.titleEs)}
                  className="p-1 rounded-md text-slate-400 hover:text-indigo-600 hover:bg-slate-100 transition-colors"
                  title="Արտասանել վերնագիրը"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
              <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">{sec.titleEs}</h3>
              <p className="text-sm md:text-base font-semibold text-indigo-600 font-armenian mt-0.5">{sec.titleArm}</p>
            </div>
          </div>

          <div className="mb-6">
            <div className="text-xs font-bold tracking-wider uppercase text-slate-500 mb-1.5 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
              <span>Definición y Explicación / Սահմանում և Բացատրություն</span>
            </div>
            <BilingualCard esText={sec.definition.es} armText={sec.definition.arm} globalMode={globalMode} className="bg-slate-50/60" />
          </div>

          {sec.details && sec.details.length > 0 && (
            <div className="mb-6 space-y-2">
              <div className="text-xs font-bold tracking-wider uppercase text-slate-500 mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Características / Հատկանիշներ</span>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {sec.details.map((detail, idx) => (
                  <BilingualCard key={idx} esText={detail.es} armText={detail.arm} globalMode={globalMode} variant="inline" />
                ))}
              </div>
            </div>
          )}

          {sec.examples && sec.examples.length > 0 && (
            <div className="mb-6">
              <div className="text-xs font-bold tracking-wider uppercase text-slate-500 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                <span>Ejemplos — Օրինակներ</span>
              </div>
              <div className="space-y-2.5">
                {sec.examples.map((ex, index) => (
                  <BilingualCard
                    key={ex.id || index}
                    esText={ex.es}
                    armText={ex.arm}
                    noteEs={ex.explanation?.es}
                    noteArm={ex.explanation?.arm}
                    globalMode={globalMode}
                  />
                ))}
              </div>
            </div>
          )}

          {sec.forExam && (
            <div className="mb-4">
              <div className="flex items-center gap-2 p-3.5 bg-amber-500/10 border border-amber-300 rounded-xl">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                <div className="flex-1">
                  <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block mb-1">
                    Para el examen — Քննության համար
                  </span>
                  <BilingualCard esText={sec.forExam.es} armText={sec.forExam.arm} globalMode={globalMode} variant="inline" className="bg-white/80 border-amber-200" />
                </div>
              </div>
            </div>
          )}

          {sec.difference && (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="flex items-center gap-2 mb-2 font-bold text-slate-800 text-sm md:text-base">
                <ArrowRightLeft className="w-4 h-4 text-indigo-600" />
                <span>{sec.difference.title.es}</span>
                <span className="text-xs text-indigo-600 font-armenian font-medium">({sec.difference.title.arm})</span>
              </div>
              <div className="space-y-2">
                {sec.difference.items.map((item, dIdx) => (
                  <BilingualCard key={dIdx} esText={item.es} armText={item.arm} globalMode={globalMode} variant="inline" />
                ))}
              </div>
              {sec.difference.explanation && (
                <div className="mt-3 text-xs md:text-sm text-slate-600 font-armenian p-2.5 bg-white rounded-lg border border-slate-200/80">
                  {sec.difference.explanation.arm}
                </div>
              )}
            </div>
          )}
        </article>
      ))}
    </div>
  );
};

export const InteractiveTestView: React.FC<{ questions: TestQuestion[]; globalMode: 'click' | 'show_all' | 'hide_all' }> = ({
  questions,
  globalMode,
}) => {
  const [userAnswers, setUserAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [revealedArmenian, setRevealedArmenian] = useState<Record<number, boolean>>({});
  const [filterWrong, setFilterWrong] = useState(false);

  const toggleArmenian = (qId: number) => {
    setRevealedArmenian(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  const handleSelect = (qId: number, key: 'A' | 'B' | 'C' | 'D') => {
    setUserAnswers(prev => ({ ...prev, [qId]: key }));
  };

  const handleReset = () => {
    setUserAnswers({});
    setRevealedArmenian({});
    setFilterWrong(false);
  };

  const totalAnswered = Object.keys(userAnswers).length;
  const correctCount = questions.filter(q => userAnswers[q.id] === q.correctAnswer).length;
  const scorePercentage = Math.round((correctCount / questions.length) * 100);

  const displayedQuestions = filterWrong
    ? questions.filter(q => userAnswers[q.id] && userAnswers[q.id] !== q.correctAnswer)
    : questions;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-indigo-800 text-white p-5 md:p-6 rounded-2xl shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Award className="w-5 h-5 text-amber-300" />
              <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-indigo-200">
                Քննական թեստ — Examen Tipo Test (1.º ESO)
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-black">
              Արդյունք՝ {correctCount} / {questions.length} ({totalAnswered > 0 ? `${scorePercentage}%` : '0%'})
            </h3>
            <p className="text-indigo-200 text-xs md:text-sm mt-0.5 font-armenian">
              Պատասխանված է {totalAnswered} հարց {questions.length}-ից։ Սեղմեք իսպաներեն հարցի վրա՝ հայերեն թարգմանությունը տեսնելու համար։
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            {totalAnswered > 0 && (
              <button
                type="button"
                onClick={() => setFilterWrong(prev => !prev)}
                className={`px-3 py-2 rounded-xl text-xs md:text-sm font-semibold transition-colors ${
                  filterWrong ? 'bg-amber-400 text-amber-950 font-bold' : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                {filterWrong ? 'Ցույց տալ բոլորը' : 'Ցույց տալ սխալները'}
              </button>
            )}
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs md:text-sm font-semibold transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Վերսկսել</span>
            </button>
          </div>
        </div>

        <div className="w-full bg-indigo-900/40 rounded-full h-2.5 mt-4 overflow-hidden">
          <div
            className="bg-emerald-400 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${(totalAnswered / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="space-y-5">
        {displayedQuestions.map(q => {
          const selected = userAnswers[q.id];
          const isAnswered = selected !== undefined;
          const isCorrect = selected === q.correctAnswer;
          const showArm = globalMode === 'show_all' || revealedArmenian[q.id];

          return (
            <div
              key={q.id}
              className={`bg-white rounded-2xl border transition-all p-5 md:p-6 shadow-sm ${
                isAnswered
                  ? isCorrect
                    ? 'border-emerald-300 bg-emerald-50/20'
                    : 'border-rose-300 bg-rose-50/20'
                  : 'border-slate-200 hover:border-indigo-200'
              }`}
            >
              <div onClick={() => toggleArmenian(q.id)} className="cursor-pointer group flex items-start justify-between gap-3 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-slate-950 group-hover:text-indigo-950 text-lg md:text-xl lg:text-[22px] leading-snug">
                      {q.questionEs}
                    </span>
                    <button
                      type="button"
                      onClick={e => {
                        e.stopPropagation();
                        speakSpanish(q.questionEs);
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-slate-100 shrink-0"
                      title="Լսել իսպաներեն"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>

                  {q.questionArm && (
                    <div className="mt-2">
                      {showArm ? (
                        <p className="text-amber-950 font-semibold text-base md:text-lg font-armenian bg-amber-50/90 p-3 rounded-xl border border-amber-200 animate-fadeIn">
                          {q.questionArm}
                        </p>
                      ) : (
                        <span className="text-xs md:text-sm text-indigo-600 font-semibold inline-flex items-center gap-1 mt-1 font-armenian">
                          <span>👆 Սեղմիր հարցի վրա՝ հայերեն թարգմանության համար</span>
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="shrink-0 pt-1">
                  <span className="text-xs md:text-sm font-extrabold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                    #{q.id}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {q.options.map(opt => {
                  const isOptSelected = selected === opt.key;
                  const isOptCorrect = q.correctAnswer === opt.key;

                  let optClass = 'bg-slate-50/70 border-slate-200 hover:bg-indigo-50/60 hover:border-indigo-300 text-slate-900';
                  if (isAnswered) {
                    if (isOptCorrect) optClass = 'bg-emerald-100/90 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-400/30';
                    else if (isOptSelected && !isCorrect) optClass = 'bg-rose-100/90 border-rose-400 text-rose-950';
                    else optClass = 'bg-slate-50 border-slate-200 opacity-60 text-slate-600';
                  } else if (isOptSelected) {
                    optClass = 'bg-indigo-100 border-indigo-400 text-indigo-950 font-bold';
                  }

                  return (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => handleSelect(q.id, opt.key)}
                      className={`flex items-start gap-3.5 p-4 rounded-xl border text-left transition-all ${optClass}`}
                    >
                      <span
                        className={`w-7 h-7 shrink-0 rounded-full flex items-center justify-center text-xs md:text-sm font-black ${
                          isAnswered && isOptCorrect
                            ? 'bg-emerald-600 text-white'
                            : isAnswered && isOptSelected && !isCorrect
                            ? 'bg-rose-600 text-white'
                            : 'bg-white text-slate-800 border border-slate-300'
                        }`}
                      >
                        {opt.key}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-base md:text-lg leading-snug font-semibold">{opt.textEs}</span>
                          <span
                            onClick={e => {
                              e.stopPropagation();
                              speakSpanish(opt.textEs);
                            }}
                            className="cursor-pointer text-slate-400 hover:text-indigo-600 p-0.5"
                            title="Արտասանել"
                          >
                            <Volume2 className="w-4 h-4" />
                          </span>
                        </div>
                        {opt.textArm && showArm && (
                          <span className="text-sm md:text-base text-slate-700 font-armenian font-medium block mt-1">
                            {opt.textArm}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {isAnswered && (
                <div
                  className={`mt-4 p-3.5 rounded-xl flex items-start gap-3 border ${
                    isCorrect ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-rose-50 border-rose-200 text-rose-900'
                  }`}
                >
                  {isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1 text-sm">
                    <p className="font-bold">{isCorrect ? '¡Correcto! Ճիշտ է։' : `Incorrecto. Ճիշտ պատասխանը՝ ${q.correctAnswer}`}</p>
                    {q.explanationEs && <p className="mt-1 text-xs md:text-sm text-slate-700">{q.explanationEs}</p>}
                    {q.explanationArm && <p className="mt-0.5 text-xs md:text-sm font-armenian text-slate-600">{q.explanationArm}</p>}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const IdentifyView: React.FC<{ exercises: IdentifyExercise[]; globalMode: 'click' | 'show_all' | 'hide_all' }> = ({
  exercises,
  globalMode,
}) => {
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const [revealedArmenian, setRevealedArmenian] = useState<Record<number, boolean>>({});

  const toggleAnswer = (id: number) => setRevealed(prev => ({ ...prev, [id]: !prev[id] }));
  const toggleArmenian = (id: number) => setRevealedArmenian(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-3.5">
        {exercises.map(ex => {
          const isAnswerOpen = revealed[ex.id];
          const isArmOpen = globalMode === 'show_all' || revealedArmenian[ex.id];

          return (
            <div key={ex.id} className="bg-white rounded-xl border border-slate-200 hover:border-indigo-300 p-4 transition-all shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div onClick={() => toggleArmenian(ex.id)} className="cursor-pointer group flex items-start gap-2">
                    <span className="font-extrabold text-indigo-600 text-base md:text-lg">#{ex.id}.</span>
                    <div className="flex-1">
                      <p className="font-bold text-slate-950 text-lg md:text-xl lg:text-[22px] group-hover:text-indigo-950 leading-snug">
                        «{ex.sentenceEs}»
                      </p>
                      {ex.sentenceArm && (
                        <div className="mt-2">
                          {isArmOpen ? (
                            <p className="text-sm md:text-base text-slate-700 font-armenian bg-amber-50/80 p-3 rounded-xl border border-amber-200/60 font-medium leading-relaxed">
                              {ex.sentenceArm}
                            </p>
                          ) : (
                            <span className="text-xs md:text-sm text-indigo-600 font-semibold inline-block font-armenian">
                              👆 Սեղմիր իսպաներենի վրա՝ հայերեն թարգմանության համար
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => speakSpanish(ex.sentenceEs)}
                    title="Լսել իսպաներեն"
                    className="p-2 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-indigo-50"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleAnswer(ex.id)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs md:text-sm font-bold transition-colors ${
                      isAnswerOpen ? 'bg-emerald-600 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    }`}
                  >
                    {isAnswerOpen ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    <span>{isAnswerOpen ? 'Թաքցնել' : 'Պատասխան'}</span>
                  </button>
                </div>
              </div>

              {isAnswerOpen && (
                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between bg-emerald-50 p-3.5 rounded-xl border border-emerald-200 animate-fadeIn">
                  <div className="flex items-center gap-2.5">
                    <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 mr-2">Պատասխան՝</span>
                      <strong className="text-emerald-950 font-black text-base md:text-lg">{ex.answerEs}</strong>
                      <span className="text-emerald-800 text-sm md:text-base font-armenian ml-2 font-medium">({ex.answerArm})</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const TrueFalseView: React.FC<{ exercises: TrueFalseExercise[]; globalMode: 'click' | 'show_all' | 'hide_all' }> = ({
  exercises,
  globalMode,
}) => {
  const [userAnswers, setUserAnswers] = useState<Record<number, boolean>>({});
  const [revealedArmenian, setRevealedArmenian] = useState<Record<number, boolean>>({});

  const handleChoose = (id: number, val: boolean) => setUserAnswers(prev => ({ ...prev, [id]: val }));
  const toggleArmenian = (id: number) => setRevealedArmenian(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="space-y-3">
      {exercises.map(ex => {
        const selected = userAnswers[ex.id];
        const isAnswered = selected !== undefined;
        const isCorrect = selected === ex.isTrue;
        const showArm = globalMode === 'show_all' || revealedArmenian[ex.id];

        return (
          <div
            key={ex.id}
            className={`bg-white rounded-xl border p-4 transition-all shadow-sm ${
              isAnswered ? (isCorrect ? 'border-emerald-300 bg-emerald-50/20' : 'border-rose-300 bg-rose-50/20') : 'border-slate-200'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex-1">
                <div onClick={() => toggleArmenian(ex.id)} className="cursor-pointer group flex items-start gap-2">
                  <span className="font-extrabold text-indigo-600 text-base md:text-lg">#{ex.id}.</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-950 group-hover:text-indigo-950 text-base md:text-lg lg:text-xl leading-relaxed">
                        {ex.statementEs}
                      </span>
                      <button
                        type="button"
                        onClick={e => {
                          e.stopPropagation();
                          speakSpanish(ex.statementEs);
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 shrink-0"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    {showArm ? (
                      <p className="mt-2 text-sm md:text-base text-slate-700 font-armenian bg-amber-50 p-2.5 rounded-xl border border-amber-200/60 font-medium leading-relaxed">
                        {ex.statementArm}
                      </p>
                    ) : (
                      <span className="text-xs text-indigo-600 font-semibold inline-block mt-1 font-armenian">
                        👆 Սեղմիր իսպաներենի վրա՝ հայերեն թարգմանության համար
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-center">
                <button
                  type="button"
                  onClick={() => handleChoose(ex.id, true)}
                  className={`px-3.5 py-2 rounded-xl text-xs md:text-sm font-bold transition-all ${
                    selected === true
                      ? ex.isTrue
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-rose-600 text-white shadow-sm'
                      : isAnswered && ex.isTrue
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-400'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                  }`}
                >
                  Verdadero (Ճիշտ)
                </button>
                <button
                  type="button"
                  onClick={() => handleChoose(ex.id, false)}
                  className={`px-3.5 py-2 rounded-xl text-xs md:text-sm font-bold transition-all ${
                    selected === false
                      ? !ex.isTrue
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-rose-600 text-white shadow-sm'
                      : isAnswered && !ex.isTrue
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-400'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                  }`}
                >
                  Falso (Սխալ)
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const ReadingView: React.FC<{ texts: ReadingText[]; globalMode: 'click' | 'show_all' | 'hide_all' }> = ({ texts, globalMode }) => {
  const [revealedArmText, setRevealedArmText] = useState<Record<string, boolean>>({});
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});

  return (
    <div className="space-y-8">
      {texts.map(txt => {
        const showArmText = globalMode === 'show_all' || revealedArmText[txt.id];

        return (
          <article key={txt.id} className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 md:p-7">
            <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-5 h-5 text-indigo-600" />
                <div>
                  <h3 className="font-extrabold text-slate-900 text-lg md:text-xl">{txt.titleEs}</h3>
                  <p className="text-xs md:text-sm font-semibold text-indigo-600 font-armenian">{txt.titleArm}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => speakSpanish(txt.contentEs)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition-colors"
              >
                <Volume2 className="w-4 h-4" />
                <span>Լսել տեքստը</span>
              </button>
            </div>

            <div
              onClick={() => setRevealedArmText(prev => ({ ...prev, [txt.id]: !prev[txt.id] }))}
              className="cursor-pointer bg-slate-50/70 hover:bg-amber-50/40 p-4 md:p-5 rounded-xl border border-slate-200/80 transition-all mb-6"
            >
              <div className="space-y-2">
                {txt.contentEs.split('\n\n').map((paragraph, pIdx) => (
                  <p key={pIdx} className="text-slate-900 text-lg md:text-xl leading-relaxed font-serif">
                    {paragraph}
                  </p>
                ))}
              </div>

              {showArmText ? (
                <div className="mt-4 pt-4 border-t border-amber-200/70 animate-fadeIn">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-200 px-2 py-0.5 rounded inline-block mb-2 font-armenian">
                    Հայերեն թարգմանություն
                  </span>
                  <div className="space-y-2">
                    {txt.contentArm.split('\n\n').map((pArm, pIdx) => (
                      <p key={pIdx} className="text-slate-800 text-base md:text-lg leading-relaxed font-armenian font-medium">
                        {pArm}
                      </p>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mt-3 flex items-center gap-1.5 text-xs md:text-sm text-indigo-600 font-semibold font-armenian">
                  <Languages className="w-4 h-4" />
                  <span>👆 Սեղմիր տեքստի վրա՝ հայերեն թարգմանությունը կարդալու համար</span>
                </div>
              )}
            </div>

            <div className="space-y-3">
              {txt.questions.map(q => {
                const qKey = `${txt.id}_${q.id}`;
                const isOpen = revealedAnswers[qKey];

                return (
                  <div key={q.id} className="bg-white rounded-xl border border-slate-200 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <span className="font-bold text-slate-950 text-base md:text-lg block">{q.questionEs}</span>
                        <p className="text-xs md:text-sm text-slate-500 font-armenian mt-0.5 font-medium">{q.questionArm}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setRevealedAnswers(prev => ({ ...prev, [qKey]: !prev[qKey] }))}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-colors ${
                          isOpen ? 'bg-emerald-600 text-white' : 'bg-indigo-50 text-indigo-700'
                        }`}
                      >
                        {isOpen ? 'Թաքցնել' : 'Պատասխան'}
                      </button>
                    </div>
                    {isOpen && (
                      <div className="mt-3 pt-3 border-t border-slate-100 bg-emerald-50/60 p-3 rounded-lg border border-emerald-200 animate-fadeIn text-sm">
                        <p className="font-bold text-emerald-950">{q.answerEs}</p>
                        <p className="text-xs text-emerald-900 font-armenian mt-1 font-medium">{q.answerArm}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </article>
        );
      })}
    </div>
  );
};

export const FlashcardsView: React.FC<{ cards: ExamReviewPoint[] }> = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [deck, setDeck] = useState<ExamReviewPoint[]>(cards);

  const current = deck[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev + 1) % deck.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev - 1 + deck.length) % deck.length);
  };

  if (!current) return null;

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="flex items-center justify-between text-sm">
        <span className="font-extrabold text-slate-700 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs">
          Քարտ {currentIndex + 1} / {deck.length}
        </span>
        <button
          type="button"
          onClick={() => {
            setIsFlipped(false);
            setDeck([...deck].sort(() => Math.random() - 0.5));
            setCurrentIndex(0);
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs"
        >
          <Shuffle className="w-3.5 h-3.5" />
          <span>Խառնել (Aleatorio)</span>
        </button>
      </div>

      <div onClick={() => setIsFlipped(prev => !prev)} className="cursor-pointer min-h-[300px]">
        <div
          className={`w-full min-h-[300px] rounded-3xl p-7 md:p-9 shadow-md border flex flex-col justify-between transition-all ${
            isFlipped ? 'bg-amber-50/90 border-amber-300' : 'bg-gradient-to-br from-indigo-600 to-indigo-900 text-white'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className={`text-xs font-black uppercase tracking-widest px-2.5 py-1 rounded-md ${isFlipped ? 'bg-amber-200 text-amber-900' : 'bg-white/20 text-white'}`}>
              {isFlipped ? 'ՍԱՀՄԱՆՈՒՄ' : 'ՏԵՐՄԻՆ (ՍԵՂՄԻՐ)'}
            </span>
            <button
              type="button"
              onClick={e => {
                e.stopPropagation();
                speakSpanish(current.termEs);
              }}
              className="p-2 text-white/70 hover:text-white"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>

          <div className="my-auto py-4 text-center">
            {!isFlipped ? (
              <div className="space-y-3">
                <h3 className="text-3xl md:text-4xl font-black">{current.termEs}</h3>
                <p className="text-indigo-200 text-base md:text-lg font-armenian font-semibold">{current.termArm}</p>
              </div>
            ) : (
              <div className="space-y-4 text-left">
                <p className="text-slate-900 text-lg md:text-xl font-bold leading-relaxed">{current.defEs}</p>
                <p className="text-slate-700 text-base md:text-lg font-medium font-armenian leading-relaxed border-t border-amber-200 pt-2">
                  {current.defArm}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={handlePrev}
          className="flex-1 py-3 px-4 rounded-xl bg-white border border-slate-200 text-slate-800 font-bold text-sm shadow-xs flex items-center justify-center gap-2"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Նախորդը</span>
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="flex-1 py-3 px-4 rounded-xl bg-indigo-600 text-white font-bold text-sm shadow-xs flex items-center justify-center gap-2"
        >
          <span>Հաջորդը</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

/* ==========================================================================
   5. MAIN APP COMPONENT
   ========================================================================== */
export default function App() {
  const [activeModuleId, setActiveModuleId] = useState<string>('figuras-1');
  const [activeSubTab, setActiveSubTab] = useState<string>('teoria');
  const [globalMode, setGlobalMode] = useState<'click' | 'show_all' | 'hide_all'>('click');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [fontScale, setFontScale] = useState<'normal' | 'large' | 'xlarge'>('large');

  useEffect(() => {
    document.documentElement.classList.remove('text-scale-normal', 'text-scale-large', 'text-scale-xlarge');
    document.documentElement.classList.add(`text-scale-${fontScale}`);
  }, [fontScale]);

  const activeModule = useMemo(() => {
    return allModules.find(m => m.id === activeModuleId) || allModules[0];
  }, [activeModuleId]);

  const getModuleIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className="w-4 h-4" />;
      case 'Feather': return <Feather className="w-4 h-4" />;
      case 'BookOpen': return <BookOpen className="w-4 h-4" />;
      case 'BookmarkCheck': return <BookmarkCheck className="w-4 h-4" />;
      case 'Users': return <Users className="w-4 h-4" />;
      case 'Layers': return <Layers className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const searchResults = useMemo(() => {
    if (!searchQuery.trim() || searchQuery.trim().length < 2) return [];
    const query = searchQuery.toLowerCase().trim();
    const results: { moduleId: string; moduleTitle: string; type: string; es: string; arm: string }[] = [];

    allModules.forEach(mod => {
      mod.theory.forEach(t => {
        if (
          t.titleEs.toLowerCase().includes(query) ||
          t.titleArm.toLowerCase().includes(query) ||
          t.definition.es.toLowerCase().includes(query) ||
          t.definition.arm.toLowerCase().includes(query)
        ) {
          results.push({
            moduleId: mod.id,
            moduleTitle: mod.titleEs,
            type: 'Տեսություն',
            es: t.titleEs + ': ' + t.definition.es.substring(0, 90) + '...',
            arm: t.titleArm + ': ' + t.definition.arm.substring(0, 90) + '...',
          });
        }
      });
    });
    return results;
  }, [searchQuery]);

  const subTabs = useMemo(() => {
    const tabs: { id: string; labelEs: string; labelArm: string; icon: React.ReactNode }[] = [
      { id: 'teoria', labelEs: 'Teoría y Ejemplos', labelArm: 'Տեսություն և Օրինակներ', icon: <BookOpen className="w-3.5 h-3.5" /> },
      { id: 'test', labelEs: 'Examen Test', labelArm: 'Քննական Թեստ', icon: <GraduationCap className="w-3.5 h-3.5" /> },
    ];
    if (activeModule.identifyExercises && activeModule.identifyExercises.length > 0) {
      tabs.push({ id: 'identifica', labelEs: 'Identifica', labelArm: 'Ճանաչիր արտահայտչամիջոցը', icon: <Sparkles className="w-3.5 h-3.5" /> });
    }
    if (activeModule.trueFalseExercises && activeModule.trueFalseExercises.length > 0) {
      tabs.push({ id: 'verdadero_falso', labelEs: 'V o F', labelArm: 'Ճիշտ կամ Սխալ', icon: <CheckCircle2 className="w-3.5 h-3.5" /> });
    }
    if (activeModule.readingTexts && activeModule.readingTexts.length > 0) {
      tabs.push({ id: 'lectura', labelEs: 'Lectura', labelArm: 'Ընթերցանություն', icon: <BookMarked className="w-3.5 h-3.5" /> });
    }
    tabs.push({ id: 'flashcards', labelEs: 'Flashcards', labelArm: 'Քարտեր', icon: <Layers className="w-3.5 h-3.5" /> });
    return tabs;
  }, [activeModule]);

  const validSubTab = subTabs.find(t => t.id === activeSubTab) ? activeSubTab : 'teoria';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-800 flex items-center justify-center text-white shadow-sm shrink-0">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-black text-slate-900 text-lg md:text-xl tracking-tight leading-none">
                    LENGUA CASTELLANA Y LITERATURA
                  </h1>
                  <span className="px-2 py-0.5 text-xs font-black rounded-md bg-amber-100 text-amber-950 border border-amber-300">
                    1.º ESO
                  </span>
                  <span className="text-sm hidden sm:inline">🇪🇸 ⇄ 🇦🇲</span>
                </div>
                <p className="text-xs md:text-sm text-indigo-700 font-bold font-armenian mt-0.5">
                  Գեղարվեստական արտահայտչամիջոցներ և գրականություն (7-րդ դասարան)
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
                <span className="px-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider hidden sm:inline font-armenian">
                  Տառաչափ՝
                </span>
                <button
                  type="button"
                  onClick={() => setFontScale('normal')}
                  className={`px-2 py-1 rounded-lg font-bold text-xs transition-all ${
                    fontScale === 'normal' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  A
                </button>
                <button
                  type="button"
                  onClick={() => setFontScale('large')}
                  className={`px-2.5 py-1 rounded-lg font-black text-sm transition-all ${
                    fontScale === 'large' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  A+
                </button>
                <button
                  type="button"
                  onClick={() => setFontScale('xlarge')}
                  className={`px-2.5 py-1 rounded-lg font-black text-base transition-all ${
                    fontScale === 'xlarge' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  A++
                </button>
              </div>

              <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
                <button
                  type="button"
                  onClick={() => setGlobalMode('click')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-bold transition-all ${
                    globalMode === 'click' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>👆 Սեղմելով բացել</span>
                </button>
                <button
                  type="button"
                  onClick={() => setGlobalMode('show_all')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-bold transition-all ${
                    globalMode === 'show_all' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Բացել բոլորը</span>
                </button>
                <button
                  type="button"
                  onClick={() => setGlobalMode('hide_all')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-bold transition-all ${
                    globalMode === 'hide_all' ? 'bg-white text-rose-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <EyeOff className="w-3.5 h-3.5" />
                  <span>Թաքցնել</span>
                </button>
              </div>

              <div className="relative w-full sm:w-60">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Որոնել (ES / ARM)..."
                  className="w-full pl-8 pr-7 py-1.5 text-xs rounded-xl bg-slate-100 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-3 pb-1">
            {allModules.map(mod => {
              const isActive = mod.id === activeModuleId;
              return (
                <button
                  key={mod.id}
                  type="button"
                  onClick={() => {
                    setActiveModuleId(mod.id);
                    setActiveSubTab('teoria');
                  }}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs md:text-sm font-bold whitespace-nowrap transition-all shrink-0 ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-600/20'
                      : 'bg-slate-100/90 text-slate-700 hover:bg-slate-200/80 hover:text-slate-900'
                  }`}
                >
                  {getModuleIcon(mod.iconName)}
                  <span>Unit {mod.number}: {mod.titleEs}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex-1 w-full">
        {searchQuery.trim().length >= 2 && (
          <div className="mb-6 bg-white p-5 rounded-2xl border border-indigo-200 shadow-lg animate-fadeIn">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
              <span className="font-bold text-slate-900 text-sm">
                Որոնման արդյունքներ «{searchQuery}» ({searchResults.length})
              </span>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-xs text-indigo-600 font-bold hover:underline"
              >
                Փակել որոնումը
              </button>
            </div>
            {searchResults.length === 0 ? (
              <p className="text-slate-500 text-xs py-4 text-center font-armenian">Ոչինչ չի գտնվել</p>
            ) : (
              <div className="max-h-80 overflow-y-auto space-y-2 pr-1">
                {searchResults.map((res, rIdx) => (
                  <div
                    key={rIdx}
                    onClick={() => {
                      setActiveModuleId(res.moduleId);
                      setSearchQuery('');
                    }}
                    className="cursor-pointer p-3 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/40 transition-all"
                  >
                    <p className="font-bold text-slate-900 text-sm">{res.es}</p>
                    <p className="text-xs text-slate-600 font-armenian mt-0.5">{res.arm}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="mb-6 bg-gradient-to-br from-white via-indigo-50/20 to-slate-100/60 p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 text-xs font-extrabold rounded-md bg-indigo-600 text-white">
                  ԹԵՄԱ {activeModule.number}
                </span>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {activeModule.subtitleEs}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                {activeModule.titleEs} — {activeModule.titleArm}
              </h2>
              <p className="text-xs md:text-sm text-slate-600 font-armenian mt-1">
                {activeModule.introEs}
              </p>
            </div>

            <div className="bg-amber-100/80 border border-amber-300 p-3 rounded-xl max-w-xs shrink-0">
              <div className="flex items-start gap-2">
                <span className="text-lg">💡</span>
                <div className="text-xs font-medium text-amber-950 font-armenian">
                  <strong>Ինտերակտիվ կանոն.</strong> Սեղմեք ցանկացած իսպաներեն նախադասության կամ օրինակի վրա՝ հայերեն թարգմանությունը տեսնելու համար։
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {subTabs.map(st => {
              const isSubActive = st.id === validSubTab;
              return (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => setActiveSubTab(st.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs md:text-sm font-bold whitespace-nowrap transition-all ${
                    isSubActive
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                  }`}
                >
                  {st.icon}
                  <span>{st.labelArm}</span>
                  <span className="text-[11px] opacity-70 hidden sm:inline">
                    ({st.labelEs})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <section className="animate-fadeIn">
          {validSubTab === 'teoria' && (
            <TheorySectionView sections={activeModule.theory} globalMode={globalMode} />
          )}

          {validSubTab === 'test' && (
            <InteractiveTestView questions={activeModule.testQuestions} globalMode={globalMode} />
          )}

          {validSubTab === 'identifica' && activeModule.identifyExercises && (
            <IdentifyView exercises={activeModule.identifyExercises} globalMode={globalMode} />
          )}

          {validSubTab === 'verdadero_falso' && activeModule.trueFalseExercises && (
            <TrueFalseView exercises={activeModule.trueFalseExercises} globalMode={globalMode} />
          )}

          {validSubTab === 'lectura' && activeModule.readingTexts && (
            <ReadingView texts={activeModule.readingTexts} globalMode={globalMode} />
          )}

          {validSubTab === 'flashcards' && (
            <FlashcardsView cards={activeModule.reviewPoints} />
          )}
        </section>
      </main>

      <footer className="bg-white border-t border-slate-200 py-6 mt-12 text-center text-xs text-slate-500 font-armenian">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            Lengua Castellana y Literatura — 1.º de ESO (7-րդ դասարան)։ Իսպաներենի քննական նախապատրաստական ինտերակտիվ ուղեցույց։
          </p>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
              1.º ESO • Spanish & Armenian Dual Study Hub
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
