import Link from 'next/link';
import React from 'react';

const CreateYours = () => {
    return (
        <span className="text-muted-foreground text-sm flex justify-center">
            Don&apos;t have an account?{" "}
            <Link className="text-primary px-1" href="/register">
                {" "}
                Create yours
            </Link>
        </span>
    );
}

export default CreateYours;
