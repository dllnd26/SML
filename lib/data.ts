export interface Team {
  id: string;
  name: string;
  slug: string;
  logo: string;
  founded: number;
  stadium: string;
  capacity: number;
  colors: string[];
}

export interface Standing {
  position: number;
  team: Team;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  form: ("W" | "D" | "L")[];
}

export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore?: number;
  awayScore?: number;
  date: string;
  time: string;
  venue: string;
  status: "upcoming" | "live" | "completed";
  week: number;
}

export interface Player {
  id: string;
  name: string;
  position: string;
  number: number;
  nationality: string;
  age: number;
  goals?: number;
  assists?: number;
}

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  category: string;
}

// Mock Teams Data
export const teams: Team[] = [
  {
    id: "1",
    name: "Inter Moengotapoe",
    slug: "inter-moengotapoe",
    logo: "🏆",
    founded: 1962,
    stadium: "Dr. Ir. Franklin Essed Stadion",
    capacity: 3500,
    colors: ["#3E8C21", "#FFFFFF"],
  },
  {
    id: "2",
    name: "SV Robinhood",
    slug: "sv-robinhood",
    logo: "🦅",
    founded: 1945,
    stadium: "Dr. Ir. Franklin Essed Stadion",
    capacity: 3500,
    colors: ["#FF0000", "#FFFFFF"],
  },
  {
    id: "3",
    name: "SV Leo Victor",
    slug: "sv-leo-victor",
    logo: "🦁",
    founded: 1952,
    stadium: "Dr. Ir. Franklin Essed Stadion",
    capacity: 3500,
    colors: ["#0000FF", "#FFFFFF"],
  },
  {
    id: "4",
    name: "FCS Nacional",
    slug: "fcs-nacional",
    logo: "⚡",
    founded: 1959,
    stadium: "Dr. Ir. Franklin Essed Stadion",
    capacity: 3500,
    colors: ["#FFD700", "#000000"],
  },
  {
    id: "5",
    name: "Walking Boyz Company",
    slug: "walking-boyz-company",
    logo: "🚶",
    founded: 2004,
    stadium: "Dr. Ir. Franklin Essed Stadion",
    capacity: 3500,
    colors: ["#93D70E", "#000000"],
  },
  {
    id: "6",
    name: "SNL",
    slug: "snl",
    logo: "⭐",
    founded: 1921,
    stadium: "Dr. Ir. Franklin Essed Stadion",
    capacity: 3500,
    colors: ["#800080", "#FFFFFF"],
  },
  {
    id: "7",
    name: "Transvaal",
    slug: "transvaal",
    logo: "🔵",
    founded: 1921,
    stadium: "Dr. Ir. Franklin Essed Stadion",
    capacity: 3500,
    colors: ["#00BFFF", "#FFFFFF"],
  },
  {
    id: "8",
    name: "Notch",
    slug: "notch",
    logo: "🎯",
    founded: 2015,
    stadium: "Dr. Ir. Franklin Essed Stadion",
    capacity: 3500,
    colors: ["#FF6600", "#000000"],
  },
];

// Mock Standings Data
export const standings: Standing[] = [
  {
    position: 1,
    team: teams[0],
    played: 18,
    won: 14,
    drawn: 2,
    lost: 2,
    goalsFor: 42,
    goalsAgainst: 15,
    goalDifference: 27,
    points: 44,
    form: ["W", "W", "D", "W", "W"],
  },
  {
    position: 2,
    team: teams[1],
    played: 18,
    won: 12,
    drawn: 4,
    lost: 2,
    goalsFor: 38,
    goalsAgainst: 18,
    goalDifference: 20,
    points: 40,
    form: ["W", "D", "W", "W", "D"],
  },
  {
    position: 3,
    team: teams[2],
    played: 18,
    won: 11,
    drawn: 3,
    lost: 4,
    goalsFor: 35,
    goalsAgainst: 22,
    goalDifference: 13,
    points: 36,
    form: ["L", "W", "W", "D", "W"],
  },
  {
    position: 4,
    team: teams[3],
    played: 18,
    won: 9,
    drawn: 5,
    lost: 4,
    goalsFor: 30,
    goalsAgainst: 25,
    goalDifference: 5,
    points: 32,
    form: ["D", "W", "L", "D", "W"],
  },
  {
    position: 5,
    team: teams[4],
    played: 18,
    won: 7,
    drawn: 6,
    lost: 5,
    goalsFor: 28,
    goalsAgainst: 26,
    goalDifference: 2,
    points: 27,
    form: ["D", "D", "W", "L", "D"],
  },
  {
    position: 6,
    team: teams[5],
    played: 18,
    won: 6,
    drawn: 4,
    lost: 8,
    goalsFor: 24,
    goalsAgainst: 30,
    goalDifference: -6,
    points: 22,
    form: ["L", "W", "L", "D", "L"],
  },
  {
    position: 7,
    team: teams[6],
    played: 18,
    won: 4,
    drawn: 5,
    lost: 9,
    goalsFor: 20,
    goalsAgainst: 35,
    goalDifference: -15,
    points: 17,
    form: ["L", "D", "L", "L", "W"],
  },
  {
    position: 8,
    team: teams[7],
    played: 18,
    won: 2,
    drawn: 3,
    lost: 13,
    goalsFor: 15,
    goalsAgainst: 41,
    goalDifference: -26,
    points: 9,
    form: ["L", "L", "D", "L", "L"],
  },
];

// Mock Matches Data
export const matches: Match[] = [
  // Upcoming matches
  {
    id: "1",
    homeTeam: teams[0],
    awayTeam: teams[1],
    date: "2024-11-05",
    time: "19:00",
    venue: "Dr. Ir. Franklin Essed Stadion",
    status: "upcoming",
    week: 19,
  },
  {
    id: "2",
    homeTeam: teams[2],
    awayTeam: teams[3],
    date: "2024-11-05",
    time: "16:00",
    venue: "Dr. Ir. Franklin Essed Stadion",
    status: "upcoming",
    week: 19,
  },
  {
    id: "3",
    homeTeam: teams[4],
    awayTeam: teams[5],
    date: "2024-11-06",
    time: "19:00",
    venue: "Dr. Ir. Franklin Essed Stadion",
    status: "upcoming",
    week: 19,
  },
  {
    id: "4",
    homeTeam: teams[6],
    awayTeam: teams[7],
    date: "2024-11-06",
    time: "16:00",
    venue: "Dr. Ir. Franklin Essed Stadion",
    status: "upcoming",
    week: 19,
  },
  // Completed matches
  {
    id: "5",
    homeTeam: teams[0],
    awayTeam: teams[3],
    homeScore: 3,
    awayScore: 1,
    date: "2024-10-28",
    time: "19:00",
    venue: "Dr. Ir. Franklin Essed Stadion",
    status: "completed",
    week: 18,
  },
  {
    id: "6",
    homeTeam: teams[1],
    awayTeam: teams[2],
    homeScore: 2,
    awayScore: 2,
    date: "2024-10-28",
    time: "16:00",
    venue: "Dr. Ir. Franklin Essed Stadion",
    status: "completed",
    week: 18,
  },
  {
    id: "7",
    homeTeam: teams[4],
    awayTeam: teams[7],
    homeScore: 1,
    awayScore: 0,
    date: "2024-10-29",
    time: "19:00",
    venue: "Dr. Ir. Franklin Essed Stadion",
    status: "completed",
    week: 18,
  },
  {
    id: "8",
    homeTeam: teams[5],
    awayTeam: teams[6],
    homeScore: 0,
    awayScore: 2,
    date: "2024-10-29",
    time: "16:00",
    venue: "Dr. Ir. Franklin Essed Stadion",
    status: "completed",
    week: 18,
  },
];

// Mock News Data
export const newsArticles: NewsArticle[] = [
  {
    id: "1",
    slug: "inter-moengotapoe-extends-lead",
    title: "Inter Moengotapoe Extends Lead at Top with Convincing Victory",
    excerpt: "The league leaders showcased their dominance with a 3-1 win over FCS Nacional, extending their lead to four points.",
    content: "Inter Moengotapoe continued their impressive form with a commanding 3-1 victory over FCS Nacional at the Dr. Ir. Franklin Essed Stadion. The win extends their lead at the top of the table to four points...",
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80",
    author: "John Doe",
    date: "2024-10-29",
    category: "Match Report",
  },
  {
    id: "2",
    slug: "robinhood-leo-victor-thriller",
    title: "Robinhood and Leo Victor Share Points in Six-Goal Thriller",
    excerpt: "An entertaining 2-2 draw between two title contenders kept fans on the edge of their seats.",
    content: "SV Robinhood and SV Leo Victor played out an exciting 2-2 draw in what was one of the matches of the season. Both teams showed attacking intent from the start...",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80",
    author: "Jane Smith",
    date: "2024-10-29",
    category: "Match Report",
  },
  {
    id: "3",
    slug: "sml-announces-youth-development",
    title: "SML Announces New Youth Development Program",
    excerpt: "The league unveils ambitious plans to nurture young Surinamese talent through a comprehensive youth academy system.",
    content: "The Suriname Major League has announced a groundbreaking youth development program aimed at identifying and nurturing young football talent across the country...",
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&q=80",
    author: "Michael Johnson",
    date: "2024-10-27",
    category: "League News",
  },
];

// Mock Players Data
export const getTeamPlayers = (teamId: string): Player[] => {
  return [
    {
      id: "1",
      name: "Stefano Rijssel",
      position: "Forward",
      number: 9,
      nationality: "Suriname",
      age: 26,
      goals: 15,
      assists: 7,
    },
    {
      id: "2",
      name: "Gleofilo Vlijter",
      position: "Midfielder",
      number: 10,
      nationality: "Suriname",
      age: 28,
      goals: 8,
      assists: 12,
    },
    {
      id: "3",
      name: "Myenty Abena",
      position: "Defender",
      number: 4,
      nationality: "Suriname",
      age: 30,
      goals: 2,
      assists: 1,
    },
    {
      id: "4",
      name: "Warner Hahn",
      position: "Goalkeeper",
      number: 1,
      nationality: "Suriname",
      age: 32,
      goals: 0,
      assists: 0,
    },
  ];
};
