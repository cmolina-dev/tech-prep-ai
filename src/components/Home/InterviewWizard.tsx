"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PathCard from "@/components/PathCard";
import StepIndicator from "@/components/StepIndicator";
import TechSelector from "@/components/TechSelector";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { InterviewPath, TechOption } from "@/data/mockData";
import { createSession } from "@/app/actions";

interface InterviewWizardProps {
  paths: InterviewPath[];
  technologies: (TechOption & { category?: string })[];
}

export default function InterviewWizard({
  paths,
  technologies,
}: InterviewWizardProps) {
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(1);

  const [selectedPathId, setSelectedPathId] = useState<string>("backend");
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState("mid");
  const [sessionMode, setSessionMode] = useState<"mock" | "practice">("mock");

  const selectedPath = paths.find((p) => p.id === selectedPathId);

  // Validation Logic
  const isStep1Valid = !!selectedPathId;
  const isStep2Valid = selectedTechs.length > 0;

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const toggleTech = (techId: string) => {
    setSelectedTechs((prev) =>
      prev.includes(techId)
        ? prev.filter((id) => id !== techId)
        : [...prev, techId],
    );
  };

  const handleStartSession = async () => {
    // console.log("Starting Session:", {
    //   path: selectedPathId,
    //   techs: selectedTechs,
    //   difficulty,
    //   mode: sessionMode,
    // });
    try {
      const sessionId = await createSession({
        pathId: selectedPathId,
        techIds: selectedTechs,
        difficulty,
        mode: sessionMode,
      });
      router.push(`/interview?sessionId=${sessionId}`);
    } catch (e) {
      console.error("Failed to start session", e);
    }
  };

  const filteredTechs = technologies.filter((t) => {
    if (selectedPathId === "frontend") return t.category === "frontend";
    if (selectedPathId === "backend") return t.category === "backend";
    return true;
  });

  return (
    <div className=" bg-background flex flex-col">
      {/* Background Gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#0B1120] to-[#0f172a] z-0" />
      {/* Main Content */}
      <main className="mt-20 relative z-10 flex-1 flex flex-col items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-5xl">
          {/* Header / Intro */}
          <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Master Your{" "}
              <span className="text-blue-500">Technical Interview</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              AI-driven mock interviews tailored to your stack. Practice
              speaking, improved technical clarity, and get instant feedback.
            </p>
          </div>

          {/* Wizard Container */}
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-500">
            {/* Progress Bar */}
            <StepIndicator currentStep={currentStep} totalSteps={3} />

            <div className="p-6 md:p-12 min-h-[400px] flex flex-col">
              {/* STEP 1: SELECT PATH */}
              {currentStep === 1 && (
                <div className="animate-in fade-in slide-in-from-right-8 duration-300">
                  <h2 className="text-2xl font-bold text-white text-center mb-8">
                    Choose your Interview Path
                  </h2>
                  <div className="grid md:grid-cols-3 gap-6 ">
                    {paths.map((path) => (
                      <PathCard
                        key={path.id}
                        path={path}
                        isSelected={selectedPathId === path.id}
                        onSelect={() => setSelectedPathId(path.id)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 2: TECHNOLOGIES */}
              {currentStep === 2 && (
                <div className="animate-in fade-in slide-in-from-right-8 duration-300">
                  <h2 className="text-2xl font-bold text-white text-center mb-2">
                    Select Focus Technologies
                  </h2>
                  <p className="text-slate-400 text-center mb-8">
                    What specific skills do you want to be tested on?
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-h-[400px] overflow-y-auto p-2">
                    {filteredTechs.map((tech) => (
                      <div
                        key={tech.id}
                        onClick={() => toggleTech(tech.id)}
                        className={`
                                            cursor-pointer flex flex-col items-center justify-center p-4 gap-2
                                            rounded-xl border transition-all duration-200
                                            ${
                                              selectedTechs.includes(tech.id)
                                                ? "bg-blue-500/20 border-blue-500 shadow-lg shadow-blue-500/10"
                                                : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10"
                                            }
                                        `}
                      >
                        <span className="text-2xl">{tech.icon}</span>
                        <span className="text-sm font-medium text-white">
                          {tech.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 3: CONFIGURATION (DIFFICULTY & MODE) */}
              {currentStep === 3 && (
                <div className="max-w-xl mx-auto w-full animate-in fade-in slide-in-from-right-8 duration-300 space-y-8">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Final Configuration
                    </h2>
                    <p className="text-slate-400">
                      Customize the intensity of your session.
                    </p>
                  </div>

                  {/* Difficulty */}
                  <div className="space-y-4">
                    <label className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
                      Difficulty Level
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {["junior", "mid", "senior"].map((level) => (
                        <button
                          key={level}
                          onClick={() => setDifficulty(level)}
                          className={`py-3 px-4 rounded-lg font-medium border-2 transition-all capitalize
                                                ${
                                                  difficulty === level
                                                    ? "border-blue-500 bg-blue-500/10 text-white"
                                                    : "border-white/10 bg-white/5 text-slate-400 hover:bg-white/10"
                                                }
                                            `}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Mode */}
                  <div className="space-y-4">
                    <label className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
                      Session Mode
                    </label>
                    <div className="flex bg-black/40 p-1 rounded-xl">
                      <button
                        onClick={() => setSessionMode("mock")}
                        className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                          sessionMode === "mock"
                            ? "bg-slate-700 text-white shadow-md"
                            : "text-slate-500 hover:text-slate-300"
                        }`}
                      >
                        Mock Interview
                      </button>
                      <button
                        onClick={() => setSessionMode("practice")}
                        className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                          sessionMode === "practice"
                            ? "bg-slate-700 text-white shadow-md"
                            : "text-slate-500 hover:text-slate-300"
                        }`}
                      >
                        Practice Mode
                      </button>
                    </div>
                    <p className="text-xs text-center text-slate-500">
                      {sessionMode === "mock"
                        ? "Strict mode. No retries. Time limits enforced."
                        : "Relaxed mode. Pause anytime. View hints and retries allowed."}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div
              className={`p-6 bg-black/20 border-t border-white/5 flex  items-center ${currentStep === 1 ? "justify-end" : "justify-between"}`}
            >
              <button
                onClick={handleBack}
                disabled={currentStep === 1}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                  currentStep === 1
                    ? "text-slate-600 cursor-not-allowed hidden"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                <ArrowLeft size={20} />
                Back
              </button>

              {currentStep < 3 ? (
                <button
                  onClick={handleNext}
                  disabled={currentStep === 1 ? !isStep1Valid : !isStep2Valid}
                  className={`bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  Next Step
                  <ArrowRight size={20} />
                </button>
              ) : (
                <button
                  onClick={handleStartSession}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-600/20"
                >
                  Start Interview
                  <ArrowRight size={20} />
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
