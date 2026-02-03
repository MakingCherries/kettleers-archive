import React, { useState } from 'react';

const championships = [
  { year: 1961, opponent: "Yarmouth Indians", manager: "Jim Hubbard" },
  { year: 1962, opponent: "Harwich Mariners", manager: "Jim Hubbard" },
  { year: 1963, opponent: "Orleans Cardinals", manager: "Jim Hubbard" },
  { year: 1964, opponent: "Chatham Athletics", manager: "Jim Hubbard" },
  { year: 1972, opponent: "Chatham Athletics", manager: "Jack McCarthy" },
  { year: 1973, opponent: "Yarmouth-Dennis Red Sox", manager: "Jack McCarthy" },
  { year: 1974, opponent: "Orleans Cardinals", manager: "Jack McCarthy" },
  { year: 1975, opponent: "Falmouth Commodores", manager: "Jack McCarthy" },
  { year: 1977, opponent: "Yarmouth-Dennis Red Sox", manager: "Jack McCarthy" },
  { year: 1981, opponent: "Orleans Cardinals", manager: "George Greer" },
  { year: 1984, opponent: "Wareham Gatemen", manager: "George Greer" },
  { year: 1985, opponent: "Chatham Athletics", manager: "George Greer" },
  { year: 1995, opponent: "Chatham Athletics", manager: "Mike Coutts", featured: true },
  { year: 1999, opponent: "Chatham Anglers", manager: "Mike Coutts" },
  { year: 2010, opponent: "Yarmouth-Dennis Red Sox", manager: "Mike Roberts" },
  { year: 2013, opponent: "Orleans Firebirds", manager: "Mike Roberts" },
  { year: 2019, opponent: "Harwich Mariners", manager: "Mike Roberts" }
];

const season1995 = {
  roster: {
    pitchers: [
      { name: "Jack Cressend", stats: "7-1, 2.44 ERA", note: "Hall of Famer, led league in wins", mlb: true },
      { name: "Jason Grilli", stats: "139-pitch outing vs Falmouth", note: "Future MLB All-Star", mlb: true },
      { name: "Josh Gandy", stats: "Playoff Co-MVP", note: "Championship Game winner" },
      { name: "Ryan Lynch", stats: "CG shutout in playoffs", note: "UCLA - pitched through cramps" },
      { name: "Kevin Sheredy", stats: "Final 5 outs of title", note: "Recorded championship-clinching out" },
      { name: "Brendan Sullivan", stats: "7 saves", note: "Relief Pitcher of the Year" },
      { name: "Aaron Porter", stats: "4 starts", note: "Rotation depth" }
    ],
    catchers: [
      { name: "Josh Paul", stats: ".364 AVG, .652 SLG", note: "MVP, Batting Champ, Pro Prospect - Triple Crown!", mlb: true, star: true },
      { name: "Tim DeCinces", stats: "UCLA", note: "Lynch's battery mate" }
    ],
    infielders: [
      { name: "Jesse Zepeda", stats: "27 BB (team leader)", note: "Shortstop" },
      { name: "Doug Livingston", stats: "Walk-off sac fly", note: "Second base, clutch performer" },
      { name: "Glenn Davis", stats: "3-run HR in finale", note: "Corner infield power" },
      { name: "Brian Bernard", stats: "", note: "Utility infielder" },
      { name: "Ronnie Walker", stats: "", note: "Corner infielder" }
    ],
    outfielders: [
      { name: "Diego Rico", stats: "21 SB (team leader)", note: "Speed demon" },
      { name: "Brendan Berger", stats: "10th-inning HR saved season", note: "Clutch playoff performer", mlb: true },
      { name: "Ronnie Barassi", stats: "", note: "Outfield depth" }
    ]
  },
  playoffs: {
    semifinal: {
      games: [
        { game: 1, result: "L 1-3", note: "Wareham rallied with 2 in 9th" },
        { game: 2, result: "W 4-2 (10)", note: "Berger's 2-run HR in 10th!" },
        { game: 3, result: "W 1-0", note: "Lynch CG, Livingston walk-off sac fly" }
      ]
    },
    championship: {
      games: [
        { game: 1, result: "W 16-6", note: "Offensive explosion at Lowell Park" },
        { game: 2, result: "L 3-9", note: "Chatham forces Game 3" },
        { game: 3, result: "W 9-3", note: "7-run 5th, Davis 3-run HR, dogpile on mound!" }
      ]
    }
  },
  futureMajorLeaguers: [
    { name: "Josh Paul", teams: "White Sox, Angels, Rays, D-backs", years: "1999-2007" },
    { name: "Jason Grilli", teams: "9 MLB teams", years: "2000-2017", highlight: "All-Star 2013" },
    { name: "Jack Cressend", teams: "Indians, Twins", years: "2001-2004" },
    { name: "Brandon Berger", teams: "Royals", years: "2001-2003" }
  ],
  quotes: [
    { text: "That was my favorite team that I ever actually played on. And it was never replicated as a player.", speaker: "Josh Paul" },
    { text: "We were just there to play the game, for the sake of the game, without any ulterior motive.", speaker: "Josh Paul" },
    { text: "Winning that series was huge for us. It gave us a lot of confidence going into the Chatham series.", speaker: "Mike Coutts" }
  ]
};

const mlbAlumni = [
  { name: "Will Clark", year: "1983", mlb: "Giants, Rangers, Orioles, Cardinals", highlight: "6× All-Star" },
  { name: "Ron Darling", year: "1980", mlb: "Mets, A's, Expos", highlight: "1986 World Series Champion" },
  { name: "Terry Steinbach", year: "1982", mlb: "Athletics, Twins", highlight: "3× All-Star, 75 hits (record)" },
  { name: "Jeff Reardon", year: "1974-76", mlb: "8 teams", highlight: "367 saves, 4× All-Star" },
  { name: "Tim Salmon", year: "1988", mlb: "Angels", highlight: "1993 AL Rookie of Year" },
  { name: "Greg Vaughn", year: "1984-85", mlb: "Brewers, Padres, Reds, Rays", highlight: "4× All-Star, 355 HR" },
  { name: "Chase Utley", year: "1999", mlb: "Phillies, Dodgers", highlight: "6× All-Star, 2008 WS Champ" },
  { name: "Jason Kipnis", year: "2008", mlb: "Indians, Cubs", highlight: "2× All-Star" },
  { name: "Kyle Lewis", year: "2014", mlb: "Mariners, D-backs", highlight: "2020 AL Rookie of Year" },
  { name: "Mike Yastrzemski", year: "2010-11", mlb: "Giants", highlight: "2023 All-Star" },
  { name: "Joe Girardi", year: "1984", mlb: "Cubs, Rockies, Yankees", highlight: "3× WS Champ, Manager" },
  { name: "Josh Paul", year: "1995", mlb: "White Sox, Angels, Rays, D-backs", highlight: "1995 CCBL Triple Crown" },
  { name: "Jason Grilli", year: "1995", mlb: "9 teams", highlight: "2013 All-Star, 74 saves" },
  { name: "Nick Gonzales", year: "2019", mlb: "Pirates", highlight: "2019 CCBL MVP, 1st round pick" },
  { name: "Matt Mervis", year: "2019", mlb: "Cubs", highlight: "2019 Championship team" },
  { name: "Casey Schmitt", year: "2019", mlb: "Giants", highlight: "2019 Playoff MVP" }
];

const hallOfFamers = [
  { name: "Arnold Mycock", year: 2000, role: "GM 1950-1995" },
  { name: "Jeff Reardon", year: 2000, role: "Pitcher" },
  { name: "Terry Steinbach", year: 2001, role: "Catcher" },
  { name: "George Greer", year: 2002, role: "Manager" },
  { name: "Jack McCarthy", year: 2003, role: "Catcher/Manager" },
  { name: "Will Clark", year: 2004, role: "First Base" },
  { name: "Tim Teufel", year: 2005, role: "Infielder" },
  { name: "Josh Paul", year: 2006, role: "Catcher/OF" },
  { name: "Greg Vaughn", year: 2009, role: "Outfielder" },
  { name: "Lou Merloni", year: 2010, role: "Infielder" },
  { name: "Jack Cressend", year: 2010, role: "Pitcher" },
  { name: "Garrett Atkins", year: 2013, role: "Infielder" },
  { name: "Justin Smoak", year: 2022, role: "First Base" },
  { name: "Nick Gonzales", year: 2025, role: "Infielder" }
];

// Championship Article Component
const ChampionshipArticle = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/80 z-50 overflow-y-auto">
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-2xl">
          <div className="bg-kettleer-maroon text-white p-6 sm:p-8 rounded-t-lg">
            <button onClick={onClose} className="float-right text-kettleer-gold hover:text-white transition text-2xl font-bold">×</button>
            <div className="text-kettleer-gold font-display text-sm tracking-widest mb-2">1995 CHAMPIONSHIP REMEMBERED</div>
            <h2 className="font-display text-3xl sm:text-4xl mb-2">The 1995 Championship Season</h2>
            <p className="font-serif text-lg italic text-gray-300">By Patrick Robinson</p>
            <p className="font-serif text-sm text-gray-400 mt-1">British author and novelist</p>
          </div>
          <div className="p-6 sm:p-8 font-serif text-gray-700 leading-relaxed">
            <div className="border-l-4 border-kettleer-gold pl-4 mb-8 italic text-kettleer-maroon text-lg">"Believe it or not, our organizational goal was not to win the Championship."</div>
            <p className="mb-6 first-letter:text-5xl first-letter:font-display first-letter:text-kettleer-maroon first-letter:float-left first-letter:mr-2 first-letter:leading-none">These were the thoughtful and sincere words of the Kettleers Head Coach, <span className="font-semibold text-kettleer-maroon">Mike Coutts</span>, writing in the 1995 Fall Newsletter. They were the words of a teaching baseball man, a coach who has been for several years, bound up in the endlessly absorbing task of coercing young, immature college amateurs to reach higher, to be the best players they ever could be.</p>
            <p className="mb-6">Mike meant it. Total victory was not his prime objective. Total victory for him was to create a team, of which the village of Cotuit could be proud, a team in which his 23 amateurs would play as they had never played before. A team which would be remembered, not just for their victories, but for their dignity, their sportsmanship, as well as for their skill and their courage under pressure, their team spirit and their commitment.</p>
            <p className="mb-6">Mike Coutts did not come to Cotuit with a win-at-all-costs mentality, which is sometimes too prevalent in the 1990's, even in the Cape Cod Baseball League. He came for a somewhat higher reason. And it was not his fault that the constantly-packed bleachers of Lowell Park very, very quickly, left him far behind in terms of sheer, naked ambition for the battling 1995 Kettleers.</p>
            <div className="text-center text-kettleer-gold text-2xl my-8">⚾ ⚾ ⚾</div>
            <p className="mb-6">By June 27th, with 15 games behind them, Cotuit had a record of <span className="bg-amber-100 px-1 font-semibold">9-6</span>. On that particular evening they were blitzed 11-3 at Lowell Park by the Brewster Whitecaps. It was the kind of defeat which can affect a team with championship ambitions. But sudden unexpected defeat never makes much difference to a team that is on its way, brimming with confidence, misplaced or otherwise.</p>
            <p className="mb-6">The first 15 games had been not much short of a roller-coaster for Mike Coutts' boys. Right back on opening night at Yarmouth, they instantly showed their mettle, twice fighting back, from 3-0, and 4-1 down, to win <span className="bg-amber-100 px-1 font-semibold">6-5</span> on the back of a two-run homer to centerfield from <span className="font-semibold text-kettleer-maroon">Brandon Berger</span> which levelled the score at 4-4.</p>
            <p className="mb-6">With three wins from their first four games, Cotuit went to Harwich on June 16 and duly shocked the faithful who travelled with them...got seriously pasted for the first time, <span className="bg-amber-100 px-1 font-semibold">14-2</span>. No one could work out how that happened either.</p>
            <p className="mb-6">The next night they put the Bourne Braves away <span className="bg-amber-100 px-1 font-semibold">5-1</span> at Buzzards Bay, and here we saw the emergence of a new star pitcher, the Tulane righthander <span className="font-semibold text-kettleer-maroon">Jack Cressend</span>, who at one stage retired 14 batters in a row.</p>
            <p className="mb-6">It took place at Lowell Park on June 19th against the Western Division leaders, the Hyannis Mets. And again, the Kettleers had to battle back from behind...7-0 down, after one and a half. Then we saw a touch of real class, when little <span className="font-semibold text-kettleer-maroon">Doug Livingston</span>, the second baseman from Clemson, banged a grand slam home run clean over the fence in right field on a 2-0 fastball. That one swing levelled the game up, and Cotuit fought their way home, <span className="bg-amber-100 px-1 font-semibold">13-10</span>.</p>
            <p className="mb-6">In the next seven games they won four, lost three. The pattern did not vary much. Sometimes they lost one, but they never lost two. <strong>All through this magically exciting season they never lost successive games.</strong></p>
            <div className="bg-gradient-to-r from-amber-50 to-amber-100 border-l-4 border-kettleer-gold p-6 my-8 italic">But now, on the warm mid-summer evenings of July, with the sea-breezes drifting across the outfield late in the games, the Cotuit Kettleers began a relentless march toward the 1995 Championship which had been threatening since Day One.</div>
            <p className="mb-6">It began on July 6th, when the unsuspecting Bourne Braves made the journey over the Bridge and headed down to the picturesque ballpark in the woods where the Kettleers make their summer home. The Kettleers banged their way to an <span className="bg-amber-100 px-1 font-semibold">8-3</span> victory with 12 hits. The catcher <span className="font-semibold text-kettleer-maroon">Tim DeCinces</span>, out of UCLA, went 4-4. It was vintage 1995 Kettleer ball.</p>
            <p className="mb-6">And this was only the start. The Kettleers would mow down 10 more teams in succession in a two-week rampage through the league. In the 11-game streak they would score 73 times. The last three games saw only three Cotuit pitchers take the mound, <span className="font-semibold text-kettleer-maroon">Aaron Porter</span>, <span className="font-semibold text-kettleer-maroon">Ryan Lynch</span>, and <span className="font-semibold text-kettleer-maroon">Jack Cressend</span>. All three pitched complete games. All three of them pitched a shut-out.</p>
            <p className="mb-6">By now the entire village was gripped by the Kettleers. Some of the biggest crowds for years crammed into the ground. The passion for baseball was contagious, as fans watched enthralled as Mike Coutt's amateurs hit, threw, ran and caught, playing as if each game was a matter of life or death.</p>
            <div className="bg-gradient-to-r from-amber-50 to-amber-100 border-l-4 border-kettleer-gold p-6 my-8 italic">Remember that breathtaking music they composed for the action scenes in the movie, "A League Of Their Own"? Cotuit fans heard that music. They heard it in their minds, every time a Kettleer stepped up to the plate.</div>
            <p className="mb-6">The three shut-out games were beautiful to watch, but the last one, when they beat Harwich <span className="bg-amber-100 px-1 font-semibold">1-0</span> was a personal triumph for <span className="font-semibold text-kettleer-maroon">Jack Cressend</span>. He retired the first 10 batters he faced, threw 141 pitches, and ended the game with back-to-back strikeouts. Took his record to 6-1. And the Kettleers that night stood six points clear of Wareham at the top of the Western Division, with a <span className="bg-amber-100 px-1 font-semibold">24-8</span> record.</p>
            <div className="text-center text-kettleer-gold text-2xl my-8">⚾ ⚾ ⚾</div>
            <p className="mb-6">Death came on raven's wings, suddenly, unexpectedly, and shockingly. The 11-game winning streak died on the sunlit Thursday afternoon of July 20th on Skid Row - right behind the Police Station in Falmouth. But the Bottom beat the Top, <span className="bg-amber-100 px-1 font-semibold">6-5</span>, after the Kettleers had led 5-1.</p>
            <p className="mb-6">It shook the fans. But it did not shake the team. The general view of the kids in maroon-and-white was simply stated by an anonymous Kettleer outfielder: "We are the best team, and no one is going to beat us to the Championship. And will we get rings...please?"</p>
            <p className="mb-6">The Charge also saw <span className="font-semibold text-kettleer-maroon">Josh Paul</span> slam his way to the top of the Cape Cod League Hitters' Table. Josh's sixth home run of the season was accomplished before the knowledgeable gaze of America's leading novelist, <em>Norman Mailer</em>, who had driven down to Lowell from Provincetown to see the Kettleers. "First baseball game I've watched since the Dodgers left Brooklyn," he told the press afterwards. "And I'm coming back."</p>
            <p className="mb-6">The 1995 Kettleers weren't just great, they were dramatic, exciting, ruthless but sometimes vulnerable. Boring they never were. As Mike Coutts said, "You just never know quite what's going to happen next."</p>
            <p className="mb-6">Cotuit wrapped up the Western Division Championship with a double-header at Orleans. They won the first <span className="bg-amber-100 px-1 font-semibold">2-0</span>, thanks to a two-run homer by <span className="font-semibold text-kettleer-maroon">Brandon Berger</span>. Kettleers <span className="bg-amber-100 px-1 font-semibold">29-11-3</span>; best record in the league.</p>
            <div className="bg-gradient-to-r from-amber-50 to-amber-100 border-l-4 border-kettleer-gold p-6 my-8 italic">And now they faced the play-offs, so often a minefield for Champions.</div>
            <p className="mb-6">And now Cotuit must deal with Wareham at Lowell Park in the first of the best-of-three post-season final games...Saturday afternoon, August 5th. The Kettleers' bleachers were packed. <span className="font-semibold text-kettleer-maroon">Josh Paul</span> had trophies for the League Batting Title, the Most Valuable Player, and the Best Pro Prospect. <span className="font-semibold text-kettleer-maroon">Mike Coutts</span> received the Manager of the Year Award, after setting a record for the most wins ever by a first-year manager (29).</p>
            <p className="mb-6">"Is this heaven?" asked Shoeless Joe Jackson in "A Field of Dreams." Not quite. It was only Iowa. Heaven was Lowell Park on August 5th, 1995 - where the great army of the Cotuit faithful, filled with optimism, gazed out on freshly watered infield grass, which on this day had turned into plumes of pure emerald.</p>
            <p className="mb-6">But this particular game owed little to poetry. This was a knock-down, drag-out struggle between two old and sometimes bitter rivals. <span className="bg-amber-100 px-1 font-semibold">Wareham, 3-1</span> in Game One. The Kettleers were 1-0 down in the Championship series.</p>
            <div className="text-center text-kettleer-gold text-2xl my-8">⚾ ⚾ ⚾</div>
            <p className="mb-6">BUT...they had never lost two in a row. And their supporters drove over the Bourne Bridge by the hundred the following night, forming a tight, wide rectangle of maroon hats and jackets, high in the bleachers beneath the floodlights of Clem Spillane Field. It was a sight <span className="font-semibold text-kettleer-maroon">Josh Paul</span> said afterwards he would never forget.</p>
            <p className="mb-6">But after nine innings it was still <span className="bg-amber-100 px-1 font-semibold">2-2</span>, after some of the most thrilling baseball ever seen in the Cape Cod League, spectacular diving plays, sensational catching, throws coming in from the outfield as if the ball had been fired from a howitzer.</p>
            <p className="mb-6">Mike Coutts sent the sprinter <span className="font-semibold text-kettleer-maroon">Diego Rico</span> in to pinch-run. <span className="font-semibold text-kettleer-maroon">Brandon Berger</span>, the right-hander from Eastern Kentucky, came to the plate. With the count at 3-0, the tension in the air was almost unbearable.</p>
            <div className="bg-gradient-to-r from-amber-50 to-amber-100 border-l-4 border-kettleer-gold p-6 my-8 italic text-lg">But it wasn't a slider. It was a fastball, and Brandon opened his shoulders and swung with all of his strength, right through the wheelhouse. He hit it clean, blasted the ball towards the lights in left field, deep into a now-windless dark sky, deep into a place no one had reached all night.</div>
            <p className="mb-6">To all of us it looked like it was still rising as it cleared the left field fence. But that ball was gone, and <span className="font-semibold text-kettleer-maroon">Diego Rico</span>, who did not wait to find out, would probably have gone past Carl Lewis as he hurtled around third base. It was Brandon's fifth, and sweetest, home run of the season. The game ended at <span className="bg-amber-100 px-1 font-semibold">4-2</span>, with Cotuit's reliever, <span className="font-semibold text-kettleer-maroon">Kevin Sheredy</span>, standing on the mound his arms symbolically aloft.</p>
            <p className="mb-6">The Third Game was played at Cotuit the following day. And after another spectacular battle, the Kettleers got home <span className="bg-amber-100 px-1 font-semibold">1-0</span>, with a run in the eighth, Livingston's sacrifice fly plating <span className="font-semibold text-kettleer-maroon">Ronnie Barassi</span>. <span className="font-semibold text-kettleer-maroon">Ryan Lynch</span> pitched the entire shut-out game.</p>
            <p className="mb-6">The 2-1 Series win made the Kettleers Best in the West, and only the Eastern Division Champions, Chatham, now stood between Cotuit and their 13th Championship of the Cape League.</p>
            <div className="text-center text-kettleer-gold text-2xl my-8">⚾ ⚾ ⚾</div>
            <p className="mb-6">They faced Chatham for the first time at Lowell Park on August 9th, and before a huge and delighted crowd, they came back from 3-0 down, to win a slugfest <span className="bg-amber-100 px-1 font-semibold">16-6</span>. The local reporters were now talking about Cotuit's Murderers' Row (<span className="font-semibold text-kettleer-maroon">Livingston</span>, <span className="font-semibold text-kettleer-maroon">Paul</span> and <span className="font-semibold text-kettleer-maroon">DeCinces</span>).</p>
            <p className="mb-6">The Cotuit hitters had trouble in Game 2, and the A's won it <span className="bg-amber-100 px-1 font-semibold">9-3</span>.</p>
            <p className="mb-6">"Well," said Mike Coutts, "I suppose we might as well play the whole season."</p>
            <p className="mb-6">And so they came back to Lowell Park for the last time - the last time this tough, feisty team of disparate personalities, of ferocious determination, and rousing good-humor, would ever play together. The last time, perhaps, some of them would ever see each other.</p>
            <p className="mb-6">The fans turned up by the hundreds, to watch them win, and, in a sense, to say good-bye. The game was effectively ended by Cotuit's first baseman <span className="font-semibold text-kettleer-maroon">Glenn Davis</span>, who hammered a three-run homer off a fastball from Chatham's reliever Michael Holmes, clean over the right-field fence.</p>
            <p className="mb-6">The game ended <span className="bg-amber-100 px-1 font-semibold">9-3</span> to the Kettleers. And the Chatham team's last sight of the contest was that of <span className="font-semibold text-kettleer-maroon">Kevin Sheredy</span> standing ecstatically on the mound, with his arms raised high, having struck out the last batter. This time, there was one slight difference. There were tears of irredeemable joy streaming down the face of the 6 ft. 4 in. right-handed reliever from Arkansas.</p>
            <div className="bg-gradient-to-r from-amber-50 to-amber-100 border-l-4 border-kettleer-gold p-6 my-8 italic">The final series was over, 2-1 Cotuit. The Championship had come home to Lowell Park. And that represented a major milestone for the entire Kettleer organization.</div>
            <p className="mb-6">It marked the end of a long and arduous campaign, months and months of work. It marked also a triumph for the coaching creed of Mike Coutts - not to win-at-all-costs, but to make the boys keep playing better than they had ever played before. To be the best they ever could be. Yes, Cotuit's 1995 Championship was a major milestone all right.</p>
            <p className="mb-8 text-lg">And milestones ought not to be underestimated. Because they not only tell you how far you have come, they also keep you on the right road.</p>
            <div className="border-t-2 border-kettleer-gold pt-6 mt-8 text-center text-gray-500">
              <p className="italic">Article © Patrick Robinson</p>
              <p className="text-sm mt-2">From the Cotuit Kettleers Archives</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Component
const KettleersArchive = () => {
  const [showAllAlumni, setShowAllAlumni] = useState(false);
  const [showArticle, setShowArticle] = useState(false);
  
  return (
    <div className="min-h-screen bg-stone-100" style={{ fontFamily: "'Crimson Text', Georgia, serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400&family=Oswald:wght@400;500;600;700&display=swap');
        .font-display { font-family: 'Oswald', 'Impact', sans-serif; }
        .font-serif { font-family: 'Crimson Text', Georgia, serif; }
        .text-kettleer-maroon { color: #722F37; }
        .text-kettleer-gold { color: #C9A227; }
        .bg-kettleer-maroon { background-color: #722F37; }
        .bg-kettleer-gold { background-color: #C9A227; }
        .border-kettleer-gold { border-color: #C9A227; }
        .vintage-paper { background: linear-gradient(to bottom, #FDF8F3 0%, #f5efe3 100%); }
        .brass-kettle { background: linear-gradient(135deg, #C9A227 0%, #b8922a 50%, #a07f24 100%); }
        .section-divider { background: repeating-linear-gradient(90deg, #722F37, #722F37 10px, transparent 10px, transparent 20px); height: 4px; }
        .game-card { border-left: 4px solid #C9A227; transition: all 0.2s ease; }
        .game-card:hover { transform: translateX(4px); }
        .roster-card { transition: all 0.3s ease; }
        .roster-card:hover { transform: scale(1.02); }
        .champion-badge { animation: shimmer 3s ease-in-out infinite; }
        @keyframes shimmer { 0%, 100% { opacity: 1; } 50% { opacity: 0.8; } }
      `}</style>

      {showArticle && <ChampionshipArticle onClose={() => setShowArticle(false)} />}

      <nav className="bg-kettleer-maroon text-white py-3 px-4 sticky top-0 z-50 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 brass-kettle rounded-full flex items-center justify-center font-display font-bold text-white text-sm">CK</div>
            <span className="font-display text-xl tracking-wide hidden sm:block">KETTLEERS ARCHIVE</span>
          </div>
          <div className="flex gap-1 sm:gap-4 text-xs sm:text-sm font-display tracking-wider">
            <a href="#1995" className="hover:text-yellow-300 transition px-2 py-1">1995</a>
            <button onClick={() => setShowArticle(true)} className="hover:text-yellow-300 transition px-2 py-1">ARTICLE</button>
            <a href="#championships" className="hover:text-yellow-300 transition px-2 py-1">TITLES</a>
            <a href="#alumni" className="hover:text-yellow-300 transition px-2 py-1">ALUMNI</a>
            <a href="#history" className="hover:text-yellow-300 transition px-2 py-1">HISTORY</a>
          </div>
        </div>
      </nav>

      <header className="bg-kettleer-maroon text-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 py-16 sm:py-24 relative">
          <div className="text-center">
            <div className="inline-block mb-6">
              <div className="w-24 h-24 sm:w-32 sm:h-32 brass-kettle rounded-full flex items-center justify-center mx-auto shadow-2xl">
                <span className="font-display text-4xl sm:text-5xl font-bold text-white">CK</span>
              </div>
            </div>
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl tracking-tight mb-4">COTUIT KETTLEERS</h1>
            <p className="font-display text-xl sm:text-2xl tracking-widest text-kettleer-gold mb-8">HISTORICAL ARCHIVE</p>
            <div className="flex flex-wrap justify-center gap-6 sm:gap-12 text-center mb-8">
              <div><div className="font-display text-4xl sm:text-5xl text-kettleer-gold">17</div><div className="text-sm tracking-wider opacity-80">CHAMPIONSHIPS</div></div>
              <div><div className="font-display text-4xl sm:text-5xl text-kettleer-gold">150+</div><div className="text-sm tracking-wider opacity-80">MLB ALUMNI</div></div>
              <div><div className="font-display text-4xl sm:text-5xl text-kettleer-gold">1947</div><div className="text-sm tracking-wider opacity-80">FOUNDED</div></div>
            </div>
            <p className="font-serif text-lg sm:text-xl italic opacity-90 max-w-2xl mx-auto">"The most successful franchise in Cape Cod Baseball League history"</p>
          </div>
        </div>
        <div className="section-divider"></div>
      </header>

      <section id="1995" className="vintage-paper py-12 sm:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block bg-kettleer-maroon text-kettleer-gold px-6 py-2 font-display text-sm tracking-widest mb-4">★ FEATURED CHAMPIONSHIP ★</div>
            <h2 className="font-display text-4xl sm:text-6xl text-kettleer-maroon tracking-tight">1995</h2>
            <p className="font-serif text-xl sm:text-2xl text-kettleer-gold italic mt-2">A Season of Pure Baseball</p>
          </div>

          <div className="text-center mb-12">
            <button onClick={() => setShowArticle(true)} className="inline-flex items-center gap-2 bg-kettleer-maroon text-white px-8 py-4 rounded-lg font-display tracking-wider hover:bg-rose-900 transition shadow-lg">
              <span>📖</span><span>READ: 1995 CHAMPIONSHIP REMEMBERED</span>
            </button>
            <p className="font-serif text-gray-600 mt-3 italic">By Patrick Robinson, British author and novelist</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="font-display text-5xl text-kettleer-maroon">29-11-3</div>
              <div className="font-serif text-gray-600 mt-2">Regular Season Record</div>
              <div className="text-sm text-kettleer-gold font-display mt-1">1ST PLACE, WEST DIVISION</div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="font-display text-5xl text-kettleer-gold">11</div>
              <div className="font-serif text-gray-600 mt-2">Game Win Streak</div>
              <div className="text-sm text-kettleer-maroon font-display mt-1">JULY 6-20</div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="font-display text-5xl text-kettleer-maroon">4</div>
              <div className="font-serif text-gray-600 mt-2">Future MLB Players</div>
              <div className="text-sm text-kettleer-gold font-display mt-1">ON THE ROSTER</div>
            </div>
          </div>

          <div className="bg-kettleer-maroon text-white rounded-lg p-6 sm:p-8 mb-12">
            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                <div className="font-display text-kettleer-gold tracking-wider text-sm mb-2">MANAGER</div>
                <div className="font-display text-2xl sm:text-3xl">MIKE COUTTS</div>
                <div className="font-serif text-gray-300 mt-2">First-year head coach. Former Y-D player.</div>
                <div className="inline-block mt-3 bg-kettleer-gold text-kettleer-maroon px-3 py-1 font-display text-sm">MANAGER OF THE YEAR</div>
              </div>
              <div>
                <div className="font-display text-kettleer-gold tracking-wider text-sm mb-2">GENERAL MANAGER</div>
                <div className="font-display text-2xl sm:text-3xl">RICH SADOWSKI</div>
                <div className="font-serif text-gray-300 mt-2">Took a chance on a first-time head coach and built a championship roster.</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-100 to-amber-50 border-4 border-kettleer-gold rounded-lg p-6 sm:p-8 mb-12">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="w-32 h-32 brass-kettle rounded-full flex items-center justify-center shadow-xl flex-shrink-0">
                <span className="font-display text-4xl font-bold text-white">★</span>
              </div>
              <div className="text-center sm:text-left">
                <div className="font-display text-xs tracking-widest text-kettleer-gold mb-1">THE TRIPLE CROWN</div>
                <h3 className="font-display text-3xl sm:text-4xl text-kettleer-maroon">JOSH PAUL</h3>
                <div className="font-serif text-xl text-gray-700 mt-1">Catcher / Outfielder • Vanderbilt</div>
                <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-4">
                  <span className="bg-kettleer-maroon text-kettleer-gold px-3 py-1 font-display text-xs tracking-wider">LEAGUE MVP</span>
                  <span className="bg-kettleer-maroon text-kettleer-gold px-3 py-1 font-display text-xs tracking-wider">BATTING CHAMPION .364</span>
                  <span className="bg-kettleer-maroon text-kettleer-gold px-3 py-1 font-display text-xs tracking-wider">OUTSTANDING PRO PROSPECT</span>
                </div>
                <div className="font-display text-2xl text-kettleer-gold mt-4">.364 AVG • .652 SLG</div>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="font-display text-2xl sm:text-3xl text-kettleer-maroon text-center mb-8">THE COMPLETE ROSTER</h3>
            {['pitchers', 'catchers', 'infielders', 'outfielders'].map(position => (
              <div key={position} className="mb-8">
                <div className="font-display text-lg text-kettleer-gold tracking-wider mb-4 border-b-2 border-kettleer-gold pb-2">{position.toUpperCase()}</div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {season1995.roster[position].map((player, i) => (
                    <div key={i} className={`roster-card bg-white rounded-lg shadow p-4 ${player.mlb ? 'border-l-4 border-kettleer-gold' : ''} ${player.star ? 'bg-gradient-to-r from-amber-50 to-white border-2 border-kettleer-gold' : ''}`}>
                      <div className="flex justify-between items-start">
                        <div className="font-display text-lg text-kettleer-maroon">{player.name}</div>
                        {player.mlb && <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded font-display">MLB</span>}
                      </div>
                      {player.stats && <div className="font-serif text-kettleer-gold font-semibold mt-1">{player.stats}</div>}
                      <div className="font-serif text-gray-500 text-sm mt-1">{player.note}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mb-12">
            <h3 className="font-display text-2xl sm:text-3xl text-kettleer-maroon text-center mb-8">THE PLAYOFF JOURNEY</h3>
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                <div><div className="font-display text-xs tracking-widest text-gray-400">WEST DIVISION SEMIFINALS</div><div className="font-display text-xl text-kettleer-maroon">vs WAREHAM GATEMEN</div></div>
                <div className="font-display text-2xl text-green-600 mt-2 sm:mt-0">WON 2-1</div>
              </div>
              <div className="space-y-3">
                {season1995.playoffs.semifinal.games.map((game, i) => (
                  <div key={i} className="game-card bg-gray-50 p-4 rounded">
                    <div><span className="font-display text-kettleer-maroon">GAME {game.game}</span><span className={`ml-3 font-display ${game.result.startsWith('W') ? 'text-green-600' : 'text-red-600'}`}>{game.result}</span></div>
                    <div className="font-serif text-gray-600 mt-1">{game.note}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-kettleer-maroon to-rose-900 text-white rounded-lg shadow-xl p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                <div><div className="font-display text-xs tracking-widest text-kettleer-gold">★ CCBL CHAMPIONSHIP SERIES ★</div><div className="font-display text-2xl">vs CHATHAM ATHLETICS</div></div>
                <div className="font-display text-3xl text-kettleer-gold mt-2 sm:mt-0 champion-badge">CHAMPIONS!</div>
              </div>
              <div className="space-y-3">
                {season1995.playoffs.championship.games.map((game, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur p-4 rounded border-l-4 border-kettleer-gold">
                    <div><span className="font-display">GAME {game.game}</span><span className={`ml-3 font-display ${game.result.startsWith('W') ? 'text-kettleer-gold' : 'text-red-300'}`}>{game.result}</span>{game.game === 3 && <span className="ml-2 text-kettleer-gold text-2xl">🏆</span>}</div>
                    <div className="font-serif text-gray-200 mt-1">{game.note}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="font-display text-2xl sm:text-3xl text-kettleer-maroon text-center mb-8">FUTURE MAJOR LEAGUERS</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {season1995.futureMajorLeaguers.map((player, i) => (
                <div key={i} className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-kettleer-gold">
                  <div className="font-display text-xl text-kettleer-maroon">{player.name}</div>
                  <div className="font-serif text-gray-600 mt-1">{player.teams}</div>
                  <div className="font-display text-sm text-kettleer-gold mt-2">{player.years}</div>
                  {player.highlight && <div className="font-serif text-sm text-gray-500 mt-1">★ {player.highlight}</div>}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-kettleer-maroon rounded-lg p-6 sm:p-8">
            <h3 className="font-display text-xl text-kettleer-gold text-center mb-6">IN THEIR WORDS</h3>
            <div className="space-y-6">
              {season1995.quotes.map((quote, i) => (
                <blockquote key={i} className="border-l-4 border-kettleer-gold pl-4">
                  <p className="font-serif text-lg sm:text-xl text-white italic">"{quote.text}"</p>
                  <footer className="font-display text-kettleer-gold mt-2">— {quote.speaker}</footer>
                </blockquote>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      <section id="championships" className="bg-white py-12 sm:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-display text-3xl sm:text-5xl text-kettleer-maroon text-center mb-4">17 CHAMPIONSHIPS</h2>
          <p className="font-serif text-center text-gray-600 mb-12 text-lg">The most successful franchise in Cape Cod Baseball League history</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {championships.map((champ, i) => (
              <div key={i} className={`p-5 rounded-lg ${champ.featured ? 'bg-gradient-to-br from-amber-100 to-amber-50 border-2 border-kettleer-gold shadow-lg' : 'bg-gray-50 border border-gray-200'}`}>
                <div className="flex justify-between items-start">
                  <div className="font-display text-3xl text-kettleer-maroon">{champ.year}</div>
                  {champ.featured && <span className="text-kettleer-gold text-2xl">★</span>}
                </div>
                <div className="font-serif text-gray-600 mt-1">vs {champ.opponent}</div>
                <div className="font-display text-sm text-kettleer-gold mt-2">Manager: {champ.manager}</div>
              </div>
            ))}
          </div>
          <div className="mt-12 grid sm:grid-cols-2 gap-6">
            <div className="bg-kettleer-maroon text-white rounded-lg p-6">
              <div className="font-display text-kettleer-gold text-sm tracking-wider">THE FIRST DYNASTY</div>
              <div className="font-display text-3xl mt-2">1961-1964</div>
              <div className="font-serif mt-2">4 consecutive titles under Jim Hubbard</div>
            </div>
            <div className="bg-kettleer-maroon text-white rounded-lg p-6">
              <div className="font-display text-kettleer-gold text-sm tracking-wider">THE SECOND DYNASTY</div>
              <div className="font-display text-3xl mt-2">1972-1975</div>
              <div className="font-serif mt-2">4 consecutive titles under Jack McCarthy</div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      <section id="alumni" className="vintage-paper py-12 sm:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-display text-3xl sm:text-5xl text-kettleer-maroon text-center mb-4">MLB ALUMNI</h2>
          <p className="font-serif text-center text-gray-600 mb-12 text-lg">Over 150 Kettleers have reached the Major Leagues</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(showAllAlumni ? mlbAlumni : mlbAlumni.slice(0, 9)).map((player, i) => (
              <div key={i} className="bg-white rounded-lg shadow p-5 border-l-4 border-kettleer-gold">
                <div className="font-display text-lg text-kettleer-maroon">{player.name}</div>
                <div className="font-display text-sm text-kettleer-gold">{player.year}</div>
                <div className="font-serif text-gray-600 text-sm mt-2">{player.mlb}</div>
                <div className="font-serif text-gray-500 text-sm mt-1">★ {player.highlight}</div>
              </div>
            ))}
          </div>
          {!showAllAlumni && (
            <div className="text-center mt-8">
              <button onClick={() => setShowAllAlumni(true)} className="font-display bg-kettleer-maroon text-white px-8 py-3 rounded hover:bg-rose-900 transition tracking-wider">VIEW ALL ALUMNI</button>
            </div>
          )}
        </div>
      </section>

      <section className="bg-kettleer-maroon text-white py-12 sm:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-display text-3xl sm:text-5xl text-center mb-4"><span className="text-kettleer-gold">CCBL</span> HALL OF FAME</h2>
          <p className="font-serif text-center text-gray-300 mb-12 text-lg">Kettleers enshrined in the Cape Cod Baseball League Hall of Fame</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {hallOfFamers.map((hof, i) => (
              <div key={i} className="bg-white/10 backdrop-blur rounded-lg p-4 text-center">
                <div className="font-display text-lg">{hof.name}</div>
                <div className="text-kettleer-gold font-display text-sm">{hof.year}</div>
                <div className="font-serif text-gray-300 text-sm mt-1">{hof.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      <section id="history" className="bg-white py-12 sm:py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-display text-3xl sm:text-5xl text-kettleer-maroon text-center mb-12">OUR HISTORY</h2>
          <div className="prose prose-lg max-w-none font-serif">
            <p className="text-xl text-gray-700 leading-relaxed mb-6">The Cotuit Athletic Association was formed in 1947 with the primary objective of sponsoring the village's new Cape League franchise. The team plays at <strong>Lowell Park</strong>, and soon came to be known as the "Kettleers."</p>
            <div className="bg-amber-50 border-l-4 border-kettleer-gold p-6 my-8">
              <h3 className="font-display text-xl text-kettleer-maroon mb-2">THE KETTLEERS NAME</h3>
              <p className="text-gray-700 m-0">The nickname was credited to Cape Cod Standard-Times sports editor <strong>Ed Semprini</strong>. The term recalls a legendary local land transaction between early area settlers and Native Americans, the terms of sale involving the exchange of a brass kettle.</p>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">The inaugural 1947 team featured first baseman <strong>Manny Robello</strong> and his twin brother, player-manager Victor Robello. Manny went on to serve for many years as president of the Cotuit Athletic Association, and was known as the "original Kettleer."</p>
            <p className="text-gray-700 leading-relaxed mb-6">CCBL Hall of Famer <strong>Arnold Mycock</strong> joined the organization in 1949, and became the team's general manager the following year, a post he held until 1995. Mycock's organizational skills, energy and vision were instrumental not only in making Cotuit a model franchise, but also as "the singular driving force behind the Cape League's success."</p>
            <div className="bg-kettleer-maroon text-white rounded-lg p-6 my-8">
              <div className="font-display text-kettleer-gold text-lg mb-4">RECORDS & ACHIEVEMENTS</div>
              <ul className="space-y-2">
                <li>• Most championships in CCBL history (17)</li>
                <li>• Most championships in modern era (15, since 1963)</li>
                <li>• Two separate four-peat dynasties (1961-64, 1972-75)</li>
                <li>• "Baseball America" Best Amateur College Program of the Decade (2000)</li>
                <li>• Over 150 players have reached Major League Baseball</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-kettleer-maroon text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="w-20 h-20 brass-kettle rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="font-display text-3xl font-bold text-white">CK</span>
          </div>
          <h3 className="font-display text-2xl mb-2">COTUIT KETTLEERS</h3>
          <p className="font-serif text-gray-400 mb-6">Est. 1947 • Lowell Park, Cotuit, Massachusetts</p>
          <div className="border-t border-gray-700 pt-6 mt-6">
            <p className="font-serif text-gray-400 text-sm">This archive is a community project celebrating the history of the Cotuit Kettleers.</p>
            <p className="font-serif text-gray-500 text-sm mt-2">Have photos, programs, or memories from the 1995 season? We'd love to add them to this archive.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default KettleersArchive;
