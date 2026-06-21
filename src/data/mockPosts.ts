export type Category = 'wirds' | 'asrar' | 'recipes';

export interface Post {
  id: string;
  title: {
    fr: string;
    en: string;
    ha: string;
  };
  category: Category;
  excerpt: {
    fr: string;
    en: string;
    ha: string;
  };
  content: {
    fr: string;
    en: string;
    ha: string;
  };
  tags: string[];
  author: string;
  date: string;
}

export const mockPosts: Post[] = [
  {
    id: '1',
    title: {
      fr: 'Secret de la Sourate Al-Fatiha',
      en: 'Secret of Surah Al-Fatiha',
      ha: 'Sirrin Surah Al-Fatiha',
    },
    category: 'asrar',
    excerpt: {
      fr: 'Découvrez les vertus cachées de la mère du Coran pour l\'ouverture des portes de la réussite et de la prospérité.',
      en: 'Discover the hidden virtues of the mother of the Quran for opening the doors of success and prosperity.',
      ha: 'Gano boyayyun sirrikan uwar Alqur\'ani don bude kofofin nasara da arziki.',
    },
    content: {
      fr: 'La Sourate Al-Fatiha (L\'Ouverture) est la première sourate du Coran.\n\nCe secret est très puissant pour résoudre n\'importe quel problème difficile ou pour obtenir une ouverture dans les affaires. Il est recommandé de la réciter 41 fois après la prière de Fajr pendant 41 jours consécutifs.\n\nAssurez-vous d\'être en état de pureté et d\'avoir une intention noble avant de commencer ce wird.',
      en: 'Surah Al-Fatiha (The Opening) is the first surah of the Quran.\n\nThis secret is very powerful to solve any difficult problem or to obtain an opening in business. It is recommended to recite it 41 times after the Fajr prayer for 41 consecutive days.\n\nMake sure to be in a state of purity and to have a noble intention before starting this wird.',
      ha: 'Surah Al-Fatiha (Budewa) ita ce sura ta farko a cikin Alqur\'ani.\n\nWannan sirrin yana da matukar karfi wajen warware duk wata matsala mai wuya ko kuma samun budi a harkar kasuwanci. Ana ba da shawarar karanta ta sau 41 bayan sallar Asuba na tsawon kwanaki 41 a jere.\n\nTabbatar kana cikin tsarki kuma kana da kyakkyawar niyya kafin fara wannan wirdin.',
    },
    tags: ['fatiha', 'success', 'prosperity', 'wealth'],
    author: 'Cheikh Ahmed',
    date: '2023-11-15'
  },
  {
    id: '2',
    title: {
      fr: 'Wird de la protection quotidienne',
      en: 'Daily protection Wird',
      ha: 'Wirdin tsari na yau da kullun',
    },
    category: 'wirds',
    excerpt: {
      fr: 'Une compilation de prières et de versets pour assurer votre protection et celle de votre famille tout au long de la journée.',
      en: 'A compilation of prayers and verses to ensure your protection and that of your family throughout the day.',
      ha: 'Tarar addu\'o\'i da ayoyi don tabbatar da kariyarku da ta danginku a tsawon yini.',
    },
    content: {
      fr: 'Pour la protection quotidienne, il est recommandé de lire Ayatul Kursi (Le Verset du Trône) 3 fois le matin et 3 fois le soir.\n\nEnsuite, lisez les 3 dernières sourates du Coran (Al-Ikhlas, Al-Falaq, An-Nas) 3 fois chacune, en soufflant dans vos mains et en les passant sur votre corps.',
      en: 'For daily protection, it is recommended to read Ayatul Kursi (The Verse of the Throne) 3 times in the morning and 3 times in the evening.\n\nThen, read the last 3 surahs of the Quran (Al-Ikhlas, Al-Falaq, An-Nas) 3 times each, blowing into your hands and passing them over your body.',
      ha: 'Domin tsari na yau da kullun, ana so a karanta Ayatul Kursiyyu sau 3 da safe da sau 3 da yamma.\n\nSannan ka karanta surori guda 3 na karshen Alqur\'ani (Al-Ikhlas, Al-Falaq, An-Nas) kowacce sau 3, ka tofa a hannunka kana shafa a jikinka.',
    },
    tags: ['protection', 'kursi', 'daily'],
    author: 'Oustaz Ali',
    date: '2023-10-30'
  },
  {
    id: '3',
    title: {
      fr: 'Recette d\'amour et d\'harmonie familiale',
      en: 'Recipe for love and family harmony',
      ha: 'Magani na so da jituwa ta iyali',
    },
    category: 'recipes',
    excerpt: {
      fr: 'Basée sur les noms divins Ya Wadoud, ce secret apporte la paix et résout les conflits dans le foyer.',
      en: 'Based on the divine names Ya Wadoud, this secret brings peace and resolves conflicts in the home.',
      ha: 'Bisa ga sunayen Allah Ya Wadudu, wannan sirrin yana kawo zaman lafiya kuma yana warware rikice-rikice a gida.',
    },
    content: {
      fr: 'Le nom divin Al-Wadoud (Le Bien-Aimant) est très efficace pour ramener l\'harmonie dans un couple ou une famille.\n\nLa méthode: Récitez "Ya Wadoud" 1000 fois chaque nuit sur de l\'eau ou de la nourriture que la famille partagera. \n\nLes résultats sont généralement visibles après 7 jours insha\'Allah.',
      en: 'The divine name Al-Wadoud (The Most Loving) is very effective in restoring harmony in a couple or a family.\n\nMethod: Recite "Ya Wadoud" 1000 times every night over water or food that the family will share.\n\nThe results are usually visible after 7 days insha\'Allah.',
      ha: 'Sunan Allah Al-Wadudu yana da matukar tasiri wajen dawo da fahimtar juna a tsakanin ma\'aurata ko iyali.\n\nYadda za a yi: A karanta "Ya Wadudu" sau 1000 kowane dare a kan ruwa ko abincin da iyali za su ci.\n\nAna ganin sakamakon bayan kwanaki 7 insha Allahu.',
    },
    tags: ['love', 'harmony', 'family', 'wadoud'],
    author: 'Imam Youssef',
    date: '2023-09-12'
  },
  {
    id: '4',
    title: {
      fr: 'Secret de Ya Latif pour les difficultés',
      en: 'Secret of Ya Latif for difficulties',
      ha: 'Sirrin Ya Latif game da matsaloli',
    },
    category: 'asrar',
    excerpt: {
      fr: 'Comment utiliser le nom divin Al-Latif pour sortir d\'une situation désespérée.',
      en: 'How to use the divine name Al-Latif to get out of a desperate situation.',
      ha: 'Yadda zaka yi amfani da sunan Allah Al-Latif don fita daga wani mawuyacin hali.',
    },
    content: {
      fr: 'Al-Latif est Celui qui est doux avec Ses serviteurs et qui exauce leurs espoirs de manière imperceptible.\n\nEn cas de grande difficulté, récitez Ya Latif 129 fois, puis lisez ce verset "Allahou latifoune bi ibadihi..." 7 fois. Répétez cela après chaque prière obligatoire.',
      en: 'Al-Latif is the One who is gentle with His servants and who fulfills their hopes in an imperceptible way.\n\nIn case of great difficulty, recite Ya Latif 129 times, then read this verse "Allahu latifun bi ibadihi..." 7 times. Repeat this after each obligatory prayer.',
      ha: 'Al-Latif shi ne Mai tausayi ga bayinSa wanda yake biya musu bukatunsu a asirce.\n\nA lokacin wata babbar matsala, a karanta Ya Latif sau 129, sannan a karanta wannan ayar "Allahu latifun bi ibadihi..." sau 7. Ana maimaita wannan a bayan kowace salla ta farilla.',
    },
    tags: ['difficulties', 'latif', 'relief'],
    author: 'Cheikh Ahmed',
    date: '2023-08-05'
  }
];
