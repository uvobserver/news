import { useEffect } from 'react';
import { STORY_BY_ID } from './data';
import { Ticker } from './components/Ticker';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Archive } from './pages/Archive';
import { Story, StoryNotFound } from './pages/Story';
import { Shop } from './pages/Shop';
import { About } from './pages/About';
import { useRoute } from './lib/router';

export function App() {
  const route = useRoute();
  const tag = route.page === 'archive' ? route.tag ?? 'All' : 'All';
  const story = route.page === 'story' ? STORY_BY_ID.get(route.id) : undefined;

  useEffect(() => {
    const base = 'The UV Observer';
    document.title =
      route.page === 'story' && story ? `${story.title} — ${base}`
      : route.page === 'archive' ? `Archive${tag !== 'All' ? `: ${tag}` : ''} — ${base}`
      : route.page === 'shop' ? `Shop — ${base}`
      : route.page === 'about' ? `Contact — ${base}`
      : base;
  }, [route, story, tag]);

  return (
    <div className="page">
      <Ticker />
      <div className="shell">
        <Header route={route} activeTag={tag} />
        <main>
          {route.page === 'home' && <Home />}
          {route.page === 'archive' && <Archive tag={tag} />}
          {route.page === 'story' && (story ? <Story story={story} /> : <StoryNotFound />)}
          {route.page === 'shop' && <Shop />}
          {route.page === 'about' && <About />}
        </main>
        <Footer />
      </div>
    </div>
  );
}
