import { Exam } from "@/lib/types/exams";
import { ArrowRight, Clock, HelpCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function DiplomaExamCard({ exam }: { exam: Exam }) {
  return (
    <Link href={`/exams/${exam.id}`}>
      <div className="group relative flex gap-6 p-6 bg-blue-50 border-2 border-transparent hover:border-dashed hover:border-blue-300 transition-all duration-300">
        {/* Image */}
        <div className="flex-shrink-0">
          <div className="w-24 h-24 flex items-center justify-center bg-blue-100 border-2 border-blue-300 rounded-lg overflow-hidden">
            <Image
              src={exam.image!}
              alt={exam.title}
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Title + Metadata */}
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-2xl font-bold text-blue-600">
              {exam.title}
            </h3>

            <div className="flex items-center gap-3 text-sm font-medium text-gray-700 flex-shrink-0">
              <span className="flex items-center gap-1">
                <HelpCircle className="w-4 h-4 text-gray-500" />
                {exam.questionsCount} Questions
              </span>

              <span className="text-gray-400">|</span>

              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-gray-500" />
                {exam.duration} minutes
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
            {exam.description}
          </p>
        </div>

        {/* START Button */}
        <div className="absolute right-6 bottom-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 flex items-center gap-2 shadow-md transition-colors">
            START
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}