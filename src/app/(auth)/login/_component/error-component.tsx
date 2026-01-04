import { CircleX } from 'lucide-react';
import React from 'react';

const ErrorComponent = ({ error } : { error: Error }) => {
    return (
        <>
            {error && (
                <div className="p-2 bg-destructive/10 border border-destructive relative ">
                    <CircleX className="text-destructive bg-white absolute rounded-full size-5 top-0 left-1/2 -translate-y-1/2" />
                    <p className="text-sm text-destructive text-center">
                        {error.message || "Something went wrong"}
                    </p>
                </div>
            )}
        </>
    );
}

export default ErrorComponent;
