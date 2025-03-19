import Link from 'next/link';
import { Typography, List, ListItem } from '@/components/ui';

export default function Home() {
  return (
    <main className="p-8 flex flex-col gap-10">
      <Typography variant="h1" color="amber" className="font-bold text-center">
        Mission: USE CONTEXT
    </Typography>
      <List className="flex flex-col gap-4 justify-center items-center">
        <ListItem>
          <Link href="/asteroids">
            Asteroids List - Client Component
          </Link>
        </ListItem>
      </List>
    </main>
  );
}
