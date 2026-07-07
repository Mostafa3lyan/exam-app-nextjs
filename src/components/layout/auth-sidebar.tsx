"use client";
import {FolderCode , Brain , BookOpenCheck , RectangleEllipsis,} from "lucide-react";

export default function AuthSidebarSidebar() {
  const features = [
    {
      icon: Brain,
      title: "Tailored Diplomas",
      description:
        "Choose from specialized tracks like Frontend, Backend, and Mobile Development.",
    },
    {
      icon: BookOpenCheck,
      title: "Focused Exams",
      description:
        "Access topic-specific tests including HTML, CSS, JavaScript, and more.",
    },
    {
      icon: RectangleEllipsis,
      title: "Smart Multi-Step Forms",
      description:
        "Choose from specialized tracks like Frontend, Backend, and Mobile Development.",
    },
  ];

  return (
    <div className="container h-full min-h-screen  bg-gradient-to-bl from-blue-200 via-white to-blue-200 p-12 flex flex-col justify-center items-center">
      <div className="w-10/12 h-full ">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-24">
          <FolderCode className=" text-white" color="#155DFC" />
          <span className="text-xl font-semibold  text-primary">Exam App</span>
        </div>
        {/* Headline */}
        <p className="text-3xl w-11/12 line-clamp-2 font-bold text-gray-800 mb-16 font-inter">
          Empower your learning journey with our smart exam platform.
        </p>

        {/* Features */}
        <div className="space-y-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center border-2 border-blue-600">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div>
                  <p className="text-xl font-bold text-blue-600 mb-2">
                    {feature.title}
                  </p>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
