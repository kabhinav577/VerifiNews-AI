'use server';

const API_KEY = process.env.CRICBUZZ_API_KEY;
const API_HOST = 'cricbuzz-cricket.p.rapidapi.com';

const fetchCricbuzzOptions = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': API_KEY,
    'x-rapidapi-host': API_HOST,
    'Content-Type': 'application/json'
  },
  cache: 'no-store' 
};

// Helper to extract matches from a typeMatches array
const extractMatchesFromData = (data, requiredState = null) => {
  if (!data || !data.typeMatches) return [];
  const extracted = [];

  data.typeMatches.forEach(typeMatch => {
    // Only extract International or League matches
    if (typeMatch.matchType === 'International' || typeMatch.matchType === 'League') {
      if (typeMatch.seriesMatches) {
        typeMatch.seriesMatches.forEach(seriesMatch => {
          if (seriesMatch.seriesAdWrapper && seriesMatch.seriesAdWrapper.matches) {
            seriesMatch.seriesAdWrapper.matches.forEach(match => {
              const matchInfo = match.matchInfo;
              if (!matchInfo) return;

              // Extract only specific states if requiredState is not null, otherwise take all
              // Typically: 'Live', 'Preview' (Upcoming), 'Complete' (Recent)
              
              const matchScore = match.matchScore;
              const team1 = matchInfo.team1 || {};
              const team2 = matchInfo.team2 || {};
              const venue = matchInfo.venueInfo || {};

              let team1ScoreInfo = null;
              let team2ScoreInfo = null;

              if (matchScore && matchScore.team1Score && matchScore.team1Score.inngs1) {
                team1ScoreInfo = {
                  runs: matchScore.team1Score.inngs1.runs || 0,
                  wickets: matchScore.team1Score.inngs1.wickets || 0,
                  overs: matchScore.team1Score.inngs1.overs || 0,
                };
              }
              
              if (matchScore && matchScore.team2Score && matchScore.team2Score.inngs1) {
                 team2ScoreInfo = {
                  runs: matchScore.team2Score.inngs1.runs || 0,
                  wickets: matchScore.team2Score.inngs1.wickets || 0,
                  overs: matchScore.team2Score.inngs1.overs || 0,
                };
              }

              extracted.push({
                matchId: matchInfo.matchId,
                seriesName: matchInfo.seriesName,
                matchDesc: matchInfo.matchDesc,
                matchFormat: matchInfo.matchFormat,
                status: matchInfo.status,
                state: matchInfo.state, // Pass state down to frontend ('Live', 'Preview', 'Complete')
                startDate: parseInt(matchInfo.startDate, 10),
                venue: {
                  ground: venue.ground,
                  city: venue.city
                },
                team1: {
                  name: team1.teamName,
                  shortName: team1.teamSName,
                  score: team1ScoreInfo
                },
                team2: {
                  name: team2.teamName,
                  shortName: team2.teamSName,
                  score: team2ScoreInfo
                }
              });
            });
          }
        });
      }
    }
  });

  return extracted;
};

export async function fetchLiveCricketMatches() {
  try {
    const [recentRes, upcomingRes] = await Promise.all([
      fetch(`https://${API_HOST}/matches/v1/recent`, fetchCricbuzzOptions),
      fetch(`https://${API_HOST}/matches/v1/upcoming`, fetchCricbuzzOptions)
    ]);

    let recentData = { typeMatches: [] };
    let upcomingData = { typeMatches: [] };

    if (recentRes.ok) recentData = await recentRes.json();
    if (upcomingRes.ok) upcomingData = await upcomingRes.json();

    const recentMatchesRaw = extractMatchesFromData(recentData);
    const upcomingMatchesRaw = extractMatchesFromData(upcomingData);

    const allMatches = [...recentMatchesRaw, ...upcomingMatchesRaw];

    // Deduplicate just in case 
    const uniqueMatchesMap = new Map();
    allMatches.forEach(m => uniqueMatchesMap.set(m.matchId, m));
    const uniqueMatches = Array.from(uniqueMatchesMap.values());

    // Separate into categories
    const liveMatches = [];
    const upcomingMatches = [];
    const recentMatches = [];

    uniqueMatches.forEach(m => {
      if (m.state === 'Live' || m.state === 'In Progress') {
        liveMatches.push(m);
      } else if (m.state === 'Preview' || m.state === 'Upcoming') {
        upcomingMatches.push(m);
      } else if (m.state === 'Complete') {
        recentMatches.push(m);
      } else {
        // Fallback
        recentMatches.push(m);
      }
    });

    // Sort upcoming by start date ascending
    upcomingMatches.sort((a, b) => a.startDate - b.startDate);
    
    // Sort recent by start date descending
    recentMatches.sort((a, b) => b.startDate - a.startDate);

    // Limit upcoming and recent to 3 matches each
    const limitedUpcoming = upcomingMatches.slice(0, 3);
    const limitedRecent = recentMatches.slice(0, 3);

    // Combine: Live first, then Upcoming, then Recent
    let sortedMatches = [...liveMatches, ...limitedUpcoming, ...limitedRecent];

    // Limit to top 15 matches overall to avoid overwhelming UI
    sortedMatches = sortedMatches.slice(0, 15);

    return { matches: sortedMatches };

  } catch (error) {
    console.error('Error fetching live cricket matches:', error);
    return { matches: [] };
  }
}
