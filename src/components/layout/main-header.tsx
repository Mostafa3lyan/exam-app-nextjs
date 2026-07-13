import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { BookOpen, ChevronLeft, GraduationCap, HelpCircle, LucideIcon, User } from "lucide-react";
import Link from "next/link";

interface MainHeaderProps {
    rootLabel?: string;
    rootHref?: string;
    diplomaId?: string;
    diplomaTitle?: string;
    examTitle?: string;
    backHref?: string;
    isAccount?: boolean;
}

const getIcon = (isAccount?: boolean, examTitle?: string, diplomaTitle?: string): LucideIcon => {
    if (isAccount) return User;
    if (examTitle) return HelpCircle;
    if (diplomaTitle) return BookOpen;
    return GraduationCap;
};

export default function MainHeader({
    rootLabel = "Diplomas",
    rootHref = "/",
    diplomaId,
    diplomaTitle,
    examTitle,
    backHref,
    isAccount,
}: MainHeaderProps) {
    const Icon = getIcon(isAccount, examTitle, diplomaTitle);

    return (
        <div className="px-1 py-5">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href={rootHref}>{rootLabel}</BreadcrumbLink>
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

            <div className="flex items-stretch gap-2 mt-2">
                {backHref && (
                    <Link
                        href={backHref}
                        className="flex items-center justify-center w-12 border-2 border-primary text-primary hover:bg-primary/10 transition-colors flex-shrink-0"
                    >
                        <ChevronLeft className="size-5" />
                    </Link>
                )}

                <div className="flex-1 bg-primary min-h-20 p-4 flex items-center">
                    <Icon className="text-white size-10 me-4" />
                    <h1 className="text-white text-3xl font-semibold">
                        {examTitle ?? diplomaTitle ?? (isAccount ? "Account" : rootLabel)}
                    </h1>
                </div>
            </div>
        </div>
    );
}