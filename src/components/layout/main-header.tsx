"use client";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
    BookOpen,
    ChevronLeft,
    GraduationCap,
    HelpCircle,
    LucideIcon,
    Menu,
    User,
} from "lucide-react";
import Link from "next/link";
import { useOptionalSidebar } from "@/components/ui/sidebar";

interface MainHeaderProps {
    rootLabel?: string;
    rootHref?: string;
    pageLabel?: string;
    diplomaId?: string;
    diplomaTitle?: string;
    examTitle?: string;
    backHref?: string;
    isAccount?: boolean;
}

function getIcon({
    isAccount,
    examTitle,
    diplomaTitle,
}: {
    isAccount?: boolean;
    examTitle?: string;
    diplomaTitle?: string;
}): LucideIcon {
    if (isAccount) return User;
    if (examTitle) return HelpCircle;
    if (diplomaTitle) return BookOpen;

    return GraduationCap;
}

export default function MainHeader({
    rootLabel = "Diplomas",
    rootHref = "/",
    pageLabel,
    diplomaId,
    diplomaTitle,
    examTitle,
    backHref,
    isAccount,
}: MainHeaderProps) {
    const Icon = getIcon({
        isAccount,
        examTitle,
        diplomaTitle,
    });

    const title =
        examTitle ??
        diplomaTitle ??
        pageLabel ??
        (isAccount ? "Account" : rootLabel);

    const sidebar = useOptionalSidebar()

    return (
        <div className="px-1 py-5 md:px-0">
            <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                    {sidebar ? (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            onClick={sidebar.toggleSidebar}
                            aria-label="Open menu"
                        >
                            <Menu className="size-5" />
                        </Button>
                    ) : null}
                </div>

                <div className="flex-1 md:hidden min-w-0">
                    <div className="text-sm font-medium text-gray-600 truncate">
                        {title}
                    </div>
                </div>
            </div>

            <div className="mt-4 md:mt-5">
                <Breadcrumb className="hidden md:block px-4">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href={rootHref}>
                                    {rootLabel}
                                </Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>

                        {(pageLabel || isAccount) && (
                            <>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>
                                        {pageLabel ?? "Account"}
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </>
                        )}

                        {diplomaTitle && !isAccount && (
                            <>
                                <BreadcrumbSeparator />

                                <BreadcrumbItem>
                                    {examTitle ? (
                                        <BreadcrumbLink asChild>
                                            <Link href={`/${diplomaId}`}>
                                                {diplomaTitle}
                                            </Link>
                                        </BreadcrumbLink>
                                    ) : (
                                        <BreadcrumbPage>
                                            {diplomaTitle}
                                        </BreadcrumbPage>
                                    )}
                                </BreadcrumbItem>
                            </>
                        )}

                        {examTitle && (
                            <>
                                <BreadcrumbSeparator />

                                <BreadcrumbItem>
                                    <BreadcrumbPage>
                                        {examTitle}
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </>
                        )}
                    </BreadcrumbList>
                </Breadcrumb>

                <div className="flex items-stretch gap-2 mt-2 px-1 md:px-4 w-full min-w-0">
                    {backHref && (
                        <Link
                            href={backHref}
                            className="flex items-center justify-center w-10 sm:w-12 border-2 border-primary text-primary hover:bg-primary/10 transition-colors shrink-0"
                        >
                            <ChevronLeft className="size-4 sm:size-5" />
                        </Link>
                    )}

                    <div className="flex-1 bg-primary min-h-16 sm:min-h-20 p-3 sm:p-4 flex items-center min-w-0 overflow-hidden">
                        <Icon className="text-white size-6 sm:size-8 md:size-10 me-2 sm:me-4 shrink-0" />

                        <h1 className="text-white text-base sm:text-xl md:text-3xl font-semibold line-clamp-2 min-w-0 break-words">
                            {title}
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );
}