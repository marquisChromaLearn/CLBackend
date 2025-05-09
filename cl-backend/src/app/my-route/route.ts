import configPromise from '@/payload.config';
import { getPayload } from 'payload';

export const GET = async () => {
  // Initialize the Payload instance with your config
  const payload = await getPayload({ config: configPromise });

  // Query the `employees` collection (not `users`)
  const data = await payload.find({
    collection: 'employees',
  });

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
};
