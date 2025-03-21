
import { useState, useEffect } from 'react';
import ProfilePhoto from './ProfilePhoto';
import { Switch } from '@/components/ui/switch';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

const Header = () => {
  const [user, setUser] = useState({ name: 'User' });
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        
      scrolled 
        ? 'bg-background/80 backdrop-blur-md shadow-sm border-b border-border/50' 
        : 'bg-transparent'
    }`} style={{ height: `100px`, width: "100%" }}>
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center gap-2">
          <h1 className="text-4xl mt-10 font-medium tracking-tight">
          E-commerce  Analytics Dashboard
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex  items-center gap-2">
            <Sun className="h-10 w-10 mt-10 mr-2 text-muted-foreground" />
            <Switch 
              checked={theme === 'dark'} 
              onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
              aria-label="Toggle theme"
              className='mt-10 mr-2'
              style={{ height: `20px`, width: "40px" }}
            />
            <Moon className="h-10 w-10  mt-10  mr-2 text-muted-foreground" />
          </div>
          <h1 className="text-2xl mt-10 font-medium hidden md:block animate-fade-in">
            Welcome
          </h1>
          <ProfilePhoto />
        </div>
      </div>
    </header>
  );
};

export default Header;
