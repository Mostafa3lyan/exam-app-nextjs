import { BreadcrumbLink } from '@/components/ui/breadcrumb';
import { GraduationCap } from 'lucide-react';
import React from 'react';

const MainHeader = () => {
    return (
        <>
            <BreadcrumbLink className='' href="/">Home</BreadcrumbLink>
            <div className='px-1 py-5'>
            <div className='bg-primary w- min-h-20 p-4 flex items-center '>
                <GraduationCap className='text-white size-10 me-4' />
                <h1 className='text-white text-3xl font-semibold'> Diplomas</h1>
                </div>
            </div>

        </>
    );
}

export default MainHeader;
