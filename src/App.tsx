import React from 'react';
import { CompetitionProvider, useCompetition } from './context/CompetitionContext';
import { Header } from './components/Header';
import { OrganizerModal } from './components/OrganizerModal';
import { WelcomePage } from './pages/WelcomePage';
import { RegistrationPage } from './pages/RegistrationPage';
import { RulesPage } from './pages/RulesPage';
import { RoundWorkspacePage } from './pages/RoundWorkspacePage';
import { RoundResultPage } from './pages/RoundResultPage';
import { FinalResultPage } from './pages/FinalResultPage';
import { LeaderboardPage } from './pages/LeaderboardPage';

const AppContent: React.FC = () => {
  const { state } = useCompetition();

  const renderView = () => {
    switch (state.currentView) {
      case 'welcome':
        return <WelcomePage />;
      case 'registration':
        return <RegistrationPage />;
      case 'rules':
        return <RulesPage />;
      case 'round1_workspace':
      case 'round2_workspace':
      case 'round3_workspace':
        return <RoundWorkspacePage />;
      case 'round1_result':
        return <RoundResultPage round={1} />;
      case 'round2_result':
        return <RoundResultPage round={2} />;
      case 'final_result':
        return <FinalResultPage />;
      case 'leaderboard':
        return <LeaderboardPage />;
      default:
        return <WelcomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      <Header />
      <main className="flex-1">
        {renderView()}
      </main>
      <OrganizerModal />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <CompetitionProvider>
      <AppContent />
    </CompetitionProvider>
  );
};

export default App;
