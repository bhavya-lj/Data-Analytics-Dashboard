
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from 'lucide-react';

// Using a different avatar image URL
const AVATAR_URL = "image.jpg"; 

const ProfilePhoto = () => {
  const navigate = useNavigate();
  
  return (
    <Avatar 
      className="cursor-pointer transition-all duration-300 hover:shadow-md border-2 border-background dark:border-background hover:border-primary hover:scale-105"
      onClick={() => navigate('/profile')}
      style={{ height: `100px`, width: "100px" , marginTop:"50px" }}
    >
      <AvatarImage src={AVATAR_URL} />
      <AvatarFallback className="bg-primary/10 text-primary">
        <User className="h-50 w-50" />
      </AvatarFallback>
    </Avatar>
  );
};

export default ProfilePhoto;
