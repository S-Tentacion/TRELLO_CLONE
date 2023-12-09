/* eslint-disable react/no-unescaped-entities */
import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FaGhost } from 'react-icons/fa';

function page404(): JSX.Element {
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    toast({
      position: 'top',
      title: 'Redirecting...',
      description: 'You are at wrong place let go somewhere else. ',
      status: 'success',
      duration: 2500,
      isClosable: true
    });
    setTimeout(() => {
      router.push('/boards');
    }, 3000);
  }, []);

  return (
    <main className="pageof404">
      <h1>
        4
        <span>
          <FaGhost />
        </span>{' '}
        4
      </h1>
      <h2>Error: 404 page not found</h2>
      <p>Sorry, the page you're looking for cannot be accessed</p>
    </main>
  );
}

export default page404;
