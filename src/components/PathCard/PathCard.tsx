"use client";

import Image from "next/image";
import { InterviewPath } from "@/data/mockData";

interface PathCardProps {
  path: InterviewPath;
  isSelected: boolean;
  onSelect: () => void;
}

export default function PathCard({
  path,
  isSelected,
  onSelect,
}: PathCardProps) {
  return (
    <div
      className={`relative flex flex-col h-full bg-card border-2 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 group
        ${
          isSelected
            ? "border-blue-500 bg-blue-500/[0.02] shadow-[0_0_30px_rgba(59,130,246,0.1)] scale-[1.02]"
            : "border-border hover:border-slate-600 hover:bg-white/[0.02] hover:-translate-y-1"
        }`}
      onClick={onSelect}
    >
      {/* Image Container */}
      <div className="relative w-full h-[180px] shrink-0 overflow-hidden">
        {path.image ? (
          <Image
            src={path.image}
            alt={path.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-[#0B1120] text-6xl opacity-30">
            {path.icon}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] to-transparent opacity-60" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col p-6 pt-4">
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
            {path.title}
          </h3>
          {isSelected && (
            <div className="w-6 h-6 flex items-center justify-center bg-blue-500 rounded-full text-white shrink-0 shadow-lg shadow-blue-500/40 ">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.6667 3.5L5.25 9.91667L2.33333 7"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}
        </div>

        <p className="text-sm text-slate-400 leading-relaxed mb-6 line-clamp-3">
          {path.description}
        </p>

        <div className="mt-auto">
          <div className="flex flex-wrap gap-2">
            {path.topics.slice(0, 3).map((topic, index) => (
              <span
                key={index}
                className="px-2.5 py-1 bg-white/5 border border-white/5 rounded-md text-[11px] font-semibold text-slate-400 uppercase tracking-wide"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
