import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { GraduationCap } from "lucide-react";

interface MainHeaderProps {
    diplomaId?: string;
    diplomaTitle?: string;
    examTitle?: string;
}

export default function MainHeader({ diplomaId, diplomaTitle, examTitle }: MainHeaderProps) {
    return (
        <div className="px-1 py-5">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Diplomas</BreadcrumbLink>
                    </BreadcrumbItem>

                    {diplomaTitle && (
                        <>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                {examTitle ? (
                                    <BreadcrumbLink href={`/${diplomaId}`}>
                                        {diplomaTitle}
                                    </BreadcrumbLink>
                                ) : (
                                    <BreadcrumbPage>{diplomaTitle}</BreadcrumbPage>
                                )}
                            </BreadcrumbItem>
                        </>
                    )}

                    {examTitle && (
                        <>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>{examTitle}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </>
                    )}
                </BreadcrumbList>
            </Breadcrumb>

            <div className="bg-primary min-h-20 mt-2 p-4 flex items-center">
                <GraduationCap className="text-white size-10 me-4" />
                <h1 className="text-white text-3xl font-semibold">
                    {examTitle ?? diplomaTitle ?? "Diplomas"}
                </h1>
            </div>
        </div>
    );
}