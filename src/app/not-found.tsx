// app/not-found.tsx
import Button from '@components/button/button';
import Text from '@styles/components/text';
import { TypographyBold, TypographySize } from '@styles/style.types';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='w-full h-full flex justify-center items-center flex-col gap-1'>
        <Text
            size={TypographySize.HL}
            bold={TypographyBold.lg}
        >
            404
        </Text>
        <Text
            size={TypographySize.HL}
            bold={TypographyBold.lg}
            className='mt-[-10px]'
        >
            Page Not Found
        </Text>
        <div className='w-[500px]'>
            <Text textAlign='center'>
                Sorry, the page you are looking for doesn’t exist or has been moved. Please check the URL or return to the homepage.
            </Text>
        </div>
        <Link href={"/"}>
            <Button 
                text='Go Back Home'
            />
        </Link>
    </div>
  );
}
