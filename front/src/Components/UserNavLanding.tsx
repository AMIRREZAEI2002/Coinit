import { Box, Typography, Link, IconButton } from '@mui/material';
import { AccountCircle as UserIcon } from '@mui/icons-material';

// این تابع در سرور اجرا می‌شه و تاریخ رو تولید می‌کنه
function getServerDate() {
  return new Date().toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
}

export default function UserNavLanding() {
  const userData = {
    name: 'Mahyar Baher',
    credit: '$412,000.33',
    date: getServerDate()
  };

  return (
    <Box sx={{ bgcolor: 'rgba(0, 0, 0, 0.08)', p: {xs:1,md:3}, width: '100%' }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        flexWrap: 'wrap',
        flexDirection: {xs:'column',md:'row'},
        gap: { xs: 1, sm: 3, md: 5 }
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body1" fontWeight={600} sx={{ mr: 1 }}>
            Welcome
          </Typography>
          <Typography variant="h6" color="error" sx={{ fontWeight: 600, whiteSpace: 'nowrap' }}>
            {userData.name}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center',flexDirection:{xs:'column',md:'row'} }}>
          <Typography variant="body1" fontWeight={600} sx={{ mr: 1 }}>
            Today
          </Typography>
          <Typography variant="body1" color="error">
            {userData.date}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body1" fontWeight={600} sx={{ mr: 1 }}>
            Your credit
          </Typography>
          <Typography variant="body1" color="error">
            {userData.credit}
          </Typography>
        </Box>
        
        <Link href="/panel/profile" underline="none" color="inherit">
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            '&:hover': { color: 'primary.main' },
            '@media (min-width:1200px)': {
              '& .profile-text': { display: 'block' }
            },
            '& .profile-text': { display: 'none' }
          }}>
            <IconButton size="small" sx={{ p: 0, mr: 1 }}>
              <UserIcon />
            </IconButton>
            <Typography className="profile-text" variant="body1" fontWeight={600}>
              View My Profile
            </Typography>
          </Box>
        </Link>
      </Box>
    </Box>
  );
}
